/*
 * ------------------------------------------------------------------------------------------------
 * A websocket-only stand-in for the vendored sockjs-client, speaking the same wire protocol.
 *
 * The v9 widget shipped 5134 lines of SockJS to pick a transport at runtime. Every browser the
 * design system supports has WebSocket, and the vert.x bridge offers it first, so the fallbacks
 * (xhr-streaming, jsonp, htmlfile, iframes) were never taken. This keeps the framing SockJS puts
 * on the wire -- the session URL, the o/h/a/m/c frames, the array-wrapped sends -- so the server
 * cannot tell the difference, and drops everything else.
 *
 * `/info` is deliberately not fetched. It exists to choose a transport and to let the server
 * rewrite the base url; we always pick websocket and the bridge does not rewrite.
 * ------------------------------------------------------------------------------------------------
 */

const CONNECTING = 0;
const OPEN = 1;
const CLOSING = 2;
const CLOSED = 3;

/** SockJS routes on /<server>/<session>/, three digits and eight characters as the server expects. */
const serverId = () => String(Math.floor(Math.random() * 1000)).padStart(3, '0');

const sessionId = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) id += alphabet[Math.floor(Math.random() * alphabet.length)];
  return id;
};

const socketUrl = base => {
  const trimmed = base.replace(/\/+$/, '');
  const path = `${trimmed}/${serverId()}/${sessionId()}/websocket`;
  return path.replace(/^http/, 'ws');
};

export function SockJS(url) {
  const that = this;

  this.readyState = CONNECTING;
  this.onopen = null;
  this.onclose = null;
  this.onmessage = null;

  // Ids are generated per connection, never at module scope, so this stays safe to import on a server.
  const ws = new WebSocket(socketUrl(url));

  const deliver = data => {
    if (that.onmessage) that.onmessage({ data });
  };

  const shutdown = (code, reason) => {
    if (that.readyState === CLOSED) return;
    that.readyState = CLOSED;
    ws.onopen = ws.onmessage = ws.onclose = ws.onerror = null;
    if (that.onclose) that.onclose({ code, reason });
  };

  ws.onmessage = event => {
    const frame = String(event.data);
    const type = frame.slice(0, 1);
    const body = frame.slice(1);

    if (type === 'o') {
      that.readyState = OPEN;
      if (that.onopen) that.onopen();
      return;
    }
    // A heartbeat only proves the socket is alive; SockJS surfaces it as an event nobody listens to.
    if (type === 'h') return;

    let payload;
    try {
      payload = JSON.parse(body);
    } catch {
      return;
    }

    if (type === 'a' && Array.isArray(payload)) payload.forEach(deliver);
    else if (type === 'm') deliver(payload);
    else if (type === 'c' && Array.isArray(payload) && payload.length === 2) {
      ws.close();
      shutdown(payload[0], payload[1]);
    }
  };

  ws.onclose = event => shutdown(event.code, event.reason);
  ws.onerror = () => shutdown(1006, 'WebSocket connection broken');

  this.send = function (data) {
    if (that.readyState !== OPEN) return;
    // SockJS quotes the payload and the websocket transport wraps it in an array; both happen here.
    ws.send(`[${JSON.stringify(String(data))}]`);
  };

  this.close = function () {
    if (that.readyState === CLOSING || that.readyState === CLOSED) return;
    that.readyState = CLOSING;
    ws.close();
  };
}

SockJS.CONNECTING = CONNECTING;
SockJS.OPEN = OPEN;
SockJS.CLOSING = CLOSING;
SockJS.CLOSED = CLOSED;
