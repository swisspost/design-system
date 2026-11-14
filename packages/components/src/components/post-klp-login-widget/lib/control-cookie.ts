/**
 * The NCTRL cookie, ported from the v9 widget. It is a cross-subdomain flag written on post.ch
 * that carries two colon-separated slots: a hash of the session, and the last keepalive stamp.
 * The widget uses its mere presence to decide whether subscribing is worth the round trip.
 *
 * The cookie jar is injected rather than read from `document`, so nothing here touches a browser
 * global at import time and the hydrate build can evaluate this module safely.
 */

export const CONTROL_COOKIE_NAME = 'NCTRL';
export const CONTROL_COOKIE_DOMAIN = 'post.ch';

export type ControlCookieSlot = 'hash' | 'keepalive';

const controlCookieDomainRegEx = new RegExp(`${CONTROL_COOKIE_DOMAIN}$`);
const controlCookieRegEx = new RegExp(`${CONTROL_COOKIE_NAME}=([^;]+)`);

export interface KlpControlCookieJar {
  read(): string;
  write(cookie: string): void;
}

export interface KlpControlCookieOptions {
  log?: (message: string) => void;
  jar?: KlpControlCookieJar;
}

/** The cookie is written for post.ch, so anywhere else the widget cannot read its own state. */
export function isCurrentLocationPostCh(hostname = globalThis.location?.hostname ?? ''): boolean {
  return controlCookieDomainRegEx.test(hostname);
}

/**
 * Kept bit-for-bit as v9 computed it: the platform-hosted widget writes the same cookie slot on
 * post.ch, so a different algorithm would make the two disagree about the same session.
 */
export function hash(value: unknown): number {
  const s = JSON.stringify(value);
  let result = 0;

  if (s.length === 0) return result;

  for (let i = 0; i < s.length; i++) {
    /* eslint-disable-next-line unicorn/prefer-code-point -- charCodeAt is part of the hash. */
    result = (result << 5) - result + s.charCodeAt(i);
    /* eslint-disable-next-line unicorn/prefer-math-trunc -- coerces to int32, Math.trunc does not. */
    result |= 0;
  }

  return result;
}

const documentJar: KlpControlCookieJar = {
  read: () => document.cookie,
  write: cookie => {
    /* eslint-disable-next-line unicorn/no-document-cookie -- CookieStore is not baseline yet. */
    document.cookie = cookie;
  },
};

export function createControlCookie({
  log = () => {},
  jar = documentJar,
}: KlpControlCookieOptions = {}) {
  function getControlCookieVal(slot?: ControlCookieSlot): string | null {
    const cookieData = controlCookieRegEx.exec(jar.read());

    if (cookieData === null) {
      log('Control cookie not found');
      return null;
    }

    const values = decodeURIComponent(cookieData[1]).split(':');

    switch (slot) {
      case 'hash':
        return values[0];
      case 'keepalive':
        return values[1] ?? null;
      default:
        return decodeURIComponent(cookieData[1]);
    }
  }

  function setControlCookie(slot: ControlCookieSlot | undefined, val: string | number): void {
    const attributes = `; Path=/; domain=${CONTROL_COOKIE_DOMAIN}; SameSite=None; Secure`;

    switch (slot) {
      case 'hash':
        jar.write(`${CONTROL_COOKIE_NAME}=${val}:${getControlCookieVal('keepalive')}${attributes}`);
        break;
      case 'keepalive':
        jar.write(`${CONTROL_COOKIE_NAME}=${getControlCookieVal('hash')}:${val}${attributes}`);
        break;
      default:
        jar.write(`${CONTROL_COOKIE_NAME}=${val}${attributes}`);
        break;
    }
  }

  /** A pending resubscribe parks the marker on the cookie instead of expiring it. */
  function removeControlCookie({ keepForRetry }: { keepForRetry: boolean }): void {
    if (keepForRetry) {
      jar.write(`${CONTROL_COOKIE_NAME}=sub; Path=/; domain=${CONTROL_COOKIE_DOMAIN}`);
      log('Control cookie set to sub');
      return;
    }

    jar.write(
      `${CONTROL_COOKIE_NAME}=; Path=/; Expires=Wed, 01 Apr 2014 01:00:00 GMT; domain=${CONTROL_COOKIE_DOMAIN}; Secure`,
    );
    log('Control cookie removed');
  }

  return { getControlCookieVal, setControlCookie, removeControlCookie };
}
