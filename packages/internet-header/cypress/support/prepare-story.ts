import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import mockAuth from '../fixtures/internet-header/auth.json';
import { IPortalConfig } from '../../src/models/general.model';

export const installInterceptors = (config: Object = testConfiguration) => {
  cy.intercept('**/api/headerjs/Json?serviceid=*', config).as('getConfig');
  cy.intercept('/assets/config/test-configuration.json', config).as('getTestConfig');
  cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
};

export const prepare = (
  storyTitle: string = 'Header',
  storyName: string = 'Default',
  config: Object = testConfiguration,
) => {
  installInterceptors(config);
  cy.visitStorybook({
    qs: {
      lang: 'de',
    },
  });
  cy.get('[class=sb-nopreview_main]', { timeout: 30000 }).should('be.visible'); // Wait until vite is ready (initial loading is longer)
  cy.loadStory(storyTitle, storyName);
  cy.get('[id=storybook-root]', { timeout: 30000 }).should('be.visible'); // Ensure that we have a storybook component loaded, before going further
};

export const copyConfig = (): IPortalConfig => {
  return JSON.parse(JSON.stringify(testConfiguration));
};
