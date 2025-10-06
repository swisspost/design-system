import { test, expect, Locator } from '@playwright/test';

test.describe('popover', () => {
  let trigger: Locator;
  let popover: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');

    // Assign locators using the page instance
    trigger = page.locator('post-popover-trigger[data-hydrated][for="popover-one"]');
    popover = page.locator('#popovertest');
  });

  test('should contain an HTML element inside the trigger, not just plain text', async () => {
    const childrenCount = await trigger.locator('> *').count();
    expect(childrenCount).toBeGreaterThanOrEqual(1);
  });

  test('should show up on click', async () => {
    await expect(popover).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.click();
    await expect(popover).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('should show up when clicking on a nested element inside the trigger', async () => {
    await trigger.evaluate(el => {
      const originalText = el.textContent;
      el.innerHTML = `<span class="nested-element">${originalText}</span>`;
    });

    await expect(popover).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.locator('.nested-element').click();
    await expect(popover).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // await page.locator('.btn-close').click();
    await expect(popover).toBeHidden();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('should show up when clicking on a deeply nested element inside the trigger', async () => {
    await trigger.evaluate(el => {
      const originalText = el.textContent;
      el.innerHTML = `
          <div class="level-1">
            <div class="level-2">
              <span class="level-3">${originalText}</span>
            </div>
          </div>
        `;
    });

    await expect(popover).toBeHidden();
    await page.locator('.level-3').click();
    await expect(popover).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('should close on X click', async () => {
    await trigger.click();
    await expect(popover).toBeVisible();
    await page.locator('.btn-close').click();
    await expect(popover).toBeHidden();
  });

  test('should open on enter', async () => {
    await expect(popover).toBeHidden();
    await trigger.focus();
    await trigger.press('Enter');
    await expect(popover).toBeVisible();
  });

  test('should open and close with the API', async ({ page }) => {
    await expect(popover).toBeHidden();

    await page.evaluate(
      ([triggerEl, popoverEl]) => (popoverEl as any).show(triggerEl),
      [await trigger.elementHandle(), await popover.elementHandle()],
    );
    await expect(popover).toBeVisible();

    await page.evaluate(popoverEl => (popoverEl as any).hide(), await popover.elementHandle());
    await expect(popover).toBeHidden();

    await page.evaluate(
      ([triggerEl, popoverEl]) => (popoverEl as any).toggle(triggerEl),
      [await trigger.elementHandle(), await popover.elementHandle()],
    );
    await expect(popover).toBeVisible();

    await page.evaluate(
      ([triggerEl, popoverEl]) => (popoverEl as any).toggle(triggerEl),
      [await trigger.elementHandle(), await popover.elementHandle()],
    );
    await expect(popover).toBeHidden();
  });

  test('should switch position', async () => {
    const popoverEl = page.locator('post-popover');
    await popoverEl.evaluate(el => el.setAttribute('placement', 'top'));
    await expect(popover).toBeHidden();

    const [triggerBox, popoverBox] = await Promise.all([
      trigger.boundingBox(),
      popover.boundingBox(),
    ]);
    if (triggerBox && popoverBox) {
      expect(triggerBox.y).toBeLessThan(popoverBox.y);
    }
  });
});
