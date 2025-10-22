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

  test('should not have runtime errors after hydration', async ({ page }) => {
    // Wait for hydration to complete
    const hydratedComponents = await page.locator('[data-hydrated]').all();
    await Promise.all(
      hydratedComponents.map(component =>
        component.waitFor({ state: 'attached', timeout: 5000 }),
      ),
    );

    const errors = captureComponentErrors(page, componentNames);

    await page.waitForTimeout(2000);

    assertNoComponentErrors(errors, componentNames);
  });
});
