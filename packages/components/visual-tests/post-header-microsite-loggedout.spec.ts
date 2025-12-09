import { expect, test } from '@playwright/test';
import { Page } from '@playwright/test';

const BREAKPOINTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 780, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
];

const WAIT_TIMES = {
  component: 500,
  interaction: 200,
  animation: 500,
};

// Helper functions for interactions
async function openMegadropdown(page: Page, id: string): Promise<void> {
  const trigger = page.locator(`post-megadropdown-trigger[for="${id}"]`);
  await trigger.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function closeMegadropdown(page: Page): Promise<void> {
  const closeButton = page.locator('post-closebutton');
  await closeButton.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function hoverMegadropdownTrigger(page: Page, id: string): Promise<void> {
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

async function focusMegadropdownTrigger(page: Page, id: string): Promise<void> {
  const trigger = page.locator(`post-megadropdown-trigger[for="${id}"]`);
  await trigger.focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverMegadropdownItem(page: Page, index: number): Promise<void> {
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

async function focusMegadropdownItem(page: Page, index: number): Promise<void> {
  const items = page.locator('post-megadropdown a');
  await items.nth(index).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function openLanguageMenu(page: Page): Promise<void> {
  const trigger = page.locator('post-language-menu').locator('button').first();
  const shadowRoot = await page.evaluate(() => {
    const menu = document.querySelector<any>('post-language-menu');
    return menu?.shadowRoot?.querySelector('button')?.offsetHeight;
  });
  if (shadowRoot) {
    await page.evaluate(() => {
      const menu = document.querySelector<any>('post-language-menu');
      const button = menu?.shadowRoot?.querySelector<HTMLElement>('button');
      button?.click();
    });
  } else {
    await trigger.click();
  }
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function closeLanguageMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function openBurgerMenu(page: Page): Promise<void> {
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

async function closeBurgerMenu(page: Page): Promise<void> {
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

async function focusBurgerMenu(page: Page): Promise<void> {
  const burger = page.locator('post-togglebutton');
  await burger.focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverBurgerMenu(page: Page): Promise<void> {
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

async function hoverLocalNavItem(page: Page, index: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate((itemIndex) => {
    const items = document.querySelectorAll<HTMLElement>('[slot="local-nav"] a');
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

async function focusLocalNavItem(page: Page, index: number): Promise<void> {
  const items = page.locator('[slot="local-nav"] a');
  await items.nth(index).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function focusMainNavItem(page: Page, index: number): Promise<void> {
  const items = page.locator('post-mainnavigation a');
  await items.nth(index).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverMainNavItem(page: Page, index: number): Promise<void> {
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

// Test suites
BREAKPOINTS.forEach(({ name, width, height }) => {
  test.describe(`Post Header Microsite Loggedout - ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/visual-tests/components/post-header-microsite-loggedout.html');
      await page.waitForTimeout(WAIT_TIMES.component);
    });

    // Megadropdown tests
    test.describe('Megadropdown - Letters', () => {
      if (name === 'desktop') {
        test('letters megadropdown - hover trigger', async ({ page }) => {
          await hoverMegadropdownTrigger(page, 'letters');
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-hover.png`);
        });

        test('letters megadropdown - focus trigger', async ({ page }) => {
          await focusMegadropdownTrigger(page, 'letters');
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-focus.png`);
        });

        test('letters megadropdown - opened with item hover, focus, and active', async ({ page }) => {
          await openMegadropdown(page, 'letters');
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);

          await hoverMegadropdownItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-item-hover.png`);

          await focusMegadropdownItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-item-focus.png`);

          await closeMegadropdown(page);
        });
      } else {
        test('letters megadropdown - trigger (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-trigger.png`);
          await closeBurgerMenu(page);
        });

        test('letters megadropdown - opened (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await openMegadropdown(page, 'letters');
          await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);
          await closeMegadropdown(page);
        });
      }
    });

    // Language menu tests
    test.describe('Language Menu', () => {
      if (name === 'desktop') {
        test('language menu - default closed', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${name}-language-menu-closed.png`);
        });

        test('language menu - opened', async ({ page }) => {
          await openLanguageMenu(page);
          await expect(page).toHaveScreenshot(`${name}-language-menu-opened.png`);
          await closeLanguageMenu(page);
        });
      } else {
        test('language menu - trigger (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-language-menu-trigger.png`);
          await closeBurgerMenu(page);
        });

        test('language menu - opened (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await openLanguageMenu(page);
          await expect(page).toHaveScreenshot(`${name}-language-menu-opened.png`);
          await closeLanguageMenu(page);
        });
      }
    });

    // Burger menu tests
    test.describe('Burger Menu', () => {
      if (name !== 'desktop') {
        test('burger menu - closed default', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${name}-burger-menu-closed.png`);
        });

        test('burger menu - hover', async ({ page }) => {
          await hoverBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-burger-menu-hover.png`);
        });

        test('burger menu - focus', async ({ page }) => {
          await focusBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-burger-menu-focus.png`);
        });

        test('burger menu - opened', async ({ page }) => {
          await openBurgerMenu(page);
          await expect(page).toHaveScreenshot(`${name}-burger-menu-opened.png`);
          await closeBurgerMenu(page);
        });
      }
    });

    // Local Navigation tests
    test.describe('Local Navigation', () => {
      test('local navigation item hover', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await hoverLocalNavItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-local-navigation-item-hover.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });

      test('local navigation item focus', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await focusLocalNavItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-local-navigation-item-focus.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });
    });

    // Main Navigation tests
    test.describe('Main Navigation', () => {
      test('main navigation first item hover', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await hoverMainNavItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-main-navigation-item-hover.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });

      test('main navigation first item focus', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await focusMainNavItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-main-navigation-item-focus.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });
    });
  });
});
