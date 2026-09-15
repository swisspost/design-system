import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, it } from 'node:test';

import { buildEndPoints, createSessionClient } from '../../src/legacy/session-client.js';

const endPoints = buildEndPoints('https://platform.int.post.ch');

let fetches;
let realFetch;
let realInfo;

beforeEach(() => {
  fetches = [];
  realFetch = globalThis.fetch;
  realInfo = console.info;
  // The diagnostics are deliberate in production but only noise in a test run.
  console.info = () => {};
});

afterEach(() => {
  globalThis.fetch = realFetch;
  console.info = realInfo;
});

function stubFetch(response) {
  globalThis.fetch = (url, options) => {
    fetches.push({ url, options });
    return response ?? Promise.resolve({ json: () => Promise.resolve({}) });
  };
}

describe('buildEndPoints', () => {
  it('derives every endpoint from the platform root', () => {
    assert.deepEqual(endPoints, {
      audit: 'https://platform.int.post.ch/v1/audit',
      keepalive: 'https://platform.int.post.ch/v1/session/keepalive',
      subscribe: 'https://platform.int.post.ch/v1/session/subscribe',
      eventbus: 'https://platform.int.post.ch/eventbus',
    });
  });
});

describe('audit', () => {
  it('posts the address and the event when the event asks to be audited', () => {
    stubFetch();
    createSessionClient({ endPoints }).audit('address-1', { typ: 'hi', adt: true });

    assert.equal(fetches.length, 1);
    assert.equal(fetches[0].url, endPoints.audit);
    assert.equal(fetches[0].options.method, 'POST');
    assert.equal(fetches[0].options.credentials, 'include');
    assert.deepEqual(JSON.parse(fetches[0].options.body), {
      adr: 'address-1',
      evt: { typ: 'hi', adt: true },
    });
  });

  it('sends nothing when the event does not ask to be audited', () => {
    const logged = [];
    stubFetch();

    createSessionClient({ endPoints, log: m => logged.push(m) }).audit('address-1', { typ: 'hi' });

    assert.equal(fetches.length, 0);
    assert.ok(logged.some(m => m.startsWith('Auditing disabled')));
  });

  it('survives a rejected request, because an audit must not disturb the session', async () => {
    stubFetch(Promise.reject(new Error('offline')));
    const realError = console.error;
    console.error = () => {};

    createSessionClient({ endPoints }).audit('address-1', { typ: 'hi', adt: true });
    await new Promise(resolve => setImmediate(resolve));

    console.error = realError;
  });
});

describe('subscribe', () => {
  it('asks the platform with credentials across origins', async () => {
    stubFetch(Promise.resolve({ json: () => Promise.resolve({ typ: 'sub', adr: 'address-1' }) }));

    const message = await createSessionClient({ endPoints }).subscribe({ hasControlCookie: true });

    assert.deepEqual(message, { typ: 'sub', adr: 'address-1' });
    assert.equal(fetches[0].url, endPoints.subscribe);
    assert.deepEqual(fetches[0].options, { method: 'GET', credentials: 'include', mode: 'cors' });
  });

  it('hands the parsed body back rather than ruling on it', async () => {
    stubFetch(Promise.resolve({ json: () => Promise.reject(new SyntaxError('Unexpected end')) }));

    await assert.rejects(
      () => createSessionClient({ endPoints }).subscribe({ hasControlCookie: false }),
      SyntaxError,
    );
  });

  // v9 quirk kept on purpose: the metric is taken while the request is still in flight, so it
  // measures how long issuing it took and never how long the platform needed to answer.
  it('records its performance metric before the platform has answered', () => {
    const metrics = [];
    let settle;
    stubFetch(new Promise(resolve => (settle = resolve)));

    createSessionClient({
      endPoints,
      logPerformanceMetric: (name, time) => metrics.push([name, time]),
    }).subscribe({ hasControlCookie: true });

    assert.equal(metrics.length, 1);
    assert.equal(metrics[0][0], 'subscribe()');
    settle({ json: () => Promise.resolve({}) });
  });
});

describe('keepAliveMarkup', () => {
  it('refreshes the portal and the platform session with one pixel each', () => {
    const html = createSessionClient({ endPoints }).keepAliveMarkup(
      'https://int.post.ch/keepalive',
    );

    const sources = [...html.matchAll(/src='([^']+)'/g)].map(match => match[1]);
    assert.equal(sources.length, 2);
    assert.match(sources[0], /^https:\/\/int\.post\.ch\/keepalive\/\?\d+$/);
    assert.match(sources[1], new RegExp('^' + endPoints.keepalive + '\\?\\d+$'));
  });

  it('busts the cache, so a second refresh is not served from the first', () => {
    const client = createSessionClient({ endPoints });

    assert.notEqual(
      client.keepAliveMarkup('https://int.post.ch/keepalive'),
      client.keepAliveMarkup('https://int.post.ch/keepalive'),
    );
  });
});
