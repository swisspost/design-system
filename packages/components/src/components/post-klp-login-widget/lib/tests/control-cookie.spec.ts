import {
  CONTROL_COOKIE_NAME,
  createControlCookie,
  hash,
  isCurrentLocationPostCh,
} from '../control-cookie';
import type { KlpControlCookieJar } from '../control-cookie';

/** Stands in for `document.cookie`, which a spec run has no business sharing. */
function createJar(cookie = ''): KlpControlCookieJar & { written: string[] } {
  const written: string[] = [];

  return {
    written,
    read: () => cookie,
    write: value => {
      written.push(value);
    },
  };
}

describe('isCurrentLocationPostCh', () => {
  it('holds on post.ch and its subdomains', () => {
    expect(isCurrentLocationPostCh('int.post.ch')).toBe(true);
    expect(isCurrentLocationPostCh('post.ch')).toBe(true);
  });

  it('does not hold elsewhere, where the widget cannot read its own cookie', () => {
    expect(isCurrentLocationPostCh('localhost')).toBe(false);
    expect(isCurrentLocationPostCh('post.ch.example.com')).toBe(false);
  });
});

describe('hash', () => {
  it('is stable for equal session data', () => {
    expect(hash({ name: 'Ada' })).toBe(hash({ name: 'Ada' }));
  });

  it('changes when the session changes', () => {
    expect(hash({ name: 'Ada' })).not.toBe(hash({ name: 'Grace' }));
  });

  // It hashes the JSON form, so the same fields in a different order are a different session.
  it('depends on the order of the fields', () => {
    expect(hash({ a: 1, b: 2 })).not.toBe(hash({ b: 2, a: 1 }));
  });
});

describe('getControlCookieVal', () => {
  it('returns null and says so when the cookie is absent', () => {
    const logged: string[] = [];

    const value = createControlCookie({
      log: m => logged.push(m),
      jar: createJar('other=1'),
    }).getControlCookieVal();

    expect(value).toBeNull();
    expect(logged).toEqual(['Control cookie not found']);
  });

  it('returns the whole value when no slot is asked for', () => {
    const cookie = createControlCookie({ jar: createJar(`${CONTROL_COOKIE_NAME}=abc%3A123; o=1`) });

    expect(cookie.getControlCookieVal()).toBe('abc:123');
  });

  it('reads the session hash and the keepalive stamp out of the two slots', () => {
    const cookie = createControlCookie({ jar: createJar(`${CONTROL_COOKIE_NAME}=abc%3A123`) });

    expect(cookie.getControlCookieVal('hash')).toBe('abc');
    expect(cookie.getControlCookieVal('keepalive')).toBe('123');
  });

  it('returns null for a slot the cookie does not carry yet', () => {
    const cookie = createControlCookie({ jar: createJar(`${CONTROL_COOKIE_NAME}=abc`) });

    expect(cookie.getControlCookieVal('keepalive')).toBeNull();
  });
});

describe('setControlCookie', () => {
  it('scopes the cookie to post.ch and sends it cross-site', () => {
    const jar = createJar();

    createControlCookie({ jar }).setControlCookie(undefined, 'sub');

    expect(jar.written[0]).toBe(
      `${CONTROL_COOKIE_NAME}=sub; Path=/; domain=post.ch; SameSite=None; Secure`,
    );
  });

  it('keeps the keepalive stamp when only the hash changes', () => {
    const jar = createJar(`${CONTROL_COOKIE_NAME}=abc%3A123`);

    createControlCookie({ jar }).setControlCookie('hash', 'def');

    expect(jar.written[0]).toContain(`${CONTROL_COOKIE_NAME}=def:123`);
  });

  it('keeps the hash when only the keepalive stamp changes', () => {
    const jar = createJar(`${CONTROL_COOKIE_NAME}=abc%3A123`);

    createControlCookie({ jar }).setControlCookie('keepalive', 456);

    expect(jar.written[0]).toContain(`${CONTROL_COOKIE_NAME}=abc:456`);
  });
});

describe('removeControlCookie', () => {
  it('expires the cookie outright', () => {
    const jar = createJar();
    const logged: string[] = [];

    createControlCookie({ jar, log: m => logged.push(m) }).removeControlCookie({
      keepForRetry: false,
    });

    expect(jar.written[0]).toContain('Expires=Wed, 01 Apr 2014 01:00:00 GMT');
    expect(logged).toContain('Control cookie removed');
  });

  // A pending resubscribe parks the marker on the cookie instead of expiring it.
  it('parks a sub marker when a resubscribe is still owed', () => {
    const jar = createJar();

    createControlCookie({ jar }).removeControlCookie({ keepForRetry: true });

    expect(jar.written[0]).toBe(`${CONTROL_COOKIE_NAME}=sub; Path=/; domain=post.ch`);
  });
});
