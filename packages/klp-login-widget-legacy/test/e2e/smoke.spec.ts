import { APIRequestContext } from '@playwright/test';
import { expect, test } from './coverage';
import {
  control,
  expectAnonymous,
  expectAuthenticated,
  journal,
  openWidget,
  pushEventBus,
  resetScenario,
  setScenario,
  signIn,
  widget,
  widgetConfig,
} from './fixtures';

let api: APIRequestContext;

test.beforeAll(async () => {
  api = await control();
});

test.beforeEach(async () => {
  await resetScenario(api);
});

test.describe('harness', () => {
  test('runs on a real post.ch origin over https', async ({ page }) => {
    await openWidget(page);
    expect(new URL(page.url()).hostname).toBe('int.post.ch');
    expect(new URL(page.url()).protocol).toBe('https:');
  });

  test('renders the nested shadow-dom chain the legacy code walks', async ({ page }) => {
    await openWidget(page);

    const chain = await page.evaluate(
      () =>
        !!document
          .querySelector('swisspost-internet-header')
          ?.shadowRoot?.querySelector('post-klp-login-widget')
          ?.shadowRoot?.querySelector('.widget-wrapper'),
    );

    expect(chain).toBe(true);
  });
});

test.describe('anonymous', () => {
  test('skips subscribe without NCTRL and renders the login link', async ({ page }) => {
    await openWidget(page);

    await expectAnonymous(page);
    expect((await journal(api)).subscribe).toHaveLength(0);
  });

  test('builds the login url, omitting params already present in appLoginUrl', async ({ page }) => {
    await openWidget(page);

    const href = await widget(page).locator('.klp-widget-anonymous a').getAttribute('href');
    expect(href).toBe(`${widgetConfig.appLoginUrl}&app=kvm`);
  });

  test('subscribes when NCTRL is present and the session is unknown', async ({ page, context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ukn' });

    await openWidget(page);

    await expectAnonymous(page);
    expect((await journal(api)).subscribe.length).toBeGreaterThan(0);
  });
});

test.describe('authenticated', () => {
  test.beforeEach(async ({ context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
  });

  test('renders the user menu for a B2C session', async ({ page }) => {
    await openWidget(page);

    await expectAuthenticated(page);
    await expect(widget(page).locator('.klp-widget-authenticated-session-name')).toHaveText(
      'Andrea\u00a0Chiodoni',
    );
    await expect(widget(page).locator('.initials-mobile')).toHaveText('AC');
  });

  test('shows the company for a B2B session', async ({ page }) => {
    await setScenario(api, { session: 'b2b' });
    await openWidget(page);

    await expect(widget(page).locator('.info')).toHaveText('Post AG');
  });

  test('opens the eventbus and registers on the subscribed address', async ({ page }) => {
    await openWidget(page);

    await expect
      .poll(async () => (await journal(api)).eventbus.some(e => e.event === 'register'))
      .toBe(true);
  });

  test('logs out when the eventbus pushes bye', async ({ page }) => {
    await openWidget(page);
    await expect
      .poll(async () => (await journal(api)).eventbus.some(e => e.event === 'register'))
      .toBe(true);

    await pushEventBus(api, { typ: 'bye' });

    await expectAnonymous(page);
  });
});

test.describe('audit', () => {
  test('stays silent when the subscribe response carries no adt', async ({ page, context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c', adt: null });

    await openWidget(page);
    await expectAuthenticated(page);

    expect((await journal(api)).audit).toHaveLength(0);
  });

  test('posts {adr, evt} when the subscribe response carries adt', async ({ page, context }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c', adt: 1715180400000 });

    await openWidget(page);
    await expectAuthenticated(page);

    await expect.poll(async () => (await journal(api)).audit.length).toBeGreaterThan(0);
    const [first] = (await journal(api)).audit;

    // Was a v9 defect: audit() ran before the 'sub' branch assigned the address, so adr was
    // undefined and the one event the server could bind the subscription with went out anonymous.
    expect(first.body.adr).toBe('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    expect(first.body.evt).toMatchObject({ typ: 'sub', adt: 1715180400000 });
  });

  test('carries adr on audit events that arrive after the subscription', async ({
    page,
    context,
  }) => {
    await signIn(context);
    await setScenario(api, { subscribeMode: 'ok', session: 'b2c', adt: 1715180400000 });

    await openWidget(page);
    await expect
      .poll(async () => (await journal(api)).eventbus.some(e => e.event === 'register'))
      .toBe(true);

    await pushEventBus(api, {
      typ: 'doc',
      doctyp: 'UNREAD_NOTIFICATIONS',
      doc: { count: 3 },
      adt: 1715180400001,
    });

    await expect.poll(async () => (await journal(api)).audit.length).toBeGreaterThan(1);
    const latest = (await journal(api)).audit.at(-1)!;
    expect(latest.body.adr).toBe('a1b2c3d4-e5f6-7890-abcd-ef1234567890');
  });
});
