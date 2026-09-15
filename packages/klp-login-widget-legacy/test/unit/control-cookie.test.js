import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import {
  CONTROL_COOKIE_NAME,
  createControlCookie,
  hash,
  isCurrentLocationPostCh,
} from '../../src/legacy/control-cookie.js';

afterEach(() => {
  delete globalThis.window;
  delete globalThis.document;
});

function onHost(hostname) {
  globalThis.window = { location: { hostname } };
}

function withCookie(cookie) {
  globalThis.document = { cookie };
}

describe('isCurrentLocationPostCh', () => {
  it('holds on post.ch and its subdomains', () => {
    onHost('int.post.ch');
    assert.equal(isCurrentLocationPostCh(), true);

    onHost('post.ch');
    assert.equal(isCurrentLocationPostCh(), true);
  });

  it('does not hold elsewhere, where the widget cannot read its own cookie', () => {
    onHost('localhost');
    assert.equal(isCurrentLocationPostCh(), false);

    onHost('post.ch.example.com');
    assert.equal(isCurrentLocationPostCh(), false);
  });
});

describe('hash', () => {
  it('is stable for equal session data', () => {
    assert.equal(hash({ name: 'Ada' }), hash({ name: 'Ada' }));
  });

  it('changes when the session changes', () => {
    assert.notEqual(hash({ name: 'Ada' }), hash({ name: 'Grace' }));
  });

  // It hashes the JSON form, so the same fields in a different order are a different session.
  it('depends on the order of the fields', () => {
    assert.notEqual(hash({ a: 1, b: 2 }), hash({ b: 2, a: 1 }));
  });
});

describe('getControlCookieVal', () => {
  it('returns null and says so when the cookie is absent', () => {
    const logged = [];
    withCookie('other=1');

    const value = createControlCookie({ log: m => logged.push(m) }).getControlCookieVal();

    assert.equal(value, null);
    assert.deepEqual(logged, ['Control cookie not found']);
  });

  it('returns the whole value when no slot is asked for', () => {
    withCookie(`${CONTROL_COOKIE_NAME}=abc%3A123; other=1`);

    assert.equal(createControlCookie().getControlCookieVal(), 'abc:123');
  });

  it('reads the session hash and the keepalive stamp out of the two slots', () => {
    withCookie(`${CONTROL_COOKIE_NAME}=abc%3A123`);
    const cookie = createControlCookie();

    assert.equal(cookie.getControlCookieVal('hash'), 'abc');
    assert.equal(cookie.getControlCookieVal('keepalive'), '123');
  });

  it('returns null for a slot the cookie does not carry yet', () => {
    withCookie(`${CONTROL_COOKIE_NAME}=abc`);

    assert.equal(createControlCookie().getControlCookieVal('keepalive'), null);
  });
});
