/**
 * Development only: stands in for the KLP platform so the signed-in composition can be seen
 * without a backend. Loaded as a classic script, because it must patch `fetch` and `WebSocket`
 * before the components module evaluates and connects.
 *
 * `?session=` picks who is signed in — `ada`, `grace`, `alan`, or anything else for anonymous —
 * and `?unread=` how many messages are already waiting. Every other query parameter overrides the
 * matching `KlpSessionData` field, e.g. `?surname=Hopper&userType=B2C&company=`.
 *
 * From there the buttons take over: they push the messages the platform would send into an open
 * session, so signing in and out needs no reload.
 *
 * Hosts that ship this on every page leave it dormant until the URL carries `?klpmock`. The
 * playground marks its tag `data-always`, because that page exists for nothing else.
 */
(() => {
  const params = new URLSearchParams(location.search);
  // Address bars may change the case of what was typed, so the mock's own parameters ignore it.
  const findParam = name => [...params].find(([key]) => key.toLowerCase() === name);

  if (!document.currentScript?.hasAttribute('data-always') && !findParam('klpmock')) {
    return;
  }

  const USERS = {
    ada: {
      name: 'Ada',
      surname: 'Lovelace',
      company: 'Analytical Engines AG',
      userType: 'B2B',
      authLevel: 'PASSWORD',
      changeUserAndProfile: 'userAndProfile',
    },
    grace: {
      name: 'Grace',
      surname: 'Hopper',
      company: 'Naval Systems AG',
      userType: 'B2B',
      authLevel: 'PASSWORD',
      canChangeCompany: true,
    },
    alan: {
      name: 'Alan',
      surname: 'Turing',
      userType: 'B2C',
      authLevel: 'PASSWORD',
    },
  };

  const label = user => `${user.name} ${user.surname}`;

  const TTL = 900000;
  const RESERVED = new Set(['klpmock', 'session', 'unread']);

  const current = (findParam('session')?.[1] ?? 'ada').toLowerCase();
  const session = USERS[current] ? { ...USERS[current] } : null;

  for (const [field, value] of params) {
    if (RESERVED.has(field.toLowerCase()) || !session) continue;
    // An empty value drops the field, so optional ones can be tried out as absent.
    if (value === '') delete session[field];
    else session[field] = { true: true, false: false }[value] ?? value;
  }

  const message = session
    ? { typ: 'sub', adr: 'playground', ttl: TTL, data: session }
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

  let eventBus = null;
  let address = '';
  let waiting = Number(findParam('unread')?.[1] ?? 0);

  /** Hands the widget one vert.x message, wrapped in the SockJS frame it expects. */
  function push(body) {
    if (!eventBus) return;

    const envelope = JSON.stringify({ address, body });
    setTimeout(() => eventBus?.onmessage?.({ data: `a${JSON.stringify([envelope])}` }), 0);
  }

  function pushUnread() {
    push({ typ: 'doc', doctyp: 'UNREAD_NOTIFICATIONS', doc: { unreadNotifications: waiting } });
  }

  function deliver() {
    waiting += 1;
    pushUnread();
  }

  // Leaves the dev server's own socket alone; only the platform event bus is answered here.
  const NativeWebSocket = globalThis.WebSocket;
  globalThis.WebSocket = function (url, protocols) {
    if (!String(url).includes('/eventbus/')) return new NativeWebSocket(url, protocols);

    // Speaks just enough SockJS and vert.x to carry the session protocol.
    const socket = {
      readyState: 1,
      close() {
        eventBus = null;
        socket.onclose?.({ code: 1000, reason: '' });
      },
      send(data) {
        const frame = JSON.parse(JSON.parse(data)[0]);
        if (frame.type !== 'register') return;

        address = frame.address;
        eventBus = socket;
        pushUnread();
      },
    };

    setTimeout(() => socket.onmessage?.({ data: 'o' }), 0);
    return socket;
  };
  // The widget guards on `WebSocket.OPEN`, which a replaced constructor does not carry over.
  Object.assign(globalThis.WebSocket, { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 });

  function button(text, onClick) {
    const element = document.createElement('button');
    element.type = 'button';
    element.textContent = text;
    element.addEventListener('click', onClick);

    return element;
  }

  function onReady(run) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run, { once: true });
    } else {
      run();
    }
  }

  /** Falls back to a fixed bar, so a host only has to load the script. */
  function container() {
    const existing = document.querySelector('#KLPMockContainer');
    if (existing) return existing;

    const element = document.createElement('div');
    element.id = 'KLPMockContainer';
    element.style.cssText =
      'position:fixed;inset:auto 0 0 0;z-index:1000;display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:8px;background:#fc0';
    document.body.append(element);

    return element;
  }

  onReady(() => {
    const his = Object.entries(USERS).map(([id, user]) =>
      button(`hi ${label(user)} (${user.userType})`, () => {
        // The widget only opens a socket once it is signed in, so without one the page has to come
        // back with the session already in place.
        if (!eventBus) {
          const search = new URLSearchParams(location.search);
          search.set('session', id);
          location.search = search.toString();
          return;
        }

        push({ typ: 'hi', ttl: TTL, data: user });
        // `hi` empties the notification cache, so the count has to arrive again.
        pushUnread();
      }),
    );

    container().append(
      'KLP mock: ',
      button('logout', () => push({ typ: 'bye' })),
      ...his,
      button('new message', deliver),
      button('no messages', () => {
        waiting = 0;
        pushUnread();
      }),
    );
  });
})();
