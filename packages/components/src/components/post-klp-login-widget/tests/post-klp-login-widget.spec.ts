import { newSpecPage, SpecPage } from '@stencil/core/testing';
import type { KlpSessionData } from '../lib/klp-session.model';
import { PostKlpLoginWidget } from '../post-klp-login-widget';

const config = {
  applicationId: 'app-1',
  serviceId: 'svc-1',
  appLoginUrl: 'https://int.post.ch/login',
  currentLang: 'de',
};

async function render(attributes = '', children = '') {
  return newSpecPage({
    components: [PostKlpLoginWidget],
    html: `<post-klp-login-widget ${attributes}>${children}</post-klp-login-widget>`,
  });
}

function loginLink(page: SpecPage) {
  return page.root.shadowRoot.querySelector<HTMLAnchorElement>('a.login-link');
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

const profile = { text: 'Profile', url: 'https://int.post.ch/profile', icon: '1001' };
const settings = { text: 'Settings', url: 'https://int.post.ch/settings', icon: '1002' };
const logout = { text: 'Logout', url: 'https://int.post.ch/logout', icon: '1003' };

describe('post-klp-login-widget', () => {
  it('renders the anonymous login link from a config object', async () => {
    const page = await render();
    (page.root as HTMLPostKlpLoginWidgetElement).config = config;
    await page.waitForChanges();

    expect(loginLink(page).getAttribute('href')).toBe(config.appLoginUrl);
  });

  it('accepts the config as a JSON string so it can be driven from plain HTML', async () => {
    const page = await render(`config='${JSON.stringify(config)}'`);

    expect(loginLink(page).getAttribute('href')).toBe(config.appLoginUrl);
  });

  it('renders nothing when no config was provided', async () => {
    const page = await render();

    expect(loginLink(page)).toBeNull();
  });

  it('reports invalid JSON instead of throwing', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    const page = await render(`config='not json'`);

    expect(loginLink(page)).toBeNull();
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });

  it('renders the same markup twice, so hydration cannot mismatch', async () => {
    const first = await render(`config='${JSON.stringify(config)}'`);
    const second = await render(`config='${JSON.stringify(config)}'`);

    expect(first.root.shadowRoot.innerHTML).toBe(second.root.shadowRoot.innerHTML);
  });

  describe('link injection', () => {
    it('prefers the configured login url when no link was injected', async () => {
      const page = await render(`config='${JSON.stringify(config)}'`);

      expect(loginLink(page).getAttribute('href')).toBe(config.appLoginUrl);
    });

    it('lets the loginLink prop override the configured url', async () => {
      const link = { text: 'Sign in', url: 'https://int.post.ch/sso', icon: '1000' };
      const page = await render(
        `config='${JSON.stringify(config)}' login-link='${JSON.stringify(link)}'`,
      );

      expect(loginLink(page).getAttribute('href')).toBe(link.url);
      expect(loginLink(page).textContent).toContain('Sign in');
    });

    it('offers the prop-driven login link as the fallback of the login slot, so slotted markup wins', async () => {
      const link = { text: 'Sign in', url: 'https://int.post.ch/sso', icon: '1000' };
      const page = await render(
        `config='${JSON.stringify(config)}' login-link='${JSON.stringify(link)}'`,
        `<a slot="login-link" href="https://int.post.ch/own">Own login</a>`,
      );

      expect(loginLink(page).parentElement).toBe(shadow(page, 'slot[name="login-link"]'));
    });

    it('renders the user menu links from the prop, in the order given', async () => {
      const page = await render(
        `config='${JSON.stringify(config)}' menu-links='${JSON.stringify([profile, settings])}'`,
      );
      await logIn(page);

      const links = [...page.root.shadowRoot.querySelectorAll('a.menu-link')];
      expect(links.map(link => link.getAttribute('href'))).toEqual([profile.url, settings.url]);
    });

    it('offers the prop-driven menu as the fallback of the menu slot, so slotted markup wins', async () => {
      const page = await render(
        `config='${JSON.stringify(config)}' menu-links='${JSON.stringify([profile])}'`,
      );
      await logIn(page);

      expect(shadow(page, 'a.menu-link').closest('post-menu-item').parentElement).toBe(
        shadow(page, 'slot[name="menu-links"]'),
      );
    });

    it('renders the logout link from the prop', async () => {
      const page = await render(
        `config='${JSON.stringify(config)}' logout-link='${JSON.stringify(logout)}'`,
      );
      await logIn(page);

      expect(shadow(page, 'a.logout-link').getAttribute('href')).toBe(logout.url);
    });

    it('offers the prop-driven logout link as the fallback of the logout slot, so slotted markup wins', async () => {
      const page = await render(
        `config='${JSON.stringify(config)}' logout-link='${JSON.stringify(logout)}'`,
      );
      await logIn(page);

      expect(shadow(page, 'a.logout-link').closest('post-menu-item').parentElement).toBe(
        shadow(page, 'slot[name="logout-link"]'),
      );
    });

    it('never takes a link url from the session', async () => {
      const page = await render(`config='${JSON.stringify(config)}'`);
      await logIn(page);

      expect(shadow(page, 'a.menu-link')).toBeNull();
      expect(shadow(page, 'a.logout-link')).toBeNull();
      expect(shadow(page, 'span.user-name').textContent).toBe('Ada Lovelace');
    });
  });

  describe('the switches the session permits', () => {
    const accountSwitch = { text: 'Switch account', url: 'https://int.post.ch/account', icon: '1' };
    const companySwitch = { text: 'Switch company', url: 'https://int.post.ch/company', icon: '2' };

    async function renderSwitches(overrides: Partial<KlpSessionData>) {
      const page = await render(
        `config='${JSON.stringify(config)}' account-switch='${JSON.stringify(
          accountSwitch,
        )}' company-switch='${JSON.stringify(companySwitch)}'`,
      );
      await logIn(page, overrides);

      return [...page.root.shadowRoot.querySelectorAll('a.menu-link')].map(link =>
        link.getAttribute('href'),
      );
    }

    it('shows the account switch only when the platform allows it', async () => {
      expect(await renderSwitches({ changeUserAndProfile: 'userAndProfile' })).toContain(
        accountSwitch.url,
      );
    });

    it('shows the company switch to a B2B user who may change company', async () => {
      expect(await renderSwitches({ userType: 'B2B', canChangeCompany: true })).toEqual([
        companySwitch.url,
      ]);
    });

    it('shows neither when the session permits neither', async () => {
      expect(await renderSwitches({ userType: 'B2C' })).toEqual([]);
    });
  });

  describe('menu composition', () => {
    it('points the trigger at the menu it opens', async () => {
      const page = await render(`config='${JSON.stringify(config)}'`);
      await logIn(page);

      const trigger = shadow(page, 'post-menu-trigger');
      const menu = shadow(page, 'post-menu');

      expect(trigger.getAttribute('for')).toBe(menu.getAttribute('id'));
    });

    it('names the menu for assistive technology', async () => {
      const page = await render(`config='${JSON.stringify(config)}' text-user-menu='Benutzermenü'`);
      await logIn(page);

      expect(shadow(page, 'post-menu').getAttribute('label')).toBe('Benutzermenü');
    });

    it('builds the avatar from the session, not from an email sent to a third party', async () => {
      const page = await render(`config='${JSON.stringify(config)}'`);
      await logIn(page, { email: 'ada@post.ch' });

      const avatar = shadow(page, 'post-avatar');
      expect(avatar.getAttribute('firstname')).toBe('Ada');
      expect(avatar.getAttribute('lastname')).toBe('Lovelace');
      expect(avatar.getAttribute('email')).toBeNull();
    });

    it('shows the company the user is acting for', async () => {
      const page = await render(`config='${JSON.stringify(config)}'`);
      await logIn(page, { company: 'Die Post' });

      expect(shadow(page, '.user-menu-company').textContent).toBe('Die Post');
    });

    it('describes a link without stealing its accessible name', async () => {
      const described = { ...profile, description: 'Opens your personal data' };
      const page = await render(
        `config='${JSON.stringify(config)}' menu-links='${JSON.stringify([described])}'`,
      );
      await logIn(page);

      const link = shadow(page, 'a.menu-link');
      const description = shadow(page, `#${link.getAttribute('aria-describedby')}`);

      expect(description.textContent).toBe('Opens your personal data');
      expect(link.contains(description)).toBe(false);
    });

    it('leaves aria-describedby off a link that has no description', async () => {
      const page = await render(
        `config='${JSON.stringify(config)}' menu-links='${JSON.stringify([profile])}'`,
      );
      await logIn(page);

      expect(shadow(page, 'a.menu-link').getAttribute('aria-describedby')).toBeNull();
    });
  });
});
