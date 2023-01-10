import { IPortalConfig } from '../../../src/models/general.model';
import testConfiguration from '../../../src/assets/config/test-configuration.json';

describe('login', () => {
  before(() => {
    cy.visitStorybook();
  });

  beforeEach(() => {
    cy.intercept('**/api/headerjs/Json?serviceid=*', testConfiguration).as('getConfig');
    cy.loadStory('Header', 'Default');
  });

  describe('args', () => {
    describe('login: true', () => {
      it(`adds login control`, () => {
        cy.changeArg('login', true);
        cy.get('post-klp-login-widget').should('exist').and('be.visible');
      });
    });

    describe('login: false', () => {
      it(`removes login control`, () => {
        cy.changeArg('login', false);
        cy.get('post-klp-login-widget').should('not.exist');
      });
    });
  });

  describe('config', () => {
    describe('login widget options not set', () => {
      it(`removes login control`, () => {
        // Cast the imported JSON object to the IPortalConfig interface
        let config: IPortalConfig = <any>testConfiguration;

        // Clear login widget options config
        config.de.header.loginWidgetOptions = undefined;

        // Intercept the request to the config API and return a static response
        cy.intercept('**/api/headerjs/Json?serviceid=*', config).as('getConfig');

        // Use any project id other than "test" to force an API call
        // The request is intercepted and the modified config is returned
        cy.visit('iframe.html?id=header--default&args=project:cypress-test');
        // cy.visitStorybook({
        //   qs: {
        //     id: 'header-header--default',
        //     args: 'project:cypress-test',
        //   },
        // });

        cy.wait('@getConfig').its('response.statusCode').should('eq', 200);

        // Assert the header is hydrated
        cy.get('swisspost-internet-header').should('have.class', 'hydrated');

        // With the modified configuration the login widget should be removed from the DOM
        cy.get('post-klp-login-widget').should('not.exist');
      });
    });
  });
});
