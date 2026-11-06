import { newSpecPage, SpecPage } from '@stencil/core/testing';
import type { KlpSessionData } from '../lib/session.model';
import { KLP_TRANSLATIONS } from '../lib/translations';
import { PostKlpLoginWidget } from '../post-klp-login-widget';

const requiredTexts = {
  'service': 'my-app',
  'text-current-user': 'Currently signed in: {user}',
  'text-user-links': 'User links',
};

/** Pass `null` to leave an attribute out. */
async function render(attributes: Record<string, string | null> = {}, children = '') {
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

function shadowAll(page: SpecPage, selector: string) {
  return [...page.root.shadowRoot.querySelectorAll(selector)];
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

async function setUnread(page: SpecPage, unread: number) {
  (page.rootInstance as { unread: number }).unread = unread;
  await page.waitForChanges();
}

/** The fallback content of each text slot, in render order. */
function menuEntries(page: SpecPage) {
  return shadowAll(page, 'post-menu post-menu-item a').map(link => ({
    text: link.querySelector('slot').getAttribute('name'),
    href: link.getAttribute('href'),
  }));
}

describe('post-klp-login-widget', () => {
  /** Stands in for the browser's preferred languages; Node's own navigator reports `en-US`. */
  function setBrowserLanguages(languages: string[]) {
    Object.defineProperty(navigator, 'languages', { value: languages, configurable: true });
    Object.defineProperty(navigator, 'language', { value: languages[0], configurable: true });
  }

  beforeEach(() => setBrowserLanguages([]));

  afterEach(() => {
    delete (navigator as { languages?: readonly string[] }).languages;
    delete (navigator as { language?: string }).language;
  });
  it('holds a neutral box while the platform has not answered yet', async () => {
    const page = await render();

    expect(shadow(page, '.user-menu-placeholder')).not.toBeNull();
    expect(shadow(page, '.login-link')).toBeNull();
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

    expect(shadow(page, '.login-link')).not.toBeNull();
    expect(shadow(page, '.user-menu-placeholder')).toBeNull();
    expect(shadow(page, 'post-menu')).toBeNull();
  });

  it('skips the placeholder when the consumer knows the visitor is anonymous', async () => {
    const page = await render({ 'initial-state': 'anonymous' });

    expect(shadow(page, '.login-link')).not.toBeNull();
    expect(shadow(page, '.user-menu-placeholder')).toBeNull();
  });

  it('keeps the placeholder when the consumer knows a session exists', async () => {
    const page = await render({ 'initial-state': 'authenticated' });

    expect(shadow(page, '.user-menu-placeholder')).not.toBeNull();
    expect(shadow(page, '.login-link')).toBeNull();
  });

  it('falls back to the login link when the session ends', async () => {
    const page = await render();
    await logIn(page);
    (page.rootInstance as { session: KlpSessionData | null }).session = null;
    await resolve(page);

    expect(shadow(page, '.login-link')).not.toBeNull();
    expect(shadow(page, 'post-menu')).toBeNull();
  });

  it('swaps the login link for the user menu once a session arrives', async () => {
    const page = await render();
    await logIn(page);

    expect(shadow(page, '.login-link')).toBeNull();
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

  describe('the login link', () => {
    it('points at the KLP login of the environment', async () => {
      const page = await render({ 'environment': 'int02', 'initial-state': 'anonymous' });

      expect(shadow(page, '.login-link').getAttribute('href')).toBe(
        'https://accountint2.post.ch/idp/?login&app=my-app&lang=de&service=my-app',
      );
    });

    it('sends its own app when given one, and the service either way', async () => {
      const page = await render({ 'initial-state': 'anonymous', 'app': 'portal-delivery' });

      expect(shadow(page, '.login-link').getAttribute('href')).toBe(
        'https://account.post.ch/idp/?login&app=portal-delivery&lang=de&service=my-app',
      );
    });

    it('takes its target from the consumer when given one', async () => {
      const page = await render({ 'initial-state': 'anonymous', 'url-login': '/login' });

      expect(shadow(page, '.login-link').getAttribute('href')).toBe('/login');
    });

    it('carries a default text the consumer can replace through a slot', async () => {
      const page = await render({ 'initial-state': 'anonymous' });
      const slot = shadow(page, '.login-link slot');

      expect(slot.getAttribute('name')).toBe('text-login');
      expect(slot.textContent).toBe(KLP_TRANSLATIONS.de.login);
    });
  });

  describe('the menu entries', () => {
    it('lists profile, messages, settings and logout for every session', async () => {
      const page = await render({ environment: 'prod' });
      await logIn(page, { userType: 'B2C' });

      expect(menuEntries(page)).toEqual([
        { text: 'text-my-profile', href: 'https://account.post.ch/selfadmin/?lang=de' },
        { text: 'text-messages', href: 'https://account.post.ch/selfadmin/messages/?lang=de' },
        { text: 'text-settings', href: 'https://service.post.ch/kvm/app/ui/settings?lang=de' },
        { text: 'text-logout', href: 'https://account.post.ch/logout/?lang=de&inIframe=false' },
      ]);
    });

    it('puts the permitted switch first', async () => {
      const page = await render({ environment: 'int01' });
      await logIn(page, { changeUserAndProfile: 'userAndProfile' });

      expect(menuEntries(page)[0]).toEqual({
        text: 'text-account-switch',
        href: 'https://accountint1.post.ch/logout/?app=my-app&lang=de&service=my-app&inIframe=false&changecompany=true',
      });
    });

    it('tells KLP when the page runs in an iframe', async () => {
      const page = await render({ 'in-iframe': 'true' });
      await logIn(page, { canChangeCompany: true });
      const hrefs = menuEntries(page).map(entry => entry.href);

      expect(hrefs[0]).toContain('&inIframe=true&');
      expect(hrefs.at(-1)).toBe('https://account.post.ch/logout/?lang=de&inIframe=true');
    });

    it('takes every target from the consumer when given one', async () => {
      const page = await render({
        'url-account-switch': '/account',
        'url-company-switch': '/company',
        'url-my-profile': '/profile',
        'url-messages': '/messages',
        'url-settings': '/settings',
        'url-logout': '/logout',
      });
      await logIn(page, { changeUserAndProfile: 'userAndProfile' });
      const accountTargets = menuEntries(page).map(entry => entry.href);
      await logIn(page, { canChangeCompany: true });
      const companyTarget = menuEntries(page)[0].href;

      expect(accountTargets).toEqual(['/account', '/profile', '/messages', '/settings', '/logout']);
      expect(companyTarget).toBe('/company');
    });

    it('places custom items between settings and logout', async () => {
      const page = await render(
        {},
        '<post-menu-item><a href="/custom">Custom</a></post-menu-item>' +
          '<span slot="text-logout">Bye</span>',
      );
      await logIn(page);

      const menu = shadow(page, 'post-menu');
      const slot = menu.querySelector('slot:not([name])');
      const names = [...menu.children].map(child =>
        child === slot ? 'custom' : child.querySelector('slot')?.getAttribute('name'),
      );

      expect(names.slice(-3)).toEqual(['text-settings', 'custom', 'text-logout']);
    });

    it('leaves custom items out while nobody is signed in', async () => {
      const page = await render(
        { 'initial-state': 'anonymous' },
        '<post-menu-item><a href="/custom">Custom</a></post-menu-item>',
      );

      expect(shadow(page, 'slot:not([name])')).toBeNull();
    });

    it('builds the default targets for the dev and test platforms on int1', async () => {
      const page = await render({ environment: 'test' });
      await logIn(page);

      expect(menuEntries(page)[0].href).toBe('https://accountint1.post.ch/selfadmin/?lang=de');
    });
  });

  describe('the language', () => {
    /** Renders the login link with the language coming from the prop, the document or the browser. */
    async function loginLanguage({
      prop,
      html,
      browser,
    }: {
      prop?: string;
      html?: string;
      browser?: string[];
    }) {
      const page = await render({ 'initial-state': 'anonymous', ...(prop && { language: prop }) });
      if (html) document.documentElement.lang = html;
      if (browser) setBrowserLanguages(browser);
      await resolve(page);

      const link = shadow(page, '.login-link');
      return {
        text: link.querySelector('slot').textContent,
        lang: new URL(link.getAttribute('href')).searchParams.get('lang'),
      };
    }

    it('takes the language prop first', async () => {
      const result = await loginLanguage({ prop: 'it', html: 'fr', browser: ['en'] });

      expect(result).toEqual({ text: KLP_TRANSLATIONS.it.login, lang: 'it' });
    });

    it('follows <html lang> without the prop', async () => {
      const result = await loginLanguage({ html: 'fr-CH', browser: ['en'] });

      expect(result).toEqual({ text: KLP_TRANSLATIONS.fr.login, lang: 'fr' });
    });

    it("falls back to the browser's preferred language", async () => {
      expect(await loginLanguage({ browser: ['rm-CH', 'it-CH', 'en'] })).toEqual({
        text: KLP_TRANSLATIONS.it.login,
        lang: 'it',
      });
    });

    it('skips a language KLP does not offer', async () => {
      const { lang } = await loginLanguage({ prop: 'rm', html: 'en' });

      expect(lang).toBe('en');
    });

    it('falls back to German when nothing matches', async () => {
      expect(await loginLanguage({ prop: 'rm', html: 'es', browser: ['pt'] })).toEqual({
        text: KLP_TRANSLATIONS.de.login,
        lang: 'de',
      });
    });

    it('translates every menu entry', async () => {
      const page = await render({ language: 'fr' });
      await logIn(page, { canChangeCompany: true });

      const texts = shadowAll(page, 'post-menu post-menu-item slot').map(slot => slot.textContent);
      const { companySwitch, myProfile, messages, settings, logout } = KLP_TRANSLATIONS.fr;

      expect(texts).toEqual([companySwitch, myProfile, messages, settings, logout]);
    });
  });

  describe('the switches the session permits', () => {
    async function renderedSwitches(overrides: Partial<KlpSessionData>) {
      const page = await render();
      await logIn(page, overrides);

      return ['text-account-switch', 'text-company-switch'].filter(
        name => shadow(page, `slot[name="${name}"]`) !== null,
      );
    }

    it('shows the account switch only when the platform allows it', async () => {
      expect(await renderedSwitches({ changeUserAndProfile: 'userAndProfile' })).toEqual([
        'text-account-switch',
      ]);
    });

    it('shows the account switch to a B2C user the platform allows it', async () => {
      expect(
        await renderedSwitches({ userType: 'B2C', changeUserAndProfile: 'userAndProfile' }),
      ).toEqual(['text-account-switch']);
    });

    it('shows the company switch to a B2B user who may change company', async () => {
      expect(await renderedSwitches({ userType: 'B2B', canChangeCompany: true })).toEqual([
        'text-company-switch',
      ]);
    });

    it('shows the company switch to a B2C user the platform allows it', async () => {
      expect(await renderedSwitches({ userType: 'B2C', canChangeCompany: true })).toEqual([
        'text-company-switch',
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
      const page = await render({ 'text-user-links': 'Menu of the user', 'language': 'it' });
      await logIn(page);
      const label = shadow(page, '.user-menu-trigger > .visually-hidden > slot');

      expect(shadow(page, 'post-menu').getAttribute('label')).toBe('Menu of the user');
      expect(label.getAttribute('name')).toBe('text-access-user-links');
      expect(label.textContent).toBe(KLP_TRANSLATIONS.it.accessUserLinks);
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

      const lines = shadowAll(page, '[slot="header"] p').map(line => line.textContent);

      expect(lines).toEqual(['Die Post', 'Ada Lovelace']);
    });
  });

  describe('unread messages', () => {
    it('shows neither the dot nor a count while nothing is unread', async () => {
      const page = await render();
      await logIn(page);

      expect(shadow(page, '.user-menu-avatar .badge')).toBeNull();
      expect(shadow(page, 'post-menu .badge')).toBeNull();
    });

    it('marks the trigger and counts the messages entry', async () => {
      const page = await render({ language: 'en' });
      await logIn(page);
      await setUnread(page, 3);

      const count = shadow(page, 'post-menu .badge');
      expect(shadow(page, '.user-menu-avatar .badge')).not.toBeNull();
      expect(count.querySelector('[aria-hidden="true"]').textContent).toBe('3');
      expect(count.querySelector('.visually-hidden').textContent).toBe('3 unread messages');
      expect(count.querySelector('slot').getAttribute('name')).toBe('text-unread-messages');
    });

    it('caps the visible count but announces the exact number', async () => {
      const page = await render({ language: 'en' });
      await logIn(page);
      await setUnread(page, 120);

      const count = shadow(page, 'post-menu .badge');
      expect(count.querySelector('[aria-hidden="true"]').textContent).toBe('99+');
      expect(count.querySelector('.visually-hidden').textContent).toBe('120 unread messages');
    });
  });
});
