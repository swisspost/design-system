import { test, expect } from '@playwright/test';

test.describe('Header sticky behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');
    // Wait for header hydration
    await page.waitForSelector('post-header[data-hydrated]');
  });

  test('header remains visible and sticky when scrolling', async ({ page }) => {
    const header = page.locator('post-header');
    // Get initial header position
    const initialBox = await header.boundingBox();
    expect(initialBox!.y).toBe(0);
    expect(initialBox).not.toBeNull();
    await expect(header).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(300);
    const scrolledBox = await header.boundingBox();
    expect(scrolledBox).not.toBeNull();
    await expect(header).toBeVisible();

    // Scroll further
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);
    const finalBox = await header.boundingBox();
    expect(finalBox).not.toBeNull();
    await expect(header).toBeVisible();
  });

  test('header stays visible, logo shrinks on scroll', async ({ page }) => {
    const header = page.locator('post-header');
    const logo = page.locator('post-logo');

    // Wait for hydration
    await expect(header).toHaveAttribute('data-hydrated');
    await expect(logo).toBeVisible();

    // Get initial sizes
    const logoInitial = await logo.boundingBox();
    expect(logoInitial).not.toBeNull();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 700));
    await page.waitForTimeout(300);

    await expect(header).toBeVisible();

    const logoScrolled = await logo.boundingBox();
    expect(logoScrolled).not.toBeNull();
    expect(logoScrolled!.height).toBeLessThan(logoInitial!.height);
  });
});
