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

  test('page with popover closed', async ({ page }) => {
    await expect(page).toHaveScreenshot('page-popover-closed.png');
  });

  test('page with popover opened', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('page-popover-opened.png');
  });

  test('page with popover opened - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('page-popover-opened-mobile.png');
  });

  test('page with popover opened - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('page-popover-opened-tablet.png');
  });

  test('page with popover opened - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('page-popover-opened-desktop.png');
  });

  test('popover - positioning near bottom edge (should render upward)', async ({ page }) => {
    await page.locator('.d-flex').evaluate((el: HTMLElement) => {
      el.style.position = 'fixed';
      el.style.bottom = '20px';
      el.style.left = '50%';
      el.style.transform = 'translateX(-50%)';
    });

    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('popover-positioning-bottom-edge.png');
  });

  test('popover close button - default state', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('popover-close-button-default.png');
  });

  test('popover close button - hover state', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      const popover = document.querySelector('post-popover#popover-one');
      const closeButton = popover?.shadowRoot?.querySelector('.btn-close');
      if (closeButton) {
        closeButton.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      }
    });

    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('popover-close-button-hover.png');
  });

  test('popover close button - focus state', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);

    await page.evaluate(() => {
      const popover = document.querySelector('post-popover#popover-one');
      const closeButton = popover?.shadowRoot?.querySelector('.btn-close');
      if (closeButton && closeButton instanceof HTMLButtonElement) {
        closeButton.focus();
      }
    });

    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('popover-close-button-focus.png');
  });

  test('keyboard navigation - trigger focused', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.focus();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('keyboard-nav-trigger-focused.png');
  });

  test('keyboard navigation - popover opened via keyboard', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('keyboard-nav-popover-opened.png');
  });

  test('keyboard navigation - close button focused', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('keyboard-nav-close-button-focused.png');
  });

  test('keyboard navigation - link focused', async ({ page }) => {
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('keyboard-nav-link-focused.png');
  });

  test('popover - with long content', async ({ page }) => {
    await page.evaluate(() => {
      const popover = document.querySelector('post-popover#popover-one');
      if (popover) {
        popover.innerHTML = `
          <h2 class="h6">Very Long Title That Should Wrap Properly In The Popover</h2>
          <p class="mb-0">
            This is a very long paragraph that should test the max-width constraints 
            and wrapping behavior of the popover component. It should not exceed 
            the viewport boundaries and should wrap text appropriately. This content
            is intentionally verbose to test overflow scenarios.
            <a href="#">This is a very long link text that might cause layout issues</a>
          </p>
        `;
      }
    });
    
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('popover-long-content.png');
  });

  test('popover - with minimal content', async ({ page }) => {
    await page.evaluate(() => {
      const popover = document.querySelector('post-popover#popover-one');
      if (popover) {
        popover.innerHTML = '<p class="mb-0">Short text</p>';
      }
    });
    
    const trigger = page.locator('button[data-popover-target="popover-one"]');
    await trigger.click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('popover-minimal-content.png');
  });
});
