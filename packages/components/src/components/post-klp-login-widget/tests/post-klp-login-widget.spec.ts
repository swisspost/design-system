import { newSpecPage, SpecPage } from '@stencil/core/testing';
import type { KlpSessionData } from '../lib/klp-session.model';
import { setState } from '../lib/store';
import { PostKlpLoginWidget } from '../post-klp-login-widget';

const links = `
  <a slot="login-link" href="/login">Login</a>
  <post-menu-item slot="account-switch"><a href="/switch-account">Switch account</a></post-menu-item>
  <post-menu-item slot="company-switch"><a href="/switch-company">Switch company</a></post-menu-item>
  <post-menu-item slot="menu-links"><a href="/profile">Profile</a></post-menu-item>
  <post-menu-item slot="logout-link"><a href="/logout">Logout</a></post-menu-item>
`;

const requiredTexts = {
  'text-current-user': 'Currently signed in: {user}',
  'text-user-links': 'User links',
  'text-access-user-links': 'Open user links',
};

/** Pass `null` to leave an attribute out. */
async function render(attributes: Record<string, string | null> = {}, children = links) {
  const serialized = Object.entries({ ...requiredTexts, ...attributes })
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}="${value}"`)
    .join(' ');

  return newSpecPage({
    components: [PostKlpLoginWidget],
    html: `<post-klp-login-widget ${serialized}>${children}</post-klp-login-widget>`,
  });
}

function shadow(page: SpecPage, selector: string) {
  return page.root.shadowRoot.querySelector(selector);
}

/** The session is private state the platform owns; a spec has no platform to log in to. */
async function logIn(page: SpecPage, overrides: Partial<KlpSessionData> = {}) {
  (page.rootInstance as { session: KlpSessionData | null }).session = {
    name: 'Ada',
    surname: 'Lovelace',
    userType: 'B2B',
    authLevel: 'PASSWORD',
    ...overrides,
  };
  await page.waitForChanges();
}

/** Stands in for the platform having answered, whichever way it answered. */
async function resolve(page: SpecPage) {
  (page.rootInstance as { resolved: boolean }).resolved = true;
  await page.waitForChanges();
}

describe('post-klp-login-widget', () => {
  // The store outlives a spec page, so one test's count would otherwise leak into the next.
  afterEach(() => setState('unread', 0));

  it('holds a neutral box while the platform has not answered yet', async () => {
    const page = await render();

    expect(shadow(page, '.user-menu-placeholder')).not.toBeNull();
    expect(shadow(page, 'slot[name="login-link"]')).toBeNull();
    expect(shadow(page, 'post-menu')).toBeNull();
  });

  it('holds a nameless avatar, hidden from assistive technology as it says nothing', async () => {
    const page = await render();
    const placeholder = shadow(page, '.user-menu-placeholder');

    expect(placeholder.localName).toBe('post-avatar');
    expect(placeholder.getAttribute('firstname')).toBe(' ');
    expect(placeholder.getAttribute('aria-hidden')).toBe('true');
  });

  it('offers only the login link once the platform reports nobody', async () => {
    const page = await render();
    await resolve(page);

    expect(shadow(page, 'slot[name="login-link"]')).not.toBeNull();
    expect(shadow(page, '.user-menu-placeholder')).toBeNull();
    expect(shadow(page, 'post-menu')).toBeNull();
  });

  it('skips the placeholder when the consumer knows the visitor is anonymous', async () => {
    const page = await render({ 'initial-state': 'anonymous' });

    expect(shadow(page, 'slot[name="login-link"]')).not.toBeNull();
    expect(shadow(page, '.user-menu-placeholder')).toBeNull();
  });

  it('keeps the placeholder when the consumer knows a session exists', async () => {
    const page = await render({ 'initial-state': 'authenticated' });

    expect(shadow(page, '.user-menu-placeholder')).not.toBeNull();
    expect(shadow(page, 'slot[name="login-link"]')).toBeNull();
  });

  it('falls back to the login link when the session ends', async () => {
    const page = await render();
    await logIn(page);
    (page.rootInstance as { session: KlpSessionData | null }).session = null;
    await resolve(page);

    expect(shadow(page, 'slot[name="login-link"]')).not.toBeNull();
    expect(shadow(page, 'post-menu')).toBeNull();
  });

  it('swaps the login link for the user menu once a session arrives', async () => {
    const page = await render();
    await logIn(page);

    expect(shadow(page, 'slot[name="login-link"]')).toBeNull();
    expect(shadow(page, 'post-menu')).not.toBeNull();
  });

  it('renders the same markup twice, so hydration cannot mismatch', async () => {
    const first = await render();
    const second = await render();

    expect(first.root.shadowRoot.innerHTML).toBe(second.root.shadowRoot.innerHTML);
  });

  it('reports an unknown environment instead of contacting a guessed one', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    const fetch = jest.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    const page = await render({ environment: 'nope' });

    // The connection is a browser-only branch, so a spec has to ask for it.
    (page.rootInstance as { connect(): void }).connect();

    expect(error).toHaveBeenCalledWith(expect.stringContaining('not a known environment'));
    expect(fetch).not.toHaveBeenCalled();
    jest.restoreAllMocks();
  });

  describe('link slots', () => {
    it('takes every link from the consumer, never from the session', async () => {
      const page = await render();
      await logIn(page, { changeUserAndProfile: 'userAndProfile' });

      const slots = [...page.root.shadowRoot.querySelectorAll('slot')].map(slot =>
        slot.getAttribute('name'),
      );

      expect(slots).toEqual(['account-switch', 'menu-links', 'logout-link']);
      expect(shadow(page, 'a')).toBeNull();
    });

    it('keeps the menu usable when the consumer slots nothing at all', async () => {
      const page = await render({}, '');
      await logIn(page);

      expect(shadow(page, 'post-menu')).not.toBeNull();
      expect(shadow(page, '[slot="header"] p').textContent).toBe('Ada Lovelace');
    });
  });

  describe('the switches the session permits', () => {
    async function renderedSwitches(overrides: Partial<KlpSessionData>) {
      const page = await render();
      await logIn(page, overrides);

      return ['account-switch', 'company-switch'].filter(
        name => shadow(page, `slot[name="${name}"]`) !== null,
      );
    }

    it('shows the account switch only when the platform allows it', async () => {
      expect(await renderedSwitches({ changeUserAndProfile: 'userAndProfile' })).toEqual([
        'account-switch',
      ]);
    });

    it('shows the company switch to a B2B user who may change company', async () => {
      expect(await renderedSwitches({ userType: 'B2B', canChangeCompany: true })).toEqual([
        'company-switch',
      ]);
    });

    it('shows neither when the session permits neither', async () => {
      expect(await renderedSwitches({ userType: 'B2C' })).toEqual([]);
    });
  });

  describe('menu composition', () => {
    it('points the trigger at the menu it opens', async () => {
      const page = await render();
      await logIn(page);

      expect(shadow(page, 'post-menu-trigger').getAttribute('for')).toBe(
        shadow(page, 'post-menu').getAttribute('id'),
      );
    });

    it('names the menu and its trigger for assistive technology', async () => {
      const page = await render({
        'text-user-links': 'Menu of the user',
        'text-access-user-links': 'Open the menu of the user',
      });
      await logIn(page);

      expect(shadow(page, 'post-menu').getAttribute('label')).toBe('Menu of the user');
      expect(shadow(page, '.visually-hidden').textContent).toBe('Open the menu of the user');
    });

    it('names the avatar after the user it depicts', async () => {
      const page = await render({ 'text-current-user': 'Signed in as {user}' });
      await logIn(page);

      expect(shadow(page, 'post-avatar').getAttribute('description')).toBe(
        'Signed in as Ada Lovelace',
      );
    });

    it('hides the avatar from assistive technology when it carries no description', async () => {
      const error = jest.spyOn(console, 'error').mockImplementation(() => {});
      const page = await render({ 'text-current-user': null });
      await logIn(page);

      expect(shadow(page, 'post-avatar').getAttribute('aria-hidden')).toBe('true');
      expect(error).toHaveBeenCalledWith(
        expect.stringContaining('Property "textCurrentUser" is required'),
        expect.anything(),
      );
      jest.restoreAllMocks();
    });

    it('builds the avatar from the name, not from an email sent to a third party', async () => {
      const page = await render();
      await logIn(page, { email: 'ada@post.ch' });

      const avatar = shadow(page, 'post-avatar');
      expect(avatar.getAttribute('firstname')).toBe('Ada');
      expect(avatar.getAttribute('lastname')).toBe('Lovelace');
      expect(avatar.getAttribute('email')).toBeNull();
    });

    it('names the company above the user, as the header does', async () => {
      const page = await render();
      await logIn(page, { company: 'Die Post' });

      const lines = [...page.root.shadowRoot.querySelectorAll('[slot="header"] p')].map(
        line => line.textContent,
      );

      expect(lines).toEqual(['Die Post', 'Ada Lovelace']);
    });
  });

  describe('the unread dot', () => {
    it('stays off the avatar while nothing is unread', async () => {
      const page = await render();
      await logIn(page);

      expect(shadow(page, '.user-menu-avatar .badge')).toBeNull();
    });

    it('marks the trigger once the store reports something unread', async () => {
      const page = await render();
      await logIn(page);
      setState('unread', 3);
      await page.waitForChanges();

      expect(shadow(page, '.user-menu-avatar .badge')).not.toBeNull();
    });
  });
});
