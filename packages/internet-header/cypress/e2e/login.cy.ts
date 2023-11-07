import { IPortalConfig } from '../../src/models/general.model';
import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import { prepare } from '../support/prepare-story';

describe('login', () => {
  describe('args', () => {
    describe('login: true', () => {
      it(`adds login control`, () => {
        prepare('Internet Header/Header', 'Default');
        cy.changeArg('login', true);
        cy.get('post-klp-login-widget').should('exist').and('be.visible');
      });
    });

    describe('login: false', () => {
      it(`removes login control`, () => {
        prepare('Internet Header/Header', 'Default');
        cy.changeArg('login', false);
        cy.get('post-klp-login-widget').should('not.exist');
      });
    });
  });

  describe('config', () => {
    describe('login widget options not set', () => {
      it(`removes login control`, () => {
        // Cast the imported JSON object to the IPortalConfig interface
        let config: IPortalConfig = JSON.parse(JSON.stringify(testConfiguration));

        // Clear login widget options config
        config.de!.header.loginWidgetOptions = undefined;

        // Intercept the request to the config API and return a static response
        prepare('Internet Header/Header', 'Default', { config });
        cy.changeArg('language', 'de');

        // Assert the header is hydrated
        cy.get('swisspost-internet-header').should('have.class', 'hydrated');

        // With the modified configuration the login widget should be removed from the DOM
        cy.get('post-klp-login-widget').should('not.exist');
      });
    });
  });

  describe('jobs login widget', () => {
    describe('showJobsLoginWidget: true', () => {
      it(`shows jobs login widget`, () => {
        let config: IPortalConfig = JSON.parse(JSON.stringify(testConfiguration));
        config.de!.header.showJobsLoginWidget = true;
        config.de!.header.isLoginWidgetHidden = false;
        prepare('Internet Header/Header', 'Default', { config });
        cy.changeArg('language', 'de');
        console.warn(config.de?.header.loginWidgetOptions);
        cy.get('swisspost-internet-header').should('have.class', 'hydrated');
        cy.get('a.login-button').should('exist').and('be.visible');
        cy.get('.klp-widget-anonymous').should('not.exist');
      });
    });

    describe('showJobsLoginWidget: false', () => {
      it(`shows default login widget`, () => {
        let config: IPortalConfig = JSON.parse(JSON.stringify(testConfiguration));
        config.de!.header.showJobsLoginWidget = false;
        config.de!.header.isLoginWidgetHidden = false;
        prepare('Internet Header/Header', 'Default', { config });
        cy.changeArg('language', 'de');
        cy.get('swisspost-internet-header').should('have.class', 'hydrated');
        cy.get('.klp-widget-anonymous').should('exist');
      });
    });
  });
});
