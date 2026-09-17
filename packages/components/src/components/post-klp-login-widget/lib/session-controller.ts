import { createControlCookie, hash } from './control-cookie';
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
  log?: (message: string) => void;
  onSessionChange: (session: KlpSessionData | null) => void;
}

export function createSessionController({
  endPoint,
  log = () => {},
  onSessionChange,
}: KlpSessionControllerOptions) {
  const endPoints = buildEndPoints(endPoint);
  const client = createSessionClient({ endPoints, log });
  const controlCookie = createControlCookie({ log });
  const storage = createStorage({ log });

  let address = '';
  let sessionData: KlpSessionData | null = null;
  let retrySubscribeOnFail = false;

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
      onSessionChange(sessionData);
    },
    logout: () => {
      sessionData = null;
      address = '';
      removePersistedState();
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
    getSession: () => sessionData,
    getAddress: () => address,
  };
}
