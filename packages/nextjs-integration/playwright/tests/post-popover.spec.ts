import { test, expect, Locator, Page, ElementHandle } from '@playwright/test';
import { PostPopover } from '@swisspost/design-system-components/dist/components/react/post-popover.js';
import AxeBuilder from '@axe-core/playwright';

// Helper: wait for next postToggle event on a popover
async function waitForPostToggle(page: Page, el: ElementHandle<HTMLElement>) {
  const handle = await page.evaluateHandle((popover: HTMLElement) => {
    return new Promise<{ isOpen: boolean }>(resolve => {
      function listener(e: Event) {
        resolve((e as CustomEvent<{ isOpen: boolean }>).detail);
      }
      popover.addEventListener('postToggle', listener, { once: true });
    });
  }, el);

  return handle.jsonValue() as Promise<{ isOpen: boolean }>;
}

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

  test('should exist', async () => {
    await expect(trigger).toBeAttached();
    await expect(popover).toBeAttached();
    await expect(popoverContent).toBeAttached();
    await expect(triggerButton).toBeAttached();
    await expect(closeButton).toBeAttached();
  });

  test('should be visible', async () => {
    await expect(trigger).toBeVisible();
    await expect(triggerButton).toBeVisible();
  });

  test('should not be visible', async () => {
    await expect(popoverContent).not.toBeVisible();
    await expect(closeButton).not.toBeVisible();
  });

  test('should emit postToggle event on popover show and hide', async ({ page }) => {
    const triggerEl = (await trigger.elementHandle()) as ElementHandle<HTMLElement>;
    const popoverEl = (await popover.elementHandle()) as ElementHandle<HTMLElement>;

    if (!triggerEl || !popoverEl) return;

    const openDetailPromise = waitForPostToggle(page, popoverEl);
    await popoverEl.evaluate((el, trigger) => (el as PostPopover).show(trigger), triggerEl);
    const openDetail = await openDetailPromise;
    await expect(popoverContent).toBeVisible();

    // Check that the event 'open' payload is true
    expect(openDetail).toMatchObject({ isOpen: true });

    const closeDetailPromise = waitForPostToggle(page, popoverEl);
    await popoverEl.evaluate(el => (el as PostPopover).hide());
    const closeDetail = await closeDetailPromise;
    await expect(popoverContent).toBeHidden();

    // Check that the event 'open' payload is false
    expect(closeDetail).toMatchObject({ isOpen: false });
  });

  // Accessibility check
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/ssr');
    const popoverAccessibility = await new AxeBuilder({ page }).include('post-popover').analyze();
    expect(popoverAccessibility.violations).toEqual([]);
  });
});
