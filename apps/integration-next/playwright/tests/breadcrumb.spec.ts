import { expect, test } from '@playwright/test';

test.describe('post-breadcrumb-item client-side routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');

    // Tag the current window so we can detect whether it survives navigation:
    // a full page reload creates a new window/document, dropping this marker,
    // while a client-side navigation keeps the same window alive.
    await page.evaluate(() => {
      (window as unknown as { __markerAlive: boolean }).__markerAlive = true;
    });
  });

  test('clicking a breadcrumb item with a slotted link navigates client-side, without reloading', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Section 3' }).click();

    await expect(page).toHaveURL(/\/csr$/);

    const markerSurvived = await page.evaluate(
      () => (window as unknown as { __markerAlive?: boolean }).__markerAlive,
    );
    expect(markerSurvived).toBe(true);
  });
});

test.describe('post-logo and post-language-menu-item client-side routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');
    await page.evaluate(() => {
      (window as unknown as { __markerAlive: boolean }).__markerAlive = true;
    });
  });

  test('clicking the logo with a slotted link navigates client-side, without reloading', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Homepage' }).click();

    await expect(page).toHaveURL(/\/csr$/);
    await expect(
      page.evaluate(() => (window as unknown as { __markerAlive?: boolean }).__markerAlive),
    ).resolves.toBe(true);
  });

  test('clicking a language item with a slotted link navigates client-side, without reloading', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'de' }).click();

    await expect(page).toHaveURL(/\/csr$/);
    await expect(
      page.evaluate(() => (window as unknown as { __markerAlive?: boolean }).__markerAlive),
    ).resolves.toBe(true);
  });
});
