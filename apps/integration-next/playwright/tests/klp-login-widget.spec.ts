import { expect, Page, test } from '@playwright/test';
import testConfiguration from '@swisspost/internet-header/dist/swisspost-internet-header/assets/config/test-configuration.json';
import { blockKlpPlatform } from '../support/klp-platform';

interface SignedInUser {
  fullName: string;
  company?: string;
  accountSwitch: boolean;
  companySwitch: boolean;
}

// `?klpmock` swaps the KLP platform for the playground mock, `session` picks its user (see
// `packages/components/src/playground/klp-platform-mock.js`). Without it the platform is blocked.
const SESSIONS: { name: string; query: string; user?: SignedInUser }[] = [
  { name: 'anonymous without the mock', query: '' },
  { name: 'anonymous with the mock', query: '?klpmock&session=nobody' },
  {
    name: 'B2C',
    query: '?klpmock&session=alan',
    user: { fullName: 'Alan Turing', accountSwitch: false, companySwitch: false },
  },
  {
    name: 'B2B multi account',
    query: '?klpmock&session=ada',
    user: {
      fullName: 'Ada Lovelace',
      company: 'Analytical Engines AG',
      accountSwitch: true,
      companySwitch: false,
    },
  },
  {
    name: 'B2B multi company',
    query: '?klpmock&session=grace',
    user: {
      fullName: 'Grace Hopper',
      company: 'Naval Systems AG',
      accountSwitch: false,
      companySwitch: true,
    },
  },
];

const PAGES: { name: string; path: string; api?: boolean }[] = [
  { name: 'self-managed header (SSR)', path: '/ssr' },
  { name: 'self-managed header (CSR)', path: '/csr' },
  {
    name: 'pre-configured header with script config',
    path: '/pre-configured-header/script-config',
  },
  {
    name: 'pre-configured header with API config',
    path: '/pre-configured-header/api-config',
    api: true,
  },
];

async function expectSession(page: Page, user?: SignedInUser) {
  const widget = page.locator('post-klp-login-widget');
  const loginLink = widget.locator('[slot="login-link"]');
  const trigger = widget.locator('post-menu-trigger button');

  if (!user) {
    await expect(loginLink).toBeVisible();
    await expect(trigger).toHaveCount(0);
    return;
  }

  await expect(trigger).toBeVisible();
  await expect(loginLink).toBeHidden();

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  const menuHeader = widget.locator('post-menu [slot="header"]');
  await expect(menuHeader).toContainText(user.fullName);
  if (user.company) await expect(menuHeader).toContainText(user.company);

  const accountSwitch = widget.locator('[slot="account-switch"]');
  const companySwitch = widget.locator('[slot="company-switch"]');
  await (user.accountSwitch
    ? expect(accountSwitch).toBeVisible()
    : expect(accountSwitch).toBeHidden());
  await (user.companySwitch
    ? expect(companySwitch).toBeVisible()
    : expect(companySwitch).toBeHidden());
  await expect(widget.locator('[slot="logout-link"]')).toBeVisible();
}

test.describe('KLP login widget sessions', () => {
  test.beforeEach(async ({ page }) => {
    await blockKlpPlatform(page);
    // Answered locally, so the API config page does not depend on the availability of the API.
    await page.route('**/api/header?*', route =>
      route.fulfill({ json: testConfiguration, headers: { 'access-control-allow-origin': '*' } }),
    );
  });

  for (const { name: pageName, path } of PAGES) {
    test.describe(pageName, () => {
      for (const { name, query, user } of SESSIONS) {
        test(`should show the ${name} session`, async ({ page }) => {
          await page.goto(`${path}${query}`);
          await expectSession(page, user);
        });
      }
    });
  }
});
