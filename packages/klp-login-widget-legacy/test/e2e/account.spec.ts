import { APIRequestContext } from '@playwright/test';
import { expect, test } from './coverage';
import {
  changeAccountLink,
  control,
  logoutLink,
  openMenu,
  openWidget,
  resetScenario,
  setScenario,
  signIn,
  widget,
} from './fixtures';

let api: APIRequestContext;

const BASE = {
  name: 'Andrea',
  surname: 'Chiodoni',
  email: 'andrea.chiodoni@post.ch',
  userType: 'B2C',
  authLevel: 'PASSWORD',
  support: false,
};

/** Reaches isChangeUserAndProfile(). */
const USER_AND_PROFILE = { ...BASE, changeUserAndProfile: 'userAndProfile' };
/** Reaches isOldChangeCompany() through the legacy B2B branch. */
const LEGACY_B2B = {
  ...BASE,
  userType: 'B2B',
  company: 'Post AG',
  canChangeCompany: true,
  changeUserAndProfile: null,
};

const modal = (page: Parameters<typeof widget>[0]) => widget(page).locator('#changeAccountModal');
const confirmButton = (page: Parameters<typeof widget>[0]) =>
  widget(page).locator('#klp-widget-authenticated-dochangecompany');

/** The fake landing pages echo the URL they were reached with into <pre id="query">. */
const landedOn = (page: Parameters<typeof widget>[0]) => page.locator('#query').innerText();

test.beforeAll(async () => {
  api = await control();
});

test.beforeEach(async ({ context }) => {
  await resetScenario(api);
  await signIn(context);
});

test.describe('change account dialog', () => {
  test('opens from the menu entry and asks the user to confirm', async ({ page }) => {
    await setScenario(api, { subscribeMode: 'ok', session: USER_AND_PROFILE });
    await openWidget(page);
    await openMenu(page);

    await changeAccountLink(page).click();

    await expect(modal(page)).toBeVisible();
    await expect(modal(page)).toContainText('Möchten Sie in ein anderes Benutzerkonto wechseln?');
    await expect(confirmButton(page)).toHaveText('Weiter');
  });

  test('asks about the company instead for a legacy B2B session', async ({ page }) => {
    await setScenario(api, { subscribeMode: 'ok', session: LEGACY_B2B });
    await openWidget(page);
    await openMenu(page);

    await changeAccountLink(page).click();

    await expect(modal(page)).toContainText('Möchten Sie die aktuelle Firma wechseln?');
    await expect(confirmButton(page)).toHaveText('Firma wählen');
  });

  test('confirming sends the user to the logout URL flagged as a company change', async ({
    page,
  }) => {
    await setScenario(api, { subscribeMode: 'ok', session: USER_AND_PROFILE });
    await openWidget(page);
    await openMenu(page);
    await changeAccountLink(page).click();

    await confirmButton(page).click();
    await page.waitForURL(/\/logout\//);

    const query = await landedOn(page);
    expect(query).toContain('app=kvm');
    expect(query).toContain('service=klp');
    expect(query).toContain('changecompany=true');
  });

  test('closes when the × is clicked', async ({ page }) => {
    await setScenario(api, { subscribeMode: 'ok', session: USER_AND_PROFILE });
    await openWidget(page);
    await openMenu(page);
    await changeAccountLink(page).click();
    await expect(modal(page)).toBeVisible();

    await modal(page).locator('.close').click();

    await expect(modal(page)).toHaveCount(0);
  });

  test('stacks a second dialog when the entry is clicked twice', async ({ page }) => {
    await setScenario(api, { subscribeMode: 'ok', session: USER_AND_PROFILE });
    await openWidget(page);
    await openMenu(page);

    await changeAccountLink(page).click();
    // The open modal covers the menu entry, so the repeat click has to be dispatched directly.
    await changeAccountLink(page).dispatchEvent('click');

    // The guard looks for #klp-widget-authenticated-changecompanydialog, an id the dialog markup
    // never uses, so it always evaluates to "not yet rendered" and appends another modal.
    await expect(modal(page)).toHaveCount(2);
  });
});

test.describe('change account dialog for a support session', () => {
  test('refuses the account change and offers a logout instead', async ({ page }) => {
    await setScenario(api, {
      subscribeMode: 'ok',
      session: { ...USER_AND_PROFILE, support: true },
    });
    await openWidget(page);
    await openMenu(page);

    await changeAccountLink(page).click();

    await expect(modal(page)).toContainText('Kunden-Supportlogin');
    await expect(confirmButton(page)).toHaveText('Logout');
  });

  test('marks the widget as a support session', async ({ page }) => {
    await setScenario(api, {
      subscribeMode: 'ok',
      session: { ...USER_AND_PROFILE, support: true },
    });
    await openWidget(page);

    await expect(widget(page).locator('.klp-widget-authenticated')).toHaveClass(
      /klp-widget-support/,
    );
  });

  test('confirming logs out without flagging a company change', async ({ page }) => {
    await setScenario(api, {
      subscribeMode: 'ok',
      session: { ...LEGACY_B2B, support: true },
    });
    await openWidget(page);
    await openMenu(page);
    await changeAccountLink(page).click();

    await confirmButton(page).click();
    await page.waitForURL(/\/logout\//);

    expect(await landedOn(page)).not.toContain('changecompany');
  });
});

test.describe('logout', () => {
  test('sends the user to the logout URL with the portal parameters', async ({ page }) => {
    await setScenario(api, { subscribeMode: 'ok', session: USER_AND_PROFILE });
    await openWidget(page);
    await openMenu(page);

    await logoutLink(page).click();
    await page.waitForURL(/\/logout\//);

    const query = await landedOn(page);
    expect(query).toContain('app=kvm');
    expect(query).toContain('lang=de');
    expect(query).toContain('service=klp');
    expect(query).toContain('inIframe=false');
    expect(query).toContain('logoutTargetURL=https://int.post.ch/de/');
  });

  test('clears the persisted state and the control cookie on the way out', async ({
    page,
    context,
  }) => {
    await setScenario(api, { subscribeMode: 'ok', session: USER_AND_PROFILE });
    await openWidget(page);

    const persisted = await page.evaluate(() => sessionStorage.getItem('klp.widget.state'));
    expect(persisted).not.toBeNull();

    await openMenu(page);
    await logoutLink(page).click();
    await page.waitForURL(/\/logout\//);

    const cookies = await context.cookies('https://int.post.ch/');
    expect(cookies.find(c => c.name === 'NCTRL')).toBeUndefined();
  });
});
