import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import mockNotAuth from '../fixtures/internet-header/not-auth.json';
import mockAuth from '../fixtures/internet-header/auth.json';
import { IPortalConfig } from '../../src/models/general.model';

export const installInterceptors = (
  config: Object = testConfiguration,
  loggedIn: boolean = false,
) => {
  cy.intercept('**/api/headerjs/Json?serviceid=*', config).as('getConfig');
  cy.intercept('/assets/config/test-configuration.json', config).as('getTestConfig');
  cy.intercept('**/v1/session/subscribe', loggedIn ? mockAuth : mockNotAuth).as('auth');
};

interface PrepareOptions {
  loggedIn?: boolean;
  config?: Object;
}

export const prepare = (
  storyTitle: string = 'Header',
  storyName: string = 'Default',
  { loggedIn, config = testConfiguration }: PrepareOptions = {},
) => {
  installInterceptors(config, loggedIn);
  cy.visitStorybook();
  cy.get('.sb-nopreview_main', { timeout: 30000 }).should('be.visible'); // Wait until vite is ready (initial loading is longer)
  cy.loadStory(storyTitle, storyName);
  cy.get('#root-inner', { timeout: 30000 }).should('exist'); // Ensure that we have a storybook component loaded, before going further
};

export const copyConfig = (): IPortalConfig => {
  return JSON.parse(JSON.stringify(testConfiguration));
};
