import { newSpecPage, SpecPage } from '@stencil/core/testing';
import type { KlpSessionData } from '../lib/klp-session.model';
import { PostKlpLoginWidget } from '../post-klp-login-widget';

const links = `
  <a slot="login-link" href="/login">Login</a>
  <post-menu-item slot="account-switch"><a href="/switch-account">Switch account</a></post-menu-item>
  <post-menu-item slot="company-switch"><a href="/switch-company">Switch company</a></post-menu-item>
  <post-menu-item slot="menu-links"><a href="/profile">Profile</a></post-menu-item>
  <post-menu-item slot="logout-link"><a href="/logout">Logout</a></post-menu-item>
`;

async function render(attributes = '', children = links) {
  return newSpecPage({
    components: [PostKlpLoginWidget],
    html: `<post-klp-login-widget ${attributes}>${children}</post-klp-login-widget>`,
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

describe('post-klp-login-widget', () => {
  it('offers only the login link while nobody is signed in', async () => {
    const page = await render();

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
    const page = await render(`environment="nope"`);

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
      const page = await render('', '');
      await logIn(page);

      expect(shadow(page, 'post-menu')).not.toBeNull();
      expect(shadow(page, '.user-menu-name').textContent).toBe('Ada Lovelace');
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
      const page = await render(
        `text-user-links="User links" text-access-user-links="Open user links"`,
      );
      await logIn(page);

      expect(shadow(page, 'post-menu').getAttribute('label')).toBe('User links');
      expect(shadow(page, '.visually-hidden').textContent).toBe('Open user links');
    });

    it('names the avatar after the user it depicts', async () => {
      const page = await render(`text-current-user="Currently signed in: {user}"`);
      await logIn(page);

      expect(shadow(page, 'post-avatar').getAttribute('description')).toBe(
        'Currently signed in: Ada Lovelace',
      );
    });

    it('hides the avatar from assistive technology when it carries no description', async () => {
      const page = await render();
      await logIn(page);

      expect(shadow(page, 'post-avatar').getAttribute('aria-hidden')).toBe('true');
    });

    it('builds the avatar from the name, not from an email sent to a third party', async () => {
      const page = await render();
      await logIn(page, { email: 'ada@post.ch' });

      const avatar = shadow(page, 'post-avatar');
      expect(avatar.getAttribute('firstname')).toBe('Ada');
      expect(avatar.getAttribute('lastname')).toBe('Lovelace');
      expect(avatar.getAttribute('email')).toBeNull();
    });

    it('shows the company the user is acting for', async () => {
      const page = await render();
      await logIn(page, { company: 'Die Post' });

      expect(shadow(page, '.user-menu-company').textContent).toBe('Die Post');
    });
  });
});
