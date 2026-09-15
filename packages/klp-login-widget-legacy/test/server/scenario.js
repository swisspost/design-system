/**
 * Mutable scenario state for the fake KLP Widget API.
 * Playwright drives this through the /__control/* endpoints so every test starts from a known state.
 */

export const B2C_SESSION = {
  name: 'Andrea',
  surname: 'Chiodoni',
  email: 'andrea.chiodoni@post.ch',
  userType: 'B2C',
  authLevel: 'PASSWORD',
  support: false,
  changeUserAndProfile: 'userAndProfile',
};

export const B2B_SESSION = {
  name: 'Andrea',
  surname: 'Chiodoni',
  company: 'Post AG',
  userType: 'B2B',
  authLevel: 'PASSWORD',
  canChangeCompany: true,
  support: false,
  changeUserAndProfile: 'userAndProfile',
};

const DEFAULTS = {
  // 'ok' | 'ukn' | 'ukn-sub' | 'forbidden' | 'error' | 'hang'
  subscribeMode: 'ukn',
  session: null,
  // Stable per session, exactly as the API docs describe.
  address: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  ttl: 600000,
  // When null, no `adt` is sent and the widget must not call /v1/audit.
  adt: null,
  allowedOrigins: ['https://int.post.ch'],
};

let state = { ...DEFAULTS };

/** Everything the server observed, so tests can assert on real traffic. */
let journal = {
  subscribe: [],
  keepalive: [],
  audit: [],
  eventbus: [],
};

export const getState = () => state;

export const patchState = patch => {
  state = { ...state, ...patch };
  return state;
};

export const reset = () => {
  state = { ...DEFAULTS };
  journal = { subscribe: [], keepalive: [], audit: [], eventbus: [] };
};

export const getJournal = () => journal;

export const record = (channel, entry) => {
  journal[channel].push({ ...entry, at: Date.now() });
};

/** Builds the exact `/v1/session/subscribe` body for the current scenario. */
export const buildSubscribeBody = () => {
  const { subscribeMode, session, address, ttl, adt } = state;

  if (subscribeMode === 'ukn') return { typ: 'ukn' };
  if (subscribeMode === 'ukn-sub') return { typ: 'ukn', sub: true };

  const body = { typ: 'sub', adr: address, ttl, data: session ?? B2C_SESSION };
  if (adt !== null) body.adt = adt;
  return body;
};
