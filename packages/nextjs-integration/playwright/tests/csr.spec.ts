import { expect, test } from '@playwright/test';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';
import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';

test.describe('CSR compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/csr');
  });

  test('should contain every component tag at least once', async ({ page }) => {
    for (const componentName of componentNames) {
      const component = page.locator(componentName).first();
      await expect(component).toHaveCount(1);
    }
  });

  test('should render and be attached (hydrated)', async ({ page }) => {
    for (const componentName of componentNames) {
      const component = page.locator(`${componentName}[data-hydrated]`).first();
      await expect(component).toBeAttached();
    }
  });

  // Hydration errors should, if at all, only occur on the /ssr route.
  // If a hydration error occurs on the /csr route, something is wrongly implemented in general!
  test('should render without hydration errors', async ({ page }) => {
    const hydrationErrors: string[] = [];

    page.on('pageerror', error => {
      if (error.name === 'Error' && error.message.startsWith('Hydration failed')) {
        hydrationErrors.push(error.message);
      }
    });

    // Wait for page hydration
    await page.waitForSelector('[data-hydrated]', { state: 'attached', timeout: 10000 });

    expect(hydrationErrors.length).toBe(0);
  });

  test('should not have console errors from components', async ({ page }) => {
    const errorCapture = setupComponentErrorCapture(page, componentNames);

    await page.goto('/csr');

    // Wait for all components to hydrate and any asynchronous errors to surface
    await page.waitForTimeout(500);

    assertNoComponentErrors(errorCapture.errors, componentNames);
  });
});