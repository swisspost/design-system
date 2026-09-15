import { APIRequestContext } from '@playwright/test';
import { expect, test } from './coverage';
import {
  control,
  disconnectEventBus,
  expectAnonymous,
  expectAuthenticated,
  journal,
  menu,
  openMenu,
  openWidget,
  pushEventBus,
  resetScenario,
  setScenario,
  signIn,
  waitForEventBus,
  widget,
  widgetReadyCount,
} from './fixtures';

let api: APIRequestContext;

const DOC_KEY = 'klp.widget.document.UNREAD_NOTIFICATIONS';

const cachedDocument = (page: Parameters<typeof widget>[0]) =>
  page.evaluate(key => sessionStorage.getItem(key), DOC_KEY);

test.beforeAll(async () => {
  api = await control();
});

test.beforeEach(async ({ context }) => {
  await resetScenario(api);
  await signIn(context);
  await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
});

test.describe('event bus messages', () => {
  test('registers a handler on the address handed out by subscribe', async ({ page }) => {
    await openWidget(page);

    await waitForEventBus(api);
  });

  test('"bye" signs the user out', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);

    await pushEventBus(api, { typ: 'bye' });

    await expectAnonymous(page);
  });

  test('an unknown message type signs the user out', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);

    await pushEventBus(api, { typ: 'something-else' });

    await expectAnonymous(page);
  });

  test('"ukn" signs the user out without subscribing again', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    const before = (await journal(api)).subscribe.length;

    await pushEventBus(api, { typ: 'ukn' });

    await expectAnonymous(page);
    expect((await journal(api)).subscribe).toHaveLength(before);
  });

  test('"ukn" with sub signs the user out and subscribes again', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    const before = (await journal(api)).subscribe.length;

    await pushEventBus(api, { typ: 'ukn', sub: true });

    await expect.poll(async () => (await journal(api)).subscribe.length).toBeGreaterThan(before);
  });

  test('"hi" signs a user in and drops the cached notifications', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { unreadNotifications: 5 },
    });
    await expect.poll(() => cachedDocument(page)).not.toBeNull();

    await pushEventBus(api, {
      typ: 'hi',
      ttl: 600000,
      data: {
        name: 'Bea',
        surname: 'Muster',
        email: 'bea.muster@post.ch',
        userType: 'B2C',
        authLevel: 'PASSWORD',
        support: false,
      },
    });

    await expect(widget(page)).toContainText('Bea');
    await expect.poll(() => cachedDocument(page)).toBeNull();
  });
});

test.describe('notification documents', () => {
  test('"doc" caches the payload and reveals the count in the menu', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);

    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { unreadNotifications: 5 },
    });

    await expect.poll(() => cachedDocument(page)).not.toBeNull();

    await openMenu(page);
    await expect(menu(page).locator('.notification-number-detail')).toHaveText('5');
  });

  test('caps the displayed count at 99+', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);

    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { unreadNotifications: 140 },
    });
    await expect.poll(() => cachedDocument(page)).not.toBeNull();

    await openMenu(page);
    await expect(menu(page).locator('.notification-number-detail')).toHaveText('99+');
  });

  test('leaves the badge on the toggler hidden', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);

    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { unreadNotifications: 5 },
    });
    await expect.poll(() => cachedDocument(page)).not.toBeNull();

    // renderNotificationsWidget() reaches for the badge with a document-wide jQuery selector, but
    // the badge lives inside two shadow roots, so the unread marker never becomes visible.
    await expect(widget(page).locator('.notification-number')).toBeHidden();
  });

  test('hides the count again when the payload reports zero', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);

    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { unreadNotifications: 0 },
    });
    await expect.poll(() => cachedDocument(page)).not.toBeNull();

    await openMenu(page);
    await expect(menu(page).locator('.notification-number-detail')).toBeHidden();
  });

  test('"rem" drops the cached payload', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { unreadNotifications: 5 },
    });
    await expect.poll(() => cachedDocument(page)).not.toBeNull();

    await pushEventBus(api, { typ: 'rem', doctyp: 'UNREAD_NOTIFICATIONS' });

    await expect.poll(() => cachedDocument(page)).toBeNull();
  });

  test('ignores a document type it does not know', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);

    await pushEventBus(api, { typ: 'doc', doctyp: 'SOMETHING_ELSE', doc: { a: 1 } });
    await pushEventBus(api, { typ: 'rem', doctyp: 'SOMETHING_ELSE' });

    await expectAuthenticated(page);
    expect(await cachedDocument(page)).toBeNull();
  });
});

test.describe('event bus lifecycle', () => {
  test('a dropped socket leaves the session untouched', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);

    const { closed } = await disconnectEventBus(api);
    expect(closed).toBeGreaterThan(0);

    // retrySubscribeOnFail is false unless a "ukn" with sub arrived, so onclose only tears the
    // bus down. The rendered session stays as it was.
    await expectAuthenticated(page);
  });
});

test.describe('subscribe failures', () => {
  test('renders nothing at all while the subscribe call hangs', async ({ page }) => {
    await setScenario(api, { subscribeMode: 'hang' });

    await openWidget(page, { waitForReady: false });

    // renderWidget() only runs in the fetch callbacks, so an unanswered subscribe leaves the
    // widget permanently blank rather than falling back to the anonymous state.
    await expect.poll(() => widgetReadyCount(page)).toBe(0);
    await expect(widget(page)).toBeEmpty();
  });

  test('falls back to the anonymous widget when subscribe returns an error', async ({ page }) => {
    await setScenario(api, { subscribeMode: 'error' });

    await openWidget(page);

    await expectAnonymous(page);
  });

  test('falls back to the anonymous widget when subscribe is forbidden', async ({ page }) => {
    await setScenario(api, { subscribeMode: 'forbidden' });

    await openWidget(page);

    await expectAnonymous(page);
  });
});

test.describe('iframe synchronisation', () => {
  test('ignores a syncWidget message from the hosting page', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    const before = (await journal(api)).subscribe.length;

    await page.evaluate(() => window.postMessage('syncWidget', '*'));

    // receiveMessage() compares the whole origin host, port included, against the bare strings
    // 'post.ch', 'postauto.ch' and 'postfinance.ch'. No real portal host ever matches, so the
    // iframe synchronisation is dead in practice.
    await page.waitForTimeout(250);
    expect((await journal(api)).subscribe).toHaveLength(before);
  });
});
