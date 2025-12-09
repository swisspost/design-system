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

// ============= Megadropdown Helper Functions =============

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
  await page.evaluate((ids) => {
    (document.activeElement as HTMLElement)?.blur();
  });
  await page.waitForTimeout(100);

  const coords = await page.evaluate(([dropdownId, index]) => {
    const dropdown = document.querySelector<HTMLElement>(`post-megadropdown#${dropdownId}`);
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
  await page.evaluate(([dropdownId, index]) => {
    const dropdown = document.querySelector<HTMLElement>(`post-megadropdown#${dropdownId}`);
    const items = dropdown?.querySelectorAll('post-list-item a, [slot="megadropdown-overview-link"]');
    const item = items?.[index] as HTMLElement;
    item?.focus();
  }, [dropdownId, itemIndex]);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

// ============= Language Menu Helper Functions =============

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

async function focusLanguageMenuItem(page: Page, code: string): Promise<void> {
  await page.evaluate((langCode) => {
    const languageMenu = document.querySelector('post-language-menu');
    const item = Array.from(languageMenu?.querySelectorAll('post-language-menu-item') || [])
      .find(el => el.getAttribute('code') === langCode);

    if (item) {
      const element = item.querySelector('a, button') as HTMLElement;
      element?.focus();
    }
  }, code);
  await page.waitForTimeout(WAIT_TIMES.interaction);
}

async function hoverLanguageMenuItem(page: Page, code: string): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.waitForTimeout(100);

  const coords = await page.evaluate((langCode) => {
    const languageMenu = document.querySelector('post-language-menu');
    const item = Array.from(languageMenu?.querySelectorAll('post-language-menu-item') || [])
      .find(el => el.getAttribute('code') === langCode);

    if (item) {
      const element = item.querySelector('a, button');
      if (element) {
        const rect = element.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    }
    return null;
  }, code);

  if (coords) {
    await page.mouse.move(coords.x, coords.y);
    await page.waitForTimeout(WAIT_TIMES.interaction);
  }
}

// ============= Burger Menu Helper Functions =============

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

// ============= Target Group Helper Functions =============

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

// ============= Meta Navigation Helper Functions =============

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

// ============= Local Navigation Helper Functions =============

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

// ============= Main Navigation Helper Functions =============

async function focusMainNavItem(page: Page, itemIndex: number): Promise<void> {
  await page.evaluate((index) => {
    const mainNav = document.querySelector<HTMLElement>('post-header [slot="post-mainnavigation"]');
    const links = mainNav?.querySelectorAll('post-megadropdown-trigger button, post-list-item a');
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

test.describe('Post Header - Jobs Variant', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visual-tests/components/post-header-jobs.html');
    await waitForHeaderReady(page);
  });

  BREAKPOINTS.forEach(({ name, width, height }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.waitForTimeout(WAIT_TIMES.interaction);
      });

      // ============= DEFAULT STATE =============
      test('default state', async ({ page }) => {
        await expect(page).toHaveScreenshot(`${name}-default.png`);
      });

      // ============= MEGADROPDOWN TESTS =============
      test.describe('Megadropdown', () => {
        if (name !== 'desktop') {
          // Mobile & Tablet: Open burger menu once, test both megadropdowns
          test('letters megadropdown opened (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await openMegadropdown(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);
          });

          test('packages megadropdown opened (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await openMegadropdown(page, 'packages');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-packages-opened.png`);
          });

          test('megadropdown trigger hover (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await hoverMegadropdownTrigger(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-trigger-hover.png`);
          });

          test('megadropdown trigger focus (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await focusMegadropdownTrigger(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-trigger-focus.png`);
          });
        } else {
          // Desktop: No burger menu needed
          test('megadropdown trigger states and both dropdowns', async ({ page }) => {
            // Test trigger hover
            await hoverMegadropdownTrigger(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-trigger-hover.png`);

            // Test trigger focus
            await focusMegadropdownTrigger(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-trigger-focus.png`);

            // Test letters megadropdown opened
            await openMegadropdown(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-letters-opened.png`);

            // Test overview link hover
            await hoverMegadropdownItem(page, 'letters', 0);
            await expect(page).toHaveScreenshot(`${name}-megadropdown-overview-link-hover.png`);

            // Test overview link focus
            await focusMegadropdownItem(page, 'letters', 0);
            await expect(page).toHaveScreenshot(`${name}-megadropdown-overview-link-focus.png`);

            // Test item hover
            await hoverMegadropdownItem(page, 'letters', 1);
            await expect(page).toHaveScreenshot(`${name}-megadropdown-item-hover.png`);

            // Test item focus
            await focusMegadropdownItem(page, 'letters', 1);
            await expect(page).toHaveScreenshot(`${name}-megadropdown-item-focus.png`);

            // Close and test packages megadropdown
            await closeMegadropdown(page, 'letters');
            await openMegadropdown(page, 'packages');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-packages-opened.png`);
          });
        }
      });

      // ============= LANGUAGE SWITCH TESTS =============
      test.describe('Language Switch', () => {
        // Desktop: Dropdown mode
        if (name === 'desktop') {
          test('language menu opened', async ({ page }) => {
            await openLanguageMenu(page);
            await expect(page).toHaveScreenshot(`${name}-language-menu-opened.png`);
          });

          test('language menu closed', async ({ page }) => {
            await openLanguageMenu(page);
            await closeLanguageMenu(page);
            await expect(page).toHaveScreenshot(`${name}-language-menu-closed.png`);
          });

          test('language menu trigger hover', async ({ page }) => {
            const trigger = await page.evaluateHandle(() => {
              const languageMenu = document.querySelector('post-language-menu');
              const triggerEl = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
              return triggerEl?.querySelector('button');
            });

            await trigger.asElement()?.hover();
            await page.waitForTimeout(WAIT_TIMES.interaction);
            await expect(page).toHaveScreenshot(`${name}-language-menu-trigger-hover.png`);
          });

          test('language menu trigger focus', async ({ page }) => {
            await page.evaluate(() => {
              const languageMenu = document.querySelector('post-language-menu');
              const trigger = languageMenu?.shadowRoot?.querySelector('post-menu-trigger');
              const button = trigger?.querySelector('button') as HTMLButtonElement;
              button?.focus();
            });
            await page.waitForTimeout(WAIT_TIMES.interaction);
            await expect(page).toHaveScreenshot(`${name}-language-menu-trigger-focus.png`);
          });

          test('language menu item hover', async ({ page }) => {
            await openLanguageMenu(page);
            await hoverLanguageMenuItem(page, 'de');
            await expect(page).toHaveScreenshot(`${name}-language-menu-item-hover.png`);
          });

          test('language menu item focus', async ({ page }) => {
            await openLanguageMenu(page);
            await focusLanguageMenuItem(page, 'de');
            await expect(page).toHaveScreenshot(`${name}-language-menu-item-focus.png`);
          });
        }

        // Tablet & Mobile: List mode (inside burger menu)
        if (name !== 'desktop') {
          test('language menu item hover (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await hoverLanguageMenuItem(page, 'de');
            await expect(page).toHaveScreenshot(`${name}-language-menu-item-hover.png`);
          });

          test('language menu item focus (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await focusLanguageMenuItem(page, 'de');
            await expect(page).toHaveScreenshot(`${name}-language-menu-item-focus.png`);
          });
        }
      });

      // ============= BURGER MENU TESTS (Mobile & Tablet) =============
      if (name !== 'desktop') {
        test.describe('Burger Menu', () => {
          test('burger menu opened', async ({ page }) => {
            await openBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-opened.png`);
          });

          test('burger menu closed', async ({ page }) => {
            await openBurgerMenu(page);
            await closeBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-closed.png`);
          });

          test('burger menu button hover', async ({ page }) => {
            await hoverBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-button-hover.png`);
          });

          test('burger menu button focus', async ({ page }) => {
            await focusBurgerMenu(page);
            await expect(page).toHaveScreenshot(`${name}-burger-menu-button-focus.png`);
          });
        });
      }

      // ============= TARGET GROUP TESTS =============
      test.describe('Target Group', () => {
        if (name === 'desktop') {
          test('target group item hover', async ({ page }) => {
            await hoverTargetGroupItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-target-group-item-hover.png`);
          });

          test('target group item focus', async ({ page }) => {
            await focusTargetGroupItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-target-group-item-focus.png`);
          });

          test('target group active item (aria-current)', async ({ page }) => {
            // Add aria-current to first item to show active state
            await page.evaluate(() => {
              const targetGroup = document.querySelector<HTMLElement>('post-header [slot="target-group"]');
              const firstLink = targetGroup?.querySelector('a');
              if (firstLink) {
                firstLink.setAttribute('aria-current', 'page');
              }
            });
            await page.waitForTimeout(WAIT_TIMES.interaction);
            await expect(page).toHaveScreenshot(`${name}-target-group-item-active.png`);
          });
        } else {
          // Mobile & Tablet: Inside burger menu
          test('target group item hover (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await hoverTargetGroupItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-target-group-item-hover.png`);
          });

          test('target group item focus (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await focusTargetGroupItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-target-group-item-focus.png`);
          });

          test('target group active item (aria-current, in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            // Add aria-current to first item to show active state
            await page.evaluate(() => {
              const targetGroup = document.querySelector<HTMLElement>('post-header [slot="target-group"]');
              const firstLink = targetGroup?.querySelector('a');
              if (firstLink) {
                firstLink.setAttribute('aria-current', 'page');
              }
            });
            await page.waitForTimeout(WAIT_TIMES.interaction);
            await expect(page).toHaveScreenshot(`${name}-target-group-item-active.png`);
          });
        }
      });      // ============= META NAVIGATION TESTS =============
      test.describe('Meta Navigation', () => {
        if (name !== 'desktop') {
          test('meta navigation item hover (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await hoverMetaNavigationItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-meta-nav-item-hover.png`);
          });

          test('meta navigation item focus (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await focusMetaNavigationItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-meta-nav-item-focus.png`);
          });

          test('meta navigation active item (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            // The "Jobs" item has aria-current="location"
            await expect(page).toHaveScreenshot(`${name}-meta-nav-active-state.png`);
          });
        } else {
          test('meta navigation item hover', async ({ page }) => {
            await hoverMetaNavigationItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-meta-nav-item-hover.png`);
          });

          test('meta navigation item focus', async ({ page }) => {
            await focusMetaNavigationItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-meta-nav-item-focus.png`);
          });

          test('meta navigation active item', async ({ page }) => {
            // The "Jobs" item has aria-current="location"
            await expect(page).toHaveScreenshot(`${name}-meta-nav-active-state.png`);
          });
        }
      });

      // ============= LOCAL NAVIGATION TESTS =============
      test.describe('Local Navigation', () => {
        if (name !== 'desktop') {
          test('local navigation item hover (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await hoverLocalNavItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-local-nav-item-hover.png`);
          });

          test('local navigation item focus (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await focusLocalNavItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-local-nav-item-focus.png`);
          });
        } else {
          test('local navigation item hover', async ({ page }) => {
            await hoverLocalNavItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-local-nav-item-hover.png`);
          });

          test('local navigation item focus', async ({ page }) => {
            await focusLocalNavItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-local-nav-item-focus.png`);
          });
        }
      });

      // ============= MAIN NAVIGATION TESTS =============
      test.describe('Main Navigation', () => {
        if (name !== 'desktop') {
          test('main navigation item hover (link only, in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await hoverMainNavItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-main-nav-link-only-hover.png`);
          });

          test('main navigation item focus (link only, in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await focusMainNavItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-main-nav-link-only-focus.png`);
          });

          test('main navigation megadropdown trigger hover (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await hoverMainNavItem(page, 2);
            await expect(page).toHaveScreenshot(`${name}-main-nav-megadropdown-trigger-hover.png`);
          });

          test('main navigation megadropdown trigger focus (in burger menu)', async ({ page }) => {
            await openBurgerMenu(page);
            await focusMainNavItem(page, 2);
            await expect(page).toHaveScreenshot(`${name}-main-nav-megadropdown-trigger-focus.png`);
          });
        } else {
          test('main navigation item hover (link only)', async ({ page }) => {
            await hoverMainNavItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-main-nav-link-only-hover.png`);
          });

          test('main navigation item focus (link only)', async ({ page }) => {
            await focusMainNavItem(page, 0);
            await expect(page).toHaveScreenshot(`${name}-main-nav-link-only-focus.png`);
          });

          test('main navigation megadropdown trigger hover', async ({ page }) => {
            await hoverMainNavItem(page, 2);
            await expect(page).toHaveScreenshot(`${name}-main-nav-megadropdown-trigger-hover.png`);
          });

          test('main navigation megadropdown trigger focus', async ({ page }) => {
            await focusMainNavItem(page, 2);
            await expect(page).toHaveScreenshot(`${name}-main-nav-megadropdown-trigger-focus.png`);
          });
        }
      });

      // ============= COMBINED INTERACTION TESTS =============
      test.describe('Combined Interactions', () => {
        test('keyboard navigation through header', async ({ page }) => {
          await page.keyboard.press('Tab');
          await page.waitForTimeout(WAIT_TIMES.interaction);
          await expect(page).toHaveScreenshot(`${name}-keyboard-nav-tab-1.png`);

          await page.keyboard.press('Tab');
          await page.waitForTimeout(WAIT_TIMES.interaction);
          await expect(page).toHaveScreenshot(`${name}-keyboard-nav-tab-2.png`);
        });

        if (name !== 'desktop') {
          test('burger menu with megadropdown interaction', async ({ page }) => {
            await openBurgerMenu(page);
            await openMegadropdown(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-burger-with-megadropdown-opened.png`);
          });
        }

        if (name === 'desktop') {
          test('megadropdown with language menu both visible', async ({ page }) => {
            await openMegadropdown(page, 'letters');
            await expect(page).toHaveScreenshot(`${name}-megadropdown-with-language-menu-default.png`);
          });
        }
      });
    });
  });

  // ============= FOCUS MANAGEMENT TESTS =============
  test.describe('Focus Management', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.waitForTimeout(WAIT_TIMES.interaction);
    });

    test('focus trap in megadropdown', async ({ page }) => {
      await openMegadropdown(page, 'letters');
      // Tab through megadropdown items
      await page.keyboard.press('Tab');
      await page.waitForTimeout(WAIT_TIMES.interaction);
      await expect(page).toHaveScreenshot('focus-trap-megadropdown.png');
    });

    test('focus returns to trigger after megadropdown closes', async ({ page }) => {
      await focusMegadropdownTrigger(page, 'letters');
      await openMegadropdown(page, 'letters');
      await closeMegadropdown(page, 'letters');
      await page.waitForTimeout(WAIT_TIMES.animation);
      await expect(page).toHaveScreenshot('focus-return-after-megadropdown-close.png');
    });
  });

  // ============= ACTIVE STATE TESTS =============
  test.describe('Active States', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.waitForTimeout(WAIT_TIMES.interaction);
    });

    test('navigation item with aria-current attribute', async ({ page }) => {
      // Meta navigation has "Jobs" with aria-current="location"
      await expect(page).toHaveScreenshot('meta-nav-active-item.png');
    });
  });
});
