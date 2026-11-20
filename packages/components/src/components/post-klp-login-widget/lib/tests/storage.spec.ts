import { createStorage } from '../storage';

let store: Map<string, string>;
let storage: Storage;

beforeEach(() => {
  store = new Map();
  storage = {
    setItem: (key: string, value: string) => store.set(key, value),
    getItem: (key: string) => store.get(key) ?? null,
    removeItem: (key: string) => store.delete(key),
  } as unknown as Storage;
});

const available = () => createStorage({ getStorage: () => storage });

/** A browser that denies storage: the widget has to keep working without one. */
const denied = (log?: (message: string) => void) => createStorage({ getStorage: () => null, log });

describe('persistState', () => {
  it('reports that it wrote, so the caller knows the cookie is worth setting', () => {
    expect(available().persistState(900)).toBe(true);
  });

  it('persists the real ttl and nothing else', () => {
    const before = Date.now();

    available().persistState(900);

    const state = JSON.parse(store.get('klp.widget.state'));
    expect(state.ttl).toBeGreaterThanOrEqual(before + 900);
    // The session and the address are decoys: nothing a page script reads here is usable.
    expect(JSON.stringify(state)).not.toContain('address-');
    expect(state.sessionData).toBe(state.address);
    expect(state.sessionData).toMatch(/Design System Team/);
  });

  it('reports that it did not write when the browser denies storage', () => {
    const logged: string[] = [];

    expect(denied(m => logged.push(m)).persistState(900)).toBe(false);
    expect(store.size).toBe(0);
    expect(logged.some(m => m.includes('HTML storage not supported'))).toBe(true);
  });
});

describe('removePersistedState', () => {
  it('removes the entry and reports it', () => {
    const klpStorage = available();
    klpStorage.persistState(900);

    expect(klpStorage.removePersistedState()).toBe(true);
    expect(store.has('klp.widget.state')).toBe(false);
  });

  it('reports that it did not, when the browser denies storage', () => {
    expect(denied().removePersistedState()).toBe(false);
  });
});

describe('the document cache', () => {
  it('keys each document by its type', () => {
    available().saveDocumentOnCache({ unreadNotifications: 3 }, 'UNREAD_NOTIFICATIONS');

    expect(JSON.parse(store.get('klp.widget.document.UNREAD_NOTIFICATIONS'))).toEqual({
      unreadNotifications: 3,
    });
  });

  it('drops a document by type', () => {
    const klpStorage = available();
    klpStorage.saveDocumentOnCache({ unreadNotifications: 3 }, 'UNREAD_NOTIFICATIONS');

    klpStorage.removeDocumentFromCache('UNREAD_NOTIFICATIONS');

    expect(store.size).toBe(0);
  });

  it('is skipped entirely when the browser denies storage', () => {
    const klpStorage = denied();

    klpStorage.saveDocumentOnCache({ unreadNotifications: 3 }, 'UNREAD_NOTIFICATIONS');
    klpStorage.removeDocumentFromCache('UNREAD_NOTIFICATIONS');

    expect(store.size).toBe(0);
  });
});
