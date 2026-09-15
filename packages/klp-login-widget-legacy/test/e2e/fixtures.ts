import { APIRequestContext, BrowserContext, Page, expect, request } from '@playwright/test';

const PORT = Number(process.env.KLP_PORT ?? 8443);

/** Node-side entry point: the browser's fake DNS does not apply to Playwright's request context. */
const CONTROL_BASE = `https://127.0.0.1:${PORT}`;

/** The real v9 portal config, repointed at the fake API. No prod hostname appears here. */
export const widgetConfig = {
  applicationId: 'kvm',
  serviceId: 'kvm',
  appLoginUrl: 'https://int.post.ch/idp/?login&lang=de&service=kvm',
  currentLang: 'de',
  options: {
    isDebugEnabled: false,
    logoutTargetURL: 'https://int.post.ch/de/',
  },
  platform: {
    endPoint: 'https://int-n.post.ch',
    notificationsEndPoint: 'https://int.post.ch/selfadmin/messages/unreadmessages',
    logoutURL: 'https://int.post.ch/logout/',
    keepAliveURL: 'https://int.post.ch/keepalive',
    autoLoginURL: 'https://int.post.ch/idp/?app=loginwidget',
  },
};

export type WidgetConfig = typeof widgetConfig;

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
    config?: WidgetConfig | null;
    environment?: string;
    showJobsLoginWidget?: boolean;
    logoutUrl?: string;
    selfAdminOrigin?: string;
    /** Set to false for scenarios where the widget never reaches a rendered state. */
    waitForReady?: boolean;
  } = {},
) => {
  const { config = widgetConfig, environment = 'prod', waitForReady = true, ...rest } = opts;
  const params = new URLSearchParams();

  if (config) params.set('config', Buffer.from(JSON.stringify(config)).toString('base64'));
  if (environment) params.set('environment', environment);
  Object.entries(rest).forEach(([key, value]) => {
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

/** Deep-merges into the base config; `options` is what overrides the widget's internal `conf`. */
export const configWith = (overrides: {
  options?: Record<string, unknown>;
  platform?: Record<string, unknown>;
  [key: string]: unknown;
}): WidgetConfig => ({
  ...widgetConfig,
  ...overrides,
  options: { ...widgetConfig.options, ...overrides.options },
  platform: { ...widgetConfig.platform, ...overrides.platform },
});

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
