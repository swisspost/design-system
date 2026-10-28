export type KlpInitialState = 'anonymous' | 'authenticated';

// The users the KLP platform mock (`klp-platform-mock.js`) can sign in; it treats any other
// `session` as anonymous.
const KLP_MOCK_USERS = new Set(['ada', 'grace', 'alan']);

/**
 * What the KLP platform mock will answer, known from the URL alone, so the login widget can start
 * in that state. Without `?klpmock` the real platform answers, which never signs anyone in on this app.
 */
export function getKlpInitialState(searchParams: URLSearchParams): KlpInitialState {
  // Matches the mock in ignoring case, which address bars may change.
  const findParam = (name: string) => [...searchParams].find(([key]) => key.toLowerCase() === name);

  if (!findParam('klpmock')) return 'anonymous';

  const user = (findParam('session')?.[1] ?? 'ada').toLowerCase();
  return KLP_MOCK_USERS.has(user) ? 'authenticated' : 'anonymous';
}
