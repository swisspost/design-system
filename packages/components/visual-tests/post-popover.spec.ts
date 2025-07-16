import { test, expect } from '@playwright/test';

test.describe('Post Popover Component Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visual-tests/components/post-popover.html');
    await page.waitForLoadState('networkidle');

    await page.waitForFunction(() => {
      return customElements.get('post-popover') && 
             customElements.get('post-popovercontainer');
    });

    await page.waitForTimeout(500);
  });

  test('popover trigger - default state', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await expect(trigger).toHaveScreenshot('popover-trigger-default.png');
  });

  test('popover trigger - hover state', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.hover();
    await page.waitForTimeout(200);
    await expect(trigger).toHaveScreenshot('popover-trigger-hover.png');
  });

  test('popover trigger - focus state', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.focus();
    await page.waitForTimeout(200);
    await expect(trigger).toHaveScreenshot('popover-trigger-focus.png');
  });

  test('popover trigger - active state', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.hover();
    await page.mouse.down();
    await page.waitForTimeout(100);
    await expect(trigger).toHaveScreenshot('popover-trigger-active.png');
    await page.mouse.up();
  });

  test('page with popover closed', async ({ page }) => {
    // Test the whole page when popover is closed
    await expect(page).toHaveScreenshot('page-popover-closed.png');
  });

  test('page with popover opened', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();

    // Wait for popover to be positioned (it exists but needs positioning)
    await page.waitForTimeout(1000);

    // Verify popover is "open" by checking aria-expanded
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Take screenshot of whole page to capture the popover
    await expect(page).toHaveScreenshot('page-popover-opened.png');
  });

  test('popover close button interaction', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);

    // Check that popover is open
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Access close button in shadow DOM
    const closeButtonClicked = await page.evaluate(() => {
      const popover = document.querySelector('post-popover#popover-one');
      const closeButton = popover?.shadowRoot?.querySelector('.btn-close');
      if (closeButton) {
        closeButton.click();
        return true;
      }
      return false;
    });

    console.log('Close button clicked:', closeButtonClicked);

    await page.waitForTimeout(500);

    // Verify popover is closed
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await expect(page).toHaveScreenshot('page-popover-closed-after-interaction.png');
  });

  test('popover close button hover state', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);

    // Hover over close button in shadow DOM
    await page.evaluate(() => {
      const popover = document.querySelector('post-popover#popover-one');
      const closeButton = popover?.shadowRoot?.querySelector('.btn-close');
      if (closeButton) {
        closeButton.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      }
    });

    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('page-popover-close-button-hover.png');
  });

  test('popover close button focus state', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);

    // Focus close button in shadow DOM
    await page.evaluate(() => {
      const popover = document.querySelector('post-popover#popover-one');
      const closeButton = popover?.shadowRoot?.querySelector('.btn-close');
      if (closeButton) {
        closeButton.focus();
      }
    });

    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('page-popover-close-button-focus.png');
  });

  test('keyboard interaction', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');

    // Focus and open with Enter
    await trigger.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);

    // Verify opened
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Tab to close button (should work if properly implemented)
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('page-popover-keyboard-navigation.png');
  });
});
