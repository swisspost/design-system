import { test, expect, Page } from '@playwright/test';

const BREAKPOINTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'tablet', width: 780, height: 1024 },
  { name: 'mobile', width: 375, height: 667 },
] as const;

const WAIT_TIMES = {
  component: 500,
  interaction: 200,
  animation: 500,
} as const;

async function waitForHeaderReady(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => {
    return (
      customElements.get('post-header') &&
      customElements.get('post-language-menu') &&
      customElements.get('post-megadropdown')
    );
  });
  await page.waitForTimeout(WAIT_TIMES.component);
}

async function openMegadropdown(page: Page, id: string): Promise<void> {
  await page.evaluate((dropdownId) => {
    const trigger = document.querySelector<HTMLElement>(
      `post-megadropdown-trigger[for="${dropdownId}"] button`
    );
    trigger?.click();
  }, id);
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function closeMegadropdown(page: Page, id: string): Promise<void> {
  await page.evaluate((dropdownId) => {
    const closeButton = document.querySelector<HTMLElement>(
      `post-megadropdown#${dropdownId} [slot="close-button"]`
    );
    closeButton?.click();
  }, id);
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function hoverMegadropdownTrigger(page: Page, id: string): Promise<void> {
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
  });
  await page.waitForTimeout(100);

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

async function focusMegadropdownTrigger(page: Page, id: string): Promise<void> {
  await page.evaluate((dropdownId) => {
    const trigger = document.querySelector<HTMLElement>(
      `post-megadropdown-trigger[for="${dropdownId}"] button`
    );
    trigger?.focus();
  }, id);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverMegadropdownItem(page: Page, dropdownId: string, itemIndex: number): Promise<void> {
  await page.evaluate(() => {
    (document.activeElement as HTMLElement)?.blur();
  });
  await page.waitForTimeout(100);

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

async function focusMegadropdownItem(page: Page, dropdownId: string, itemIndex: number): Promise<void> {
  await page.evaluate(([dId, index]) => {
    const dropdown = document.querySelector<HTMLElement>(`post-megadropdown#${dId}`);
    const items = dropdown?.querySelectorAll('post-list-item a, [slot="megadropdown-overview-link"]');
    const item = items?.[index] as HTMLElement;
    item?.focus();
  }, [dropdownId, itemIndex]);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function openLanguageMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const languageMenu = document.querySelector('post-language-menu');
    const trigger = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
    const button = trigger?.querySelector('button');
    button?.click();
  });
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function closeLanguageMenu(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function openBurgerMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const toggleButton = document.querySelector('post-togglebutton');
    toggleButton?.click();
  });
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function closeBurgerMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const toggleButton = document.querySelector('post-togglebutton');
    if (toggleButton?.getAttribute('aria-pressed') === 'true') {
      toggleButton?.click();
    }
  });
  await page.waitForTimeout(WAIT_TIMES.animation);
}

async function focusBurgerMenu(page: Page): Promise<void> {
  await page.evaluate(() => {
    const toggleButton = document.querySelector('post-togglebutton');
    toggleButton?.focus();
  });
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverBurgerMenu(page: Page): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);

  const coords = await page.evaluate(() => {
    const toggleButton = document.querySelector('post-togglebutton');
    if (toggleButton) {
      const rect = toggleButton.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return null;
  });

  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

async function hoverTargetGroupItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);

  const coords = await page.evaluate((index) => {
    const targetGroup = document.querySelector<HTMLElement>('post-header [slot="target-group"]');
    const links = targetGroup?.querySelectorAll('a');
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

async function focusTargetGroupItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate((index) => {
    const targetGroup = document.querySelector<HTMLElement>('post-header [slot="target-group"]');
    const links = targetGroup?.querySelectorAll('a');
    const link = links?.[index] as HTMLElement;
    link?.focus();
  }, itemIndex);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverMetaNavigationItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);

  const coords = await page.evaluate((index) => {
    const metaNav = document.querySelector<HTMLElement>('post-header [slot="meta-navigation"]');
    const links = metaNav?.querySelectorAll('a');
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

async function focusMetaNavigationItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate((index) => {
    const metaNav = document.querySelector<HTMLElement>('post-header [slot="meta-navigation"]');
    const links = metaNav?.querySelectorAll('a');
    const link = links?.[index] as HTMLElement;
    link?.focus();
  }, itemIndex);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverLocalNavItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);

  const coords = await page.evaluate((index) => {
    const localNav = document.querySelector<HTMLElement>('post-header [slot="local-nav"]');
    const links = localNav?.querySelectorAll('a');
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

async function focusLocalNavItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate((index) => {
    const localNav = document.querySelector<HTMLElement>('post-header [slot="local-nav"]');
    const links = localNav?.querySelectorAll('a');
    const link = links?.[index] as HTMLElement;
    link?.focus();
  }, itemIndex);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverMainNavItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);

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

async function focusMainNavItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate((index) => {
    const mainNav = document.querySelector<HTMLElement>('post-header [slot="post-mainnavigation"]');
    const links = mainNav?.querySelectorAll('post-megadropdown-trigger button, post-list-item a');
    const link = links?.[index] as HTMLElement;
    (link as any)?.focus();
  }, itemIndex);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

test.describe('Post Header - Jobs Loggedout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visual-tests/components/post-header-jobs-loggedout.html');
    await waitForHeaderReady(page);
  });

  BREAKPOINTS.forEach(({ name, width, height }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.waitForTimeout(WAIT_TIMES.interaction);
      });

      // Default state
      test('default state', async ({ page }) => {
        await expect(page).toHaveScreenshot(`${name}-default.png`);
      });

      // Megadropdown tests
      test.describe('Megadropdown', () => {
        if (name === 'desktop') {
          test('letters trigger hover', async ({ page }) => {
            await hoverMegadropdownTrigger(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-hover.png`);
          });

          test('letters trigger focus', async ({ page }) => {
            await focusMegadropdownTrigger(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-focus.png`);
          });

          test('letters megadropdown opened', async ({ page }) => {
            await openMegadropdown(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);

            await hoverMegadropdownItem(page, 'letters', 0);
            await expect(page).toHaveScreenshot(`${name}-megadropdown-item-hover.png`);

            await focusMegadropdownItem(page, 'letters', 0);
            await expect(page).toHaveScreenshot(`${name}-megadropdown-item-focus.png`);

            await closeMegadropdown(page, 'letters');
          });

          test('packages megadropdown opened', async ({ page }) => {
            await openMegadropdown(page, 'packages');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-packages-opened.png`);
            await closeMegadropdown(page, 'packages');
          });
        } else {
          test('megadropdown in burger menu', async ({ page }) => {
            await openBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-with-megadropdown.png`);

            await openMegadropdown(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);
            await closeMegadropdown(page, 'letters');
          });
        }
      });

      // Language menu tests
      test.describe('Language Menu', () => {
        if (name === 'desktop') {
          test('language menu opened', async ({ page }) => {
            await openLanguageMenu(page);
            await expect(page).toHaveScreenshot(`${name}-language-menu-opened.png`);
            await closeLanguageMenu(page);
          });
        } else {
          test('language menu in burger menu', async ({ page }) => {
            await openBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-language-menu.png`);
          });
        }
      });

      // Burger menu tests
      if (name !== 'desktop') {
        test.describe('Burger Menu', () => {
          test('burger menu opened', async ({ page }) => {
            await openBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-opened.png`);
            await closeBurgerMenu(page);
          });

          test('burger menu button hover', async ({ page }) => {
            await hoverBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-hover.png`);
          });

          test('burger menu button focus', async ({ page }) => {
            await focusBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-focus.png`);
          });
        });
      }

      // Target group tests
      test.describe('Target Group', () => {
        test('target group item hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await hoverTargetGroupItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-target-group-hover.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('target group item focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await focusTargetGroupItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-target-group-focus.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });
      });

      // Meta navigation tests
      test.describe('Meta Navigation', () => {
        test('meta navigation item hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await hoverMetaNavigationItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-meta-nav-hover.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('meta navigation item focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await focusMetaNavigationItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-meta-nav-focus.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });
      });

      // Local navigation tests
      test.describe('Local Navigation', () => {
        test('local navigation item hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await hoverLocalNavItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-local-nav-hover.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('local navigation item focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await focusLocalNavItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-local-nav-focus.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });
      });

      // Main navigation tests
      test.describe('Main Navigation', () => {
        test('main navigation item hover', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await hoverMainNavItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-main-nav-hover.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });

        test('main navigation item focus', async ({ page }) => {
          if (name !== 'desktop') await openBurgerMenu(page);
          await focusMainNavItem(page, 0);
          await expect(page).toHaveScreenshot(`${name}-main-nav-focus.png`);
          if (name !== 'desktop') await closeBurgerMenu(page);
        });
      });

      // Keyboard navigation
      test('keyboard navigation', async ({ page }) => {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(WAIT_TIMES.interaction);
        await expect(page).toHaveScreenshot(`${name}-keyboard-nav.png`);
      });
    });
  });
});
