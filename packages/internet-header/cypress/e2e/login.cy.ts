import { IPortalConfig } from '../../src/models/general.model';
import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import { prepare } from '../support/prepare-story';

describe('login', () => {
  beforeEach(() => {
    prepare('Components/Internet Header/Header', 'Default');
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
        config.de!.header.loginWidgetOptions = undefined;

        // Intercept the request to the config API and return a static response
        prepare('Components/Internet Header/Header', 'Default', config);

        // Assert the header is hydrated
        cy.get('swisspost-internet-header').should('have.class', 'hydrated');

        // With the modified configuration the login widget should be removed from the DOM
        cy.get('post-klp-login-widget').should('not.exist');
      });
    });
  });
});
