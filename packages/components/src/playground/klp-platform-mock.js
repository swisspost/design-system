/**
 * Development only: stands in for the KLP platform so the signed-in composition can be seen
 * without a backend. Loaded as a classic script, because it must patch `fetch` and `WebSocket`
 * before the components module evaluates and connects.
 *
 * `?session=` picks who is signed in — `bert`, `anna`, `gabe`, `alex`, `mary`, or anything else for anonymous —
 * and `?unread=` how many messages are already waiting. Every other query parameter overrides the
 * matching `KlpSessionData` field, e.g. `?surname=Hopper&userType=B2C&company=` or `?support=true`.
 *
 * From there the buttons take over: they push the messages the platform would send into an open
 * session, so signing in and out needs no reload.
 *
 * Nobody is signed in unless `?session=` names a user.
 */
(() => {
  const params = new URLSearchParams(location.search);
  // Address bars may change the case of what was typed, so the mock's own parameters ignore it.
  const findParam = name => [...params].find(([key]) => key.toLowerCase() === name);

  const USERS = {
    alex: {
      name: 'Alex',
      surname: 'Irvin',
      userType: 'B2C',
      authLevel: 'PASSWORD',
    },
    mary: {
      name: 'Mary',
      surname: 'Hamilton',
      userType: 'B2C',
      authLevel: 'PASSWORD',
      changeUserAndProfile: 'userAndProfile',
    },
    bert: {
      name: 'Bert',
      surname: 'Keller',
      company: 'Keller Logistik AG',
      userType: 'B2B',
      authLevel: 'PASSWORD',
    },
    anna: {
      name: 'Anna',
      surname: 'Lovelace',
      company: 'Analytical Engines AG',
      userType: 'B2B',
      authLevel: 'PASSWORD',
      changeUserAndProfile: 'userAndProfile',
    },
    gabe: {
      name: 'Gabe',
      surname: 'Hopper',
      company: 'Naval Systems AG',
      userType: 'B2B',
      authLevel: 'PASSWORD',
      canChangeCompany: true,
    },
  };

  const HINTS = {
    alex: 'simple',
    mary: 'can switch account',
    bert: 'simple',
    anna: 'can switch account',
    gabe: 'can switch company',
  };

  const label = user => `${user.name} ${user.surname[0]}.`;

  const TTL = 900000;
  const RESERVED = new Set(['klpmock', 'session', 'unread']);

  const current = (findParam('session')?.[1] ?? '').toLowerCase();
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

  // What the open session currently carries, so the support toggle can flip just that one field.
  let signedIn = session;

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

  function button(text, iconName, onClick) {
    const element = document.createElement('button');
    element.type = 'button';
    element.classList.add('btn', 'btn-sm', 'btn-secondary');

    const icon = document.createElement('post-icon');
    icon.setAttribute('name', iconName);
    icon.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.textContent = text;

    element.append(icon, label);
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

  function inlineRadio(radio, labelElement) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('form-check', 'form-check-inline');
    wrapper.append(radio, labelElement);
    return wrapper;
  }

  function heading(text, className) {
    const element = document.createElement('h2');
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function playgroundLink(description, href, text, steps = []) {
    const item = document.createElement('tr');
    const cell = document.createElement('td');
    item.append(cell);

    const link = document.createElement('a');
    link.classList.add('btn', 'btn-sm', 'btn-primary');
    link.href = href;
    link.textContent = text;

    const summary = document.createElement('p');
    summary.textContent = description;
    cell.append(link, summary);

    if (steps.length > 0) {
      const list = document.createElement('ol');
      for (const step of steps)
        list.append(Object.assign(document.createElement('li'), { textContent: step }));
      cell.append(list);
    }

    return item;
  }

  function container() {
    const existing = document.querySelector('#KLPMockContainer');
    if (existing?.closest('#KLPMockDetails')) return existing;

    const controls = existing ?? document.createElement('div');
    controls.id = 'KLPMockContainer';

    const details = document.createElement('details');
    details.id = 'KLPMockDetails';

    const summary = document.createElement('summary');
    summary.textContent = 'KLP';

    const playgroundPages = document.createElement('nav');
    playgroundPages.id = 'PlaygroundLinks';
    playgroundPages.setAttribute('aria-label', 'Other playground pages');

    const pageTable = document.createElement('table');
    pageTable.classList.add('table');
    const pageRows = document.createElement('tbody');
    pageTable.append(pageRows);
    playgroundPages.append(pageTable);
    pageRows.append(
      playgroundLink(
        'Previous implementation. Must keep working alongside the new KLP widget.',
        '/playground/self-managed-user-menu.html',
        'Previous Self-Managed User Menu',
      ),
      playgroundLink(
        'Runs against the real KLP platform on int02, without the mock. To test manually:',
        '/playground/klp-real.html',
        'KLP Live Test Page',
        [
          'Serve this page over https from a *.post.ch host (see playground readme).',
          'Open the live page and follow the login link.',
          'Sign in with an int02 test user.',
          'KLP redirects to the app, so open the live page again in the same tab.',
          'Check the signed-in menu, switches and unread count; then log out.',
        ],
      ),
    );

    if (existing) existing.replaceWith(details);
    else document.body.append(details);
    details.append(
      summary,
      heading('Mock controls', 'mt-0'),
      controls,
      heading('Other playground pages'),
      playgroundPages,
    );

    if (!document.getElementById('KlpPlatformMockStyles')) {
      const styles = document.createElement('style');
      styles.id = 'KlpPlatformMockStyles';
      styles.textContent = `
        #KLPMockDetails { padding: 8px; }
        #KLPMockDetails summary { cursor: pointer; }
        #KLPMockContainer, #PlaygroundLinks { margin-block: 8px 0; }
        #PlaygroundLinks p { margin: 8px 0 0; }
        #KLPMockContainer .klp-mock-actions { display: flex; flex-wrap: wrap; gap: 8px; }
      `;
      document.head.append(styles);
    }

    return controls;
  }

  onReady(() => {
    let activeUserId = session ? current : 'logout';
    const userRadios = new Map();
    const userGroup = document.createElement('fieldset');
    userGroup.classList.add('mb-8');

    const legend = document.createElement('legend');
    legend.classList.add('visually-hidden');
    legend.textContent = 'Active mock session';
    userGroup.append(legend);

    const logoutRadio = document.createElement('input');
    logoutRadio.type = 'radio';
    logoutRadio.name = 'klp-mock-session';
    logoutRadio.id = 'klp-mock-session-logout';

    const logoutLabel = document.createElement('label');
    logoutLabel.htmlFor = logoutRadio.id;
    logoutLabel.textContent = 'Logout';

    logoutRadio.addEventListener('change', () => {
      if (!logoutRadio.checked) return;

      if (!eventBus) {
        const search = new URLSearchParams(location.search);
        search.set('session', 'anonymous');
        location.search = search.toString();
        return;
      }

      signOut();
    });

    userRadios.set('logout', logoutRadio);
    userGroup.append(inlineRadio(logoutRadio, logoutLabel));

    for (const [id, user] of Object.entries(USERS)) {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'klp-mock-session';
      radio.id = `klp-mock-session-${id}`;

      const labelElement = document.createElement('label');
      labelElement.htmlFor = radio.id;

      const name = document.createElement('span');
      name.textContent = `${label(user)} (${user.userType})`;

      const hint = document.createElement('small');
      hint.classList.add('d-block');
      hint.textContent = HINTS[id];
      labelElement.append(name, hint);

      radio.addEventListener('change', () => {
        if (!radio.checked) return;

        // The widget only opens a socket once it is signed in, so without one the page has to come
        // back with the session already in place.
        if (!eventBus) {
          const search = new URLSearchParams(location.search);
          search.set('session', id);
          location.search = search.toString();
          return;
        }

        signIn({ ...user }, id);
      });

      userRadios.set(id, radio);
      userGroup.append(inlineRadio(radio, labelElement));
    }

    const actionGroup = document.createElement('div');
    actionGroup.setAttribute('role', 'group');
    actionGroup.setAttribute('aria-label', 'Other KLP mock actions');
    actionGroup.classList.add('klp-mock-actions');

    const support = button('', 'customercenter', () =>
      signIn({ ...signedIn, support: !signedIn.support }, activeUserId),
    );

    const newMessage = button('', 'letter', () => {
      deliver();
      update();
    });

    actionGroup.append(
      support,
      newMessage,
      button('no messages', 'letteropen', () => {
        waiting = 0;
        pushUnread();
        update();
      }),
    );

    // Flags only an open session; while signed out, `?support=true` presets it for the next one.
    function update() {
      support.querySelector('span').textContent =
        `support flag: ${signedIn?.support ? 'on' : 'off'}`;
      newMessage.querySelector('span').textContent = `new message (${waiting})`;
      for (const action of actionGroup.querySelectorAll('button')) action.disabled = !signedIn;

      for (const [id, radio] of userRadios) {
        radio.checked = id === activeUserId;
      }
    }

    function signOut() {
      signedIn = null;
      activeUserId = 'logout';
      update();
      push({ typ: 'bye' });
    }

    function signIn(data, userId) {
      activeUserId = userId;
      signedIn = data;
      update();
      push({ typ: 'hi', ttl: TTL, data });
      // `hi` empties the notification cache, so the count has to arrive again.
      pushUnread();
    }

    update();
    container().append(userGroup, actionGroup);
  });
})();
