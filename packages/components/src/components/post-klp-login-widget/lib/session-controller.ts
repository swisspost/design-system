import { createControlCookie, hash } from './control-cookie';
import { createKeepAlive, KLP_KEEP_ALIVE_DEFAULTS, type KlpKeepAliveConf } from './keep-alive';
import type { KlpRouterActions, KlpSessionData } from './klp-session.model';
import { createMessageRouter } from './message-router';
import { buildEndPoints, createSessionClient } from './session-client';
import { createStorage } from './storage';

/**
 * The composition root of the v9 widget, reduced to the session. It owns the state the protocol
 * mutates (address, session, retry marker) and nothing else: the UI only learns about a session
 * through `onSessionChange`.
 */

export interface KlpSessionControllerOptions {
  /** Platform base url of the selected environment. */
  endPoint: string;
  /** The portal's own keep-alive url. Without it only the platform session is refreshed. */
  keepAliveUrl?: string;
  conf?: Partial<KlpKeepAliveConf>;
  log?: (message: string) => void;
  onSessionChange: (session: KlpSessionData | null) => void;
}

export function createSessionController({
  endPoint,
  keepAliveUrl,
  conf,
  log = () => {},
  onSessionChange,
}: KlpSessionControllerOptions) {
  const endPoints = buildEndPoints(endPoint);
  const client = createSessionClient({ endPoints, log });
  const controlCookie = createControlCookie({ log });
  const storage = createStorage({ log });
  const keepAliveConf: KlpKeepAliveConf = { ...KLP_KEEP_ALIVE_DEFAULTS, ...conf };

  let address = '';
  let sessionData: KlpSessionData | null = null;
  let retrySubscribeOnFail = false;

  /** Credentialed and opaque: the refresh only has to reach the host, not report back. */
  function ping(): void {
    for (const url of client.keepAliveUrls(keepAliveUrl)) {
      fetch(url, { method: 'GET', mode: 'no-cors', credentials: 'include' }).catch(error =>
        log(`Keepalive ping failed: ${error}`),
      );
    }
  }

  const keepAlive = createKeepAlive({
    getConf: () => keepAliveConf,
    log,
    isUserAuthenticated: () => sessionData !== null,
    ping,
    setControlCookie: (slot, value) => controlCookie.setControlCookie(slot, value),
  });

  /** The cookie is only worth writing if the state it refers to was actually stored. */
  function persistState(ttl: number): void {
    if (storage.persistState(ttl)) {
      controlCookie.setControlCookie('hash', encodeURIComponent(hash(sessionData)));
    }
  }

  function removePersistedState(): void {
    if (storage.removePersistedState()) {
      controlCookie.removeControlCookie({ keepForRetry: retrySubscribeOnFail });
    }
  }

  const actions: KlpRouterActions = {
    audit: message => client.audit(address, message),
    setRetrySubscribeOnFail: value => {
      retrySubscribeOnFail = value;
    },
    setAddress: value => {
      address = value;
    },
    login: (data, ttl) => {
      sessionData = data;
      persistState(ttl);
      keepAlive.installKeepAliveTimerHandler();
      onSessionChange(sessionData);
    },
    logout: () => {
      sessionData = null;
      address = '';
      removePersistedState();
      keepAlive.uninstallKeepAliveTimerHandler();
      onSessionChange(null);
    },
    subscribe: () => {
      void start();
    },
    // Both belong to the socket and the notification cache, which arrive in their own slices.
    openCommunication: () => {},
    removeNotificationsFromCache: () => {},
    showDocument: (doc, documentType) => storage.saveDocumentOnCache(doc, documentType),
    removeDocument: documentType => storage.removeDocumentFromCache(documentType),
  };

  const route = createMessageRouter({ log, actions });

  /** A failed subscribe leaves the widget anonymous; it must never reject into the component. */
  async function start(): Promise<void> {
    try {
      route(await client.subscribe());
    } catch (error) {
      log(`Subscribe failed: ${error}`);
    }
  }

  return {
    start,
    stop: () => keepAlive.uninstallKeepAliveTimerHandler(),
    getSession: () => sessionData,
    getAddress: () => address,
  };
}
