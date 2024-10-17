import { IPortalConfig } from '../../src/models/general.model';
import testConfiguration from '../../src/assets/config/test-configuration.json';
import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

describe('meta-navigation', () => {
  beforeEach(() => {
    prepare(HEADER, 'Default');
    cy.changeArg('language', 'de');
    cy.viewport(1024, Cypress.config('viewportHeight'));
  });

  describe('args', () => {
    describe('meta: true', () => {
      it(`adds meta navigation`, () => {
        cy.changeArg('meta', 'true');
        cy.pause();
        cy.get('post-meta-navigation').should('exist').and('be.visible');
      });

      it(`sets css variable --meta-header-height to 0 in mobile view`, () => {
        cy.viewport(1023, Cypress.config('viewportHeight'));
        cy.changeArg('meta', 'true');
        cy.get('swisspost-internet-header').within(() => {
          cy.get('header').then($el => {
            const style = getComputedStyle($el[0]);
            const metaHeaderHight = style.getPropertyValue('--meta-header-height');
            expect(metaHeaderHight).to.eq('0px');
          });
        });
      });

      it(`sets css variable --meta-header-height to 3rem in desktop view`, () => {
        cy.viewport(1024, Cypress.config('viewportHeight'));
        cy.changeArg('meta', 'true');
        cy.get('swisspost-internet-header').within(() => {
          cy.get('header').then($el => {
            const style = getComputedStyle($el[0]);
            const metaHeaderHight = style.getPropertyValue('--meta-header-height');
            expect(metaHeaderHight).to.eq('3rem');
          });
        });
      });
    });

    describe('meta: false', () => {
      it(`removes meta navigation`, () => {
        cy.changeArg('meta', 'false');
        cy.get('post-meta-navigation').should('not.exist');
      });

      it(`sets css variable --meta-header-height to 0`, () => {
        cy.changeArg('meta', 'false');
        cy.get('swisspost-internet-header').within(() => {
          cy.get('header').then($el => {
            const style = getComputedStyle($el[0]);
            const metaHeaderHight = style.getPropertyValue('--meta-header-height');
            expect(metaHeaderHight).to.eq('0px');
          });
        });
      });
    });

    describe('meta: changes during runtime (false => true => false)', () => {
      it(`adds and removes meta navigation`, () => {
        cy.changeArg('meta', 'false');
        cy.get('post-meta-navigation').should('not.exist');

        cy.changeArg('meta', 'true');
        cy.get('post-meta-navigation').should('exist').and('be.visible');

        cy.changeArg('meta', 'false');
        cy.get('post-meta-navigation').should('not.exist');
      });
    });
  });

  describe('config', () => {
    describe('navMeta config set', () => {
      it(`adds meta navigation`, () => {
        // On default configuration the meta navigation should be visible
        cy.get('post-meta-navigation')
          .first()
          .should('exist')
          .and('be.visible')
          .within(() => {
            cy.get('.meta-list').should('not.be.empty');
            cy.get('.meta-link').should('have.length', 4);
          });
      });
    });

    describe('navMeta config not set', () => {
      it(`removes meta navigation`, () => {
        // Cast the imported JSON object to the IPortalConfig interface
        let config: IPortalConfig = <any>testConfiguration;

        // Clear meta navigation config
        config.de!.header.navMeta = undefined;

        prepare(HEADER, 'Default', { config });
        cy.changeArg('language', 'de');

        // Assert the header is hydrated
        cy.get('swisspost-internet-header').should('have.attr', 'data-hydrated');

        // With the modified configuration the meta navigation should be removed from the DOM
        cy.get('post-meta-navigation').should('not.exist');
      });
    });

    describe('navMeta config contains only home link', () => {
      it(`removes meta navigation`, () => {
        // Cast the imported JSON object to the IPortalConfig interface
        let config: IPortalConfig = <any>testConfiguration;

        // Set navMeta to contain only one entry with 'isHomeLink' set to true
        config.de!.header.navMeta = [
          {
            isActive: false,
            isHomeLink: true,
            text: 'Home',
            url: 'https://post.ch/de/',
          },
        ];

        prepare(HEADER, 'Default', { config });
        cy.changeArg('language', 'de');

        // Assert the header is hydrated
        cy.get('swisspost-internet-header').should('have.attr', 'data-hydrated');

        // With the modified configuration the meta navigation should be removed from the DOM
        cy.get('post-meta-navigation').should('not.exist');
      });
    });
  });
});
