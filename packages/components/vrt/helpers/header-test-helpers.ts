import { Page } from '@playwright/test';

export const WAIT_TIMES = {
  component: 1200,
  interaction: 300,
  animation: 600,
  megadropdown: 600,
} as const;

export async function waitForHeaderReady(page: Page): Promise<void> {
  await page.waitForLoadState('load');
  await page.waitForTimeout(WAIT_TIMES.component);
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

export async function openUserMenu(page: Page): Promise<void> {
  const trigger = page.locator('post-menu-trigger[for="user-menu"] button').first();
  const exists = await trigger.count() > 0;
  
  if (exists) {
    await trigger.click();
    await page.waitForTimeout(WAIT_TIMES.animation);
  }
}

export async function openBurgerMenu(page: Page): Promise<void> {
  const header = page.locator('post-header');
  const burgerButton = header.locator('post-togglebutton').last();
  await burgerButton.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}