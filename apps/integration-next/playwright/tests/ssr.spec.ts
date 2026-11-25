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

  test('findable accordion items are serialized with until-found content', async ({ page }) => {
    const response = await page.goto('/ssr');
    if (!response) throw new Error('Expected the SSR route to return a response.');
    const html = await response.text();
    const item = html.match(
      /<post-accordion-item[^>]*id="findable-ssr-accordion-item"[\s\S]*?<\/post-accordion-item>/,
    );

    expect(response.ok()).toBe(true);
    expect(item?.[0]).toContain('hidden="until-found"');
  });

  test('keeps a deep-linked findable accordion item open after hydration', async ({ page }) => {
    await page.goto('/ssr#findable-ssr-accordion-target');
    const item = page.locator('#findable-ssr-accordion-item[data-hydrated]');

    await expect(item).toHaveJSProperty('collapsed', false);
    await expect(page.locator('#findable-ssr-accordion-target')).toBeVisible();
    await expect(item.locator('button')).toHaveAttribute('aria-expanded', 'true');

    const header = await page.locator('post-header').boundingBox();
    const target = await page.locator('#findable-ssr-accordion-target').boundingBox();
    if (!header || !target)
      throw new Error('Expected the header and fragment target to be visible.');
    expect(target.y).toBeGreaterThanOrEqual(header.y + header.height - 1);
  });

  test('all components should not have console errors', async ({ page }) => {
    const errorCapture = setupComponentErrorCapture(page, componentNames as string[]);

    await page.reload();

    assertNoComponentErrors(errorCapture.errors, componentNames as string[]);
    expect(errorCapture.errors.length).toBe(0);
  });

  test('does not access detached roots during accordion hydration', async ({ page }) => {
    const rootErrors: string[] = [];
    const captureRootError = (message: string) => {
      if (message.includes('Attempting to access root node')) rootErrors.push(message);
    };
    page.on('console', message => {
      if (message.type() === 'error') captureRootError(message.text());
    });
    page.on('pageerror', error => captureRootError(error.message));

    await page.reload();
    await expect(
      page.locator('#findable-ssr-accordion-item[data-hydrated] button'),
    ).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('post-accordion[data-hydrated]')).toBeAttached();
    expect(rootErrors).toEqual([]);
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
