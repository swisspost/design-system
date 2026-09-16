import { APIRequestContext, BrowserContext, Page, expect, request } from '@playwright/test';
import { Environment } from '../../src/models/general.model';

const PORT = Number(process.env.KLP_PORT ?? 8443);

/** Node-side entry point: the browser's fake DNS does not apply to Playwright's request context. */
const CONTROL_BASE = `https://127.0.0.1:${PORT}`;

/** KLP session platform root per stage; the unlisted stages share int1 until their hosts are known. */
const KLP_BASE_URLS: Record<Environment, string> = {
  dev01: 'https://n.accountint1.post.ch',
  dev02: 'https://n.accountint1.post.ch',
  devs1: 'https://n.accountint1.post.ch',
  test: 'https://n.accountint1.post.ch',
  int01: 'https://n.accountint1.post.ch',
  int02: 'https://n.accountint2.post.ch',
  prod: 'https://n.account.post.ch',
};

/** The portal itself only tells int from prod for its own host. */
const portalHost = (environment: Environment) =>
  environment === 'prod' ? 'post.ch' : 'int.post.ch';

/**
 * The real v9 portal config, derived entirely from the target stage so a single `environment`
 * switch repoints every module. Every host resolves to the fake API under the suite's faked DNS.
 */
export const configForEnvironment = (environment: Environment) => {
  const host = portalHost(environment);
  return {
    applicationId: 'kvm',
    serviceId: 'kvm',
    appLoginUrl: `https://${host}/idp/?login&lang=de&service=kvm`,
    currentLang: 'de',
    options: {
      isDebugEnabled: false,
      logoutTargetURL: `https://${host}/de/`,
    },
    platform: {
      endPoint: KLP_BASE_URLS[environment],
      notificationsEndPoint: `https://${host}/selfadmin/messages/unreadmessages`,
      logoutURL: `https://${host}/logout/`,
      keepAliveURL: `https://${host}/keepalive`,
      autoLoginURL: `https://${host}/idp/?app=loginwidget`,
    },
  };
};

/** Everything defaults to int01; pass a different `environment` to openWidget to repoint it. */
export const widgetConfig = configForEnvironment('int01');

export type WidgetConfig = ReturnType<typeof configForEnvironment>;

export const control = async (): Promise<APIRequestContext> =>
  request.newContext({ baseURL: CONTROL_BASE, ignoreHTTPSErrors: true });

export const resetScenario = async (api: APIRequestContext) => {
  await api.post('/__control/reset');
};

export const setScenario = async (api: APIRequestContext, scenario: Record<string, unknown>) => {
  await api.post('/__control/scenario', { data: scenario });
};

export const pushEventBus = async (
  api: APIRequestContext,
  message: unknown,
  replyAddress?: string,
) => {
  const res = await api.post('/__control/push', { data: { message, replyAddress } });
  return (await res.json()) as { delivered: number };
};

export const journal = async (api: APIRequestContext) => {
  const res = await api.get('/__control/journal');
  return (await res.json()) as {
    subscribe: unknown[];
    keepalive: unknown[];
    audit: { body: { adr?: string; evt: Record<string, unknown> } }[];
    eventbus: { event: string; address?: string; sessionID?: string }[];
  };
};

const postChCookie = (name: string, value: string) => ({
  name,
  value,
  domain: '.post.ch',
  path: '/',
  secure: true,
  sameSite: 'None' as const,
});

/** NSESSIONID is handed out by the IdP; NCTRL is what makes `trySubscription()` return true. */
export const signIn = async (context: BrowserContext) => {
  await context.addCookies([
    postChCookie('NSESSIONID', 'test-session-id'),
    postChCookie('NCTRL', '0:0'),
  ]);
};

export const openWidget = async (
  page: Page,
  opts: {
    environment?: Environment;
    /** Non-URL toggles merged onto the stage's `options` (debug, accessKeys, tabIndex). */
    options?: Record<string, unknown>;
    currentLang?: string;
    /** Narrow escape hatch for the login-URL assembly tests only. */
    appLoginUrl?: string;
    showJobsLoginWidget?: boolean;
    logoutUrl?: string;
    selfAdminOrigin?: string;
    /** Set to false for scenarios where the widget never reaches a rendered state. */
    waitForReady?: boolean;
  } = {},
) => {
  const {
    environment = 'int01',
    options,
    currentLang,
    appLoginUrl,
    showJobsLoginWidget,
    logoutUrl,
    selfAdminOrigin,
    waitForReady = true,
  } = opts;

  const base = configForEnvironment(environment);
  const config = {
    ...base,
    ...(currentLang === undefined ? {} : { currentLang }),
    ...(appLoginUrl === undefined ? {} : { appLoginUrl }),
    ...(options === undefined ? {} : { options: { ...base.options, ...options } }),
  };

  const params = new URLSearchParams();
  params.set('config', Buffer.from(JSON.stringify(config)).toString('base64'));
  params.set('environment', environment);
  Object.entries({ showJobsLoginWidget, logoutUrl, selfAdminOrigin }).forEach(([key, value]) => {
    if (value !== undefined && value !== false) params.set(key, String(value));
  });

  await page.goto(`/index.html?${params}`);
  if (waitForReady) {
    await page.waitForFunction(() => (window as unknown as WidgetReady).__widgetReadyCount > 0);
  }
};

interface WidgetReady {
  __widgetReadyCount: number;
}

export const widgetReadyCount = (page: Page) =>
  page.evaluate(() => (window as unknown as WidgetReady).__widgetReadyCount);

/** Playwright's CSS engine pierces open shadow roots, so the nested roots need no special handling. */
export const widget = (page: Page) => page.locator('#post-klp-login-widget');

export const expectAnonymous = async (page: Page) => {
  await expect(widget(page).locator('.klp-widget-anonymous')).toBeVisible();
};

export const expectAuthenticated = async (page: Page) => {
  await expect(widget(page).locator('.klp-widget-authenticated')).toBeVisible();
};

export const cookieValue = async (context: BrowserContext, name: string) => {
  const cookies = await context.cookies('https://int.post.ch/');
  return cookies.find(c => c.name === name)?.value;
};

export const disconnectEventBus = async (api: APIRequestContext) => {
  const res = await api.post('/__control/disconnect');
  return (await res.json()) as { closed: number };
};

export const menuToggler = (page: Page) => widget(page).locator('.klp-widget__user');
export const menu = (page: Page) => widget(page).locator('.klp-widget-authenticated-menu');
export const changeAccountLink = (page: Page) =>
  widget(page).locator('#klp-widget-authenticated-menu-changecompany');
export const logoutLink = (page: Page) =>
  widget(page).locator('#klp-widget-authenticated-menu-logout');

export const openMenu = async (page: Page) => {
  await menuToggler(page).click();
  await expect(menu(page)).toBeVisible();
};

/** Waits for the widget to finish registering on the EventBus address. */
export const waitForEventBus = async (api: APIRequestContext) => {
  await expect
    .poll(async () => (await journal(api)).eventbus.some(e => e.event === 'register'))
    .toBe(true);
};

/** Calls a method on the public window.OPPklpWidget API and returns its result. */
export const callApi = <T>(page: Page, method: string, ...args: unknown[]) =>
  page.evaluate(
    ({ method, args }) => {
      const api = (window as unknown as Record<string, Record<string, (...a: unknown[]) => T>>)
        .OPPklpWidget;
      return api[method](...args);
    },
    { method, args },
  );
