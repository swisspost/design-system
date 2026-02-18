import { test, expect } from '@playwright/test';

test.describe('Sticky header behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');

    await page.waitForSelector('post-header[data-hydrated]');
    await page.waitForLoadState('networkidle');
  });

  test('header remains visible and sticky when scrolling', async ({ page }) => {
    const header = page.locator('post-header');

    // Capture initial header position (should start at top of viewport)
    const initialBox = await header.boundingBox();
    expect(initialBox).not.toBeNull();
    expect(initialBox!.y).toBe(0);

    // Scroll down using mouse wheel to simulate real user scrolling
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, 400);
      await page.waitForTimeout(20);
    }
    expect(initialBox!.y).toBe(0);

    // Scroll back up
    for (let i = 0; i < 10; i++) {
      await page.mouse.wheel(0, -400);
      await page.waitForTimeout(20);
    }

    // After scrolling back up, the header should still remain pinned
    const headerBox = await header.boundingBox();
    expect(headerBox).not.toBeNull();

    expect(headerBox!.y).toBe(0);
  });
});
