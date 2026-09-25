import { buildEndPoints, createSessionClient } from '../session-client';
import type { KlpMessage } from '../klp-session.model';

const endPoints = buildEndPoints('https://platform.int.post.ch');

let fetches: { url: string; options: RequestInit }[];
let realFetch: typeof globalThis.fetch;

beforeEach(() => {
  fetches = [];
  realFetch = globalThis.fetch;
});

afterEach(() => {
  globalThis.fetch = realFetch;
});

function stubFetch(response?: Promise<unknown>) {
  globalThis.fetch = ((url: string, options: RequestInit) => {
    fetches.push({ url, options });
    return response ?? Promise.resolve({ json: () => Promise.resolve({}) });
  }) as unknown as typeof globalThis.fetch;
}

const audited = { typ: 'hi', adt: 1 } as unknown as KlpMessage;
const notAudited = { typ: 'hi' } as unknown as KlpMessage;

describe('buildEndPoints', () => {
  it('derives every endpoint from the platform root', () => {
    expect(endPoints).toEqual({
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

    createSessionClient({ endPoints }).audit('address-1', audited);

    expect(fetches).toHaveLength(1);
    expect(fetches[0].url).toBe(endPoints.audit);
    expect(fetches[0].options.method).toBe('POST');
    expect(fetches[0].options.credentials).toBe('include');
    expect(JSON.parse(fetches[0].options.body as string)).toEqual({
      adr: 'address-1',
      evt: { typ: 'hi', adt: 1 },
    });
  });

  it('sends nothing when the event does not ask to be audited', () => {
    const logged: string[] = [];
    stubFetch();

    createSessionClient({ endPoints, log: m => logged.push(m) }).audit('address-1', notAudited);

    expect(fetches).toHaveLength(0);
    expect(logged.some(m => m.startsWith('Auditing disabled'))).toBe(true);
  });

  it('survives a rejected request, because an audit must not disturb the session', async () => {
    stubFetch(Promise.reject(new Error('offline')));
    const realError = console.error;
    const errors: unknown[] = [];
    console.error = (error: unknown) => errors.push(error);

    expect(() => createSessionClient({ endPoints }).audit('address-1', audited)).not.toThrow();
    await new Promise(resolve => setImmediate(resolve));

    console.error = realError;
    expect(errors).toHaveLength(1);
  });
});

describe('subscribe', () => {
  it('asks the platform with credentials across origins', async () => {
    stubFetch(Promise.resolve({ json: () => Promise.resolve({ typ: 'sub', adr: 'address-1' }) }));

    const message = await createSessionClient({ endPoints }).subscribe();

    expect(message).toEqual({ typ: 'sub', adr: 'address-1' });
    expect(fetches[0].url).toBe(endPoints.subscribe);
    expect(fetches[0].options).toEqual({ method: 'GET', credentials: 'include', mode: 'cors' });
  });

  it('hands the parsed body back rather than ruling on it', async () => {
    stubFetch(Promise.resolve({ json: () => Promise.reject(new SyntaxError('Unexpected end')) }));

    await expect(createSessionClient({ endPoints }).subscribe()).rejects.toThrow(SyntaxError);
  });

  // Was a v9 defect: the metric was taken while the request was still in flight, so it measured
  // how long issuing it took and never how long the platform needed to answer.
  it('records its performance metric only once the platform has answered', async () => {
    const metrics: [string, number][] = [];
    let settle: (value: unknown) => void;
    stubFetch(new Promise(resolve => (settle = resolve)));

    const pending = createSessionClient({
      endPoints,
      logPerformanceMetric: (name, time) => metrics.push([name, time]),
    }).subscribe();

    expect(metrics).toHaveLength(0);

    settle({ json: () => Promise.resolve({}) });
    await pending;

    expect(metrics).toHaveLength(1);
    expect(metrics[0][0]).toBe('subscribe()');
  });

  it('records its performance metric when the platform fails to answer', async () => {
    const metrics: [string, number][] = [];
    stubFetch(Promise.reject(new TypeError('Failed to fetch')));

    await expect(
      createSessionClient({
        endPoints,
        logPerformanceMetric: (name, time) => metrics.push([name, time]),
      }).subscribe(),
    ).rejects.toThrow(TypeError);

    expect(metrics).toHaveLength(1);
    expect(metrics[0][0]).toBe('subscribe()');
  });
});

describe('keepAliveUrls', () => {
  it('refreshes the portal and the platform session with one url each', () => {
    const urls = createSessionClient({ endPoints }).keepAliveUrls('https://int.post.ch/keepalive');

    expect(urls).toHaveLength(2);
    expect(urls[0]).toMatch(/^https:\/\/int\.post\.ch\/keepalive\/\?\d+$/);
    expect(urls[1]).toMatch(new RegExp(`^${endPoints.keepalive}\\?\\d+$`));
  });

  it('busts the cache, so a second refresh is not served from the first', () => {
    const client = createSessionClient({ endPoints });

    expect(client.keepAliveUrls('https://int.post.ch/keepalive')).not.toEqual(
      client.keepAliveUrls('https://int.post.ch/keepalive'),
    );
  });

  it('refreshes the platform alone when the portal has no keep-alive url', () => {
    const urls = createSessionClient({ endPoints }).keepAliveUrls();

    expect(urls).toHaveLength(1);
    expect(urls[0]).toMatch(new RegExp(`^${endPoints.keepalive}\\?\\d+$`));
  });
});
