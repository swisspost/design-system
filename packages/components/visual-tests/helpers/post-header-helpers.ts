import { Page } from '@playwright/test';

export const BREAKPOINTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 780, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

export const WAIT_TIMES = {
  component: 500,
  interaction: 200,
  animation: 500,
};

// Megadropdown helpers
export async function openMegadropdown(page: Page, id: string): Promise<void> {
  const trigger = page.locator(`post-megadropdown-trigger[for="${id}"]`);
  await trigger.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function closeMegadropdown(page: Page): Promise<void> {
  const closeButton = page.locator('post-closebutton');
  await closeButton.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function hoverMegadropdownTrigger(page: Page, id: string): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate((triggerId) => {
    const element = document.querySelector<HTMLElement>(`post-megadropdown-trigger[for="${triggerId}"]`);
    if (element) {
      const rect = element.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  }, id);
  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusMegadropdownTrigger(page: Page, id: string): Promise<void> {
  const trigger = page.locator(`post-megadropdown-trigger[for="${id}"]`);
  await trigger.focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverMegadropdownItem(page: Page, index: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate((itemIndex) => {
    const items = document.querySelectorAll<HTMLElement>('post-megadropdown a');
    if (items[itemIndex]) {
      const rect = items[itemIndex].getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  }, index);
  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusMegadropdownItem(page: Page, index: number): Promise<void> {
  const items = page.locator('post-megadropdown a');
  await items.nth(index).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// Language menu helpers
export async function openLanguageMenu(page: Page): Promise<void> {
  const trigger = page.locator('post-language-menu').locator('button').first();
  const shadowRoot = await page.evaluate(() => {
    const menu = document.querySelector<any>('post-language-menu');
    return (menu?.shadowRoot as any)?.querySelector('button')?.offsetHeight;
  });
  if (shadowRoot) {
    await page.evaluate(() => {
      const menu = document.querySelector<any>('post-language-menu');
      const button = (menu?.shadowRoot as any)?.querySelector('button') as HTMLElement;
      button?.click();
    });
  } else {
    await trigger.click();
  }
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function closeLanguageMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function focusLanguageMenuItem(page: Page, index: number): Promise<void> {
  await page.evaluate((itemIndex) => {
    const menu = document.querySelector<any>('post-language-menu');
    const items = (menu?.shadowRoot as any)?.querySelectorAll('button');
    items?.[itemIndex]?.focus();
  }, index);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverLanguageMenuItem(page: Page, index: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  await page.evaluate((itemIndex) => {
    const menu = document.querySelector<any>('post-language-menu');
    const items = (menu?.shadowRoot as any)?.querySelectorAll('button');
    if (items?.[itemIndex]) {
      const rect = items[itemIndex].getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const event = new MouseEvent('mousemove', {
        bubbles: true,
        clientX: x,
        clientY: y,
      });
      items[itemIndex].dispatchEvent(event);
    }
  }, index);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// Burger menu helpers
export async function openBurgerMenu(page: Page): Promise<void> {
  const burger = page.locator('post-togglebutton');
  const isToggled = await page.evaluate(() => {
    const element = document.querySelector('post-togglebutton') as any;
    return element?.toggled;
  });
  if (!isToggled) {
    await burger.click();
    await page.waitForTimeout(WAIT_TIMES.animation);
  }
}

export async function closeBurgerMenu(page: Page): Promise<void> {
  const burger = page.locator('post-togglebutton');
  const isToggled = await page.evaluate(() => {
    const element = document.querySelector('post-togglebutton') as any;
    return element?.toggled;
  });
  if (isToggled) {
    await burger.click();
    await page.waitForTimeout(WAIT_TIMES.animation);
  }
}

export async function focusBurgerMenu(page: Page): Promise<void> {
  const burger = page.locator('post-togglebutton');
  await burger.focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverBurgerMenu(page: Page): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate(() => {
    const element = document.querySelector<HTMLElement>('post-togglebutton');
    if (element) {
      const rect = element.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  });
  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

// Generic slot element helpers
export async function hoverSlotItem(page: Page, slot: string, index: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate(({ slotName, itemIndex }) => {
    const items = document.querySelectorAll<HTMLElement>(`[slot="${slotName}"] a`);
    if (items[itemIndex]) {
      const rect = items[itemIndex].getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  }, { slotName: slot, itemIndex: index });
  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusSlotItem(page: Page, slot: string, index: number): Promise<void> {
  const items = page.locator(`[slot="${slot}"] a`);
  await items.nth(index).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// Main navigation helpers
export async function hoverMainNavItem(page: Page, index: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate((itemIndex) => {
    const items = document.querySelectorAll<HTMLElement>('post-mainnavigation a');
    if (items[itemIndex]) {
      const rect = items[itemIndex].getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  }, index);
  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusMainNavItem(page: Page, index: number): Promise<void> {
  const items = page.locator('post-mainnavigation a');
  await items.nth(index).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// User menu helpers
export async function openUserMenu(page: Page): Promise<void> {
  const trigger = page.locator('post-menu-trigger button');
  await trigger.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function closeUserMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function hoverUserMenuTrigger(page: Page): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate(() => {
    const element = document.querySelector<HTMLElement>('post-menu-trigger button');
    if (element) {
      const rect = element.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  });
  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusUserMenuTrigger(page: Page): Promise<void> {
  const trigger = page.locator('post-menu-trigger button');
  await trigger.focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverUserMenuItem(page: Page, index: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate((itemIndex) => {
    const items = document.querySelectorAll<HTMLElement>('post-menu-item');
    if (items[itemIndex]) {
      const rect = items[itemIndex].getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  }, index);
  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusUserMenuItem(page: Page, index: number): Promise<void> {
  await page.evaluate((itemIndex) => {
    const items = document.querySelectorAll<HTMLElement>('post-menu-item');
    const item = items[itemIndex];
    if (item) {
      const focusable = item.querySelector<HTMLElement>('a, button');
      focusable?.focus();
    }
  }, index);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}
