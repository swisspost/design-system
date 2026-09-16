import { APIRequestContext, Page } from '@playwright/test';
import { expect, test } from './coverage';
import {
  callApi,
  control,
  cookieValue,
  expectAnonymous,
  journal,
  openWidget,
  pushEventBus,
  resetScenario,
  setScenario,
  signIn,
  waitForEventBus,
  widget,
} from './fixtures';

let api: APIRequestContext;

const B2C = {
  name: 'Andrea',
  surname: 'Chiodoni',
  email: 'andrea.chiodoni@post.ch',
  userType: 'B2C',
  authLevel: 'PASSWORD',
  support: false,
};

/** Records every callback invocation on the page so assertions can read them back. */
const recordCalls = (page: Page) =>
  page.evaluate(() => {
    (window as unknown as { __calls: string[] }).__calls = [];
  });

const calls = (page: Page) =>
  page.evaluate(() => (window as unknown as { __calls: string[] }).__calls);

const signInLink = (page: Page) => widget(page).locator('.klp-widget-anonymous a');

test.beforeAll(async () => {
  api = await control();
});

test.beforeEach(async () => {
  await resetScenario(api);
});

test.describe('public API for an authenticated session', () => {
  test.beforeEach(async ({ context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
  });

  test('reports the widget version', async ({ page }) => {
    await openWidget(page);

    expect(await callApi(page, 'version')).toBe('16.01.00.01');
  });

  test('reports the session state', async ({ page }) => {
    await openWidget(page);

    expect(await callApi(page, 'isUserAuthenticated')).toBe(true);
    expect(await callApi(page, 'getUserType')).toBe('B2C');
    expect(await callApi(page, 'getCurrentAuthLevel')).toBe('PASSWORD');
  });

  test('changeAppLoginURL is ignored while a session is rendered', async ({ page }) => {
    await openWidget(page);

    await callApi(page, 'changeAppLoginURL', 'https://int.post.ch/idp/?login&lang=fr');

    // The call re-renders, but an authenticated session never shows the sign-in link.
    await expect(widget(page).locator('.klp-widget-authenticated')).toBeVisible();
  });

  test('updateWidget re-renders with the merged configuration', async ({ page }) => {
    await openWidget(page);
    await expect(widget(page).locator('.klp-widget__user')).toHaveAttribute('tabindex', '0');

    await callApi(page, 'updateWidget', { tabIndex: 5 });

    await expect(widget(page).locator('.klp-widget__user')).toHaveAttribute('tabindex', '5');
  });

  test('updateWidget without options only logs', async ({ page }) => {
    await openWidget(page);

    await callApi(page, 'updateWidget');

    await expect(widget(page).locator('.klp-widget-authenticated')).toBeVisible();
  });
});

test.describe('public API for an anonymous visitor', () => {
  test.beforeEach(async ({ context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ukn' });
  });

  test('reports no session', async ({ page }) => {
    await openWidget(page);

    expect(await callApi(page, 'isUserAuthenticated')).toBe(false);
    expect(await callApi(page, 'getUserType')).toBe('NONE');
    expect(await callApi(page, 'getCurrentAuthLevel')).toBe('NONE');
  });

  test('changeAppLoginURL rewrites the sign-in link', async ({ page }) => {
    await openWidget(page);

    await callApi(page, 'changeAppLoginURL', 'https://int.post.ch/idp/?login&lang=fr&service=kvm');

    await expect(signInLink(page)).toHaveAttribute(
      'href',
      'https://int.post.ch/idp/?login&lang=fr&service=kvm&app=kvm',
    );
  });

  test('changeAppLoginURL without an argument leaves the link alone', async ({ page }) => {
    await openWidget(page);
    const before = await signInLink(page).getAttribute('href');

    await callApi(page, 'changeAppLoginURL');

    await expect(signInLink(page)).toHaveAttribute('href', before!);
  });

  test('appends only the parameters missing from the login URL', async ({ page }) => {
    await openWidget(page);

    // buildLoginParameters() searches the whole URL rather than its query keys, so "service" and
    // "lang" count as present because they appear anywhere in the string.
    await expect(signInLink(page)).toHaveAttribute(
      'href',
      'https://int.post.ch/idp/?login&lang=de&service=kvm&app=kvm',
    );
  });

  test('keepAliveSessions does nothing without a session', async ({ page }) => {
    await openWidget(page);
    await expectAnonymous(page);

    await callApi(page, 'keepAliveSessions');

    await page.waitForTimeout(250);
    expect((await journal(api)).keepalive).toHaveLength(0);
  });
});

test.describe('keep alive', () => {
  test.beforeEach(async ({ context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
  });

  test('pings both keepalive endpoints and refreshes the control cookie', async ({
    page,
    context,
  }) => {
    await openWidget(page);
    const before = await cookieValue(context, 'NCTRL');

    await callApi(page, 'keepAliveSessions');

    await expect.poll(async () => (await journal(api)).keepalive.length).toBeGreaterThanOrEqual(2);
    const urls = (await journal(api)).keepalive.map(e => (e as { url: string }).url);
    expect(urls.some(u => u.startsWith('/keepalive'))).toBe(true);
    expect(urls.some(u => u.startsWith('/v1/session/keepalive'))).toBe(true);
    expect(await cookieValue(context, 'NCTRL')).not.toBe(before);
  });

  test('notifies a registered keepalive callback and stops after unregistering', async ({
    page,
  }) => {
    await openWidget(page);
    await recordCalls(page);
    await page.evaluate(() =>
      (
        window as unknown as {
          OPPklpWidget: { registerKeepAliveCallback: (c: () => void) => void };
        }
      ).OPPklpWidget.registerKeepAliveCallback(() =>
        (window as unknown as { __calls: string[] }).__calls.push('keepalive'),
      ),
    );

    await callApi(page, 'keepAliveSessions');
    expect(await calls(page)).toEqual(['keepalive']);

    await callApi(page, 'unregisterKeepAliveCallback');
    await callApi(page, 'keepAliveSessions');

    expect(await calls(page)).toEqual(['keepalive']);
  });
});

test.describe('callbacks', () => {
  test.beforeEach(async ({ context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
  });

  test('a login callback fires on a "hi" message but not on the initial subscribe', async ({
    page,
  }) => {
    await openWidget(page);
    await waitForEventBus(api);
    await recordCalls(page);
    await page.evaluate(() =>
      (
        window as unknown as { OPPklpWidget: { registerLoginCallback: (c: () => void) => void } }
      ).OPPklpWidget.registerLoginCallback(() =>
        (window as unknown as { __calls: string[] }).__calls.push('login'),
      ),
    );

    await pushEventBus(api, { typ: 'hi', ttl: 600000, data: B2C });

    await expect.poll(() => calls(page)).toEqual(['login']);
  });

  test('a logout callback fires on a "bye" message', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    await recordCalls(page);
    await page.evaluate(() =>
      (
        window as unknown as { OPPklpWidget: { registerLogoutCallback: (c: () => void) => void } }
      ).OPPklpWidget.registerLogoutCallback(() =>
        (window as unknown as { __calls: string[] }).__calls.push('logout'),
      ),
    );

    await pushEventBus(api, { typ: 'bye' });

    await expect.poll(() => calls(page)).toEqual(['logout']);
  });

  test('a document callback fires for both delivery and removal', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    await recordCalls(page);
    await page.evaluate(() =>
      (
        window as unknown as {
          OPPklpWidget: {
            registerDocumentCallback: (t: string, c: (d: unknown) => void) => void;
          };
        }
      ).OPPklpWidget.registerDocumentCallback('UNREAD_NOTIFICATIONS', d =>
        (window as unknown as { __calls: string[] }).__calls.push(
          d === undefined ? 'removed' : 'received',
        ),
      ),
    );

    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { unreadNotifications: 3 },
    });
    await pushEventBus(api, { typ: 'rem', doctyp: 'UNREAD_NOTIFICATIONS' });

    await expect.poll(() => calls(page)).toEqual(['received', 'removed']);
  });

  test('an unregistered document callback stops firing', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    await recordCalls(page);
    await page.evaluate(() =>
      (
        window as unknown as {
          OPPklpWidget: {
            registerDocumentCallback: (t: string, c: (d: unknown) => void) => void;
          };
        }
      ).OPPklpWidget.registerDocumentCallback('UNREAD_NOTIFICATIONS', () =>
        (window as unknown as { __calls: string[] }).__calls.push('received'),
      ),
    );
    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { unreadNotifications: 3 },
    });
    await expect.poll(() => calls(page)).toEqual(['received']);

    await callApi(page, 'unregisterDocumentCallback', 'UNREAD_NOTIFICATIONS');
    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { unreadNotifications: 4 },
    });

    await page.waitForTimeout(250);
    expect(await calls(page)).toEqual(['received']);
  });

  test('an unregistered login callback stops firing', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    await recordCalls(page);
    await page.evaluate(() =>
      (
        window as unknown as { OPPklpWidget: { registerLoginCallback: (c: () => void) => void } }
      ).OPPklpWidget.registerLoginCallback(() =>
        (window as unknown as { __calls: string[] }).__calls.push('login'),
      ),
    );
    await callApi(page, 'unregisterLoginCallback');

    await pushEventBus(api, { typ: 'hi', ttl: 600000, data: B2C });
    await page.waitForTimeout(250);

    expect(await calls(page)).toEqual([]);
  });

  test('an unregistered logout callback stops firing', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);
    await recordCalls(page);
    await page.evaluate(() =>
      (
        window as unknown as { OPPklpWidget: { registerLogoutCallback: (c: () => void) => void } }
      ).OPPklpWidget.registerLogoutCallback(() =>
        (window as unknown as { __calls: string[] }).__calls.push('logout'),
      ),
    );
    await callApi(page, 'unregisterLogoutCallback');

    await pushEventBus(api, { typ: 'bye' });
    await page.waitForTimeout(250);

    expect(await calls(page)).toEqual([]);
  });
});

test.describe('configuration', () => {
  test.beforeEach(async ({ context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
  });

  test('emits debug logging once debug is switched on', async ({ page }) => {
    const messages: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') messages.push(msg.text());
    });
    await openWidget(page, { options: { debug: true } });

    await callApi(page, 'keepAliveSessions');

    expect(messages.some(m => m.includes('KLP.WIDGET'))).toBe(true);
  });

  test('stays quiet by default and starts logging after setDebug', async ({ page }) => {
    const messages: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') messages.push(msg.text());
    });
    await openWidget(page);
    expect(messages.some(m => m.includes('KLP.WIDGET'))).toBe(false);

    await callApi(page, 'setDebug', true);
    await callApi(page, 'updateWidget', {});

    await expect.poll(() => messages.some(m => m.includes('KLP.WIDGET'))).toBe(true);
  });

  test('renders access keys when they are enabled', async ({ page }) => {
    await openWidget(page, { options: { accessKeys: true } });

    await expect(widget(page).locator('.klp-widget__user')).toHaveAttribute('accesskey', /.+/);
  });

  test('omits access keys by default', async ({ page }) => {
    await openWidget(page);

    await expect(widget(page).locator('.klp-widget__user')).not.toHaveAttribute('accesskey', /.*/);
  });

  test('offsets the tab indexes by the configured base', async ({ page }) => {
    await openWidget(page, { options: { tabIndex: 10 } });

    await expect(widget(page).locator('.klp-widget__user')).toHaveAttribute('tabindex', '10');
    await expect(widget(page).locator('#klp-widget-authenticated-menu-logout')).toHaveAttribute(
      'tabindex',
      '13',
    );
  });
});

test.describe('translations', () => {
  const changeAccountLabel = {
    de: 'Benutzerkonto wechseln',
    fr: 'Changer de compte',
    it: 'Cambia account utente',
    en: 'Change user account',
  };

  for (const lang of Object.keys(changeAccountLabel) as (keyof typeof changeAccountLabel)[]) {
    test(`renders the ${lang} labels`, async ({ page, context }) => {
      await signIn(context);
      await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });

      await openWidget(page, { currentLang: lang });

      await expect(
        widget(page).locator('#klp-widget-authenticated-menu-changecompany'),
      ).toHaveAttribute('title', changeAccountLabel[lang]);
    });
  }
});
