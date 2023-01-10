import { IPortalConfig } from '../../../src/models/general.model';
import rawTestConfiguration from '../../../src/assets/config/test-configuration.json';
import mockAuth from '../../fixtures/auth.json';
import { prepare } from './prepare-story';

const testConfiguration: IPortalConfig = rawTestConfiguration as any;

describe('breadcrumb', () => {
  function closeOverlayOnKey(key: string) {
    cy.get('@breadcrumbs').find('div.overlay').should('not.exist');

    cy.get('@breadcrumbs').get('div.breadcrumb-buttons button').first().click();

    cy.get('@breadcrumbs')
      .find('div.overlay')
      .should('exist')
      .find('div.overlay-container')
      .should('have.class', 'loaded');

    cy.get('@breadcrumbs')
      .find('div.overlay')
      .trigger('keydown', { eventConstructor: 'KeyboardEvent', force: true, key: key })
      .wait(500);
  }

  beforeEach(() => {
    cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
    cy.intercept('**/api/headerjs/Json?serviceid=*', testConfiguration).as('getConfig');
  });

  describe('configuration', () => {
    it(`should not be rendered if no header present`, () => {
      // Need to revisit storybook to make sure new story is loaded correctly
      prepare('Breadcrumb', 'NonExistentHeader');

      cy.get('swisspost-internet-breadcrumbs').should('not.be.visible');
      cy.get('.page-wrapper').should('be.visible');
      cy.get('swisspost-internet-breadcrumbs').shadow().get('div.breadcrumbs').should('not.exist');
    });

    it(`should not rendered if no config present`, () => {
      // Cast the imported JSON object to the IPortalConfig interface
      let config: IPortalConfig = <any>testConfiguration;
      const modifiedConfig = JSON.parse(JSON.stringify(config));

      // Clear breadcrumb config
      modifiedConfig.de.breadcrumb = undefined;
      modifiedConfig.en.breadcrumb = undefined;
      modifiedConfig.fr.breadcrumb = undefined;
      modifiedConfig.it.breadcrumb = undefined;

      prepare('Breadcrumb', 'NonExistentHeader', modifiedConfig);

      cy.get('swisspost-internet-breadcrumbs').shadow().get('div.breadcrumbs').should('not.exist');
    });

    it(`should add custom elements`, () => {
      prepare('Breadcrumb', 'Custom-Items');

      cy.changeArg('custom-items', [
        { text: 'Test1', url: '/x/y/z' },
        { text: 'Test2', url: '/a/b/c' },
      ]);

      const items = '> nav > ol li';
      cy.get('swisspost-internet-breadcrumbs')
        .shadow()
        .get('div.breadcrumbs')
        .as('breadcrumbs')
        .find(items)
        .should('to.have.length', 5);

      // Contains both elements, only first one should contain the link
      cy.get('@breadcrumbs')
        .find(items)
        .contains('Test1')
        .should('to.have.descendants', 'a')
        .find('a')
        .should('to.have.attr', 'href', '/x/y/z');
      cy.get('@breadcrumbs').find(items).contains('Test2').should('have.descendants', 'a');
    });
  });

  describe('open/close overlay buttons', () => {
    beforeEach(() => {
      prepare('Breadcrumb', 'Default');
      cy.get('swisspost-internet-breadcrumbs').shadow().get('div.breadcrumbs').as('breadcrumbs');
      cy.intercept(
        'https://post.ch/de/kundencenter/onlinedienste/standorte-und-oeffnungszeiten/info?modal=true',
        '<html><body><h1>Mock overlay</h1></body></html>',
      );
    });

    it(`should open overlay for help button`, () => {
      cy.get('@breadcrumbs').find('div.overlay').should('not.exist');
      cy.get('@breadcrumbs').get('div.breadcrumb-buttons button span').contains('Hilfe').click();
      cy.get('@breadcrumbs').find('div.overlay').should('exist');
    });

    it(`should open overlay for contact`, () => {
      cy.get('@breadcrumbs').find('div.overlay').should('not.exist');
      cy.get('@breadcrumbs').get('div.breadcrumb-buttons button span').contains('Kontakt').click();
      cy.get('@breadcrumbs').find('div.overlay').should('exist');
    });

    it(`should close overlay on ESC press`, () => {
      closeOverlayOnKey('Escape');
      cy.get('@breadcrumbs').find('div.overlay').should('not.exist');
    });
  });

  describe('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6+');
      prepare('Breadcrumb', 'Default');
      cy.get('swisspost-internet-breadcrumbs').shadow().get('div.breadcrumbs').as('breadcrumbs');
    });

    it(`should show cropped breadcrumb as dropdown`, () => {
      cy.get('.middle-dropdown-button').click({ force: true });

      cy.get('nav.middle-dropdown').should('exist');
    });

    it(`should not break line for long elements`, () => {
      const itemText = 'Veeeeeeeeery loooooooong element';
      cy.changeArg('custom-items', [{ text: itemText, url: '/x/y/z' }]);

      cy.get('swisspost-internet-breadcrumbs')
        .shadow()
        .get('div.breadcrumbs > nav > ol li')
        .as('breadcrumbItems');

      cy.get('@breadcrumbItems').contains(itemText).should('have.css', 'white-space', 'nowrap');
    });
  });
});
