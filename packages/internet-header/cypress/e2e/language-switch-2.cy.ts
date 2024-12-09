import { IPortalConfig } from '../../src/models/general.model';
import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import { NavLangEntity } from '../../src/models/header.model';
import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

describe('language-switch-2', () => {
  const languageSwitcherDesktop = '#post-language-switch-desktop';
  const languageSwitchDropdown = 'nav.language-switch-dropdown';

  beforeEach(() => {
    cy.viewport(1024, 800);
    prepare(HEADER, 'Default');
    cy.changeArg('language', 'de');
  });

  describe('meta menu', () => {
    describe('meta: true', () => {
      it(`renders language switch in meta menu for desktop`, () => {
        cy.changeArg('meta', true);
        cy.get('post-meta-navigation post-language-switch-2').should('exist');
      });

      it(`renders language switch in meta menu for mobile`, () => {
        cy.viewport('iphone-6+');
        cy.changeArg('meta', true);
        cy.get('post-meta-navigation post-language-switch-2').should('exist');
      });
    });

    describe('meta: false', () => {
      it(`renders language switch in main menu for desktop`, () => {
        cy.changeArg('meta', false);
        cy.get(
          '.main-navigation-container .main-navigation-controls post-language-switch-2',
        ).should('exist');
      });

      it(`renders language switch in main menu for mobile`, () => {
        cy.viewport('iphone-6+');
        cy.changeArg('meta', false);
        cy.get(
          '.main-navigation-container .main-navigation-controls post-language-switch-2',
        ).should('exist');
      });
    });
  });

  describe('open & close', () => {
    it('opens on click', () => {
      cy.get(languageSwitcherDesktop).shadow().find('button').click();
      cy.get(languageSwitcherDesktop)
        .shadow()
        .get('nav.language-switch-dropdown')
        .should('exist')
        .should('have.class', 'open');
    });

    it('closes on outside click', () => {
      cy.get(languageSwitcherDesktop).shadow().find('button').click();
      cy.get(languageSwitcherDesktop)
        .shadow()
        .get(`${languageSwitchDropdown}.open`)
        .should('exist');
      cy.get('p.fake-content').first().click();
      cy.get(languageSwitcherDesktop)
        .shadow()
        .get(`${languageSwitchDropdown}.open`)
        .should('not.exist');
    });

    it('aria-expanded attribute should represent language switch state', () => {
      cy.get(languageSwitcherDesktop)
        .shadow()
        .find('button.lang-btn')
        .click()
        .should('have.attr', 'aria-expanded', 'true');

      cy.get(languageSwitcherDesktop)
        .shadow()
        .find('button.lang-btn')
        .click()
        .should('have.attr', 'aria-expanded', 'false');
    });

    it('should emit language switched event', () => {
      cy.window().then(win => {
        const langugeChangedHandlerMock = cy.spy();
        Cypress.$(win).on('languageChanged', langugeChangedHandlerMock);

        cy.get(languageSwitcherDesktop).shadow().find('button.lang-btn').click();
        cy.get('button[lang="en"]')
          .first()
          .click()
          .then(() => {
            expect(langugeChangedHandlerMock).to.be.calledOnce;
          });
      });
    });

    it('should close dropdown when esc key is pressed', () => {
      cy.get(languageSwitcherDesktop).shadow().find('button.lang-btn').click();

      cy.get('swisspost-internet-header')
        .trigger('keydown', { eventConstructor: 'KeyboardEvent', force: true, key: 'Escape' })
        .wait(500)
        .trigger('keyup', { eventConstructor: 'KeyboardEvent', force: true, key: 'Escape' });

      cy.get(languageSwitcherDesktop)
        .shadow()
        .get(`${languageSwitchDropdown}.open`)
        .should('not.exist');
    });
  });

  describe('configuration', () => {
    it('should respect language switch override', () => {
      cy.changeArg(
        'language-switch-overrides',
        '[{"lang": "en","text": "other-text","title": "other-title"}]',
      );

      // Only overriding a language which already exists in the configuration is possible.
      cy.get(languageSwitcherDesktop)
        .shadow()
        .get(`${languageSwitchDropdown} button[lang="en"]`)
        .should('have.attr', 'title', 'other-title')
        .get('span')
        .contains('other-text');
    });

    it('should not be rendered with only one language', () => {
      let config: IPortalConfig = <any>{ en: testConfiguration.en };

      let navLangEntry: NavLangEntity = {
        a11yLabel: '',
        isCurrent: true,
        lang: 'de',
        text: 'EN',
        title: 'Deutsch',
        url: '',
      };
      config.en!.header.navLang = [navLangEntry];
      prepare(HEADER, 'Default', { config });
      cy.get('#post-language-switch-desktop').should('not.exist');
    });

    it('should render button instead of link if url is not present', () => {
      cy.changeArg(
        'language-switch-overrides',
        '[{"lang": "en","text": "EN","title": "English", "url":null}]',
      );

      cy.get(languageSwitcherDesktop)
        .shadow()
        .get(`${languageSwitchDropdown} a[lang="en"]`)
        .should('not.exist');
      cy.get(languageSwitcherDesktop)
        .shadow()
        .get(`${languageSwitchDropdown} button[lang="en"]`)
        .should('exist');
    });
  });
});
