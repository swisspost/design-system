import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createMessageRouter } from '../../src/legacy/message-router.js';

/** Records every action the router takes, in order, so the dispatch table can be read back. */
function createActions() {
  const calls = [];
  const record =
    name =>
    (...args) =>
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
    },
  };
}

function route(message) {
  const recorder = createActions();
  createMessageRouter({ actions: recorder.actions })(message);
  return recorder;
}

describe('every message', () => {
  it('is audited before anything else happens', () => {
    const { names } = route({ typ: 'bye' });

    assert.equal(names()[0], 'audit');
  });

  // Was a v9 defect: the address was assigned after the audit, so the one audit event that could
  // have bound the subscription went out without an adr.
  it('takes a new address from a sub before auditing it', () => {
    const { names } = route({ typ: 'sub', adr: 'new-address' });

    assert.ok(names().indexOf('setAddress') < names().indexOf('audit'));
  });

  it('clears the retry flag, so an unrelated event cannot trigger a resubscribe', () => {
    const { calls } = route({ typ: 'bye' });

    assert.deepEqual(calls[1], ['setRetrySubscribeOnFail', false]);
  });
});

describe('ukn', () => {
  it('logs out and stays out when the platform does not ask for a subscription', () => {
    const { names } = route({ typ: 'ukn' });

    assert.deepEqual(names(), ['audit', 'setRetrySubscribeOnFail', 'logout']);
  });

  it('arms the retry flag before logging out and subscribing again', () => {
    const { calls, names } = route({ typ: 'ukn', sub: true });

    assert.deepEqual(names(), [
      'audit',
      'setRetrySubscribeOnFail',
      'setRetrySubscribeOnFail',
      'logout',
      'subscribe',
    ]);
    assert.deepEqual(calls[2], ['setRetrySubscribeOnFail', true]);
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

    assert.deepEqual(names(), [
      'setAddress',
      'audit',
      'setRetrySubscribeOnFail',
      'login',
      'openCommunication',
    ]);
    assert.deepEqual(calls[0], ['setAddress', 'address-1']);
    // false: a restored session is not a fresh login, so consumers are not told about it.
    assert.deepEqual(calls[3], ['login', { name: 'Ada' }, 900, false]);
  });
});

describe('hi', () => {
  it('notifies consumers of the login and drops the stale notification count', () => {
    const { calls, names } = route({ typ: 'hi', data: { name: 'Ada' }, ttl: 900 });

    assert.deepEqual(names(), [
      'audit',
      'setRetrySubscribeOnFail',
      'login',
      'removeNotificationsFromCache',
    ]);
    assert.deepEqual(calls[2], ['login', { name: 'Ada' }, 900, true]);
  });
});

describe('bye', () => {
  it('logs out', () => {
    assert.deepEqual(route({ typ: 'bye' }).names(), ['audit', 'setRetrySubscribeOnFail', 'logout']);
  });
});

describe('doc and rem', () => {
  it('hands the document and its type on', () => {
    const { calls } = route({ typ: 'doc', doc: { unreadNotifications: 3 }, doctyp: 'UNREAD' });

    assert.deepEqual(calls[2], ['showDocument', { unreadNotifications: 3 }, 'UNREAD']);
  });

  it('withdraws a document by type', () => {
    const { calls } = route({ typ: 'rem', doctyp: 'UNREAD' });

    assert.deepEqual(calls[2], ['removeDocument', 'UNREAD']);
  });
});

describe('an unknown type', () => {
  it('is logged and treated as the end of the session', () => {
    const logged = [];
    const recorder = createActions();

    createMessageRouter({ log: m => logged.push(m), actions: recorder.actions })({ typ: 'nope' });

    assert.deepEqual(recorder.names(), ['audit', 'setRetrySubscribeOnFail', 'logout']);
    assert.ok(logged.some(m => m.includes('Unknown event received: nope')));
  });
});
