import { copyConfig, prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

import micrositeConfiguration from '../fixtures/internet-header/microsite-config.json';
import testConfiguration from '../fixtures/internet-header/test-configuration.json';

const language = 'de';

describe('header', () => {
  describe('default', () => {
    const headerConfig = testConfiguration.header;
    beforeEach(() => {
      prepare(HEADER, 'Default');
      cy.changeArg('language', language);
    });

    it('should correctly show the Post logo', () => {
      cy.get('post-logo').should('be.visible');
    });

    it('should correctly show audience navigation', () => {
      const audienceLinks = headerConfig.globalHeader.audience;
      cy.get('[slot="audience"] a').should('have.length', audienceLinks.length).and('be.visible');

      const activeAudienceIndex = audienceLinks.findIndex(link => link.active);
      cy.get('[slot="audience"] a')
        .eq(activeAudienceIndex)
        .invoke('attr', 'aria-current')
        .should('eq', 'location');
    });

    it('should correctly show the global header primary link', () => {
      cy.get('[slot="global-nav-primary"]').invoke('prop', 'localName').should('eq', 'a');
    });

    it('should correctly show the global header secondary navigation', () => {
      cy.get('[slot="global-nav-secondary"] a')
        .should('have.length', headerConfig.globalHeader.secondaryNavigation.length)
        .and('be.visible');
    });

    it('should correctly show the language menu', () => {
      cy.get('post-language-menu').should('be.visible');
      cy.get('post-language-menu-item').should(
        'have.length',
        headerConfig.globalHeader.languages.length,
      );
    });

    context('main navigation', () => {
      const mainNavigationConfig = headerConfig.localHeader.mainNavigation;

      beforeEach(() => {
        cy.get('[slot="main-nav"] > ul > li').as('nav-items');
      });

      it('should correctly show the main navigation', () => {
        cy.get('@nav-items').should('have.length', mainNavigationConfig.length).and('be.visible');

        mainNavigationConfig.forEach((item, index) => {
          const isLink = 'text' in item;
          cy.get('@nav-items')
            .eq(index)
            .find(isLink ? 'a' : 'post-megadropdown-trigger')
            .should('exist');
        });
      });

      it('should correctly show the megadropdown', () => {
        const megadropdownTrigerIndex = mainNavigationConfig.findIndex(item => 'trigger' in item);

        cy.get('[slot="main-nav"] > ul > li')
          .eq(megadropdownTrigerIndex)
          .find('post-megadropdown-trigger')
          .click()
          .invoke('attr', 'for')
          .then(id => {
            cy.get(`post-megadropdown[id="${id}"]`)
              .find('.post-megadropdown-list')
              .should('have.length', mainNavigationConfig[megadropdownTrigerIndex].sections?.length)
              .and('be.visible');
          });
      });
    });

    context('empty main navigation', () => {
      beforeEach(() => {
        const emptyMainNavConfig = copyConfig();
        emptyMainNavConfig!.header.localHeader.mainNavigation = [];
        delete emptyMainNavConfig!.header.localHeader.title;

        prepare(HEADER, 'Default', {
          config: emptyMainNavConfig,
        });
        cy.changeArg('language', language);
      });

      it('should not render main navigation when mainNavigation is an empty array', () => {
        cy.get('[slot="main-nav"]').should('not.exist');
      });
    });

    context('active route', () => {
      const activeRouteConfig = copyConfig();
      // Without a match, the header falls back to the links marked active in the config, so none is marked here
      activeRouteConfig!.header.globalHeader.audience![0].active = false;
      activeRouteConfig!.header.globalHeader.audience![0].url = '/audience-private';
      activeRouteConfig!.header.globalHeader.secondaryNavigation![0].url = '/jobs';

      beforeEach(() => {
        prepare(HEADER, 'Default', {
          config: activeRouteConfig,
        });
        cy.changeArg('language', language);
      });

      it('should set aria-current="page" on matching link', () => {
        cy.changeArg('activeRoute', '/letters');
        cy.get('[aria-current="page"]').should('have.length', 1);
      });

      it('should set aria-current="location" on matching audience link', () => {
        cy.changeArg('activeRoute', '/audience-private');
        cy.get('[slot="audience"] [aria-current="location"]')
          .should('have.length', 1)
          .and('have.attr', 'href', '/audience-private');
      });

      it('should set aria-current="location" on matching global secondary link', () => {
        cy.changeArg('activeRoute', '/jobs');
        cy.get('[aria-current="location"]').its('length').should('be.gte', 1);
      });

      it('should not set aria-current="page" when activeRoute is "none"', () => {
        cy.changeArg('activeRoute', 'none');
        cy.get('[slot="main-nav"] [aria-current="page"]').should('not.exist');
        cy.get('[slot="audience"] [aria-current="location"]').should('not.exist');
        cy.get('[slot="global-nav-secondary"] [aria-current="location"]').should('not.exist');
      });

      it('should move aria-current="page" when activeRoute changes', () => {
        cy.changeArg('activeRoute', '/letters');
        cy.get('[aria-current="page"]').should('have.length', 1);

        cy.changeArg('activeRoute', '/sch');
        cy.get('[aria-current="page"]').should('have.length', 1);
      });

      it('should not set aria-current="page" when no link matches', () => {
        cy.changeArg('activeRoute', '/nonexistent');
        cy.get('[slot="main-nav"] [aria-current="page"]').should('not.exist');
        cy.get('[slot="audience"] [aria-current="location"]').should('not.exist');
        cy.get('[slot="global-nav-secondary"] [aria-current="location"]').should('not.exist');
      });

      it('should set only one active link when URL exists in multiple header areas', () => {
        const conflictConfig = copyConfig();
        conflictConfig!.header.globalHeader.audience![0].url = '/letters';
        conflictConfig!.header.globalHeader.secondaryNavigation![0].url = '/jobs';

        prepare(HEADER, 'Default', {
          config: conflictConfig,
        });
        cy.changeArg('language', language);

        cy.changeArg('activeRoute', '/letters');

        cy.get('[aria-current="page"], [aria-current="location"]')
          .should('have.length', 1)
          .and('have.attr', 'href', '/letters');
      });
    });
  });

  describe('post login', () => {
    const postLoginConfig = testConfiguration.header.globalHeader.postLogin;

    context('logged out', () => {
      beforeEach(() => {
        prepare(HEADER, 'Default');
        cy.changeArg('language', language);
      });

      it('should show the login link', () => {
        cy.get('post-klp-login-widget[slot="post-login"]')
          .shadow()
          .find('.login-link')
          .should('have.attr', 'href', postLoginConfig.loginLink.url);
        // Cypress takes the slotted text for an element covering the link, so it checks the text.
        cy.get('post-klp-login-widget[slot="post-login"] [slot="text-login"]')
          .should('be.visible')
          .and('have.text', postLoginConfig.loginLink.text);
      });

      it('should not show the user menu', () => {
        cy.get('post-klp-login-widget[slot="post-login"]')
          .shadow()
          .find('post-menu')
          .should('not.exist');
      });
    });

    context('logged in', () => {
      beforeEach(() => {
        prepare(HEADER, 'Default', { loggedIn: true });
        cy.changeArg('language', language);
      });

      it('should not show the login link', () => {
        cy.get('post-klp-login-widget[slot="post-login"]')
          .shadow()
          .find('.login-link')
          .should('not.exist');
      });

      it('should show the user menu trigger with an avatar', () => {
        cy.get('post-klp-login-widget[slot="post-login"]')
          .shadow()
          .find('post-menu-trigger post-avatar')
          .should('be.visible');
      });

      it('should show the user menu with the configured targets and texts', () => {
        // The switches depend on the mocked user's permissions (auth.json), so they are left out.
        const messages = postLoginConfig.userLinks.find(link => link.icon === 'letter');
        const entries = {
          'text-my-profile': postLoginConfig.userProfile,
          'text-messages': messages,
          'text-settings': postLoginConfig.settings,
          'text-logout': postLoginConfig.logoutLink,
        };

        cy.get('post-klp-login-widget[slot="post-login"]')
          .shadow()
          .find('post-menu-trigger button')
          .click();
        Object.entries(entries).forEach(([slot, entry]) => {
          cy.get('post-klp-login-widget[slot="post-login"]')
            .shadow()
            .find(`post-menu-item a[href="${entry.url}"]`)
            .should('be.visible')
            .find(`slot[name="${slot}"]`)
            .should('exist');
          cy.get(`post-klp-login-widget[slot="post-login"] [slot="${slot}"]`).should(
            'have.text',
            entry.text,
          );
        });
      });
    });
  });

  describe('microsite', () => {
    const headerConfig = micrositeConfiguration.header;

    beforeEach(() => {
      prepare(HEADER, 'Default', {
        config: micrositeConfiguration,
      });
      cy.changeArg('language', language);
    });

    it('should correctly show custom logo', () => {
      cy.get('post-logo').should('not.exist');
      cy.get(`img[src="${headerConfig.globalHeader.postLogo.image.src}"]`).should('exist');
    });

    it('should correctly show app title', () => {
      cy.get('[slot="title"]')
        .should('be.visible')
        .invoke('text')
        .should('equal', headerConfig.localHeader.title);
    });

    it('should correctly show local navigation', () => {
      cy.get('[slot="local-nav"] > li').as('nav-items');

      cy.get('@nav-items')
        .should('have.length', headerConfig.localHeader.navigation.length)
        .and('be.visible');

      headerConfig.localHeader.navigation.forEach((item, index) => {
        cy.get('@nav-items').eq(index).find('a').should('have.attr', 'href', item.url);
      });
    });
  });
});
