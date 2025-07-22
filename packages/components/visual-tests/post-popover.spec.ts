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

  const getTrigger = (page) => page.locator('button[data-popover-target="popover-one"]');
  
  const openPopover = async (page) => {
    await getTrigger(page).click();
    await page.waitForTimeout(1000);
  };

  const setContent = async (page, content) => {
    await page.evaluate((htmlContent) => {
      const popover = document.querySelector('post-popover#popover-one');
      if (popover) {
        popover.innerHTML = htmlContent;
      }
    }, content);
  };

  test.describe('Trigger States', () => {
    test('default state', async ({ page }) => {
      const trigger = getTrigger(page);
      await expect(trigger).toHaveScreenshot('popover-trigger-default.png');
    });
    
    test('hover state', async ({ page }) => {
      const trigger = getTrigger(page);
      await trigger.hover();
      await page.waitForTimeout(200);
      await expect(trigger).toHaveScreenshot('popover-trigger-hover.png');
    });

    test('focus state', async ({ page }) => {
      const trigger = getTrigger(page);
      await trigger.focus();
      await page.waitForTimeout(200);
      await expect(trigger).toHaveScreenshot('popover-trigger-focus.png');
    });
  });

  test.describe('Basic Popover Functionality', () => {
    test('closed state', async ({ page }) => {
      await expect(page).toHaveScreenshot('page-popover-closed.png');
    });

    test('opened state', async ({ page }) => {
      await openPopover(page);
      await expect(page).toHaveScreenshot('page-popover-opened.png');
    });
  });

  test.describe('Responsive Behavior', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];

    viewports.forEach(({ name, width, height }) => {
      test(`${name} viewport`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await openPopover(page);
        await expect(page).toHaveScreenshot(`page-popover-opened-${name}.png`);
      });
    });
  });

  test.describe('Positioning', () => {
    test('near bottom edge - should render upward', async ({ page }) => {
      await page.locator('.d-flex').evaluate((el) => {
        el.style.position = 'fixed';
        el.style.bottom = '20px';
        el.style.left = '50%';
        el.style.transform = 'translateX(-50%)';
      });

      await openPopover(page);
      await expect(page).toHaveScreenshot('popover-positioning-bottom-edge.png');
    });
  });

  test.describe('Close Button States', () => {
    test.beforeEach(async ({ page }) => {
      await openPopover(page);
    });

    test('default state', async ({ page }) => {
      await expect(page).toHaveScreenshot('popover-close-button-default.png');
    });

    test('hover state', async ({ page }) => {
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

    test('focus state', async ({ page }) => {
      await page.evaluate(() => {
        const popover = document.querySelector('post-popover#popover-one');
        const closeButton = popover?.shadowRoot?.querySelector('.btn-close');
        if (closeButton instanceof HTMLButtonElement) {
          closeButton.focus();
        }
      });

      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot('popover-close-button-focus.png');
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('trigger focused', async ({ page }) => {
      await getTrigger(page).focus();
      await page.waitForTimeout(200);
      await expect(page).toHaveScreenshot('keyboard-nav-trigger-focused.png');
    });

    test('popover opened via keyboard', async ({ page }) => {
      const trigger = getTrigger(page);
      await trigger.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      await expect(page).toHaveScreenshot('keyboard-nav-popover-opened.png');
    });

    test('link focused inside popover', async ({ page }) => {
      const trigger = getTrigger(page);
      await trigger.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('keyboard-nav-link-focused.png');
    });

    test('close button focused via tab navigation', async ({ page }) => {
      const trigger = getTrigger(page);
      await trigger.focus();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(1000);
      
      // Tab to link, then to close button
      await page.keyboard.press('Tab');
      await page.waitForTimeout(300);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('keyboard-nav-close-button-focused.png');
    });
  });

  test.describe('Content Variations', () => {
    test('with long content', async ({ page }) => {
      const longContent = `
        <h2 class="h6">Very Long Title That Should Wrap Properly In The Popover</h2>
        <p class="mb-0">
          This is a very long paragraph that should test the max-width constraints 
          and wrapping behavior of the popover component. It should not exceed 
          the viewport boundaries and should wrap text appropriately. This content
          is intentionally verbose to test overflow scenarios.
          <a href="#">This is a very long link text that might cause layout issues</a>
        </p>
      `;
      
      await setContent(page, longContent);
      await openPopover(page);
      await expect(page).toHaveScreenshot('popover-long-content.png');
    });

    test('with minimal content', async ({ page }) => {
      await setContent(page, '<p class="mb-0">Short text</p>');
      await openPopover(page);
      await expect(page).toHaveScreenshot('popover-minimal-content.png');
    });
  });
});
