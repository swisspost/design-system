import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';

import { createStorage } from '../../src/legacy/storage.js';

let store;

beforeEach(() => {
  store = new Map();
  globalThis.sessionStorage = {
    setItem: (key, value) => store.set(key, value),
    getItem: key => store.get(key) ?? null,
    removeItem: key => store.delete(key),
  };
  globalThis.window = { sessionStorage: globalThis.sessionStorage };
});

afterEach(() => {
  delete globalThis.sessionStorage;
  delete globalThis.window;
});

/** A browser that denies storage: `'sessionStorage' in window` is what v9 probes. */
function denyStorage() {
  globalThis.window = {};
}

describe('persistState', () => {
  it('reports that it wrote, so the caller knows the cookie is worth setting', () => {
    assert.equal(createStorage().persistState(900), true);
  });

  it('persists the real ttl and nothing else', () => {
    const before = new Date().getTime();

    createStorage().persistState(900);

    const state = JSON.parse(store.get('klp.widget.state'));
    assert.ok(state.ttl >= before + 900);
    // The session and the address are decoys: nothing a page script reads here is usable.
    assert.ok(!JSON.stringify(state).includes('address-'));
    assert.equal(state.sessionData, state.address);
    assert.match(state.sessionData, /Design System Team/);
  });

  it('reports that it did not write when the browser denies storage', () => {
    const logged = [];
    denyStorage();

    assert.equal(createStorage({ log: m => logged.push(m) }).persistState(900), false);
    assert.equal(store.size, 0);
    assert.ok(logged.some(m => m.includes('HTML storage not supported')));
  });
});

describe('removePersistedState', () => {
  it('removes the entry and reports it', () => {
    const storage = createStorage();
    storage.persistState(900);

    assert.equal(storage.removePersistedState(), true);
    assert.equal(store.has('klp.widget.state'), false);
  });

  it('reports that it did not, when the browser denies storage', () => {
    denyStorage();

    assert.equal(createStorage().removePersistedState(), false);
  });
});

describe('the document cache', () => {
  it('keys each document by its type', () => {
    createStorage().saveDocumentOnCache({ unreadNotifications: 3 }, 'UNREAD_NOTIFICATIONS');

    assert.deepEqual(JSON.parse(store.get('klp.widget.document.UNREAD_NOTIFICATIONS')), {
      unreadNotifications: 3,
    });
  });

  it('drops a document by type', () => {
    const storage = createStorage();
    storage.saveDocumentOnCache({ unreadNotifications: 3 }, 'UNREAD_NOTIFICATIONS');

    storage.removeDocumentFromCache('UNREAD_NOTIFICATIONS');

    assert.equal(store.size, 0);
  });

  it('is skipped entirely when the browser denies storage', () => {
    denyStorage();
    const storage = createStorage();

    storage.saveDocumentOnCache({ unreadNotifications: 3 }, 'UNREAD_NOTIFICATIONS');
    storage.removeDocumentFromCache('UNREAD_NOTIFICATIONS');

    assert.equal(store.size, 0);
  });
});
