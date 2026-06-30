/**
 * "Forked" from https://github.com/changesets/changesets/tree/main/packages/changelog-github
 * and updated with a custom output format
 */

import { ChangelogFunctions } from '@changesets/types';
import { config } from 'dotenv';
import { getInfo } from '@changesets/get-github-info';

const RATE_LIMIT_CONCURRENCY = 2;
const RATE_LIMIT_DELAY_MS = 1000;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 300;

// HTTP statuses worth retrying. These are typically transient; in our corporate-proxy
// setup, GitHub auth errors (401/403) can also appear spuriously, so we retry them too.
const RETRYABLE_STATUS = new Set([401, 403, 408, 425, 429, 500, 502, 503, 504]);

config();

/**
 * Simple concurrency limiter to avoid overwhelming the GitHub API.
 * Limits parallel requests and adds a small delay between them.
 */
function createRateLimiter(concurrency: number, delayMs: number) {
  let active = 0;
  const queue: Array<() => void> = [];

  function next() {
    if (queue.length > 0 && active < concurrency) {
      active++;
      const resolve = queue.shift()!;
      resolve();
    }
  }

  return async function <T>(fn: () => Promise<T>): Promise<T> {
    await new Promise<void>(resolve => {
      queue.push(resolve);
      next();
    });
    try {
      const result = await fn();
      return result;
    } finally {
      active--;
      // Small delay between requests to avoid hitting secondary rate limits
      await new Promise(resolve => setTimeout(resolve, delayMs));
      next();
    }
  };
}

/**
 * Logs a failed request attempt to stderr on its own line. The progress indicator uses a
 * carriage return without a trailing newline, so we prefix the message with one.
 */
function logAttemptFailure(context: string, attempt: number, maxAttempts: number, detail: string) {
  process.stderr.write(`\n⚠️  ${context} failed (attempt ${attempt}/${maxAttempts}): ${detail}\n`);
}

/**
 * Executes an async function and retries it on failure.
 *
 * @param fn - Async operation to execute.
 * @param context - Human-readable label used in failure logs (e.g. the request target).
 * @param maxAttempts - Maximum number of attempts before failing.
 * @returns The resolved value of the async operation.
 * @throws The last error thrown by {@link fn} after all retry attempts fail.
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  context = 'GitHub request',
  maxAttempts = RETRY_ATTEMPTS,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const detail = error instanceof Error ? error.message : String(error);
      logAttemptFailure(context, attempt, maxAttempts, detail);
      if (attempt === maxAttempts) break;

      // Back off briefly before retrying transient network/API errors.
      await new Promise(resolve => setTimeout(resolve, attempt * RETRY_DELAY_MS));
    }
  }

  throw lastError;
}

// Cache GitHub info lookups by commit hash to avoid duplicate API calls
const commitInfoCache = new Map<
  string,
  Promise<{ links: { commit: string | null; pull: string | null; user: string | null } }>
>();

// Cache co-authors by commit hash
const coAuthorsCache = new Map<string, Promise<string[]>>();

// Limit concurrency and add a small delay between requests to stay under API/proxy limits.
const rateLimited = createRateLimiter(RATE_LIMIT_CONCURRENCY, RATE_LIMIT_DELAY_MS);

// Progress tracking
let processedCount = 0;
let cacheHits = 0;

async function getGitHubInfo(repo: string, commit: string) {
  // cached hits
  if (commitInfoCache.has(commit)) {
    cacheHits++;
    processedCount++;
    process.stderr.write(`\r🔗 Changelog: ${processedCount} processed (${cacheHits} cached)`);
    return commitInfoCache.get(commit)!;
  }

  // un-cached hits
  const promise = withRetry(
    () => rateLimited(() => getInfo({ repo, commit })),
    `getInfo ${commit.slice(0, 7)}`,
  ).catch(error => {
    commitInfoCache.delete(commit);
    throw error;
  });
  commitInfoCache.set(commit, promise);
  processedCount++;
  process.stderr.write(`\r🔗 Changelog: ${processedCount} processed (${cacheHits} cached)`);
  return promise;
}

/**
 * Fetch co-authors from the squash merge commit's Co-authored-by trailers.
 * With squash merging, the merge commit contains all co-author information.
 */
async function getCoAuthors(
  repo: string,
  commit: string,
  mainUser: string | null,
): Promise<string[]> {
  if (coAuthorsCache.has(commit)) {
    return coAuthorsCache.get(commit)!;
  }

  const promise = withRetry(
    () =>
      rateLimited(async () => {
        const token = process.env.GITHUB_TOKEN;
        if (!token) return [];

        const serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com';
        const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com';

        const url = `${apiUrl}/repos/${repo}/commits/${commit}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          const body = await response.text().catch(() => '');
          const snippet = body.slice(0, 300).replace(/\s+/g, ' ').trim();
          const detail = `${response.status} ${response.statusText} for ${url}${
            snippet ? ` - ${snippet}` : ''
          }`;

          // Transient statuses bubble up so withRetry can retry them.
          if (RETRYABLE_STATUS.has(response.status)) {
            throw new Error(detail);
          }

          // Non-retryable (e.g. 404): log once and treat as "no co-authors".
          process.stderr.write(`\n⚠️  Co-authors request non-retryable: ${detail}\n`);
          return [];
        }

        const commitData = (await response.json()) as {
          commit: { message: string };
        };

        const users = new Set<string>();

        // Parse Co-authored-by trailers from the squash merge commit
        const coAuthorMatches = commitData.commit.message.matchAll(
          /^Co-authored-by:\s+.+<([^>]+)>/gm,
        );
        for (const match of coAuthorMatches) {
          // GitHub noreply emails contain the username
          const noreplyMatch = match[1].match(/^(\d+\+)?([^@]+)@users\.noreply\.github\.com$/);
          if (noreplyMatch) {
            users.add(noreplyMatch[2]);
          }
        }

        // Remove the main PR author and bots
        if (mainUser) users.delete(mainUser);
        for (const user of users) {
          if (user.endsWith('[bot]') || user === 'web-flow') {
            users.delete(user);
          }
        }

        return [...users].map(login => `[@${login}](${serverUrl}/${login})`);
      }),
    `getCoAuthors ${commit.slice(0, 7)}`,
  ).catch(error => {
    coAuthorsCache.delete(commit);
    throw error;
  });

  coAuthorsCache.set(commit, promise);
  return promise;
}

const changelogFunctions: ChangelogFunctions = {
  getDependencyReleaseLine: async (_changesets, dependenciesUpdated, options) => {
    if (!options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
      );
    }
    if (dependenciesUpdated.length === 0) return '';

    const changesetLink = `- Updated dependencies:`;

    const updatedDepenenciesList = dependenciesUpdated.map(
      dependency => `  - ${dependency.name}@${dependency.newVersion}`,
    );

    return [changesetLink, ...updatedDepenenciesList].join('\n');
  },
  getReleaseLine: async (changeset, _type, options) => {
    if (!options || !options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
      );
    }

    const replacedChangelog = changeset.summary.trim();

    const [firstLine, ...futureLines] = replacedChangelog.split('\n').map(l => l.trimEnd());

    const links = await (async () => {
      const commitToFetchFrom = changeset.commit;
      if (commitToFetchFrom) {
        const { links } = await getGitHubInfo(options.repo, commitToFetchFrom);
        return links;
      }
      return {
        commit: null,
        pull: null,
        user: null,
      };
    })();

    const users = links.user;

    // Fetch co-authors from the squash merge commit
    let coAuthors: string[] = [];
    if (changeset.commit) {
      const mainUser = links.user ? links.user.match(/@([\w-]+)/)?.[1] ?? null : null;
      coAuthors = await getCoAuthors(options.repo, changeset.commit, mainUser);
    }

    const pullOrCommit = links.pull || links.commit || null;
    const allUsersList = [users, ...coAuthors].filter(Boolean) as string[];
    const allUsers =
      allUsersList.length > 1
        ? `${allUsersList.slice(0, -1).join(', ')} and ${allUsersList[allUsersList.length - 1]}`
        : allUsersList.join('');
    const userString = allUsers ? `by ${allUsers}` : '';
    const pullString = pullOrCommit !== null ? `with ${pullOrCommit}` : '';
    const hasUserOrPull = userString && pullString;
    const entry = [
      '\n\n- ',
      firstLine,
      futureLines.map(l => `  ${l}`).join('\n'),
      hasUserOrPull ? ' (' : '',
      [userString, pullString].join(' '),
      hasUserOrPull ? ')' : '',
    ];

    return entry.join('');
  },
};

export default changelogFunctions;
