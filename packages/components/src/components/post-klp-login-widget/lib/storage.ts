/**
 * Session storage for the KLP widget, ported from the v9 widget. Every entry is best effort: a
 * browser that denies storage leaves the widget working, just without a persisted state or a
 * document cache.
 *
 * The persisted state is a decoy. It carries a plausible shape and a ttl, but the session and the
 * address are placeholder strings, so nothing sensitive is written where a page script can read
 * it. Only the ttl is real.
 */

const PERSISTED_STATE_KEY = 'klp.widget.state';
const PERSISTED_DOCUMENT_PREFIX = 'klp.widget.document.';
const PLACEHOLDER = "If you're looking for this info, contact the Swiss Post Design System Team!";

export interface KlpStorageOptions {
  log?: (message: string) => void;
  /** Injected so the module never reaches for a browser global at import time. */
  getStorage?: () => Storage | null;
}

const sessionStorageOrNull = (): Storage | null => {
  try {
    return globalThis.sessionStorage ?? null;
  } catch {
    return null;
  }
};

export function createStorage({
  log = () => {},
  getStorage = sessionStorageOrNull,
}: KlpStorageOptions = {}) {
  function isStorageSupported(): boolean {
    if (getStorage() !== null) {
      return true;
    }

    log('No local storage available');
    return false;
  }

  /** Reports whether it wrote, so the caller knows if the matching cookie is worth setting. */
  function persistState(ttl: number): boolean {
    if (!isStorageSupported()) {
      log('State not persisted because HTML storage not supported');
      return false;
    }

    getStorage().setItem(
      PERSISTED_STATE_KEY,
      JSON.stringify({
        ttl: Date.now() + ttl,
        sessionData: PLACEHOLDER,
        address: PLACEHOLDER,
      }),
    );
    log('State persisted');
    return true;
  }

  function removePersistedState(): boolean {
    if (!isStorageSupported()) {
      log('Persisted state not removed because HTML storage not supported');
      return false;
    }

    getStorage().removeItem(PERSISTED_STATE_KEY);
    log('Persisted state removed');
    return true;
  }

  function saveDocumentOnCache(doc: unknown, documentType: string): void {
    if (!isStorageSupported()) {
      return;
    }

    getStorage().setItem(PERSISTED_DOCUMENT_PREFIX + documentType, JSON.stringify(doc));
    log(`Document ${documentType} has been persisted on cache`);
  }

  function removeDocumentFromCache(documentType: string): void {
    if (!isStorageSupported()) {
      return;
    }

    getStorage().removeItem(PERSISTED_DOCUMENT_PREFIX + documentType);
    log(`Document ${documentType} has been removed from cache`);
  }

  return {
    isStorageSupported,
    persistState,
    removePersistedState,
    saveDocumentOnCache,
    removeDocumentFromCache,
  };
}

export type KlpStorage = ReturnType<typeof createStorage>;
