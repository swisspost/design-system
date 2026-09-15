/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * Session storage, lifted from the v9 widget. Every entry is best effort: a browser that denies
 * storage leaves the widget working, just without a persisted state or a document cache.
 *
 * The persisted state is a decoy. It carries a plausible shape and a ttl, but the session and the
 * address are placeholder strings, so nothing sensitive is written where a page script can read
 * it. Only the ttl is real.
 * ------------------------------------------------------------------------------------------------
 */

const PERSISTED_STATE_KEY = 'klp.widget.state';
const PERSISTED_DOCUMENT_PREFIX = 'klp.widget.document.';
const PLACEHOLDER = "If you're looking for this info, contact the Swiss Post Design System Team!";

export function createStorage({ log = () => {} } = {}) {
  function isHTML5StorageSupported() {
    try {
      return 'sessionStorage' in window && window.sessionStorage !== null;
    } catch (e) {
      log('No local storage available');
      return false;
    }
  }

  /** Reports whether it wrote, so the caller knows if the matching cookie is worth setting. */
  function persistState(ttl) {
    if (!isHTML5StorageSupported()) {
      log('State not persisted because HTML storage not supported');
      return false;
    }

    sessionStorage.setItem(
      PERSISTED_STATE_KEY,
      JSON.stringify({
        ttl: new Date().getTime() + ttl,
        sessionData: PLACEHOLDER,
        address: PLACEHOLDER,
      }),
    );
    log('State persisted');
    return true;
  }

  function removePersistedState() {
    if (!isHTML5StorageSupported()) {
      log('Persisted state not removed because HTML storage not supported');
      return false;
    }

    sessionStorage.removeItem(PERSISTED_STATE_KEY);
    log('Persisted state removed');
    return true;
  }

  function saveDocumentOnCache(document, documentType) {
    const key = PERSISTED_DOCUMENT_PREFIX + documentType;
    if (isHTML5StorageSupported()) {
      sessionStorage.setItem(key, JSON.stringify(document));
      log(
        'Document ' +
          documentType +
          ' has been persisted on cached with value ' +
          JSON.stringify(document),
      );
    }
  }

  function removeDocumentFromCache(documentType) {
    const key = PERSISTED_DOCUMENT_PREFIX + documentType;
    if (isHTML5StorageSupported()) {
      sessionStorage.removeItem(key);
      log('Document ' + documentType + ' has been removed from cache');
    }
  }

  return {
    isHTML5StorageSupported,
    persistState,
    removePersistedState,
    saveDocumentOnCache,
    removeDocumentFromCache,
  };
}
