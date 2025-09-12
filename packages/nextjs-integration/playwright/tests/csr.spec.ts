import { expect, test } from '@playwright/test';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';

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

  // Hydration errors should, if at all, only occur on the /ssr route.
  // If a hydration error occurs on the /csr route, something is wrongly implemented in general!
  test('should render without hydration errors', async ({ page }) => {
    const hydrationErrors: string[] = [];
    page.on('pageerror', error => {
      if (error.name === 'Error' && error.message.startsWith('Hydration failed')) {
        hydrationErrors.push(error.message);
      }
    });

    // wait for page hydration
    await page.waitForSelector('[data-hydrated]', { state: 'attached', timeout: 10000 });
    expect(hydrationErrors.length).toBe(0);
  });
});
