import { IPortalConfig } from '../../src/models/general.model';
import rawTestConfiguration from '../fixtures/internet-header/test-configuration.json';
import { prepare } from '../support/prepare-story';

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
      .trigger('keydown', { eventConstructor: 'KeyboardEvent', force: true, key: key });
  }

  describe('configuration', () => {
    it(`should not be rendered if no header present`, () => {
      // Need to revisit storybook to make sure new story is loaded correctly
      prepare('Internet Header/Components/Breadcrumbs', 'NonExistentHeader');

      cy.get('swisspost-internet-breadcrumbs').should('not.be.visible');
      cy.get('.page-wrapper').should('be.visible');
      cy.get('div.breadcrumbs').should('not.exist');
    });

    it(`should not rendered if no config present`, () => {
      // Cast the imported JSON object to the IPortalConfig interface
      const config: IPortalConfig = <any>testConfiguration;
      const modifiedConfig = JSON.parse(JSON.stringify(config));

      // Clear breadcrumb config
      modifiedConfig.de.breadcrumb = undefined;
      modifiedConfig.en.breadcrumb = undefined;
      modifiedConfig.fr.breadcrumb = undefined;
      modifiedConfig.it.breadcrumb = undefined;

      prepare('Internet Header/Components/Breadcrumbs', 'NonExistentHeader', modifiedConfig);
      cy.get('swisspost-internet-breadcrumbs').should('exist');
      cy.get('div.breadcrumbs').should('not.exist');
    });

    it(`should add custom elements`, () => {
      prepare('Internet Header/Components/Breadcrumbs', 'Custom-Items');

      (cy as any).changeArg('custom-items', [
        { text: 'Test1', url: '/x/y/z' },
        { text: 'Test2', url: '/a/b/c' },
      ]);

      cy.get('div.breadcrumbs')
        .as('breadcrumbs')
        .find('> nav > ol > li')
        .should('to.have.length', 5);

      // Contains both elements, only first one should contain the link
      cy.get('@breadcrumbs')
        .contains('.breadcrumbs-list > li > a', 'Test1')
        .should('to.have.attr', 'href', '/x/y/z');
      cy.get('@breadcrumbs')
        .contains('.breadcrumbs-list > li > a', 'Test2')
        .should('to.have.attr', 'href', '/a/b/c');
    });
  });

  describe('open/close overlay buttons', () => {
    beforeEach(() => {
      prepare('Internet Header/Components/Breadcrumbs', 'Default');
      cy.get('div.breadcrumbs').as('breadcrumbs');
      cy.intercept(
        'https://post.ch/de/kundencenter/onlinedienste/standorte-und-oeffnungszeiten/**',
        {
          fixture: 'pages/help-contact-overlay.html',
        },
      ).as('overlay');
    });

    it(`should open overlay for help button`, () => {
      cy.get('@breadcrumbs').find('div.overlay').should('not.exist');
      cy.get('@breadcrumbs')
        .get('div.breadcrumb-buttons button:first-child')
        .click({ force: true });
      cy.get('@breadcrumbs').find('div.overlay').should('exist');
    });

    it(`should open overlay for contact`, () => {
      cy.get('@breadcrumbs').find('div.overlay').should('not.exist');
      cy.get('@breadcrumbs').get('div.breadcrumb-buttons button:last-child').click({ force: true });
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
      prepare('Internet Header/Components/Breadcrumbs', 'Default');
      cy.get('div.breadcrumbs').as('breadcrumbs');
    });

    it(`should show cropped breadcrumb as dropdown`, () => {
      cy.get('.middle-dropdown-button').click({ force: true });

      cy.get('nav.middle-dropdown').should('exist');
    });

    it(`should not break line for long elements`, () => {
      const itemText = 'Veeeeeeeeery loooooooong element';
      (cy as any).changeArg('custom-items', [{ text: itemText, url: '/x/y/z' }]);

      cy.get('div.breadcrumbs > nav > ol li').as('breadcrumbItems');

      cy.get('@breadcrumbItems').contains(itemText).should('have.css', 'white-space', 'nowrap');
    });
  });
});
