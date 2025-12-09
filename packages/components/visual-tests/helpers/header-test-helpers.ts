import { Page } from '@playwright/test';

export const BREAKPOINTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 780, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
] as const;

export const WAIT_TIMES = {
  component: 500,
  interaction: 200,
  animation: 500,
} as const;

export type BreakpointName = typeof BREAKPOINTS[number]['name'];

// ============================================================================
// Utility Functions
// ============================================================================

export async function waitForHeaderReady(page: Page): Promise<void> {
  // Wait for page load with extended timeout
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  
  // Wait for post-header custom element to be defined
  await page.waitForFunction(() => {
    return customElements.get('post-header');
  }, { timeout: 30000 });
  
  // Wait for header to be rendered in DOM
  await page.waitForSelector('post-header', { timeout: 30000 });
  
  // Additional wait for component initialization
  await page.waitForTimeout(WAIT_TIMES.component);
}

export function isMobile(breakpoint: string): boolean {
  return breakpoint !== 'desktop';
}

async function blurActiveElement(page: Page): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
}

async function getElementCoords(page: Page, selector: string): Promise<{ x: number; y: number } | null> {
  return await page.evaluate((sel) => {
    const element = document.querySelector<HTMLElement>(sel);
    if (element) {
      const rect = element.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  }, selector);
}

// ============================================================================
// Megadropdown Helpers
// ============================================================================

export async function openMegadropdown(page: Page, id: string): Promise<void> {
  await page.evaluate((dropdownId) => {
    const trigger = document.querySelector<HTMLElement>(
      `post-megadropdown-trigger[for="${dropdownId}"] button`
    );
    trigger?.click();
  }, id);
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function closeMegadropdown(page: Page, id: string): Promise<void> {
  await page.evaluate((dropdownId) => {
    const closeButton = document.querySelector<HTMLElement>(
      `post-megadropdown#${dropdownId} [slot="close-button"]`
    );
    closeButton?.click();
  }, id);
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function hoverMegadropdownTrigger(page: Page, id: string): Promise<void> {
  await blurActiveElement(page);
  const coords = await page.evaluate((dropdownId) => {
    const trigger = document.querySelector<HTMLElement>(
      `post-megadropdown-trigger[for="${dropdownId}"] button`
    );
    if (trigger) {
      const rect = trigger.getBoundingClientRect();
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
  await page.evaluate((dropdownId) => {
    const trigger = document.querySelector<HTMLElement>(
      `post-megadropdown-trigger[for="${dropdownId}"] button`
    );
    trigger?.focus();
  }, id);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverMegadropdownItem(page: Page, dropdownId: string, itemIndex: number): Promise<void> {
  await blurActiveElement(page);
  const coords = await page.evaluate(([dId, index]) => {
    const dropdown = document.querySelector<HTMLElement>(`post-megadropdown#${dId}`);
    const items = dropdown?.querySelectorAll('post-list-item a, [slot="megadropdown-overview-link"]');
    const item = items?.[index] as HTMLElement;
    if (item) {
      const rect = item.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  }, [dropdownId, itemIndex]);

  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusMegadropdownItem(page: Page, dropdownId: string, itemIndex: number): Promise<void> {
  await page.evaluate(([dId, index]) => {
    const dropdown = document.querySelector<HTMLElement>(`post-megadropdown#${dId}`);
    const items = dropdown?.querySelectorAll('post-list-item a, [slot="megadropdown-overview-link"]');
    const item = items?.[index] as HTMLElement;
    item?.focus();
  }, [dropdownId, itemIndex]);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

/**
 * Complete megadropdown interaction flow for testing (sequential)
 */
export async function testMegadropdownFlow(
  page: Page,
  dropdownId: string,
  breakpoint: BreakpointName
): Promise<void> {
  if (breakpoint === 'desktop') {
    await hoverMegadropdownTrigger(page, dropdownId);
    await focusMegadropdownTrigger(page, dropdownId);
  }
  
  await openMegadropdown(page, dropdownId);
  await hoverMegadropdownItem(page, dropdownId, 0);
  await focusMegadropdownItem(page, dropdownId, 0);
  await closeMegadropdown(page, dropdownId);
}

// ============================================================================
// Language Menu Helpers
// ============================================================================

export async function openLanguageMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const languageMenu = document.querySelector('post-language-menu');
    const trigger = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
    const button = trigger?.querySelector('button');
    button?.click();
  });
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function closeLanguageMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function hoverLanguageMenuTrigger(page: Page): Promise<void> {
  await blurActiveElement(page);
  await page.evaluate(() => {
    const menu = document.querySelector<any>('post-language-menu');
    const button = (menu?.shadowRoot as any)?.querySelector('button');
    const rect = button?.getBoundingClientRect();
    if (rect) {
      const event = new MouseEvent('mousemove', {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
        bubbles: true,
      });
      button?.dispatchEvent(event);
    }
  });
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function focusLanguageMenuTrigger(page: Page): Promise<void> {
  await page.evaluate(() => {
    const menu = document.querySelector<any>('post-language-menu');
    const button = (menu?.shadowRoot as any)?.querySelector('button');
    button?.focus();
  });
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverLanguageMenuItem(page: Page, code: string, isListMode: boolean = false): Promise<void> {
  await blurActiveElement(page);
  
  if (isListMode) {
    // List mode - language items are directly in the DOM
    const coords = await page.evaluate((langCode) => {
      const item = document.querySelector(`post-language-menu-item[code="${langCode}"]`);
      const link = item?.querySelector('a, button') as HTMLElement;
      if (link) {
        const rect = link.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      return null;
    }, code);
    
    if (coords) {
      await page.mouse.move(coords.x, coords.y);
      await page.waitForTimeout(WAIT_TIMES.interaction);
    }
  } else {
    // Dropdown mode - items are in the shadow DOM
    const coords = await page.evaluate((langCode) => {
      const menu = document.querySelector('post-language-menu');
      const item = Array.from(menu?.querySelectorAll('post-language-menu-item') || [])
        .find(el => el.getAttribute('code') === langCode);
      const link = item?.querySelector('a, button') as HTMLElement;
      if (link) {
        const rect = link.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
      return null;
    }, code);
    
    if (coords) {
      await page.mouse.move(coords.x, coords.y);
      await page.waitForTimeout(WAIT_TIMES.interaction);
    }
  }
}

export async function focusLanguageMenuItem(page: Page, code: string, isListMode: boolean = false): Promise<void> {
  await page.evaluate(({ langCode }) => {
    const menu = document.querySelector('post-language-menu');
    const item = Array.from(menu?.querySelectorAll('post-language-menu-item') || [])
      .find(el => el.getAttribute('code') === langCode);
    const link = item?.querySelector('a, button') as HTMLElement;
    link?.focus();
  }, { langCode: code, listMode: isListMode });
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

/**
 * Complete language menu interaction flow
 */
export async function testLanguageMenuFlow(page: Page, breakpoint: BreakpointName): Promise<void> {
  if (breakpoint === 'desktop') {
    // Desktop: Dropdown mode
    await hoverLanguageMenuTrigger(page);
    await focusLanguageMenuTrigger(page);
    await openLanguageMenu(page);
    
    // Test menu item interactions
    await hoverLanguageMenuItem(page, 'de', false);
    await focusLanguageMenuItem(page, 'de', false);
    
    await closeLanguageMenu(page);
  } else {
    // Mobile/Tablet: List mode
    await hoverLanguageMenuItem(page, 'de', true);
    await focusLanguageMenuItem(page, 'de', true);
    await hoverLanguageMenuItem(page, 'en', true); // Hover active item
    await focusLanguageMenuItem(page, 'en', true); // Focus active item
  }
}

// ============================================================================
// Burger Menu Helpers
// ============================================================================

export async function openBurgerMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const toggleButton = document.querySelector('post-togglebutton');
    if (toggleButton?.getAttribute('aria-pressed') !== 'true') {
      toggleButton?.click();
    }
  });
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function closeBurgerMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const toggleButton = document.querySelector('post-togglebutton');
    if (toggleButton?.getAttribute('aria-pressed') === 'true') {
      toggleButton?.click();
    }
  });
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function hoverBurgerMenu(page: Page): Promise<void> {
  await blurActiveElement(page);
  const coords = await getElementCoords(page, 'post-togglebutton');
  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusBurgerMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const toggleButton = document.querySelector('post-togglebutton');
    toggleButton?.focus();
  });
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

/**
 * Complete burger menu interaction flow (sequential)
 */
export async function testBurgerMenuFlow(page: Page): Promise<void> {
  await hoverBurgerMenu(page);
  await focusBurgerMenu(page);
  await openBurgerMenu(page);
  await closeBurgerMenu(page);
}

// ============================================================================
// User Menu Helpers
// ============================================================================

export async function openUserMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const trigger = document.querySelector('post-menu-trigger button') as HTMLElement;
    trigger?.click();
  });
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function closeUserMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

export async function hoverUserMenuTrigger(page: Page): Promise<void> {
  await blurActiveElement(page);
  const coords = await getElementCoords(page, 'post-menu-trigger button');
  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusUserMenuTrigger(page: Page): Promise<void> {
  await page.evaluate(() => {
    const trigger = document.querySelector('post-menu-trigger button') as HTMLElement;
    trigger?.focus();
  });
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

export async function hoverUserMenuItem(page: Page, itemIndex: number): Promise<void> {
  await blurActiveElement(page);
  const coords = await page.evaluate((index) => {
    const items = document.querySelectorAll<HTMLElement>('post-menu-item');
    const item = items[index];
    if (item) {
      const rect = item.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  }, itemIndex);

  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusUserMenuItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate((index) => {
    const items = document.querySelectorAll<HTMLElement>('post-menu-item');
    const item = items[index];
    if (item) {
      const focusable = item.querySelector<HTMLElement>('a, button');
      focusable?.focus();
    }
  }, itemIndex);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

/**
 * Complete user menu interaction flow (sequential)
 */
export async function testUserMenuFlow(page: Page): Promise<void> {
  await hoverUserMenuTrigger(page);
  await focusUserMenuTrigger(page);
  await openUserMenu(page);
  await hoverUserMenuItem(page, 0);
  await focusUserMenuItem(page, 0);
  await closeUserMenu(page);
}

// ============================================================================
// Slot Item Helpers (Generic)
// ============================================================================

export async function hoverSlotItem(page: Page, slot: string, index: number): Promise<void> {
  await blurActiveElement(page);
  const coords = await page.evaluate(({ slotName, itemIndex }) => {
    const slotContainer = document.querySelector<HTMLElement>(`[slot="${slotName}"]`);
    const links = slotContainer?.querySelectorAll('a, button');
    const link = links?.[itemIndex] as HTMLElement;
    if (link) {
      const rect = link.getBoundingClientRect();
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
  await page.evaluate(({ slotName, itemIndex }) => {
    const slotContainer = document.querySelector<HTMLElement>(`[slot="${slotName}"]`);
    const links = slotContainer?.querySelectorAll('a, button');
    const link = links?.[itemIndex] as HTMLElement;
    link?.focus();
  }, { slotName: slot, itemIndex: index });
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

/**
 * Test interaction flow for a slot (sequential hover then focus)
 */
export async function testSlotItemFlow(page: Page, slot: string, index: number = 0): Promise<void> {
  await hoverSlotItem(page, slot, index);
  await focusSlotItem(page, slot, index);
}

// ============================================================================
// Main Navigation Helpers
// ============================================================================

export async function hoverMainNavItem(page: Page, itemIndex: number): Promise<void> {
  await blurActiveElement(page);
  const coords = await page.evaluate((index) => {
    const mainNav = document.querySelector<HTMLElement>('post-header [slot="post-mainnavigation"]');
    const links = mainNav?.querySelectorAll('post-megadropdown-trigger button, post-list-item a');
    const link = links?.[index] as HTMLElement;
    if (link) {
      const rect = link.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  }, itemIndex);

  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

export async function focusMainNavItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate((index) => {
    const mainNav = document.querySelector<HTMLElement>('post-header [slot="post-mainnavigation"]');
    const links = mainNav?.querySelectorAll('post-megadropdown-trigger button, post-list-item a');
    const link = links?.[index] as HTMLElement;
    link?.focus();
  }, itemIndex);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

/**
 * Test main navigation flow (sequential hover then focus)
 */
export async function testMainNavFlow(page: Page): Promise<void> {
  await hoverMainNavItem(page, 0);
  await focusMainNavItem(page, 0);
}

// ============================================================================
// Keyboard Navigation Helper
// ============================================================================

export async function testKeyboardNavigation(page: Page, tabCount: number = 1): Promise<void> {
  for (let i = 0; i < tabCount; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}