/**
 * "Forked" from https://github.com/changesets/changesets/tree/main/packages/changelog-github
 * and updated with a custom output format
 */

import { ChangelogFunctions } from '@changesets/types';
import { config } from 'dotenv';
import { getInfo } from '@changesets/get-github-info';

config();

// Cache GitHub info lookups by commit hash to avoid duplicate API calls
const commitInfoCache = new Map<
  string,
  Promise<{ links: { commit: string | null; pull: string | null; user: string | null } }>
>();

// Cache co-authors by commit hash
const coAuthorsCache = new Map<string, Promise<string[]>>();

// Abort a single GitHub request if it stalls, and retry a few times on
// timeouts or secondary rate limits. The batched GraphQL query resolves up to
// COAUTHOR_BATCH_SIZE commits at once, which can be slow on GitHub's side, so
// the timeout is generous and configurable.
const REQUEST_TIMEOUT_MS = Number(process.env.CHANGELOG_REQUEST_TIMEOUT_MS) || 30_000;
const MAX_RETRIES = 3;

const GITHUB_GRAPHQL_URL = process.env.GITHUB_GRAPHQL_URL || 'https://api.github.com/graphql';

// Max commits to request per batched GraphQL call. Smaller batches keep each
// query cheap and fast so it is far less likely to time out.
const COAUTHOR_BATCH_SIZE = Number(process.env.CHANGELOG_COAUTHOR_BATCH_SIZE) || 25;

// Progress tracking
let processedCount = 0;
let cacheHits = 0;

async function getGitHubInfo(repo: string, commit: string) {
  if (commitInfoCache.has(commit)) {
    cacheHits++;
    processedCount++;
    process.stderr.write(`\r🔗 Changelog: ${processedCount} processed (${cacheHits} cached)`);
    return commitInfoCache.get(commit)!;
  }

  // No rate limiting here: getInfo batches all calls in the same tick into a
  // single GraphQL request via DataLoader.
  const promise = getInfo({ repo, commit }).catch(error => {
    // Evict the failed lookup so a later call retries instead of re-serving the
    // cached rejection. Without this, one failed batch poisons every commit in
    // it permanently.
    commitInfoCache.delete(commit);
    process.stderr.write(
      `\n⚠️ Changelog: failed to fetch GitHub info for commit ${commit} in ${repo}: ${
        error instanceof Error ? error.message : String(error)
      }\n`,
    );
    throw error;
  });
  commitInfoCache.set(commit, promise);
  processedCount++;
  process.stderr.write(`\r🔗 Changelog: ${processedCount} processed (${cacheHits} cached)`);
  return promise;
}

/**
 * Fetch a GitHub endpoint with a request timeout and retry/backoff that
 * honors the `Retry-After` header on secondary rate limit responses.
 */
type GithubFetchInit = {
  method?: string;
  body?: string;
  headers?: Record<string, string>;
};

async function githubFetch(
  url: string,
  token: string,
  init: GithubFetchInit = {},
): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        method: init.method,
        body: init.body,
        headers: {
          'Authorization': `Token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'swisspost-design-system-changelog',
          ...init.headers,
        },
        signal: controller.signal,
      });

      // Honor GitHub secondary rate limit / abuse detection responses.
      if ((response.status === 403 || response.status === 429) && attempt < MAX_RETRIES) {
        const retryAfter = Number(response.headers.get('retry-after'));
        const waitMs =
          Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 2 ** attempt * 1000;
        process.stderr.write(
          `\n⏳ Changelog: rate limited (${response.status}) for ${url}, retrying in ${Math.round(
            waitMs / 1000,
          )}s\n`,
        );
        await new Promise(resolve => setTimeout(resolve, waitMs));
        continue;
      }

      return response;
    } catch (error) {
      const isTimeout = error instanceof Error && error.name === 'AbortError';
      if (attempt < MAX_RETRIES) {
        const waitMs = 2 ** attempt * 1000;
        process.stderr.write(
          `\n⏳ Changelog: ${
            isTimeout ? `request timed out after ${REQUEST_TIMEOUT_MS / 1000}s` : 'request failed'
          } for ${url}, retrying in ${Math.round(waitMs / 1000)}s\n`,
        );
        await new Promise(resolve => setTimeout(resolve, waitMs));
        continue;
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }
  }
}

/**
 * Batches commit-message lookups into a single GraphQL request, mirroring the
 * batching `@changesets/get-github-info` uses for PR/user info. All lookups
 * requested within the same tick are coalesced, so co-author resolution for an
 * entire release costs only a couple of GraphQL requests instead of one REST
 * request per commit — which is what was tripping GitHub's secondary rate limit.
 */
type PendingMessage = {
  repo: string;
  commit: string;
  resolve: (message: string | null) => void;
  reject: (error: unknown) => void;
};

let pendingMessages: PendingMessage[] = [];
let flushScheduled = false;

function scheduleMessageFlush() {
  if (flushScheduled) return;
  flushScheduled = true;
  // Flush on the next microtask so every getReleaseLine call made in this tick
  // is collected into a single batch.
  queueMicrotask(() => {
    flushScheduled = false;
    const batch = pendingMessages;
    pendingMessages = [];
    void flushMessageBatch(batch);
  });
}

function buildCommitMessageQuery(repoOrder: string[], reposToCommits: Map<string, Set<string>>) {
  const body = repoOrder
    .map((repo, i) => {
      const [owner, name] = repo.split('/');
      const objects = [...reposToCommits.get(repo)!]
        .map(
          oid =>
            `c_${oid}: object(expression: ${JSON.stringify(oid)}) { ... on Commit { message } }`,
        )
        .join('\n');
      return `r${i}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(
        name,
      )}) {\n${objects}\n}`;
    })
    .join('\n');
  return `query {\n${body}\n}`;
}

async function flushMessageBatch(batch: PendingMessage[]) {
  if (batch.length === 0) return;

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    process.stderr.write(`\n⚠️ Changelog: GITHUB_TOKEN is not set, skipping co-author lookup\n`);
    for (const item of batch) item.resolve(null);
    return;
  }

  // Process in chunks so a single GraphQL request never gets too large. Chunks
  // run sequentially to stay gentle on the API.
  for (let start = 0; start < batch.length; start += COAUTHOR_BATCH_SIZE) {
    const chunk = batch.slice(start, start + COAUTHOR_BATCH_SIZE);

    const reposToCommits = new Map<string, Set<string>>();
    for (const { repo, commit } of chunk) {
      if (!reposToCommits.has(repo)) reposToCommits.set(repo, new Set());
      reposToCommits.get(repo)!.add(commit);
    }
    const repoOrder = [...reposToCommits.keys()];
    const query = buildCommitMessageQuery(repoOrder, reposToCommits);

    try {
      const response = await githubFetch(GITHUB_GRAPHQL_URL, token, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        process.stderr.write(
          `\n⚠️ Changelog: GitHub GraphQL returned ${response.status} ${response.statusText} for a commit-message batch\n`,
        );
        for (const item of chunk) item.resolve(null);
        continue;
      }

      const json = (await response.json()) as {
        data?: Record<string, Record<string, { message?: string } | null> | null>;
      };
      const data = json.data ?? {};

      for (const item of chunk) {
        const repoIndex = repoOrder.indexOf(item.repo);
        const message = data[`r${repoIndex}`]?.[`c_${item.commit}`]?.message ?? null;
        item.resolve(message);
      }
    } catch (error) {
      process.stderr.write(
        `\n⚠️ Changelog: commit-message batch request failed: ${
          error instanceof Error ? error.message : String(error)
        }\n`,
      );
      for (const item of chunk) item.reject(error);
    }
  }
}

function loadCommitMessage(repo: string, commit: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    pendingMessages.push({ repo, commit, resolve, reject });
    scheduleMessageFlush();
  });
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

  const serverUrl = process.env.GITHUB_SERVER_URL || 'https://github.com';

  const promise = (async () => {
    let message: string | null;
    try {
      message = await loadCommitMessage(repo, commit);
    } catch (error) {
      process.stderr.write(
        `\n⚠️ Changelog: failed to fetch co-authors for commit ${commit} in ${repo}: ${
          error instanceof Error ? error.message : String(error)
        }\n`,
      );
      // Allow a later call to retry instead of caching the failure.
      coAuthorsCache.delete(commit);
      return [];
    }

    if (!message) return [];

    const users = new Set<string>();

    // Parse Co-authored-by trailers from the squash merge commit
    const coAuthorMatches = message.matchAll(/^Co-authored-by:\s+.+<([^>]+)>/gm);
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
  })();

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
        try {
          const { links } = await getGitHubInfo(options.repo, commitToFetchFrom);
          return links;
        } catch (error) {
          process.stderr.write(
            `\n⚠️ Changelog: could not resolve GitHub links for changeset "${firstLine}" (commit ${commitToFetchFrom}): ${
              error instanceof Error ? error.message : String(error)
            }\n`,
          );
        }
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
