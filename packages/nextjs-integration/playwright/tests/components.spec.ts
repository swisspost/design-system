import { test, expect } from '@playwright/test';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';
import { captureComponentErrors, assertNoComponentErrors } from '../support/component-error-filter';

test.describe('Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');
  });

  test('should render and be attached', async ({ page }) => {
    for (const componentName of componentNames) {
      const component = page.locator(componentName).first();
      if (await component.count() > 0) {
        await expect(component).toBeAttached();
      }
    }
  });

  test('should be hydrated', async ({ page }) => {
    for (const componentName of componentNames) {
      const component = page.locator(componentName).first();
      if ((await component.count()) > 0) {
        await expect(component).toHaveAttribute('data-hydrated', { timeout: 5000 });
      }
    }
  });

  test('should not have component errors (excluding hydration)', async ({ page }) => {
    const errors = captureComponentErrors(page, componentNames);
    
    await page.goto('/ssr');
    await page.waitForLoadState('networkidle');
    
    // This will now only report non-hydration errors
    assertNoComponentErrors(errors, componentNames);
  });
});
