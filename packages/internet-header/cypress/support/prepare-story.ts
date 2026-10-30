import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import mockNotAuth from '../fixtures/internet-header/not-auth.json';
import mockAuth from '../fixtures/internet-header/auth.json';
import { LocalizedConfig } from '../../src/models/general.model';
import { HEADER } from '../e2e/shared/variables';

export const installInterceptors = (
  config: LocalizedConfig = testConfiguration,
  loggedIn: boolean = false,
) => {
  cy.intercept('**/api/header?serviceId=*', config).as('getConfig');
  cy.intercept('/assets/config/test-configuration.json', config).as('getTestConfig');
  cy.intercept('**/v1/session/subscribe', loggedIn ? mockAuth : mockNotAuth).as('auth');
};

interface PrepareOptions {
  loggedIn?: boolean;
  config?: LocalizedConfig;
}

export const prepare = (
  storyId: string = 'Header',
  storyName: string = 'Default',
  { loggedIn, config = testConfiguration }: PrepareOptions = {},
) => {
  installInterceptors(config, loggedIn);
  cy.visitStorybook();
  cy.get('.sb-nopreview_main', { timeout: 30000 }).should('be.visible'); // Wait until vite is ready (initial loading is longer)
  cy.loadStory(storyId, storyName);
  cy.get('#root-inner', { timeout: 30000 }).should('exist'); // Ensure that we have a storybook component loaded, before going further

  if (storyId === HEADER) {
    // The header story answers from local test data by default, which would bypass the interceptors
    cy.changeArg('localData', false);
    cy.get('#PPM_HEADER_DATA').should('not.exist');
    // Let the remounted header load its config, so the tests assert on a rendered header
    cy.wait('@getTestConfig');
  }
};

export const copyConfig = (): LocalizedConfig => {
  return JSON.parse(JSON.stringify(testConfiguration));
};
