import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import micrositeConfiguration from '../fixtures/internet-header/microsite-config.json';

const language = 'de';

describe('header', () => {
  describe('default', () => {
    const headerConfig = testConfiguration[language].header;
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

    it('should correctly show the login link', () => {
      cy.get('[slot="post-login"]').invoke('prop', 'localName').should('eq', 'a');
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
  });

  describe('microsite', () => {
    const headerConfig = micrositeConfiguration[language].header;

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
        if ('url' in item) {
          cy.get('@nav-items').eq(index).find('a').should('exist');
        } else {
          cy.get('@nav-items').eq(index).find('post-menu-trigger').should('exist');
          cy.get('@nav-items')
            .eq(index)
            .find('post-menu-item')
            .should('have.length', item.options.length);
        }
      });
    });
  });
});
