import type { KlpMessage } from './klp-session.model';
import type { KlpEventBus } from './vertx-event-bus';

/**
 * The live half of the session: a vert.x event bus over a websocket, listening on the address the
 * subscription handed out.
 *
 * A socket can drop for two very different reasons. Either the session ended, in which case the
 * widget has already been told and nothing should happen, or the connection failed while the
 * session is still valid, in which case the widget has to subscribe again and get a new address.
 * Only the message router knows the difference, so it owns the retry flag and lends it here.
 */

export interface KlpEventBusConnectionOptions {
  url: string;
  log?: (message: string) => void;
  getAddress: () => string;
  shouldRetryOnFail: () => boolean;
  onMessage: (message: KlpMessage) => void;
  onReconnect: () => void;
  /**
   * Loads the transport. Deferred on purpose: most visitors never log in, and they should not pay
   * for a websocket client they will never open. Injectable so tests need no socket.
   */
  loadEventBus?: () => Promise<(url: string) => KlpEventBus>;
}

const loadVertxEventBus = async () => {
  const module = await import('./vertx-event-bus');
  return module.createVertxEventBus;
};

export function createEventBusConnection({
  url,
  log = () => {},
  getAddress,
  shouldRetryOnFail,
  onMessage,
  onReconnect,
  loadEventBus = loadVertxEventBus,
}: KlpEventBusConnectionOptions) {
  let eventBus: KlpEventBus | null = null;
  let opening = false;

  function closeCommunication(): void {
    eventBus?.close();
  }

  async function openCommunication(): Promise<void> {
    // A second 'sub' while the first socket is still being fetched must not open a second one.
    if (eventBus || opening) return;
    opening = true;

    try {
      const createEventBus = await loadEventBus();
      eventBus = createEventBus(url);
    } catch (error) {
      log(`EventBus could not be loaded: ${error}`);
      return;
    } finally {
      opening = false;
    }

    eventBus.onopen = () => {
      log('EventBus opened');
      eventBus?.registerHandler(getAddress(), message => onMessage(message as KlpMessage));
      globalThis.addEventListener('beforeunload', closeCommunication);
    };

    eventBus.onclose = () => {
      const retry = shouldRetryOnFail();
      log(`EventBus closed with retrySubscribeOnFail=${retry}`);
      eventBus = null;
      globalThis.removeEventListener('beforeunload', closeCommunication);

      if (retry) onReconnect();
    };
  }

  return { openCommunication, closeCommunication };
}
