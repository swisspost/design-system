/**
 * Stands in for the KLP platform, so the signed-in states of `post-klp-login-widget` can be shown
 * without a session on the real platform. Mirrors `packages/components/src/playground/klp-platform-mock.js`,
 * but can be installed and removed again, since stories mount and unmount in the same window.
 *
 * The widget reads `fetch` and `WebSocket` when it connects, not when it loads, so installing the
 * fake before a widget is rendered is enough.
 */

/** Keyed by the kind of user, which is what decides the menu; the names are only sample data. */
export const KLP_FAKE_USERS = {
  'b2c': {
    name: 'Alan',
    surname: 'Turing',
    userType: 'B2C',
    authLevel: 'PASSWORD',
  },
  'b2b-multi-account': {
    name: 'Ada',
    surname: 'Lovelace',
    company: 'Analytical Engines AG',
    userType: 'B2B',
    authLevel: 'PASSWORD',
    changeUserAndProfile: 'userAndProfile',
  },
  'b2b-multi-company': {
    name: 'Grace',
    surname: 'Hopper',
    company: 'Naval Systems AG',
    userType: 'B2B',
    authLevel: 'PASSWORD',
    canChangeCompany: true,
  },
} as const;

export type KlpFakeUser = keyof typeof KLP_FAKE_USERS;

export interface KlpFakeOptions {
  /** Who is signed in; `null` answers as anonymous. */
  user: KlpFakeUser | null;
  /** Unread messages, pushed once the widget registers on the event bus. */
  unread?: number;
}

type FrameListener = (event: { data: string }) => void;

let restore: (() => void) | null = null;

export function uninstallKlpPlatformFake(): void {
  restore?.();
  restore = null;
}

export function installKlpPlatformFake({ user, unread = 0 }: KlpFakeOptions): void {
  uninstallKlpPlatformFake();

  const message = user
    ? { typ: 'sub', adr: 'storybook', ttl: 900000, data: { ...KLP_FAKE_USERS[user] } }
    : { typ: 'ukn' };

  const originalFetch = globalThis.fetch;
  const nativeFetch = originalFetch.bind(globalThis);
  const NativeWebSocket = globalThis.WebSocket;

  globalThis.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input instanceof Request ? input.url : input);

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

  // Storybook's own websocket passes through; only the platform event bus is answered here.
  const FakeWebSocket = function (url: string | URL, protocols?: string | string[]) {
    if (!String(url).includes('/eventbus/')) return new NativeWebSocket(url, protocols);

    // Speaks just enough SockJS and vert.x to carry the session protocol.
    const socket = {
      readyState: 1,
      onmessage: undefined as FrameListener | undefined,
      onclose: undefined as ((event: { code: number; reason: string }) => void) | undefined,
      close() {
        socket.onclose?.({ code: 1000, reason: '' });
      },
      send(data: string) {
        const frame = JSON.parse(JSON.parse(data)[0]);
        if (frame.type !== 'register') return;

        const body = {
          typ: 'doc',
          doctyp: 'UNREAD_NOTIFICATIONS',
          doc: { unreadNotifications: unread },
        };
        const envelope = JSON.stringify({ address: frame.address, body });
        setTimeout(() => socket.onmessage?.({ data: `a${JSON.stringify([envelope])}` }), 0);
      },
    };

    setTimeout(() => socket.onmessage?.({ data: 'o' }), 0);
    return socket;
  } as unknown as typeof WebSocket;
  // The widget guards on `WebSocket.OPEN`, which a replaced constructor does not carry over.
  Object.assign(FakeWebSocket, { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 });
  globalThis.WebSocket = FakeWebSocket;

  restore = () => {
    globalThis.fetch = originalFetch;
    globalThis.WebSocket = NativeWebSocket;
  };
}
