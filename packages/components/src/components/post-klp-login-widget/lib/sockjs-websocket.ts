/**
 * A websocket-only stand-in for sockjs-client, speaking the same wire protocol.
 *
 * The v9 widget shipped 5134 lines of SockJS to pick a transport at runtime. Every browser the
 * design system supports has WebSocket, and the vert.x bridge offers it first, so the fallbacks
 * (xhr-streaming, jsonp, htmlfile, iframes) were never taken. This keeps the framing SockJS puts
 * on the wire -- the session url, the o/h/a/m/c frames, the array-wrapped sends -- so the server
 * cannot tell the difference, and drops everything else.
 *
 * `/info` is deliberately not fetched: it exists to choose a transport and to let the server
 * rewrite the base url, and we always pick websocket while the bridge does not rewrite.
 */

export interface KlpSockJsSocket {
  onopen: (() => void) | null;
  onclose: ((event: { code: number; reason: string }) => void) | null;
  onmessage: ((event: { data: string }) => void) | null;
  send(data: string): void;
  close(): void;
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

function randomInt(bound: number): number {
  return crypto.getRandomValues(new Uint32Array(1))[0] % bound;
}

/** SockJS routes on /<server>/<session>/, three digits and eight characters as the server expects. */
function socketUrl(base: string): string {
  const server = String(randomInt(1000)).padStart(3, '0');
  let session = '';
  for (let i = 0; i < 8; i++) session += ALPHABET[randomInt(ALPHABET.length)];

  return `${base.replace(/\/+$/, '')}/${server}/${session}/websocket`.replace(/^http/, 'ws');
}

export function createSockJsSocket(url: string): KlpSockJsSocket {
  // Ids are generated per connection, never at module scope, so this stays safe to import on a server.
  const ws = new WebSocket(socketUrl(url));
  let closed = false;

  const socket: KlpSockJsSocket = {
    onopen: null,
    onclose: null,
    onmessage: null,
    send(data) {
      if (ws.readyState !== WebSocket.OPEN) return;
      // SockJS quotes the payload and the websocket transport wraps it in an array; both happen here.
      ws.send(`[${JSON.stringify(String(data))}]`);
    },
    close() {
      ws.close();
    },
  };

  function deliver(data: string): void {
    socket.onmessage?.({ data });
  }

  function shutdown(code: number, reason: string): void {
    if (closed) return;
    closed = true;
    ws.onopen = ws.onmessage = ws.onclose = ws.onerror = null;
    socket.onclose?.({ code, reason });
  }

  ws.onmessage = event => {
    const frame = String(event.data);
    const type = frame.slice(0, 1);
    const body = frame.slice(1);

    if (type === 'o') {
      socket.onopen?.();
      return;
    }
    // A heartbeat only proves the socket is alive; SockJS surfaces it as an event nobody listens to.
    if (type === 'h') return;

    let payload: unknown;
    try {
      payload = JSON.parse(body);
    } catch {
      return;
    }

    if (type === 'a' && Array.isArray(payload)) payload.forEach(deliver);
    else if (type === 'm') deliver(payload as string);
    else if (type === 'c' && Array.isArray(payload) && payload.length === 2) {
      ws.close();
      shutdown(payload[0] as number, payload[1] as string);
    }
  };

  ws.onclose = event => shutdown(event.code, event.reason);
  ws.onerror = () => shutdown(1006, 'WebSocket connection broken');

  return socket;
}
