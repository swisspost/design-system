import { test, expect } from '@playwright/test';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';
import {
  setupComponentErrorCapture,
  assertNoComponentErrors,
} from '../support/component-error-filter';

test.describe('components-angular (consumer-app)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('components-angular: should contain all components', async ({ page }) => {
    for (const componentName of componentNames) {
      await expect(page.locator(componentName).first()).toBeAttached();
    }
  });

  test('components-angular: all components should be hydrated', async ({ page }) => {
    for (const componentName of componentNames) {
      await expect(page.locator(`${componentName}.hydrated`).first()).toBeAttached();
    }
  });

  test('components-angular: should not have console errors', async ({ page }) => {
    const errorCapture = setupComponentErrorCapture(page, componentNames as string[]);

    await page.reload();

    for (const componentName of componentNames) {
      await page.locator(`${componentName}.hydrated`).first().waitFor({ state: 'attached' });
    }

    errorCapture.dispose();
    assertNoComponentErrors(errorCapture.errors, componentNames as string[]);
    expect(errorCapture.errors.length).toBe(0);
  });

  test('post-logo: clicking a slotted link navigates client-side, without reloading', async ({
    page,
  }) => {
    await page.evaluate(() => {
      (window as unknown as { __markerAlive: boolean }).__markerAlive = true;
    });

    await page.locator('post-logo > a[href="/home"]').click();

    await expect(page).toHaveURL(/\/home$/);
    await expect(
      page.evaluate(() => (window as unknown as { __markerAlive?: boolean }).__markerAlive),
    ).resolves.toBe(true);
  });

  test('post-language-menu-item: clicking a slotted link navigates client-side, without reloading', async ({
    page,
  }) => {
    await page.evaluate(() => {
      (window as unknown as { __markerAlive: boolean }).__markerAlive = true;
    });

    await page.locator('post-language-menu-item > a[href="/home?lang=de"]').first().click();

    await expect(page).toHaveURL(/\/home\?lang=de$/);
    await expect(
      page.evaluate(() => (window as unknown as { __markerAlive?: boolean }).__markerAlive),
    ).resolves.toBe(true);
  });
});
