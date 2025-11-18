import { expect, test } from '@playwright/test';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';
import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';

test.describe('CSR compatibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/csr');
  });

  for (const componentName of componentNames) {
    const name = componentName;
    test.describe(name, () => {
      test(`Nextjs-integration package should contain the component`, async ({ page }) => {
        const component = page.locator(name).first();
        await expect(component).toHaveCount(1);
      });

      test(`the component should be hydrated`, async ({ page }) => {
        const component = page.locator(`${name}[data-hydrated]`).first();
        await expect(component).toBeAttached();
      });

      test(`the component should not have console errors`, async ({ page }) => {
        const errorCapture = setupComponentErrorCapture(page, [name]);

        await page.reload();

        // Wait for all components to hydrate and any asynchronous errors to surface
        await page.waitForTimeout(500);

        assertNoComponentErrors(errorCapture.errors, [name]);
      });
    });
  }

  // Hydration errors should, if at all, only occur on the /ssr route.
  // If a hydration error occurs here on the /csr route, something is wrongly implemented in general!
  test('should render without hydration errors', async ({ page }) => {
    const hydrationErrors: string[] = [];

    page.on('pageerror', error => {
      if (error.name === 'Error' && error.message.startsWith('Hydration failed')) {
        hydrationErrors.push(error.message);
      }
    });

    const hydratedComponents = await page.locator('[data-hydrated]').all();

    // wait for page hydration before checking for errors
    await Promise.all(
      hydratedComponents.map(component => component.waitFor({ state: 'attached' })),
    );
    await page.waitForLoadState('load');

    expect(hydrationErrors.length).toBe(0);
  });
});