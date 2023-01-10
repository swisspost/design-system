import testConfiguration from '../../../src/assets/config/test-configuration.json';

export const prepare = (
  storyTitle: string = 'Header',
  storyName: string = 'Default',
  config: Object = testConfiguration,
) => {
  cy.intercept('**/api/headerjs/Json?serviceid=*', config).as('getConfig');
  cy.intercept('/assets/config/test-configuration.json', config).as('getConfig');
  cy.visitStorybook({
    onBeforeLoad(win) {
      // Set default browser language explicitly to English
      Object.defineProperty(win.navigator, 'language', {
        value: 'en',
      });
    },
  });
  cy.loadStory(storyTitle, storyName);
};
