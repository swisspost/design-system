import { APIRequestContext, Page } from '@playwright/test';
import { expect, test } from './coverage';
import {
  control,
  journal,
  openWidget,
  pushEventBus,
  resetScenario,
  widgetConfig,
} from './fixtures';

let api: APIRequestContext;

/** Matches platform.endPoint in the shared config, so the faked DNS resolves it to the harness. */
const EVENTBUS_URL = `${widgetConfig.platform.endPoint}/eventbus`;
/** The address the fake API hands out, and the only one it accepts a registration for. */
const ADDRESS = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

interface Bus {
  onopen: (() => void) | null;
  onclose: (() => void) | null;
  send(address: string, message: unknown, replyHandler?: (reply: unknown) => void): void;
  publish(address: string, message: unknown): void;
  registerHandler(address: string, handler: (body: unknown) => void): void;
  unregisterHandler(address: string, handler: (body: unknown) => void): void;
  login(username: string, password: string, replyHandler?: (reply: unknown) => void): void;
  close(): void;
  readyState(): number;
}

interface BusWindow {
  vertx: {
    EventBus: { new (url: string, options?: unknown): Bus; CONNECTING: number; OPEN: number };
  };
  __bus: Bus;
  __events: string[];
  __received: unknown[];
  __handler: (body: unknown, reply?: unknown) => void;
  __second: (body: unknown, reply?: unknown) => void;
  __reply: (message: unknown) => void;
}

/**
 * The controller is imported lazily, so the legacy bundle only loads once a config is present.
 * Without a control cookie the widget stays anonymous and never opens a bus of its own, which
 * leaves the journal free for the bus the test drives directly.
 */
const loadShim = async (page: Page) => {
  await openWidget(page);
  await page.waitForFunction(() => (window as unknown as BusWindow).vertx?.EventBus !== undefined);
};

/** Constructs a bus and resolves once SockJS reports it open. */
const openBus = (page: Page) =>
  page.evaluate(async url => {
    const w = window as unknown as BusWindow;
    w.__events = [];
    w.__received = [];
    const bus = new w.vertx.EventBus(url, {});
    w.__bus = bus;
    bus.onclose = () => w.__events.push('close');
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('bus never opened')), 5000);
      bus.onopen = () => {
        w.__events.push('open');
        clearTimeout(timer);
        resolve();
      };
    });
  }, EVENTBUS_URL);

type BadCall = 'close-before-open' | 'missing-address' | 'bad-handler' | 'bad-reply-handler';

/** Runs a bus call that is expected to throw and returns the message, or null when it succeeded. */
const errorFrom = (page: Page, call: BadCall) =>
  page.evaluate(which => {
    const bus = (window as unknown as BusWindow).__bus;
    const noop = () => undefined;
    try {
      switch (which) {
        case 'close-before-open':
          bus.close();
          break;
        case 'missing-address':
          bus.registerHandler(undefined as unknown as string, noop);
          break;
        case 'bad-handler':
          bus.registerHandler('some-address', 'nope' as unknown as () => void);
          break;
        case 'bad-reply-handler':
          bus.send('some-address', {}, 'nope' as unknown as () => void);
          break;
      }
      return null;
    } catch (error) {
      return (error as Error).message;
    }
  }, call);

const busEvents = async (filter: string) =>
  (await journal(api)).eventbus.filter(e => e.event === filter);

test.beforeAll(async () => {
  api = await control();
});

test.beforeEach(async () => {
  await resetScenario(api);
});

test.describe('vert.x event bus shim', () => {
  test('reports CONNECTING before the socket opens and OPEN afterwards', async ({ page }) => {
    await loadShim(page);

    const connecting = await page.evaluate(url => {
      const w = window as unknown as BusWindow;
      const bus = new w.vertx.EventBus(url, {});
      w.__bus = bus;
      return bus.readyState();
    }, EVENTBUS_URL);
    expect(connecting).toBe(0);

    await expect
      .poll(() => page.evaluate(() => (window as unknown as BusWindow).__bus.readyState()))
      .toBe(1);
  });

  test('starts pinging as soon as it is open', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    await expect.poll(async () => (await busEvents('ping')).length).toBeGreaterThan(0);
  });

  test('registers an address once, no matter how many handlers are added', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    await page.evaluate(address => {
      const w = window as unknown as BusWindow;
      w.__handler = body => w.__received.push(body);
      w.__second = body => w.__received.push(body);
      w.__bus.registerHandler(address, w.__handler);
      w.__bus.registerHandler(address, w.__second);
    }, ADDRESS);

    await expect.poll(async () => (await busEvents('register')).length).toBe(1);
  });

  test('delivers a message to every handler on the address', async ({ page }) => {
    await loadShim(page);
    await openBus(page);
    await page.evaluate(address => {
      const w = window as unknown as BusWindow;
      w.__handler = body => w.__received.push(body);
      w.__second = body => w.__received.push(body);
      w.__bus.registerHandler(address, w.__handler);
      w.__bus.registerHandler(address, w.__second);
    }, ADDRESS);
    await expect.poll(async () => (await busEvents('register')).length).toBe(1);

    await pushEventBus(api, { typ: 'hello' });

    await expect
      .poll(() => page.evaluate(() => (window as unknown as BusWindow).__received))
      .toEqual([{ typ: 'hello' }, { typ: 'hello' }]);
  });

  test('unregisters the address only once the last handler is gone', async ({ page }) => {
    await loadShim(page);
    await openBus(page);
    await page.evaluate(address => {
      const w = window as unknown as BusWindow;
      w.__handler = body => w.__received.push(body);
      w.__second = body => w.__received.push(body);
      w.__bus.registerHandler(address, w.__handler);
      w.__bus.registerHandler(address, w.__second);
    }, ADDRESS);
    await expect.poll(async () => (await busEvents('register')).length).toBe(1);

    await page.evaluate(address => {
      const w = window as unknown as BusWindow;
      w.__bus.unregisterHandler(address, w.__handler);
    }, ADDRESS);
    await page.waitForTimeout(150);
    expect(await busEvents('unregister')).toHaveLength(0);

    await page.evaluate(address => {
      const w = window as unknown as BusWindow;
      w.__bus.unregisterHandler(address, w.__second);
    }, ADDRESS);

    await expect.poll(async () => (await busEvents('unregister')).length).toBe(1);
  });

  test('ignores an unregister for an address that was never registered', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    await page.evaluate(() => {
      const w = window as unknown as BusWindow;
      w.__bus.unregisterHandler('never-registered', () => undefined);
    });

    await page.waitForTimeout(150);
    expect(await busEvents('unregister')).toHaveLength(0);
  });

  test('sends and publishes envelopes', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    await page.evaluate(address => {
      const w = window as unknown as BusWindow;
      w.__bus.send(address, { hello: 'send' });
      w.__bus.publish(address, { hello: 'publish' });
    }, ADDRESS);

    await expect.poll(async () => (await busEvents('send')).length).toBe(1);
    expect(await busEvents('publish')).toHaveLength(1);
  });

  test('allocates a reply address and routes the answer to the reply handler', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    await page.evaluate(address => {
      const w = window as unknown as BusWindow;
      w.__bus.send(address, { hello: 'with-reply' }, reply => w.__received.push(reply));
    }, ADDRESS);

    await expect
      .poll(() => page.evaluate(() => (window as unknown as BusWindow).__received))
      .toEqual([{ status: 'ok', echo: { hello: 'with-reply' } }]);
  });

  test('hands a reply function to handlers when the frame carries a reply address', async ({
    page,
  }) => {
    await loadShim(page);
    await openBus(page);
    await page.evaluate(address => {
      const w = window as unknown as BusWindow;
      w.__handler = (body, reply) => {
        w.__reply = reply as (message: unknown) => void;
        w.__received.push({ body, canReply: typeof reply });
      };
      w.__bus.registerHandler(address, w.__handler);
    }, ADDRESS);
    await expect.poll(async () => (await busEvents('register')).length).toBe(1);

    await pushEventBus(api, { typ: 'hello' }, 'some-reply-address');

    await expect
      .poll(() => page.evaluate(() => (window as unknown as BusWindow).__received))
      .toEqual([{ body: { typ: 'hello' }, canReply: 'function' }]);

    await page.evaluate(() => (window as unknown as BusWindow).__reply({ answered: true }));

    await expect
      .poll(async () => (await busEvents('send')).map(e => e.address))
      .toEqual(['some-reply-address']);
  });

  test('login stores the session id and stamps it on later envelopes', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    await page.evaluate(() => {
      const w = window as unknown as BusWindow;
      w.__bus.login('someone', 'secret', reply => w.__received.push(reply));
    });
    // The shim strips sessionID from the payload it forwards to the caller.
    await expect
      .poll(() => page.evaluate(() => (window as unknown as BusWindow).__received))
      .toEqual([{ status: 'ok' }]);

    await page.evaluate(address => {
      (window as unknown as BusWindow).__bus.publish(address, { after: 'login' });
    }, ADDRESS);

    await expect
      .poll(async () => (await busEvents('publish')).map(e => e.sessionID))
      .toEqual(['fake-session-id']);
  });

  test('login sends credentials to the basic auth manager', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    await page.evaluate(() => {
      const w = window as unknown as BusWindow;
      w.__bus.login('someone', 'secret', reply => w.__received.push(reply));
    });

    await expect
      .poll(async () =>
        (await busEvents('send')).some(e => e.address === 'vertx.basicauthmanager.login'),
      )
      .toBe(true);
  });

  test('close reports the socket as closed and fires onclose', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    await page.evaluate(() => (window as unknown as BusWindow).__bus.close());

    await expect
      .poll(() => page.evaluate(() => (window as unknown as BusWindow).__events))
      .toEqual(['open', 'close']);
    expect(await page.evaluate(() => (window as unknown as BusWindow).__bus.readyState())).toBe(3);
  });

  test('refuses calls made before the socket is open', async ({ page }) => {
    await loadShim(page);
    await page.evaluate(url => {
      const w = window as unknown as BusWindow;
      w.__bus = new w.vertx.EventBus(url, {});
    }, EVENTBUS_URL);

    expect(await errorFrom(page, 'close-before-open')).toBe('INVALID_STATE_ERR');
  });

  test('rejects a missing address', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    expect(await errorFrom(page, 'missing-address')).toBe('Parameter address must be specified');
  });

  test('rejects a handler that is not a function', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    expect(await errorFrom(page, 'bad-handler')).toBe('Parameter handler must be of type function');
  });

  test('rejects a reply handler that is not a function', async ({ page }) => {
    await loadShim(page);
    await openBus(page);

    expect(await errorFrom(page, 'bad-reply-handler')).toBe(
      'Parameter replyHandler must be of type function',
    );
  });
});
