import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  anonymousWidget,
  authenticatedMenu,
  authenticatedWidget,
  isChangeUserAndProfile,
  isOldChangeCompany,
  settingsURL,
} from '../../src/legacy/markup.js';

const labels = {
  text: key => `text:${key}`,
  accessKey: key => `accesskey="${key}"`,
  tabIndex: key => `tabindex:${key}`,
};

const b2b = {
  name: 'Ada',
  surname: 'Lovelace',
  userType: 'B2B',
  company: 'Swiss Post',
  canChangeCompany: true,
  changeUserAndProfile: null,
};

describe('settingsURL', () => {
  it('points at the account app of the stage the widget runs on', () => {
    assert.equal(settingsURL('int02', 'fr'), 'https://serviceint2.post.ch/kvm/app/ui/settings?lang=fr');
    assert.equal(settingsURL('prod', 'de'), 'https://service.post.ch/kvm/app/ui/settings?lang=de');
  });
});

describe('isOldChangeCompany', () => {
  it('holds for a business user allowed to switch company', () => {
    assert.equal(isOldChangeCompany(b2b), true);
  });

  it('holds for the legacy profile switch whatever the user type', () => {
    assert.equal(isOldChangeCompany({ userType: 'B2C', changeUserAndProfile: 'profile' }), true);
  });

  it('does not hold once the newer account switch is configured', () => {
    assert.equal(
      isOldChangeCompany({ ...b2b, changeUserAndProfile: 'userAndProfile' }),
      false,
    );
  });

  it('does not hold for a business user who may not switch', () => {
    assert.equal(isOldChangeCompany({ ...b2b, canChangeCompany: false }), false);
  });
});

describe('isChangeUserAndProfile', () => {
  it('holds only for the newer account switch', () => {
    assert.equal(isChangeUserAndProfile({ changeUserAndProfile: 'userAndProfile' }), true);
    assert.equal(isChangeUserAndProfile({ changeUserAndProfile: 'profile' }), false);
    assert.equal(isChangeUserAndProfile({ changeUserAndProfile: null }), false);
  });
});

describe('anonymousWidget', () => {
  it('is a single link to the login url', () => {
    const html = anonymousWidget({ labels, loginUrl: 'https://int.post.ch/login?app=klp' });

    assert.ok(html.includes('href="https://int.post.ch/login?app=klp"'));
    assert.ok(html.includes('accesskey="sign-in"'));
    assert.ok(html.includes('role="button"'));
  });
});

describe('authenticatedWidget', () => {
  it('shows the full name and falls back to initials on small screens', () => {
    const html = authenticatedWidget({
      labels,
      sessionData: b2b,
      sectionClass: 'klp-widget-authenticated',
      nameClass: 'klp-widget-authenticated-session-name',
      menu: '<!--menu-->',
    });

    assert.ok(html.includes('Ada&nbsp;Lovelace'));
    assert.ok(html.includes('<span class="initials-mobile">AL</span>'));
    assert.ok(html.includes('<!--menu-->'));
  });

  it('declares the menu it controls as collapsed', () => {
    const html = authenticatedWidget({
      labels,
      sessionData: b2b,
      sectionClass: 'klp-widget-authenticated',
      nameClass: 'klp-widget-authenticated-session-name',
      menu: '',
    });

    assert.ok(html.includes('aria-expanded="false"'));
    assert.ok(html.includes('aria-controls="authenticated-menu"'));
  });
});

describe('authenticatedMenu', () => {
  const menuLinks = [{ description: 'Profile', url: '/selfadmin', iconclass: 'widget_icon_profile' }];

  const menu = (overrides = {}) =>
    authenticatedMenu({
      labels,
      sessionData: b2b,
      nameClass: 'klp-widget-authenticated-session-name',
      info: 'Swiss Post',
      menuLinks,
      messagesUrl: '/selfadmin/messages',
      environment: 'int01',
      lang: 'de',
      ...overrides,
    });

  it('starts hidden and names the element that opens it', () => {
    assert.ok(menu().includes('data-dropdown-toggler="klp-widget__user"'));
    assert.ok(menu().includes('style="display: none"'));
  });

  it('lists the configured links, the messages link and the settings link', () => {
    const html = menu();

    assert.ok(html.includes('href="/selfadmin"'));
    assert.ok(html.includes('href="/selfadmin/messages"'));
    assert.ok(html.includes(settingsURL('int01', 'de')));
  });

  it('always offers a way out, even with no links configured', () => {
    const html = menu({ menuLinks: undefined });

    assert.ok(!html.includes('/selfadmin/messages'));
    assert.ok(html.includes('id="klp-widget-authenticated-menu-logout"'));
    assert.ok(html.includes(settingsURL('int01', 'de')));
  });

  it('centres the name when there is no company to show beneath it', () => {
    const html = menu({ nameClass: 'klp-widget-authenticated-session-name u_var_centered' });

    assert.ok(html.includes('class="nameCentered"'));
  });

  it('hides the company line when it is empty', () => {
    assert.ok(menu({ info: '' }).includes('class="infoHidden"'));
  });

  it('offers the company switch to a business user', () => {
    const html = menu();

    assert.ok(html.includes('id="klp-widget-authenticated-menu-changecompany"'));
    assert.ok(html.includes('text:change-company'));
  });

  it('offers the account switch instead when it is configured', () => {
    const html = menu({ sessionData: { ...b2b, changeUserAndProfile: 'userAndProfile' } });

    assert.ok(html.includes('text:change-account'));
    assert.ok(!html.includes('text:change-company'));
  });

  it('offers neither to a private customer', () => {
    const html = menu({ sessionData: { ...b2b, userType: 'B2C', canChangeCompany: false } });

    assert.ok(!html.includes('id="klp-widget-authenticated-menu-changecompany"'));
  });
});
