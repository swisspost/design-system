import { createSockJsSocket, type KlpSockJsSocket } from './sockjs-websocket';

/**
 * The vert.x 2 event bus client, reduced to the half the widget uses: register for an address and
 * receive what is published to it.
 *
 * The v9 client also carried send, publish, basic-auth login, unregister and the reply-address
 * machinery that turns a send into a request. The widget never sent anything over the bus -- it
 * only ever listened -- so none of that is here, and its absence is invisible on the wire.
 */

export interface KlpEventBus {
  onopen: (() => void) | null;
  onclose: (() => void) | null;
  registerHandler(address: string, handler: (message: unknown) => void): void;
  close(): void;
}

/** The bridge drops a connection it has not heard from; v9 pinged every five seconds. */
const PING_INTERVAL = 5000;

export function createVertxEventBus(
  url: string,
  createSocket: (url: string) => KlpSockJsSocket = createSockJsSocket,
): KlpEventBus {
  const connection = createSocket(url);
  const handlers = new Map<string, ((message: unknown) => void)[]>();
  let pingTimer: ReturnType<typeof setInterval> | undefined;
  let open = false;

  function send(frame: Record<string, unknown>): void {
    connection.send(JSON.stringify(frame));
  }

  const bus: KlpEventBus = {
    onopen: null,
    onclose: null,
    // Only ever called from onopen, so the socket is guaranteed to be there to carry the register.
    registerHandler(address, handler) {
      const registered = handlers.get(address);
      if (registered) {
        registered.push(handler);
        return;
      }

      handlers.set(address, [handler]);
      if (open) send({ type: 'register', address });
    },
    close() {
      connection.close();
    },
  };

  connection.onopen = () => {
    open = true;
    send({ type: 'ping' });
    pingTimer = setInterval(() => send({ type: 'ping' }), PING_INTERVAL);
    for (const [address] of handlers) send({ type: 'register', address });
    bus.onopen?.();
  };

  connection.onclose = () => {
    open = false;
    clearInterval(pingTimer);
    pingTimer = undefined;
    handlers.clear();
    bus.onclose?.();
  };

  connection.onmessage = event => {
    let envelope: { address?: string; body?: unknown };
    try {
      envelope = JSON.parse(event.data);
    } catch {
      return;
    }

    // A copy, because a handler is free to unregister itself while it runs.
    for (const handler of handlers.get(envelope.address ?? '')?.slice() ?? []) {
      handler(envelope.body);
    }
  };

  return bus;
}
