import { test, expect } from '@playwright/test';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';
import { captureComponentErrors, assertNoComponentErrors } from '../support/component-error-filter';

test.describe('Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');
  });

  test('should render and be visible', async ({ page }) => {
    for (const componentName of componentNames) {
      const component = page.locator(componentName).first();
      if (await component.count() > 0) {
        await expect(component).toBeAttached();
        await expect(component).toBeVisible();
      }
    }
  });

  test('should be hydrated', async ({ page }) => {
    for (const componentName of componentNames) {
      const component = page.locator(componentName).first();
      if (await component.count() > 0) {
        await expect(component).toHaveAttribute('data-hydrated', '', { timeout: 5000 });
      }
    }
  });

  test('should not have console errors', async ({ page }) => {
    const errors = captureComponentErrors(page, componentNames);
    
    await page.goto('/ssr');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    assertNoComponentErrors(errors, componentNames);
  });
});
