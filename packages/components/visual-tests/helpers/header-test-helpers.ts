import { Page } from '@playwright/test';

// ============================================================================
// WAIT TIMES & CONSTANTS
// ============================================================================

export const WAIT_TIMES = {
  component: 1000,
  interaction: 300,
  animation: 600,
  megadropdown: 400,
} as const;

export const BREAKPOINTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 375, height: 667 },
] as const;

// ============================================================================
// CORE WAIT FUNCTIONS
// ============================================================================

export async function waitForHeaderReady(page: Page): Promise<void> {
  // Wait for post-header to be defined
  await page.waitForFunction(() => customElements.get('post-header'));
  
  // Wait for post-mainnavigation if it exists
  const hasMainNav = await page.locator('post-mainnavigation').count() > 0;
  if (hasMainNav) {
    await page.waitForFunction(() => customElements.get('post-mainnavigation'));
  }
  
  // Wait for fonts to load to avoid screenshot timeouts
  await page.evaluate(() => document.fonts.ready);
  
  // Wait a bit for hydration
  await page.waitForTimeout(WAIT_TIMES.component);
}

// ============================================================================
// MAIN NAVIGATION HELPERS
// ============================================================================

export async function hoverMainNavItem(page: Page, index: number): Promise<void> {
  const mainNavItems = page.locator('post-mainnavigation > ul > li');
  const item = mainNavItems.nth(index);
  const link = item.locator('a, post-megadropdown-trigger').first();
  
  await link.hover();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusMainNavItem(page: Page, index: number): Promise<void> {
  const mainNavItems = page.locator('post-mainnavigation > ul > li');
  const item = mainNavItems.nth(index);
  
  // Check if it's a megadropdown trigger
  const isMegadropdownTrigger = await item.locator('post-megadropdown-trigger').count() > 0;
  
  if (isMegadropdownTrigger) {
    // For megadropdown triggers, focus the button inside shadow DOM
    const trigger = item.locator('post-megadropdown-trigger').first();
    const button = trigger.locator('button');
    
    await button.evaluate((btn: HTMLButtonElement) => {
      btn.focus();
    });
  } else {
    // For regular links, focus directly
    const link = item.locator('a').first();
    await link.evaluate((el: HTMLElement) => {
      el.focus();
    });
  }
  
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// ============================================================================
// MEGADROPDOWN HELPERS
// ============================================================================

export async function hoverMegadropdownTrigger(page: Page, dropdownId: string): Promise<void> {
  // Directly target the megadropdown-trigger element, not the parent li
  const trigger = page.locator(`post-megadropdown-trigger[for="${dropdownId}"]`);
  await trigger.hover();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusMegadropdownTrigger(page: Page, dropdownId: string): Promise<void> {
  // The trigger has a button in its shadow DOM that needs to be focused
  const trigger = page.locator(`post-megadropdown-trigger[for="${dropdownId}"]`);
  
  // Pierce through shadow DOM to find the button
  const button = trigger.locator('button');
  
  // Use evaluate to ensure focus is actually applied
  await button.evaluate((btn: HTMLButtonElement) => {
    btn.focus();
  });
  
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function openMegadropdown(page: Page, dropdownId: string): Promise<void> {
  const trigger = page.locator(`post-megadropdown-trigger[for="${dropdownId}"]`);
  await trigger.click();
  await page.waitForTimeout(WAIT_TIMES.megadropdown);
}

export async function closeMegadropdown(page: Page, dropdownId: string): Promise<void> {
  const megadropdown = page.locator(`post-megadropdown#${dropdownId}`);
  
  // Try desktop close button first
  const closeButton = megadropdown.locator('post-closebutton').first();
  const closeButtonVisible = await closeButton.isVisible().catch(() => false);
  
  if (closeButtonVisible) {
    await closeButton.click();
  } else {
    // Try mobile back button
    const backButton = megadropdown.locator('button.back-button').first();
    await backButton.click();
  }
  
  await page.waitForTimeout(WAIT_TIMES.megadropdown);
}

export async function hoverMegadropdownItem(page: Page, dropdownId: string, itemIndex: number): Promise<void> {
  const megadropdown = page.locator(`post-megadropdown#${dropdownId}`);
  const links = megadropdown.locator('a');
  await links.nth(itemIndex).hover();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusMegadropdownItem(page: Page, dropdownId: string, itemIndex: number): Promise<void> {
  const megadropdown = page.locator(`post-megadropdown#${dropdownId}`);
  const links = megadropdown.locator('a');
  await links.nth(itemIndex).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// ============================================================================
// LANGUAGE MENU HELPERS
// ============================================================================

export async function hoverLanguageMenuTrigger(page: Page): Promise<void> {
  const languageMenu = page.locator('post-language-menu').first();
  
  // Check variant - if it's "list", there's nothing to hover (no trigger button)
  const variant = await languageMenu.getAttribute('variant');
  
  if (variant === 'list') {
    // In list mode, there's no trigger to hover - skip this test
    return;
  }
  
  // In menu mode, hover the trigger button inside post-menu-trigger
  const trigger = page.locator('post-menu-trigger button.post-language-menu-trigger').first();
  const hasTrigger = await trigger.count() > 0;
  
  if (hasTrigger) {
    await trigger.hover();
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusLanguageMenuTrigger(page: Page): Promise<void> {
  const languageMenu = page.locator('post-language-menu').first();
  
  // Check variant - if it's "list", there's nothing to focus (no trigger button)
  const variant = await languageMenu.getAttribute('variant');
  
  if (variant === 'list') {
    // In list mode, there's no trigger to focus - skip this test
    return;
  }
  
  // In menu mode, focus the trigger button
  const trigger = page.locator('post-menu-trigger button.post-language-menu-trigger').first();
  const hasTrigger = await trigger.count() > 0;
  
  if (hasTrigger) {
    await trigger.evaluate((btn: HTMLButtonElement) => {
      btn.focus();
    });
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function openLanguageMenu(page: Page): Promise<void> {
  const languageMenu = page.locator('post-language-menu').first();
  
  // Check variant - if it's "list", there's nothing to open
  const variant = await languageMenu.getAttribute('variant');
  
  if (variant === 'list') {
    // In list mode, menu is always visible - nothing to open
    return;
  }
  
  // In menu mode, click the trigger to open dropdown
  const trigger = page.locator('post-menu-trigger button.post-language-menu-trigger').first();
  const hasTrigger = await trigger.count() > 0;
  
  if (hasTrigger) {
    await trigger.click();
    await page.waitForTimeout(WAIT_TIMES.animation);
  }
}

export async function closeLanguageMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

// ============================================================================
// USER MENU HELPERS (post-menu + post-menu-trigger)
// ============================================================================

export async function hoverUserMenuTrigger(page: Page): Promise<void> {
  // User menu is post-menu-trigger > button
  const trigger = page.locator('post-menu-trigger[for="user-menu"] button').first();
  const exists = await trigger.count() > 0;
  
  if (exists) {
    await trigger.hover();
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusUserMenuTrigger(page: Page): Promise<void> {
  const trigger = page.locator('post-menu-trigger[for="user-menu"] button').first();
  const exists = await trigger.count() > 0;
  
  if (exists) {
    await trigger.focus();
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function openUserMenu(page: Page): Promise<void> {
  const trigger = page.locator('post-menu-trigger[for="user-menu"] button').first();
  const exists = await trigger.count() > 0;
  
  if (exists) {
    await trigger.click();
    await page.waitForTimeout(WAIT_TIMES.animation);
  }
}

export async function closeUserMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function hoverUserMenuItem(page: Page, itemIndex: number): Promise<void> {
  const menu = page.locator('post-menu#user-menu');
  const items = menu.locator('post-menu-item a, post-menu-item button');
  await items.nth(itemIndex).hover();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusUserMenuItem(page: Page, itemIndex: number): Promise<void> {
  const menu = page.locator('post-menu#user-menu');
  const items = menu.locator('post-menu-item a, post-menu-item button');
  await items.nth(itemIndex).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// ============================================================================
// BURGER MENU HELPERS
// ============================================================================

export async function hoverBurgerMenu(page: Page): Promise<void> {
  const header = page.locator('post-header');
  const burgerButton = header.locator('post-togglebutton').last();
  await burgerButton.hover();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusBurgerMenu(page: Page): Promise<void> {
  const header = page.locator('post-header');
  const burgerButton = header.locator('post-togglebutton').last();
  await burgerButton.focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function openBurgerMenu(page: Page): Promise<void> {
  const header = page.locator('post-header');
  const burgerButton = header.locator('post-togglebutton').last();
  await burgerButton.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function closeBurgerMenu(page: Page): Promise<void> {
  const header = page.locator('post-header');
  const burgerButton = header.locator('post-togglebutton').last();
  await burgerButton.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

// ============================================================================
// SLOT ITEM HELPERS
// ============================================================================

export async function hoverSlotItem(page: Page, slotName: string, itemIndex: number): Promise<void> {
  const slotSelector = `[slot="${slotName}"]`;
  const slotContent = page.locator(slotSelector);
  
  const interactiveElements = slotContent.locator('a, button');
  await interactiveElements.nth(itemIndex).hover();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusSlotItem(page: Page, slotName: string, itemIndex: number): Promise<void> {
  const slotSelector = `[slot="${slotName}"]`;
  const slotContent = page.locator(slotSelector);
  
  const interactiveElements = slotContent.locator('a, button');
  await interactiveElements.nth(itemIndex).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// ============================================================================
// KEYBOARD NAVIGATION HELPER
// ============================================================================

export async function testKeyboardNavigation(page: Page, tabCount: number = 3): Promise<void> {
  await page.locator('post-header').first().focus();
  
  for (let i = 0; i < tabCount; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
  }
  
  await page.waitForTimeout(WAIT_TIMES.interaction);
}