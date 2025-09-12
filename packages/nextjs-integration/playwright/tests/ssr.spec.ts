import { expect, test } from '@playwright/test';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';

test.describe('SSR compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');
  });

  test('should contain every component tag at least once', async ({ page }) => {
    for (const componentName of componentNames) {
      const component = page.locator(componentName).first();
      await expect(component).toHaveCount(1);
    }
  });

  // NextJS typically only logs a single hydration error.
  // This means that after an error in one component has been fixed, another one may occur.
  // Make sure you're not hunting ghosts!
  // We skip this test currently, because there are still a lot of hydration errors we need to fix first.
  test('should render without hydration errors', async ({ page }) => {
    const hydrationErrors: string[] = [];
    page.on('pageerror', error => {
      if (error.name === 'Error' && error.message.startsWith('Hydration failed')) {
        hydrationErrors.push(error.message);
      }
    });

    // wait for page hydration
    await page.waitForSelector('[data-hydrated]', { state: 'attached' });
    expect(hydrationErrors.length).toBe(0);
  });
});
