/**
 * "Forked" from https://github.com/changesets/changesets/tree/main/packages/changelog-github
 * and updated with a custom output format
 */

import { ChangelogFunctions } from '@changesets/types';
import { config } from 'dotenv';

config();

// ---------------------------------------------------------------------------
// Configuration (override via environment variables)
// ---------------------------------------------------------------------------

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_GRAPHQL_URL = process.env.GITHUB_GRAPHQL_URL || 'https://api.github.com/graphql';
const GITHUB_SERVER_URL = process.env.GITHUB_SERVER_URL || 'https://github.com';

// Abort a single GitHub request if it stalls, then retry on timeouts or
// secondary rate limits.
const REQUEST_TIMEOUT_MS = Number(process.env.CHANGELOG_REQUEST_TIMEOUT_MS) || 30_000;
const MAX_RETRIES = Number(process.env.CHANGELOG_MAX_RETRIES) || 1;

// Max commits to request per batched GraphQL call. Smaller batches keep each
// query cheap and fast so it is far less likely to time out.
const COMMIT_BATCH_SIZE = Number(process.env.CHANGELOG_COMMIT_BATCH_SIZE) || 25;

// Minimum delay between the start of any two GitHub requests, to avoid bursts
// that trigger GitHub's secondary rate limiting.
const MIN_REQUEST_INTERVAL_MS = Number(process.env.CHANGELOG_MIN_REQUEST_INTERVAL_MS) || 100;

// ---------------------------------------------------------------------------

// Resolved information for a single commit: PR/user links and co-authors, all
// derived from one batched GraphQL lookup.
type CommitLinks = { commit: string | null; pull: string | null; user: string | null };
type CommitInfo = {
  links: CommitLinks;
  /** GitHub login of the main author (PR author, falling back to commit author). */
  user: string | null;
  /** Formatted co-author links, excluding the main author and bots. */
  coAuthors: string[];
};

const EMPTY_COMMIT_INFO: CommitInfo = {
  links: { commit: null, pull: null, user: null },
  user: null,
  coAuthors: [],
};

// Cache commit info by commit hash to avoid duplicate API calls
const commitInfoCache = new Map<string, Promise<CommitInfo>>();

let throttleChain: Promise<void> = Promise.resolve();
let lastRequestStartedAt = 0;

/**
 * Resolves once it is this caller's turn to start a request, guaranteeing at
 * least MIN_REQUEST_INTERVAL_MS between the start of any two requests. Calls are
 * serialized through a single promise chain so concurrent callers queue in
 * order.
 */
function throttleRequest(): Promise<void> {
  throttleChain = throttleChain.then(async () => {
    const wait = lastRequestStartedAt + MIN_REQUEST_INTERVAL_MS - Date.now();
    if (wait > 0) {
      await new Promise(resolve => setTimeout(resolve, wait));
    }
    lastRequestStartedAt = Date.now();
  });
  return throttleChain;
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
      // Space out requests so we never send more than one per
      // MIN_REQUEST_INTERVAL_MS to GitHub.
      await throttleRequest();
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
 * Resolved commit data — PR/user links and co-authors — fetched in a single
 * batched GraphQL request. Both the PR/author info and the commit message (used
 * to derive co-authors) live on the same `object(expression:)` Commit node, so
 * one request per batch covers everything.
 *
 * This replaces `@changesets/get-github-info`'s `getInfo`, reproducing its
 * link-derivation logic so we can additionally request the commit `message`.
 */
type CommitGraphqlNode = {
  commitUrl: string;
  message: string;
  author: { user: { login: string; url: string } | null } | null;
  associatedPullRequests: {
    nodes: Array<{
      number: number;
      url: string;
      mergedAt: string | null;
      author: { login: string; url: string } | null;
    }>;
  } | null;
} | null;

type PendingCommit = {
  repo: string;
  commit: string;
  resolve: (info: CommitInfo) => void;
  reject: (error: unknown) => void;
};

let pendingCommits: PendingCommit[] = [];
let flushScheduled = false;

function scheduleCommitFlush() {
  if (flushScheduled) return;
  flushScheduled = true;
  // Flush on the next microtask so every getReleaseLine call made in this tick
  // is collected into a single batch.
  queueMicrotask(() => {
    flushScheduled = false;
    const batch = pendingCommits;
    pendingCommits = [];
    void flushCommitBatch(batch);
  });
}

function buildCommitInfoQuery(repoOrder: string[], reposToCommits: Map<string, Set<string>>) {
  const selection = `... on Commit {
    commitUrl
    message
    author { user { login url } }
    associatedPullRequests(first: 50) {
      nodes { number url mergedAt author { login url } }
    }
  }`;
  const body = repoOrder
    .map((repo, i) => {
      const [owner, name] = repo.split('/');
      const objects = [...reposToCommits.get(repo)!]
        .map(oid => `c_${oid}: object(expression: ${JSON.stringify(oid)}) { ${selection} }`)
        .join('\n');
      return `r${i}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(
        name,
      )}) {\n${objects}\n}`;
    })
    .join('\n');
  return `query {\n${body}\n}`;
}

/** Parse Co-authored-by trailers from a squash merge commit message. */
function parseCoAuthors(message: string, mainUserLogin: string | null): string[] {
  const users = new Set<string>();

  const coAuthorMatches = message.matchAll(/^Co-authored-by:\s+.+<([^>]+)>/gm);
  for (const match of coAuthorMatches) {
    // GitHub noreply emails contain the username
    const noreplyMatch = match[1].match(/^(\d+\+)?([^@]+)@users\.noreply\.github\.com$/);
    if (noreplyMatch) {
      users.add(noreplyMatch[2]);
    }
  }

  // Remove the main PR author and bots
  if (mainUserLogin) users.delete(mainUserLogin);
  for (const user of users) {
    if (user.endsWith('[bot]') || user === 'web-flow') {
      users.delete(user);
    }
  }

  return [...users].map(login => `[@${login}](${GITHUB_SERVER_URL}/${login})`);
}

/** Derive links + co-authors from a commit node, mirroring getInfo's logic. */
function deriveCommitInfo(commit: string, node: CommitGraphqlNode): CommitInfo {
  if (!node) return EMPTY_COMMIT_INFO;

  let user = node.author?.user ?? null;

  // Pick the earliest-merged associated PR (unmerged PRs rank last), matching
  // getInfo's behavior.
  const prNodes = node.associatedPullRequests?.nodes ?? [];
  const mergedRank = (pr: { mergedAt: string | null }) =>
    pr.mergedAt ? new Date(pr.mergedAt).getTime() : Infinity;
  const associatedPullRequest = prNodes.length
    ? prNodes.reduce((best, pr) => (mergedRank(pr) < mergedRank(best) ? pr : best))
    : null;

  // Prefer the PR author over the commit author, matching getInfo's behavior.
  if (associatedPullRequest) {
    user = associatedPullRequest.author;
  }

  return {
    links: {
      commit: `[\`${commit.slice(0, 7)}\`](${node.commitUrl})`,
      pull: associatedPullRequest
        ? `[#${associatedPullRequest.number}](${associatedPullRequest.url})`
        : null,
      user: user ? `[@${user.login}](${user.url})` : null,
    },
    user: user ? user.login : null,
    coAuthors: parseCoAuthors(node.message, user ? user.login : null),
  };
}

async function flushCommitBatch(batch: PendingCommit[]) {
  if (batch.length === 0) return;

  if (!GITHUB_TOKEN) {
    process.stderr.write(`\n⚠️ Changelog: GITHUB_TOKEN is not set, skipping GitHub info lookup\n`);
    for (const item of batch) item.resolve(EMPTY_COMMIT_INFO);
    return;
  }

  // Process in chunks so a single GraphQL request never gets too large. Chunks
  // run sequentially to stay gentle on the API.
  for (let start = 0; start < batch.length; start += COMMIT_BATCH_SIZE) {
    const chunk = batch.slice(start, start + COMMIT_BATCH_SIZE);

    const reposToCommits = new Map<string, Set<string>>();
    for (const { repo, commit } of chunk) {
      if (!reposToCommits.has(repo)) reposToCommits.set(repo, new Set());
      reposToCommits.get(repo)!.add(commit);
    }
    const repoOrder = [...reposToCommits.keys()];
    const query = buildCommitInfoQuery(repoOrder, reposToCommits);

    try {
      const response = await githubFetch(GITHUB_GRAPHQL_URL, GITHUB_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        process.stderr.write(
          `\n⚠️ Changelog: GitHub GraphQL returned ${response.status} ${response.statusText} for a commit-info batch\n`,
        );
        for (const item of chunk) item.resolve(EMPTY_COMMIT_INFO);
        continue;
      }

      const json = (await response.json()) as {
        data?: Record<string, Record<string, CommitGraphqlNode> | null>;
        errors?: unknown;
      };

      if (json.errors) {
        process.stderr.write(
          `\n⚠️ Changelog: GitHub GraphQL returned errors for a commit-info batch: ${JSON.stringify(
            json.errors,
          )}\n`,
        );
      }

      const data = json.data ?? {};
      for (const item of chunk) {
        const repoIndex = repoOrder.indexOf(item.repo);
        const node = data[`r${repoIndex}`]?.[`c_${item.commit}`] ?? null;
        item.resolve(deriveCommitInfo(item.commit, node));
      }
    } catch (error) {
      process.stderr.write(
        `\n⚠️ Changelog: commit-info batch request failed: ${
          error instanceof Error ? error.message : String(error)
        }\n`,
      );
      for (const item of chunk) item.reject(error);
    }
  }
}

/**
 * Look up PR/user links and co-authors for a commit. Lookups are batched into a
 * single GraphQL request per tick and cached by commit hash.
 */
function loadCommitInfo(repo: string, commit: string): Promise<CommitInfo> {
  const cached = commitInfoCache.get(commit);
  if (cached) return cached;

  const promise = new Promise<CommitInfo>((resolve, reject) => {
    pendingCommits.push({ repo, commit, resolve, reject });
    scheduleCommitFlush();
  });

  // Evict on failure so a later call retries instead of serving a cached
  // rejection (otherwise one failed batch poisons every commit in it).
  promise.catch(() => commitInfoCache.delete(commit));

  commitInfoCache.set(commit, promise);
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

    const info = await (async () => {
      const commitToFetchFrom = changeset.commit;
      if (commitToFetchFrom) {
        try {
          return await loadCommitInfo(options.repo, commitToFetchFrom);
        } catch (error) {
          process.stderr.write(
            `\n⚠️ Changelog: could not resolve GitHub info for changeset "${firstLine}" (commit ${commitToFetchFrom}): ${
              error instanceof Error ? error.message : String(error)
            }\n`,
          );
        }
      }
      return EMPTY_COMMIT_INFO;
    })();

    const { links, coAuthors } = info;
    const users = links.user;

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
