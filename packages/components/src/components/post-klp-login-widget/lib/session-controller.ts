import { createControlCookie, hash } from './control-cookie';
import { createEventBusConnection } from './event-bus-connection';
import { createKeepAlive, KLP_KEEP_ALIVE_DEFAULTS, type KlpKeepAliveConf } from './keep-alive';
import type { KlpRouterActions, KlpSessionData } from './klp-session.model';
import { createMessageRouter } from './message-router';
import { createNotifications } from './notifications';
import { buildEndPoints, createSessionClient } from './session-client';
import { createStorage } from './storage';
import type { KlpEventBus } from './vertx-event-bus';

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
  onUnreadChange?: (unread: number) => void;
  /** Injected by the tests so the session can be exercised without a websocket. */
  loadEventBus?: () => Promise<(url: string) => KlpEventBus>;
}

export function createSessionController({
  endPoint,
  keepAliveUrl,
  conf,
  log = () => {},
  onSessionChange,
  onUnreadChange = () => {},
  loadEventBus,
}: KlpSessionControllerOptions) {
  const endPoints = buildEndPoints(endPoint);
  const client = createSessionClient({ endPoints, log });
  const controlCookie = createControlCookie({ log });
  const storage = createStorage({ log });
  const notifications = createNotifications({ log, storage });
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

  const connection = createEventBusConnection({
    url: endPoints.eventbus,
    log,
    getAddress: () => address,
    shouldRetryOnFail: () => retrySubscribeOnFail,
    onMessage: message => route(message),
    onReconnect: () => {
      retrySubscribeOnFail = false;
      address = '';
      void start();
    },
    loadEventBus,
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

  function reportUnread(): void {
    onUnreadChange(notifications.getUnreadNotifications());
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
      notifications.removeFromCache();
      reportUnread();
      keepAlive.uninstallKeepAliveTimerHandler();
      onSessionChange(null);
    },
    subscribe: () => {
      void start();
    },
    openCommunication: () => void connection.openCommunication(),
    removeNotificationsFromCache: () => {
      notifications.removeFromCache();
      reportUnread();
    },
    showDocument: (doc, documentType) => {
      notifications.showDocument(doc, documentType);
      reportUnread();
    },
    removeDocument: documentType => {
      notifications.removeDocument(documentType);
      reportUnread();
    },
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
    stop: () => {
      keepAlive.uninstallKeepAliveTimerHandler();
      connection.closeCommunication();
    },
    getSession: () => sessionData,
    getAddress: () => address,
    getUnreadNotifications: () => notifications.getUnreadNotifications(),
  };
}
