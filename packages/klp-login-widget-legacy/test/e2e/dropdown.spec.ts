import { APIRequestContext } from '@playwright/test';
import { expect, test } from './coverage';
import {
  changeAccountLink,
  control,
  menu,
  menuToggler,
  openMenu,
  openWidget,
  resetScenario,
  setScenario,
  signIn,
  widget,
} from './fixtures';

let api: APIRequestContext;

const B2C = {
  name: 'Andrea',
  surname: 'Chiodoni',
  email: 'andrea.chiodoni@post.ch',
  userType: 'B2C',
  authLevel: 'PASSWORD',
  support: false,
};

const B2B = { ...B2C, userType: 'B2B', company: 'Post AG' };

test.beforeAll(async () => {
  api = await control();
});

test.beforeEach(async ({ context }) => {
  await resetScenario(api);
  await signIn(context);
  await setScenario(api, { subscribeMode: 'ok', session: 'b2c' });
});

test.describe('dropdown', () => {
  test('opens on click and marks the toggler expanded', async ({ page }) => {
    await openWidget(page);

    await expect(menu(page)).toBeHidden();
    await expect(menuToggler(page)).toHaveAttribute('aria-expanded', 'false');

    await openMenu(page);

    await expect(menuToggler(page)).toHaveAttribute('aria-expanded', 'true');
    await expect(widget(page)).toHaveClass(/bubble/);
    await expect(menu(page).locator('xpath=..')).toHaveClass(/klp-widget-menu-open/);
  });

  test('closes when the toggler is clicked again', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await menuToggler(page).click();

    await expect(menu(page)).toBeHidden();
    await expect(widget(page)).not.toHaveClass(/bubble/);
    await expect(menu(page).locator('xpath=..')).toHaveClass(/klp-widget-menu-close/);
  });

  test('closes on a click outside the widget', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    // <body> has no box at this point, so a coordinate click is the only way out of the widget.
    await page.mouse.click(5, 300);

    await expect(menu(page)).toBeHidden();
    await expect(menuToggler(page)).toHaveAttribute('aria-expanded', 'false');
  });

  test('closes even when the click lands inside the widget', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await menu(page).locator('li.name-and-surname').click();

    // closeDropdowns() bails out when e.target sits under #post-klp-login-widget, but the listener
    // is on `document`, so the shadow root retargets e.target to the host element, which is an
    // ancestor of the wrapper rather than a descendant. The guard can therefore never fire and the
    // menu collapses on any click at all.
    await expect(menu(page)).toBeHidden();
  });

  test('closes on escape', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await page.keyboard.press('Escape');

    await expect(menu(page)).toBeHidden();
  });

  test('ignores non-escape keys on the body', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await page.keyboard.press('KeyA');

    await expect(menu(page)).toBeVisible();
  });
});

test.describe('keyboard navigation', () => {
  // The menu is `<ul>` whose first <li> is the name-and-surname block. That <li> holds no anchor,
  // which is why several of the widget's focus moves below land nowhere.
  const entry = (page: Parameters<typeof menu>[0], nth: number) =>
    menu(page).locator(`li:nth-child(${nth}) a`);

  test('arrow down opens the menu but focuses nothing, because the first entry has no link', async ({
    page,
  }) => {
    await openWidget(page);

    await menuToggler(page).focus();
    await page.keyboard.press('ArrowDown');

    await expect(menu(page)).toBeVisible();
    // `dropdown.find('li:first a')` matches the name-and-surname <li>, which has no <a>.
    await expect(menuToggler(page)).toBeFocused();
  });

  test('arrow down on an already open menu leaves it open', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await menuToggler(page).focus();
    await page.keyboard.press('ArrowDown');

    await expect(menu(page)).toBeVisible();
  });

  test('arrow up on the toggler closes an open menu', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await menuToggler(page).focus();
    await page.keyboard.press('ArrowUp');

    await expect(menu(page)).toBeHidden();
  });

  test('arrow up on the toggler does nothing while the menu is closed', async ({ page }) => {
    await openWidget(page);

    await menuToggler(page).focus();
    await page.keyboard.press('ArrowUp');

    await expect(menu(page)).toBeHidden();
  });

  test('arrow left and right close an open menu', async ({ page }) => {
    await openWidget(page);

    await openMenu(page);
    await menuToggler(page).focus();
    await page.keyboard.press('ArrowLeft');
    await expect(menu(page)).toBeHidden();

    await openMenu(page);
    await menuToggler(page).focus();
    await page.keyboard.press('ArrowRight');
    await expect(menu(page)).toBeHidden();
  });

  test('ignores keys outside the arrow range on the toggler', async ({ page }) => {
    await openWidget(page);

    await menuToggler(page).focus();
    await page.keyboard.press('KeyA');

    await expect(menu(page)).toBeHidden();
  });

  test('arrow down and right move to the next entry', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await entry(page, 2).focus();
    await page.keyboard.press('ArrowDown');
    await expect(entry(page, 3)).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(entry(page, 4)).toBeFocused();
  });

  test('arrow up and left move to the previous entry', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await entry(page, 4).focus();
    await page.keyboard.press('ArrowUp');
    await expect(entry(page, 3)).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(entry(page, 2)).toBeFocused();
  });

  test('arrow up on the second entry leaves focus stuck on that entry', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await entry(page, 2).focus();
    await page.keyboard.press('ArrowUp');

    // `parent.prev('li')` finds the name-and-surname <li>, so the "wrap back to the toggler"
    // fallback never runs, and `.find('a').focus()` has no anchor to move focus to. The user
    // cannot reach the toggler again with the keyboard.
    await expect(entry(page, 2)).toBeFocused();
    await expect(menu(page)).toBeVisible();
  });

  test('arrow down on the last entry keeps focus where it is', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    const last = menu(page).locator('li:last-child a');
    await last.focus();
    await page.keyboard.press('ArrowDown');

    await expect(last).toBeFocused();
  });

  test('ignores keys outside the arrow range inside the menu', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await entry(page, 2).focus();
    await page.keyboard.press('KeyA');

    await expect(entry(page, 2)).toBeFocused();
  });
});

test.describe('menu contents', () => {
  test('offers the change-account entry for a userAndProfile session', async ({ page }) => {
    await openWidget(page);
    await openMenu(page);

    await expect(changeAccountLink(page)).toBeVisible();
  });

  test('omits the change-account entry when the session cannot change account', async ({
    page,
  }) => {
    await setScenario(api, {
      session: { ...B2C, changeUserAndProfile: null },
    });
    await openWidget(page);
    await openMenu(page);

    await expect(changeAccountLink(page)).toHaveCount(0);
  });

  test('offers the change-company entry for a legacy B2B session', async ({ page }) => {
    await setScenario(api, {
      session: { ...B2B, changeUserAndProfile: null, canChangeCompany: true },
    });
    await openWidget(page);
    await openMenu(page);

    await expect(changeAccountLink(page)).toBeVisible();
  });
});
