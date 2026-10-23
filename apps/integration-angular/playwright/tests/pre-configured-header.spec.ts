import { expect, Page, test } from '@playwright/test';
import testConfiguration from '@swisspost/internet-header/dist/swisspost-internet-header/assets/config/test-configuration.json';
import { blockKlpPlatform } from '../support/klp-platform';

const API_ACCOUNT_SWITCH = 'Switch account (from the API)';

function collectApiRequests(page: Page) {
  const urls: URL[] = [];
  page.on('request', request => {
    if (request.url().includes('/api/header')) urls.push(new URL(request.url()));
  });
  return urls;
}

test.describe('Pre-configured header', () => {
  test.beforeEach(async ({ page }) => {
    await blockKlpPlatform(page);
  });

  test('should take its config from the script tag without calling the API', async ({ page }) => {
    const apiRequests = collectApiRequests(page);
    await page.goto('/pre-configured-header/script-config');

    await expect(page.locator('post-klp-login-widget [slot="account-switch"]')).toHaveText(
      testConfiguration.header.globalHeader.postLogin.accountSwitch.text,
    );
    expect(apiRequests).toHaveLength(0);
  });

  test('should fetch its config from the int02 header API', async ({ page }) => {
    // Answered locally, so the test does not depend on the availability of the API.
    const apiConfig = structuredClone(testConfiguration);
    apiConfig.header.globalHeader.postLogin.accountSwitch.text = API_ACCOUNT_SWITCH;
    await page.route('**/api/header?*', route =>
      route.fulfill({ json: apiConfig, headers: { 'access-control-allow-origin': '*' } }),
    );
    const apiRequests = collectApiRequests(page);

    await page.goto('/pre-configured-header/api-config');

    await expect(page.locator('post-klp-login-widget [slot="account-switch"]')).toHaveText(
      API_ACCOUNT_SWITCH,
    );
    expect(apiRequests).toHaveLength(1);
    expect(apiRequests[0].searchParams.get('serviceId')).toBe('design-system');
    expect(apiRequests[0].searchParams.get('environment')).toBe('INT02');
  });
});
