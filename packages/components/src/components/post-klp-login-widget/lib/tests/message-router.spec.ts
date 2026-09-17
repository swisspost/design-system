import { createMessageRouter } from '../message-router';
import type { KlpMessage, KlpRouterActions } from '../klp-session.model';

/** Records every action the router takes, in order, so the dispatch table can be read back. */
function createActions() {
  const calls: unknown[][] = [];
  const record =
    (name: string) =>
    (...args: unknown[]) =>
      calls.push([name, ...args]);

  return {
    calls,
    names: () => calls.map(([name]) => name),
    actions: {
      audit: record('audit'),
      setRetrySubscribeOnFail: record('setRetrySubscribeOnFail'),
      setAddress: record('setAddress'),
      login: record('login'),
      logout: record('logout'),
      subscribe: record('subscribe'),
      openCommunication: record('openCommunication'),
      removeNotificationsFromCache: record('removeNotificationsFromCache'),
      showDocument: record('showDocument'),
      removeDocument: record('removeDocument'),
    } as unknown as KlpRouterActions,
  };
}

function route(message: unknown) {
  const recorder = createActions();
  createMessageRouter({ actions: recorder.actions })(message as KlpMessage);
  return recorder;
}

describe('every message', () => {
  it('is audited before anything else happens', () => {
    expect(route({ typ: 'bye' }).names()[0]).toBe('audit');
  });

  // Was a v9 defect: the address was assigned after the audit, so the one audit event that could
  // have bound the subscription went out without an adr.
  it('takes a new address from a sub before auditing it', () => {
    const names = route({ typ: 'sub', adr: 'new-address' }).names();

    expect(names.indexOf('setAddress')).toBeLessThan(names.indexOf('audit'));
  });

  it('clears the retry flag, so an unrelated event cannot trigger a resubscribe', () => {
    expect(route({ typ: 'bye' }).calls[1]).toEqual(['setRetrySubscribeOnFail', false]);
  });
});

describe('ukn', () => {
  it('logs out and stays out when the platform does not ask for a subscription', () => {
    expect(route({ typ: 'ukn' }).names()).toEqual(['audit', 'setRetrySubscribeOnFail', 'logout']);
  });

  it('arms the retry flag before logging out and subscribing again', () => {
    const { calls, names } = route({ typ: 'ukn', sub: true });

    expect(names()).toEqual([
      'audit',
      'setRetrySubscribeOnFail',
      'setRetrySubscribeOnFail',
      'logout',
      'subscribe',
    ]);
    expect(calls[2]).toEqual(['setRetrySubscribeOnFail', true]);
  });
});

describe('sub', () => {
  it('takes the address, restores the session without notifying, then opens the socket', () => {
    const { calls, names } = route({
      typ: 'sub',
      adr: 'address-1',
      data: { name: 'Ada' },
      ttl: 900,
    });

    expect(names()).toEqual([
      'setAddress',
      'audit',
      'setRetrySubscribeOnFail',
      'login',
      'openCommunication',
    ]);
    expect(calls[0]).toEqual(['setAddress', 'address-1']);
    // false: a restored session is not a fresh login, so consumers are not told about it.
    expect(calls[3]).toEqual(['login', { name: 'Ada' }, 900, false]);
  });
});

describe('hi', () => {
  it('notifies consumers of the login and drops the stale notification count', () => {
    const { calls, names } = route({ typ: 'hi', data: { name: 'Ada' }, ttl: 900 });

    expect(names()).toEqual([
      'audit',
      'setRetrySubscribeOnFail',
      'login',
      'removeNotificationsFromCache',
    ]);
    expect(calls[2]).toEqual(['login', { name: 'Ada' }, 900, true]);
  });
});

describe('bye', () => {
  it('logs out', () => {
    expect(route({ typ: 'bye' }).names()).toEqual(['audit', 'setRetrySubscribeOnFail', 'logout']);
  });
});

describe('doc and rem', () => {
  it('hands the document and its type on', () => {
    const { calls } = route({ typ: 'doc', doc: { unreadNotifications: 3 }, doctyp: 'UNREAD' });

    expect(calls[2]).toEqual(['showDocument', { unreadNotifications: 3 }, 'UNREAD']);
  });

  it('withdraws a document by type', () => {
    expect(route({ typ: 'rem', doctyp: 'UNREAD' }).calls[2]).toEqual(['removeDocument', 'UNREAD']);
  });
});

describe('an unknown type', () => {
  it('is logged and treated as the end of the session', () => {
    const logged: string[] = [];
    const recorder = createActions();

    createMessageRouter({ log: m => logged.push(m), actions: recorder.actions })({
      typ: 'nope',
    } as unknown as KlpMessage);

    expect(recorder.names()).toEqual(['audit', 'setRetrySubscribeOnFail', 'logout']);
    expect(logged.some(m => m.includes('Unknown event received: nope'))).toBe(true);
  });
});
