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

async function focusLanguageMenuItem(page: Page, index: number): Promise<void> {
  await page.evaluate((itemIndex) => {
    const menu = document.querySelector<any>('post-language-menu');
    const items = menu?.shadowRoot?.querySelectorAll<HTMLElement>('button');
    items?.[itemIndex]?.focus();
  }, index);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverLanguageMenuItem(page: Page, index: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  await page.evaluate((itemIndex) => {
    const menu = document.querySelector<any>('post-language-menu');
    const items = menu?.shadowRoot?.querySelectorAll<HTMLElement>('button');
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

async function hoverTargetGroupItem(page: Page, index: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate((itemIndex) => {
    const items = document.querySelectorAll<HTMLElement>('[slot="target-group"] a');
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

async function focusTargetGroupItem(page: Page, index: number): Promise<void> {
  const items = page.locator('[slot="target-group"] a');
  await items.nth(index).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverMetaNavigationItem(page: Page, index: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);
  const coords = await page.evaluate((itemIndex) => {
    const items = document.querySelectorAll<HTMLElement>('[slot="meta-navigation"] a');
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

async function focusMetaNavigationItem(page: Page, index: number): Promise<void> {
  const items = page.locator('[slot="meta-navigation"] a');
  await items.nth(index).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function openUserMenu(page: Page): Promise<void> {
  const trigger = page.locator('post-menu-trigger button');
  await trigger.click();
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function closeUserMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function hoverUserMenuTrigger(page: Page): Promise<void> {
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

async function focusUserMenuTrigger(page: Page): Promise<void> {
  const trigger = page.locator('post-menu-trigger button');
  await trigger.focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverUserMenuItem(page: Page, index: number): Promise<void> {
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

async function focusUserMenuItem(page: Page, index: number): Promise<void> {
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

async function focusMainNavItem(page: Page, index: number): Promise<void> {
  const items = page.locator('post-mainnavigation a');
  await items.nth(index).focus();
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// Test suites
BREAKPOINTS.forEach(({ name, width, height }) => {
  test.describe(`Post Header Portal Loggedin - ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/visual-tests/components/post-header-portal-loggedin.html');
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

        test('language menu - hover trigger', async ({ page }) => {
          await page.evaluate(() => {
            const menu = document.querySelector<any>('post-language-menu');
            const button = menu?.shadowRoot?.querySelector<HTMLElement>('button');
            const rect = button?.getBoundingClientRect();
            if (rect) {
              document.dispatchEvent(
                new MouseEvent('mousemove', {
                  clientX: rect.left + rect.width / 2,
                  clientY: rect.top + rect.height / 2,
                  bubbles: true,
                })
              );
            }
          });
          await page.waitForTimeout(WAIT_TIMES.interaction);
          await expect(page).toHaveScreenshot(`${name}-language-menu-trigger-hover.png`);
        });

        test('language menu - focus trigger', async ({ page }) => {
          await page.evaluate(() => {
            const menu = document.querySelector<any>('post-language-menu');
            const button = menu?.shadowRoot?.querySelector<HTMLElement>('button');
            button?.focus();
          });
          await page.waitForTimeout(WAIT_TIMES.interaction);
          await expect(page).toHaveScreenshot(`${name}-language-menu-trigger-focus.png`);
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

    // Target Group tests
    test.describe('Target Group', () => {
      test('target group item hover', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await hoverTargetGroupItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-target-group-item-hover.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });

      test('target group item focus', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await focusTargetGroupItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-target-group-item-focus.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });
    });

    // Meta Navigation tests
    test.describe('Meta Navigation', () => {
      test('meta navigation item hover', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await hoverMetaNavigationItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-meta-navigation-item-hover.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });

      test('meta navigation item focus', async ({ page }) => {
        if (name !== 'desktop') {
          await openBurgerMenu(page);
        }
        await focusMetaNavigationItem(page, 0);
        await expect(page).toHaveScreenshot(`${name}-meta-navigation-item-focus.png`);
        if (name !== 'desktop') {
          await closeBurgerMenu(page);
        }
      });
    });

    // User Menu tests (specific to loggedin variant)
    test.describe('User Menu', () => {
      if (name === 'desktop') {
        test('user menu trigger - default', async ({ page }) => {
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger.png`);
        });

        test('user menu trigger - hover', async ({ page }) => {
          await hoverUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-hover.png`);
        });

        test('user menu trigger - focus', async ({ page }) => {
          await focusUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-focus.png`);
        });

        test('user menu - opened with item hover/focus', async ({ page }) => {
          await openUserMenu(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-opened.png`);

          await hoverUserMenuItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-user-menu-item-hover.png`);

          await focusUserMenuItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-user-menu-item-focus.png`);

          await closeUserMenu(page);
        });
      } else {
        test('user menu trigger - hover (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await hoverUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-hover.png`);
          await closeBurgerMenu(page);
        });

        test('user menu trigger - focus (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await focusUserMenuTrigger(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-trigger-focus.png`);
          await closeBurgerMenu(page);
        });

        test('user menu - opened (in burger menu)', async ({ page }) => {
          await openBurgerMenu(page);
          await openUserMenu(page);
          await expect(page).toHaveScreenshot(`${name}-user-menu-opened.png`);
          await closeUserMenu(page);
        });
      }
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
