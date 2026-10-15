/**
 * Playground only: stands in for the KLP platform so the signed-in composition can be seen without
 * a backend. Loaded as a classic script, because it must patch `fetch` and `WebSocket` before the
 * components module evaluates and connects.
 *
 * `?session=account|company|none` picks which menu the session is allowed to see, `?unread=` how
 * many messages are waiting. Every other query parameter overrides the matching `KlpSessionData`
 * field, e.g. `?surname=Hopper&userType=B2C&company=`.
 */
(() => {
  const params = new URLSearchParams(location.search);
  const state = params.get('session') ?? 'account';

  const user = {
    name: 'Ada',
    surname: 'Lovelace',
    company: 'Analytical Engines AG',
    userType: 'B2B',
    authLevel: 'PASSWORD',
  };

  const sessions = {
    account: { ...user, changeUserAndProfile: 'userAndProfile' },
    company: { ...user, canChangeCompany: true },
  };

  const session = sessions[state];
  for (const [field, value] of params) {
    if (field === 'session' || field === 'unread' || !session) continue;
    // An empty value drops the field, so optional ones can be tried out as absent.
    if (value === '') delete session[field];
    else session[field] = { true: true, false: false }[value] ?? value;
  }

  const message = session
    ? { typ: 'sub', adr: 'playground', ttl: 900000, data: session }
    : { typ: 'ukn' };

  const nativeFetch = globalThis.fetch.bind(globalThis);
  globalThis.fetch = (input, init) => {
    const url = String(input.url ?? input);

    if (url.includes('/v1/session/subscribe')) {
      return Promise.resolve(
        new Response(JSON.stringify(message), {
          headers: { 'content-type': 'application/json' },
        }),
      );
    }

    if (url.includes('/v1/audit') || url.includes('/v1/session/keepalive')) {
      return Promise.resolve(new Response(null, { status: 204 }));
    }

    return nativeFetch(input, init);
  };

  // Leaves the dev server's own socket alone; only the platform event bus is answered here.
  const unread = Number(params.get('unread') ?? 3);
  const NativeWebSocket = globalThis.WebSocket;
  globalThis.WebSocket = function (url, protocols) {
    if (!String(url).includes('/eventbus/')) return new NativeWebSocket(url, protocols);

    // Speaks just enough SockJS and vert.x to push one unread-notifications document.
    const socket = {
      readyState: 1,
      close() {
        socket.onclose?.({ code: 1000, reason: '' });
      },
      send(data) {
        const frame = JSON.parse(JSON.parse(data)[0]);
        if (frame.type !== 'register') return;

        const envelope = JSON.stringify({
          address: frame.address,
          body: {
            typ: 'doc',
            doctyp: 'UNREAD_NOTIFICATIONS',
            doc: { unreadNotifications: unread },
          },
        });
        setTimeout(() => socket.onmessage?.({ data: `a${JSON.stringify([envelope])}` }), 0);
      },
    };

    setTimeout(() => socket.onmessage?.({ data: 'o' }), 0);
    return socket;
  };
  // The widget guards on `WebSocket.OPEN`, which a replaced constructor does not carry over.
  Object.assign(globalThis.WebSocket, { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 });
})();
