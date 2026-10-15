/**
 * Playground only: stands in for the KLP platform so the signed-in composition can be seen without
 * a backend. Loaded as a classic script, because it must patch `fetch` and `WebSocket` before the
 * components module evaluates and connects.
 *
 * `?session=` picks who is signed in — `ada`, `grace`, `alan`, or anything else for anonymous —
 * and `?unread=` how many messages are waiting. Every other query parameter overrides the matching
 * `KlpSessionData` field, e.g. `?surname=Hopper&userType=B2C&company=`.
 *
 * The login link leads to `?login`, a stand-in for the KLP login page; picking a user there lands
 * on `?session=<id>`, which is the round trip the real widget makes. `hi` and `bye` need a socket,
 * and the widget only opens one once it is signed in, so they are offered as buttons instead.
 */
(() => {
  // The notes describe the session data, not the menu: which entries exist is still the consumer's
  // call, so `changeUserAndProfile` and `canChangeCompany` do not change what is rendered yet.
  const USERS = {
    ada: {
      label: 'Ada Lovelace',
      note: 'B2B, changeUserAndProfile',
      data: {
        name: 'Ada',
        surname: 'Lovelace',
        company: 'Analytical Engines AG',
        userType: 'B2B',
        authLevel: 'PASSWORD',
        changeUserAndProfile: 'userAndProfile',
      },
    },
    grace: {
      label: 'Grace Hopper',
      note: 'B2B, canChangeCompany',
      data: {
        name: 'Grace',
        surname: 'Hopper',
        company: 'Naval Systems AG',
        userType: 'B2B',
        authLevel: 'PASSWORD',
        canChangeCompany: true,
      },
    },
    alan: {
      label: 'Alan Turing',
      note: 'B2C, no company',
      data: {
        name: 'Alan',
        surname: 'Turing',
        userType: 'B2C',
        authLevel: 'PASSWORD',
      },
    },
  };

  const TTL = 900000;
  const RESERVED = new Set(['session', 'unread', 'login']);

  const params = new URLSearchParams(location.search);
  const current = params.get('session') ?? 'ada';
  const session = USERS[current] ? { ...USERS[current].data } : null;

  for (const [field, value] of params) {
    if (RESERVED.has(field) || !session) continue;
    // An empty value drops the field, so optional ones can be tried out as absent.
    if (value === '') delete session[field];
    else session[field] = { true: true, false: false }[value] ?? value;
  }

  const unread = Number(params.get('unread') ?? 3);
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

  /** Hands the widget one vert.x message, wrapped in the SockJS frame it expects. */
  function push(body) {
    if (!eventBus) return;

    const envelope = JSON.stringify({ address, body });
    setTimeout(() => eventBus?.onmessage?.({ data: `a${JSON.stringify([envelope])}` }), 0);
  }

  function pushUnread() {
    push({ typ: 'doc', doctyp: 'UNREAD_NOTIFICATIONS', doc: { unreadNotifications: unread } });
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

  function visit(changes) {
    const search = new URLSearchParams(location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (value === null) search.delete(key);
      else search.set(key, value);
    }

    location.search = search.toString();
  }

  // Both links are written by the consumer, so the mock reacts to where they point. Capturing,
  // because the menu closes on the same click and stops it from reaching the document.
  document.addEventListener(
    'click',
    event => {
      const link = event.target.closest?.('a[href="#login"], a[href="#logout"]');
      if (!link) return;

      event.preventDefault();
      if (link.getAttribute('href') === '#login') visit({ login: '' });
      else visit({ session: 'none', login: null });
    },
    true,
  );

  const STYLE = `
    .klp-mock {
      position: fixed;
      z-index: 1000;
      padding: 16px;
      background: #fff;
      border: 1px solid #000;
      font: 14px/1.4 sans-serif;
    }
    .klp-mock-login { inset: 50% auto auto 50%; translate: -50% -50%; }
    .klp-mock-push { inset: auto auto 16px 16px; display: flex; gap: 8px; align-items: center; }
    .klp-mock h2 { margin: 0 0 8px; font-size: 16px; }
    .klp-mock ul { margin: 0; padding: 0; list-style: none; }
    .klp-mock li + li { margin-block-start: 8px; }
    .klp-mock small { color: #666; }
  `;

  function panel(className) {
    const element = document.createElement('div');
    element.className = `klp-mock ${className}`;
    document.body.append(element);

    return element;
  }

  function renderLoginPage() {
    const element = panel('klp-mock-login');

    const title = document.createElement('h2');
    title.textContent = 'KLP login (playground)';

    const list = document.createElement('ul');
    for (const [id, user] of Object.entries(USERS)) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = user.label;
      link.addEventListener('click', event => {
        event.preventDefault();
        visit({ session: id, login: null });
      });

      const note = document.createElement('small');
      note.textContent = ` — ${user.note}`;
      item.append(link, note);
      list.append(item);
    }

    element.append(title, list);
  }

  /** What another tab does to this one; the login link cannot reach this path. */
  function renderPushPanel() {
    const element = panel('klp-mock-push');

    const label = document.createElement('span');
    label.textContent = 'platform pushes:';

    const bye = document.createElement('button');
    bye.type = 'button';
    bye.textContent = 'bye';
    bye.addEventListener('click', () => push({ typ: 'bye' }));

    const ids = Object.keys(USERS);
    const next = ids[(ids.indexOf(current) + 1) % ids.length];
    const hi = document.createElement('button');
    hi.type = 'button';
    hi.textContent = `hi (${USERS[next].label})`;
    hi.addEventListener('click', () => {
      push({ typ: 'hi', ttl: TTL, data: USERS[next].data });
      // `hi` empties the notification cache, so the count has to arrive again.
      pushUnread();
    });

    element.append(label, bye, hi);
  }

  function onReady(run) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run, { once: true });
    } else {
      run();
    }
  }

  onReady(() => {
    const style = document.createElement('style');
    style.textContent = STYLE;
    document.head.append(style);

    if (params.has('login')) renderLoginPage();
    else renderPushPanel();
  });
})();
