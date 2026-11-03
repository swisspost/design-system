import assert from 'node:assert/strict';
import test from 'node:test';
import { isReviewOverdue, reviewBaseline } from './label-stale-review-prs.mjs';

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.parse('2026-11-02T12:00:00Z');
const ago = days => new Date(NOW - days * DAY).toISOString();
const human = { id: 1, login: 'reviewer', type: 'User' };
const team = { id: 2, slug: 'design-system' };
const review = (days, overrides = {}) => ({
  submitted_at: ago(days),
  state: 'COMMENTED',
  user: human,
  ...overrides,
});
const request = (days, overrides = {}) => ({
  event: 'review_requested',
  created_at: ago(days),
  requested_reviewer: human,
  ...overrides,
});
const pr = (overrides = {}) => ({
  state: 'open',
  draft: false,
  requested_reviewers: [human],
  requested_teams: [],
  ...overrides,
});

for (const [age, expected] of [
  [15, true],
  [14 + 1 / DAY, true],
  [14, false],
  [13, false],
]) {
  test(`review age ${age} days: overdue=${expected}`, () => {
    assert.equal(isReviewOverdue(pr(), [review(age)], [], NOW), expected);
  });
}

test('latest human review wins regardless of state or ordering', () => {
  for (const state of ['COMMENTED', 'APPROVED', 'CHANGES_REQUESTED', 'DISMISSED']) {
    assert.equal(reviewBaseline(pr(), [review(1, { state }), review(30)], []), Date.parse(ago(1)));
  }
});

test('bot and unsubmitted reviews do not reset the baseline', () => {
  const reviews = [
    review(30),
    review(1, { user: { type: 'Bot', login: 'automation' } }),
    review(1, { user: { type: 'User', login: 'automation[bot]' } }),
    review(0, { state: 'PENDING' }),
    review(0, { submitted_at: null }),
  ];
  assert.equal(reviewBaseline(pr(), reviews, []), Date.parse(ago(30)));
});

test('without human reviews, uses the earliest currently pending request', () => {
  const pullRequest = pr({ requested_teams: [team], created_at: ago(100), updated_at: ago(0) });
  const timeline = [
    request(20, { requested_reviewer: { id: 99 } }),
    request(15),
    request(1, { requested_team: team }),
  ];
  assert.equal(
    reviewBaseline(pullRequest, [review(0, { user: { type: 'Bot' } })], timeline),
    Date.parse(ago(15)),
  );
});

for (const teamRequest of [false, true]) {
  test(`removed and re-requested ${teamRequest ? 'team' : 'user'} uses the new date`, () => {
    const identity = teamRequest ? { requested_team: team } : {};
    const pullRequest = pr(teamRequest ? { requested_reviewers: [], requested_teams: [team] } : {});
    const timeline = [
      request(30, identity),
      request(20, { ...identity, event: 'review_request_removed' }),
      request(1, identity),
    ];
    assert.equal(reviewBaseline(pullRequest, [], timeline), Date.parse(ago(1)));
  });
}

test('user and team IDs cannot collide', () => {
  assert.equal(
    reviewBaseline(
      pr({ requested_teams: [{ id: human.id }] }),
      [],
      [request(20), request(1, { requested_team: { id: human.id } })],
    ),
    Date.parse(ago(20)),
  );
});

for (const overrides of [
  { draft: true },
  { state: 'closed' },
  { requested_reviewers: [], requested_teams: [] },
]) {
  test(`ineligible PR is not overdue: ${JSON.stringify(overrides)}`, () => {
    assert.equal(isReviewOverdue(pr(overrides), [review(30)], [], NOW), false);
  });
}

test('a pending team request alone can qualify', () => {
  assert.equal(
    isReviewOverdue(
      pr({ requested_reviewers: [], requested_teams: [team] }),
      [review(30)],
      [],
      NOW,
    ),
    true,
  );
});

test('unrelated recent PR activity does not reset the clock', () => {
  assert.equal(isReviewOverdue(pr({ updated_at: ago(0) }), [review(30)], [], NOW), true);
});

test('missing active request timestamps fail rather than using PR dates', () => {
  assert.throws(
    () => reviewBaseline(pr({ created_at: ago(100), updated_at: ago(0) }), [], []),
    /Cannot establish/,
  );
});

test('removed requests cannot supply a fallback timestamp', () => {
  assert.throws(
    () => reviewBaseline(pr(), [], [request(30), request(20, { event: 'review_request_removed' })]),
    /Cannot establish/,
  );
});

test('rejects invalid timestamps and identities', () => {
  assert.throws(
    () => reviewBaseline(pr(), [review(20, { submitted_at: 'invalid' })], []),
    /Invalid/,
  );
  assert.throws(
    () => reviewBaseline(pr(), [], [request(20, { created_at: 'invalid' })]),
    /Invalid/,
  );
  assert.throws(
    () => reviewBaseline(pr(), [], [request(20, { requested_reviewer: null })]),
    /identity/,
  );
  assert.throws(
    () => reviewBaseline(pr({ requested_reviewers: [] }), [], []),
    /without pending requests/,
  );
});
