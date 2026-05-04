import { expect, test } from '@playwright/test';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';
import {
  setupComponentErrorCapture,
  assertNoComponentErrors,
} from '../support/component-error-filter';

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

  test('all components should be hydrated', async ({ page }) => {
    for (const componentName of componentNames) {
      const component = page.locator(`${componentName}[data-hydrated]`).first();
      await expect(component).toBeAttached();
    }
  });

  test('all components should not have console errors', async ({ page }) => {
    const errorCapture = setupComponentErrorCapture(page, componentNames as string[]);

    await page.reload();

    assertNoComponentErrors(errorCapture.errors, componentNames as string[]);
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

    // wait for page hydration before checking for errors
    await Promise.all(
      (componentNames as string[]).map(componentName =>
        page.locator(`${componentName}[data-hydrated]`).first().waitFor({ state: 'attached' }),
      ),
    );
    await page.waitForLoadState('load');

    if (hydrationErrors.length > 0) {
      test.info().annotations.push({
        type: ' Warning',
        description: `The test detected hydration errors!\n${hydrationErrors.join('\n')}`,
      });
    }
  });
});
