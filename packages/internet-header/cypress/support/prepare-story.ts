import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import mockAuth from '../fixtures/internet-header/auth.json';
import { IPortalConfig } from '../../src/models/general.model';

export const installInterceptors = (config: Object = testConfiguration) => {
  cy.intercept('**/api/headerjs/Json?serviceid=*', config).as('getConfig');
  cy.intercept('/config/test-configuration.json', config).as('getTestConfig');
  cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
};

export const prepare = (
  storyTitle: string = 'Header',
  storyName: string = 'Default',
  config: Object = testConfiguration,
) => {
  installInterceptors(config);
  cy.visitStorybook({
    onBeforeLoad(win: { navigator: any }) {
      // Set default browser language explicitly to English
      Object.defineProperty(win.navigator, 'language', {
        value: 'en',
      });
    },
  });
  cy.loadStory(storyTitle, storyName);
};

export const copyConfig = (): IPortalConfig => {
  return JSON.parse(JSON.stringify(testConfiguration));
};
