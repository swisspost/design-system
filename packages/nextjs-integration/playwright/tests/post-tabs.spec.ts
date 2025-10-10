import { test, expect, Locator } from '@playwright/test';
import { PostTabs } from '@swisspost/design-system-components/dist/components/react/post-tabs.js';
import AxeBuilder from '@axe-core/playwright';

test.describe('tabs', () => {
  let tabs: Locator;
  let tabItems: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto('/ssr');

    tabs = page.locator('post-tabs[data-hydrated]');
    tabItems = tabs.locator('post-tab-item');
  });

  test('should render the tabs component', async () => {
    await expect(tabs).toHaveCount(1);
  });

  test('should show three tab headers', async () => {
    await expect(tabItems).toHaveCount(3);
  });

  test('should only show the first tab header as active', async () => {
    await expect(tabItems.first()).toHaveClass(/active/);
    await expect(tabItems.nth(1)).not.toHaveClass(/active/);
    await expect(tabItems.nth(2)).not.toHaveClass(/active/);
  });

  test('should only show the tab panel associated with the first tab header', async ({ page }) => {
    const visiblePanels = page.locator('post-tab-panel:visible');
    await expect(visiblePanels).toHaveCount(1);

    const firstTabName = await tabItems.first().getAttribute('name');
    const visiblePanelFor = await visiblePanels.first().getAttribute('for');
    expect(visiblePanelFor).toBe(firstTabName);
  });

  test('should activate a clicked tab header and deactivate the tab header that was previously activated', async () => {
    await tabItems.last().click();

    await expect(tabItems.first()).not.toHaveClass(/active/);
    await expect(tabItems.last()).toHaveClass(/active/);
  });

  test('should show the panel associated with a clicked tab header', async ({ page }) => {
    const lastTabName = await tabItems.last().getAttribute('name');
    
    await tabItems.last().click();

    // Wait for the correct panel to become visible
    const expectedPanel = page.locator(`post-tab-panel[for="${lastTabName}"]:visible`);
    await expect(expectedPanel).toBeVisible();

    // Verify only one panel is visible
    const visiblePanels = page.locator('post-tab-panel:visible');
    await expect(visiblePanels).toHaveCount(1);
  });

  test('should have proper ARIA attributes', async () => {
    const tablist = tabs.locator('[role="tablist"]');
    await expect(tablist).toHaveCount(1);

    await expect(tabItems.first()).toHaveAttribute('role', 'tab');
    await expect(tabItems.first()).toHaveAttribute('aria-selected', 'true');

    await expect(tabItems.nth(1)).toHaveAttribute('aria-selected', 'false');
    await expect(tabItems.nth(2)).toHaveAttribute('aria-selected', 'false');
  });

  test('should link tabs to panels with aria-controls and aria-labelledby', async ({ page }) => {
    const firstTab = tabItems.first();
    const tabId = await firstTab.getAttribute('id');
    const ariaControls = await firstTab.getAttribute('aria-controls');

    expect(tabId).toBeTruthy();
    expect(ariaControls).toBeTruthy();

    const associatedPanel = page.locator(`post-tab-panel[id="${ariaControls}"]`);
    await expect(associatedPanel).toHaveAttribute('aria-labelledby', tabId!);
  });

  test('should manage tabindex properly', async () => {
    await expect(tabItems.first()).toHaveAttribute('tabindex', '0');
    await expect(tabItems.nth(1)).toHaveAttribute('tabindex', '-1');
    await expect(tabItems.nth(2)).toHaveAttribute('tabindex', '-1');

    await tabItems.last().click();

    await expect(tabItems.last()).toHaveAttribute('tabindex', '0');
    await expect(tabItems.first()).toHaveAttribute('tabindex', '-1');
    await expect(tabItems.nth(1)).toHaveAttribute('tabindex', '-1');
  });

  test('should support programmatic tab activation via show() method', async ({ page }) => {
    const tabsEl = await tabs.elementHandle();
    
    if (tabsEl) {
      const secondTabName = await tabItems.nth(1).getAttribute('name');
      
      await tabsEl.evaluate(
        (el, tabName) => {
          (el as PostTabs).show(tabName as string);
        },
        secondTabName,
      );

      await expect(tabItems.nth(1)).toHaveClass(/active/);
      await expect(tabItems.nth(1)).toHaveAttribute('aria-selected', 'true');
    }
  });

  test('should activate tab on Enter key press', async () => {
    await expect(tabItems.nth(1)).toBeVisible();
    
    await tabItems.nth(1).focus();
    await tabItems.nth(1).press('Enter');

    await expect(tabItems.nth(1)).toHaveClass(/active/);
    await expect(tabItems.first()).not.toHaveClass(/active/);
  });

  test('should activate tab on Space key press', async () => {
    await tabItems.nth(2).focus();
    await tabItems.nth(2).press(' ');

    await expect(tabItems.nth(2)).toHaveClass(/active/);
    await expect(tabItems.first()).not.toHaveClass(/active/);
  });

  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await expect(tabs).toBeVisible();
    await expect(tabItems.first()).toBeVisible();
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('post-tabs[data-hydrated]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
