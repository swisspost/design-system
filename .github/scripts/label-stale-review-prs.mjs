export const DISCUSSION_LABEL = 'needs: ☕️ discussion in daily';
const FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
const MAX_CONCURRENT_PULL_REQUESTS = 5;

/**
 * Parses a review date into epoch milliseconds, rejecting invalid dates.
 * @param {string} value
 * @returns {number}
 */
function timestamp(value) {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) throw new Error(`Invalid review timestamp: ${value}`);
  return parsed;
}

/**
 * Builds an identity key that distinguishes users from teams.
 * @param {object | null | undefined} reviewer GitHub user or team
 * @param {'user' | 'team'} type
 * @returns {string}
 */
function reviewerKey(reviewer, type) {
  if (!reviewer?.id) throw new Error(`Missing ${type} reviewer identity`);
  return `${type}:${reviewer.id}`;
}

/**
 * Tests whether a review was submitted by a human rather than a bot.
 * @param {object} review GitHub pull request review
 * @returns {boolean}
 */
function submittedHumanReview(review) {
  return (
    review.state !== 'PENDING' &&
    Boolean(review.submitted_at) &&
    review.user?.type !== 'Bot' &&
    !review.user?.login?.endsWith('[bot]')
  );
}

/**
 * Returns the latest human review time, or the earliest active request time.
 * @param {object} pullRequest GitHub pull request
 * @param {object[]} reviews Submitted and pending reviews
 * @param {object[]} timeline Chronological GitHub timeline events
 * @returns {number} Epoch milliseconds
 */
export function reviewBaseline(pullRequest, reviews, timeline) {
  const submittedHumanReviews = reviews.filter(submittedHumanReview);
  if (submittedHumanReviews.length) {
    return Math.max(...submittedHumanReviews.map(review => timestamp(review.submitted_at)));
  }

  // Replay request history so removed and re-requested reviewers use their new dates.
  const activeRequests = new Map();
  for (const event of timeline) {
    if (event.event !== 'review_requested' && event.event !== 'review_request_removed') continue;
    const key = event.requested_team
      ? reviewerKey(event.requested_team, 'team')
      : reviewerKey(event.requested_reviewer, 'user');
    if (event.event === 'review_requested') {
      activeRequests.set(key, timestamp(event.created_at));
    } else {
      activeRequests.delete(key);
    }
  }

  const currentRequests = [
    ...pullRequest.requested_reviewers.map(reviewer => reviewerKey(reviewer, 'user')),
    ...pullRequest.requested_teams.map(team => reviewerKey(team, 'team')),
  ];
  if (!currentRequests.length)
    throw new Error('Cannot determine baseline without pending requests');
  return Math.min(
    ...currentRequests.map(key => {
      if (!activeRequests.has(key)) {
        throw new Error(`Cannot establish the current review request timestamp for ${key}`);
      }
      return activeRequests.get(key);
    }),
  );
}

/**
 * Checks for an open, non-draft PR with a pending user or team review request.
 * @param {object} pullRequest GitHub pull request
 * @returns {boolean}
 */
function awaitingReview(pullRequest) {
  return (
    pullRequest.state === 'open' &&
    !pullRequest.draft &&
    (pullRequest.requested_reviewers.length > 0 || pullRequest.requested_teams.length > 0)
  );
}

/**
 * Checks eligibility and whether the review baseline is more than 14 days old.
 * @param {object} pullRequest GitHub pull request
 * @param {object[]} reviews Submitted and pending reviews
 * @param {object[]} timeline Chronological GitHub timeline events
 * @param {number} now Current time in epoch milliseconds
 * @returns {boolean}
 */
export function isReviewOverdue(pullRequest, reviews, timeline, now) {
  return (
    awaitingReview(pullRequest) &&
    now - reviewBaseline(pullRequest, reviews, timeline) > FOURTEEN_DAYS
  );
}

/**
 * Adds overdue PRs to the production project and labels them for daily discussion.
 * @param {object} options
 * @param {object} options.github GitHub client supplied by actions/github-script
 * @param {object} options.core Actions logging utilities
 * @param {object} options.context Actions workflow context
 * @param {number} [options.now] Current time in epoch milliseconds
 * @returns {Promise<void>}
 */
export async function flagOverdueReviews({ github, core, context, now = Date.now() }) {
  if (!Number.isFinite(now)) throw new Error('Invalid current time');
  const repo = context.repo;
  const { organization } = await github.graphql(
    `query($owner: String!, $number: Int!) {
      organization(login: $owner) {
        projectV2(number: $number) { id closed }
      }
    }`,
    { owner: 'swisspost', number: 3 },
  );
  const project = organization?.projectV2;
  if (!project?.id || project.closed) {
    throw new Error(
      'Design System Production project #3 is unavailable or closed. Check token access',
    );
  }
  await github.rest.issues.getLabel({ ...repo, name: DISCUSSION_LABEL });

  /**
   * Checks whether the review baseline is strictly more than 14 days old.
   * @param {object} pullRequest GitHub pull request
   * @returns {Promise<boolean>}
   */
  async function overdue(pullRequest) {
    if (!awaitingReview(pullRequest)) return false;
    const params = { ...repo, pull_number: pullRequest.number, per_page: 100 };
    const reviews = await github.paginate(github.rest.pulls.listReviews, params);
    const hasHumanReview = reviews.some(submittedHumanReview);
    const timeline = hasHumanReview
      ? []
      : await github.paginate(github.rest.issues.listEventsForTimeline, {
          ...repo,
          issue_number: pullRequest.number,
          per_page: 100,
        });
    return isReviewOverdue(pullRequest, reviews, timeline, now);
  }

  const pullRequests = await github.paginate(github.rest.pulls.list, {
    ...repo,
    state: 'open',
    per_page: 100,
  });
  async function processPullRequest(candidate) {
    if (!(await overdue(candidate))) return;
    // Refresh eligibility before writes in case reviews or requests changed during the scan.
    const { data: current } = await github.rest.pulls.get({
      ...repo,
      pull_number: candidate.number,
    });
    if (!(await overdue(current))) return;

    core.info(`Flagging #${current.number}: review baseline is more than 14 days old`);
    // This mutation returns the existing item if the PR is already in the project.
    const result = await github.graphql(
      `mutation($projectId: ID!, $contentId: ID!) {
        addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
          item { id }
        }
      }`,
      { projectId: project.id, contentId: current.node_id },
    );
    if (!result.addProjectV2ItemById?.item?.id) {
      throw new Error(`Project membership was not confirmed for #${current.number}`);
    }
    core.info(`Ensured project #3 membership for #${current.number}`);
    if (!current.labels.some(label => label.name === DISCUSSION_LABEL)) {
      await github.rest.issues.addLabels({
        ...repo,
        issue_number: current.number,
        labels: [DISCUSSION_LABEL],
      });
      core.info(`Added ${DISCUSSION_LABEL} to #${current.number}`);
    }
  }

  const batches = [];
  for (let index = 0; index < pullRequests.length; index += MAX_CONCURRENT_PULL_REQUESTS) {
    batches.push(pullRequests.slice(index, index + MAX_CONCURRENT_PULL_REQUESTS));
  }
  await batches.reduce(
    (previousBatch, batch) =>
      previousBatch.then(() => Promise.all(batch.map(processPullRequest))),
    Promise.resolve(),
  );
}
