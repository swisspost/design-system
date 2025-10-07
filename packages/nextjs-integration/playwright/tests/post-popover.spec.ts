import { test, expect, Locator } from '@playwright/test';
import { PostPopover } from '@swisspost/design-system-components/dist/components/react/post-popover.js';
import AxeBuilder from '@axe-core/playwright';

test.describe('popover', () => {
  let trigger: Locator;
  let popover: Locator;
  let popoverContent: Locator;
  let triggerButton: Locator;
  let closeButton: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');

    // Assign locators using the page instance
    trigger = page.locator('post-popover-trigger[data-hydrated][for="popover-one"]');
    popover = page.locator('post-popover');
    popoverContent = page.locator('#popovertest');
    triggerButton = page.locator('post-popover-trigger[data-hydrated][for="popover-one"] button');
    closeButton = popover.locator('.btn-close');
  });

  test('should contain an HTML element inside the trigger, not just plain text', async () => {
    const childrenCount = await trigger.locator('> *').count();
    expect(childrenCount).toBeGreaterThanOrEqual(1);
  });

  test('should show up on click', async () => {
    await expect(popoverContent).toBeHidden();
    await expect(triggerButton).toHaveAttribute('aria-expanded', 'false');

    await triggerButton.click();
    await expect(popoverContent).toBeVisible();
    await expect(triggerButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should show up when clicking on a nested element inside the trigger', async () => {
    await triggerButton.evaluate(el => {
      const originalText = el.textContent;
      el.innerHTML = `<span class="nested-element">${originalText}</span>`;
    });

    await expect(popoverContent).toBeHidden();
    await expect(triggerButton).toHaveAttribute('aria-expanded', 'false');

    await trigger.locator('.nested-element').click();
    await expect(popoverContent).toBeVisible();
    await expect(triggerButton).toHaveAttribute('aria-expanded', 'true');

    await closeButton.click();
    await expect(popoverContent).toBeHidden();
    await expect(triggerButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should show up when clicking on a deeply nested element inside the trigger', async () => {
    await triggerButton.evaluate(el => {
      const originalText = el.textContent;
      el.innerHTML = `
          <div class="level-1">
            <div class="level-2">
              <span class="level-3">${originalText}</span>
            </div>
          </div>
        `;
    });

    await expect(popoverContent).toBeHidden();
    await trigger.locator('.level-3').click();
    await expect(popoverContent).toBeVisible();
    await expect(triggerButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should close on X click', async () => {
    await triggerButton.click();
    await expect(popoverContent).toBeVisible();
    await closeButton.click();
    await expect(popoverContent).toBeHidden();
  });

  test('should open on enter', async () => {
    await expect(popoverContent).toBeHidden();
    await triggerButton.focus();
    await triggerButton.press('Enter');
    await expect(popoverContent).toBeVisible();
  });

  test('should open and close with the API', async () => {
    const triggerEl = await trigger.elementHandle();
    const popoverEl = await popover.elementHandle();

    await expect(popoverContent).toBeHidden();

    if (triggerEl && popoverEl) {
      await popoverEl.evaluate((el, trigger) => {
        (el as PostPopover).show(trigger as HTMLElement);
      }, triggerEl);
    }

    await expect(popoverContent).toBeVisible();

    if (triggerEl && popoverEl) {
      await popoverEl.evaluate(el => {
        (el as PostPopover).hide();
      }, triggerEl);
    }

    await expect(popoverContent).toBeHidden();

    if (triggerEl && popoverEl) {
      await popoverEl.evaluate((el, trigger) => {
        (el as PostPopover).toggle(trigger as HTMLElement);
      }, triggerEl);
    }

    await expect(popoverContent).toBeVisible();

    if (triggerEl && popoverEl) {
      await popoverEl.evaluate((el, trigger) => {
        (el as PostPopover).toggle(trigger as HTMLElement);
      }, triggerEl);
    }
    await expect(popoverContent).toBeHidden();
  });

  test('should switch position', async () => {
    const popoverEl = await popover.elementHandle();

    if (popoverEl) await popoverEl.evaluate(el => el.setAttribute('placement', 'top'));

    await expect(popover).toBeHidden();

    const [triggerBox, popoverBox] = await Promise.all([
      trigger.boundingBox(),
      popover.boundingBox(),
    ]);

    if (triggerBox && popoverBox) {
      expect(triggerBox.y).toBeLessThan(popoverBox.y);
    }
  });

  // Accessibility check
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/ssr');

    const popoverAccessibility = await new AxeBuilder({ page }).include('post-popover').analyze();

    expect(popoverAccessibility.violations).toEqual([]);
  });
});
