import { Page } from '@playwright/test';

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

export async function waitForHeaderReady(page: Page): Promise<void> {
  await page.waitForFunction(() => customElements.get('post-header'));
  
  const hasMainNav = await page.locator('post-mainnavigation').count() > 0;
  if (hasMainNav) {
    await page.waitForFunction(() => customElements.get('post-mainnavigation'));
  }
  
  await page.evaluate(() => document.fonts.ready);
  
  await page.waitForTimeout(WAIT_TIMES.component);
}

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
  
  const isMegadropdownTrigger = await item.locator('post-megadropdown-trigger').count() > 0;
  
  if (isMegadropdownTrigger) {
    const trigger = item.locator('post-megadropdown-trigger').first();
    const button = trigger.locator('button');
    
    await button.evaluate((btn: HTMLButtonElement) => {
      btn.focus();
    });
  } else {
    const link = item.locator('a').first();
    await link.evaluate((el: HTMLElement) => {
      el.focus();
    });
  }
  
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverMegadropdownTrigger(page: Page, dropdownId: string): Promise<void> {
  const trigger = page.locator(`post-megadropdown-trigger[for="${dropdownId}"]`);
  await trigger.hover();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusMegadropdownTrigger(page: Page, dropdownId: string): Promise<void> {
  const trigger = page.locator(`post-megadropdown-trigger[for="${dropdownId}"]`);
  
  const button = trigger.locator('button');
  
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
  
  const closeButton = megadropdown.locator('post-closebutton').first();
  const closeButtonVisible = await closeButton.isVisible().catch(() => false);
  
  if (closeButtonVisible) {
    await closeButton.click();
  } else {
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
  
  const targetLink = links.nth(itemIndex);
  await targetLink.press('Tab');
  
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverLanguageMenuTrigger(page: Page): Promise<void> {
  const languageMenu = page.locator('post-language-menu').first();
  
  const variant = await languageMenu.getAttribute('variant');
  
  if (variant === 'list') {
    return;
  }
  
  const trigger = page.locator('post-menu-trigger button.post-language-menu-trigger').first();
  const hasTrigger = await trigger.count() > 0;
  
  if (hasTrigger) {
    await trigger.hover();
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusLanguageMenuTrigger(page: Page): Promise<void> {
  const languageMenu = page.locator('post-language-menu').first();
  
  const variant = await languageMenu.getAttribute('variant');
  
  if (variant === 'list') {
    return;
  }
  
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
  
  const variant = await languageMenu.getAttribute('variant');
  
  if (variant === 'list') {
    return;
  }
  
  const trigger = page.locator('post-menu-trigger button.post-language-menu-trigger').first();
  await trigger.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function openLanguageMenuAndFocusFirstItem(page: Page): Promise<void> {
  const languageMenu = page.locator('post-language-menu').first();
  
  const variant = await languageMenu.getAttribute('variant');
  
  if (variant === 'list') {
    return;
  }
  
  const trigger = page.locator('post-menu-trigger button.post-language-menu-trigger').first();
  const hasTrigger = await trigger.count() > 0;
  
  if (hasTrigger) {
    await trigger.focus();
    await page.keyboard.press('Space');
    await page.waitForTimeout(WAIT_TIMES.animation);
  }
}

export async function closeLanguageMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function hoverLanguageMenuItem(page: Page, itemIndex: number): Promise<void> {
  const languageMenu = page.locator('post-language-menu').first();
  const menuItems = languageMenu.locator('post-language-menu-item');
  const targetItem = menuItems.nth(itemIndex);
  
  await targetItem.hover();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusLanguageMenuItem(page: Page, itemIndex: number): Promise<void> {
  const languageMenu = page.locator('post-language-menu').first();
  const menuItems = languageMenu.locator('post-language-menu-item');
  const targetItem = menuItems.nth(itemIndex);
  
  const interactiveElement = targetItem.locator('a, button').first();
  
  await interactiveElement.focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverUserMenuTrigger(page: Page): Promise<void> {
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
    await trigger.evaluate((btn: HTMLButtonElement) => {
      btn.focus();
    });
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

export async function focusUserMenuItem(page: Page): Promise<void> {
  const trigger = page.locator('post-menu-trigger[for="user-menu"] button').first();
  const exists = await trigger.count() > 0;
  
  if (exists) {
    // Use Space key on the trigger to open menu
    await trigger.focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(WAIT_TIMES.animation);
    await page.waitForTimeout(100);
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

export async function hoverBurgerMenu(page: Page): Promise<void> {
  const header = page.locator('post-header');
  const burgerButton = header.locator('post-togglebutton').last();
  await burgerButton.hover();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusBurgerMenu(page: Page): Promise<void> {
  const header = page.locator('post-header');
  const burgerButton = header.locator('post-togglebutton').last();
  await burgerButton.evaluate((btn: HTMLElement) => {
    btn.focus();
  });
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function openBurgerMenu(page: Page): Promise<void> {
  const header = page.locator('post-header');
  const burgerButton = header.locator('post-togglebutton').last();
  await burgerButton.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function closeBurgerMenu(page: Page): Promise<void> {
  // Close the burger menu using the Escape key to mirror typical user behavior
  // and to avoid having an identical implementation to `openBurgerMenu`.
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

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
  await interactiveElements.nth(itemIndex).evaluate((el: HTMLElement) => {
    el.focus();
  });
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function testKeyboardNavigation(page: Page, tabCount: number = 3): Promise<void> {
  await page.locator('post-header').first().focus();
  
  for (let i = 0; i < tabCount; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
  }
  
  await page.waitForTimeout(WAIT_TIMES.interaction);
}
