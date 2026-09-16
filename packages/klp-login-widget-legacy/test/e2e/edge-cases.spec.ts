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
} from './fixtures';

let api: APIRequestContext;

test.beforeAll(async () => {
  api = await control();
});

test.beforeEach(async () => {
  await resetScenario(api);
});

test.describe('login URL assembly', () => {
  test.beforeEach(async ({ context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ukn' });
  });

  test('appends every parameter that the login URL does not already mention', async ({ page }) => {
    await openWidget(page, {
      appLoginUrl: 'https://int.post.ch/idp/',
    });

    await expect(widget(page).locator('.klp-widget-anonymous a')).toHaveAttribute(
      'href',
      'https://int.post.ch/idp/?app=kvm&service=kvm&lang=de',
    );
  });

  test('leaves the login URL untouched when it mentions all of them', async ({ page }) => {
    await openWidget(page, {
      appLoginUrl: 'https://int.post.ch/app/service/lang/',
    });

    await expect(widget(page).locator('.klp-widget-anonymous a')).toHaveAttribute(
      'href',
      'https://int.post.ch/app/service/lang/',
    );
  });

  test('sends the visitor to the login URL when the anonymous widget is clicked', async ({
    page,
  }) => {
    await openWidget(page);
    await expectAnonymous(page);

    await widget(page).click();

    await page.waitForURL(/\/idp\//);
  });
});

test.describe('without session storage', () => {
  test.beforeEach(async ({ context, page }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
    // Every access has to throw, which is what a browser with storage blocked does.
    await page.addInitScript(() => {
      Object.defineProperty(window, 'sessionStorage', {
        configurable: true,
        get() {
          throw new Error('storage is blocked');
        },
      });
    });
  });

  test('still renders the session', async ({ page }) => {
    await openWidget(page);

    await expectAuthenticated(page);
  });

  test('skips persisting and clearing the state', async ({ page }) => {
    await openWidget(page);
    await waitForEventBus(api);

    await pushEventBus(api, { typ: 'bye' });

    await expectAnonymous(page);
  });
});

test.describe('audit transport failures', () => {
  test('survives an audit endpoint that refuses the connection', async ({ page, context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c', adt: 'audit-token' });
    await page.route('**/v1/audit', route => route.abort());

    await openWidget(page);

    await expectAuthenticated(page);
  });
});

test.describe('subscribe cancelled by navigation', () => {
  test('keeps the control cookie when the request fails with a TypeError', async ({
    page,
    context,
  }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
    await page.route('**/v1/session/subscribe', route => route.abort());

    await openWidget(page);

    // A cancelled fetch rejects with a TypeError, which the widget treats as navigation rather
    // than an auth failure, so NCTRL has to survive.
    await expectAnonymous(page);
    const cookies = await context.cookies('https://int.post.ch/');
    expect(cookies.find(c => c.name === 'NCTRL')?.value).toBe('0:0');
  });
});

test.describe('keep alive timer', () => {
  test.beforeEach(async ({ context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
  });

  test('pings once the interval elapses and the user has been active', async ({ page }) => {
    await page.clock.install();
    await openWidget(page);
    await expectAuthenticated(page);

    await page.locator('body').dispatchEvent('click');
    await page.clock.runFor(9 * 60 * 1000 + 1000);

    await expect.poll(async () => (await journal(api)).keepalive.length).toBeGreaterThanOrEqual(2);
  });

  test('skips the ping when the user has been idle', async ({ page }) => {
    await page.clock.install();
    await openWidget(page);
    await expectAuthenticated(page);

    // isUserActive starts out true, so the first tick always pings and clears the flag.
    await page.clock.runFor(9 * 60 * 1000 + 1000);
    await expect.poll(async () => (await journal(api)).keepalive.length).toBeGreaterThanOrEqual(2);
    const afterFirstTick = (await journal(api)).keepalive.length;

    await page.clock.runFor(9 * 60 * 1000 + 1000);

    await page.waitForTimeout(250);
    expect((await journal(api)).keepalive).toHaveLength(afterFirstTick);
  });
});

test.describe('resubscribe after a dropped socket', () => {
  test('retries the subscription when the bus closes while a retry is pending', async ({
    page,
    context,
  }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
    await openWidget(page);
    await waitForEventBus(api);

    // The retry triggered by "ukn with sub" has to fail without clearing the retry flag, so it is
    // still set when the socket goes away.
    await setScenario(api, { subscribeMode: 'forbidden' });
    await pushEventBus(api, { typ: 'ukn', sub: true });
    await expect.poll(async () => (await journal(api)).subscribe.length).toBeGreaterThanOrEqual(2);

    const { closed } = await disconnectEventBus(api);
    expect(closed).toBeGreaterThan(0);

    await expect.poll(async () => (await journal(api)).subscribe.length).toBeGreaterThanOrEqual(3);
  });
});

test.describe('mutation observer on the host header', () => {
  test.beforeEach(async ({ context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
  });

  test('collapses the menu when the header becomes sticky but invisible', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    // The observer reads the classes when it runs, so the two changes have to be separate batches.
    await page.evaluate(() => document.querySelector('header')!.classList.add('h-fixed-position'));

    await expect(menu(page)).toBeHidden();
    await expect(widget(page)).not.toHaveClass(/bubble/);
  });

  test('leaves the menu alone while the sticky header is visible', async ({ page }) => {
    await openWidget(page);
    await page.evaluate(() => document.querySelector('header')!.classList.add('h-visible'));
    await openMenu(page);

    await page.evaluate(() => document.querySelector('header')!.classList.add('h-fixed-position'));

    await expect(menu(page)).toBeVisible();
  });
});
