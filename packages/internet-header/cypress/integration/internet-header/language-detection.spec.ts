import testConfiguration from '../../../src/assets/config/test-configuration.json';
import mockAuth from '../../fixtures/auth.json';
import { prepare } from './prepare-story';

describe('language detection from storybook', () => {
  beforeEach(() => {
    cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
  });

  it('should not render the header without languages in the config', () => {
    prepare('Header', 'Default', {});
    cy.get('swisspost-internet-header').should('exist');
    cy.get('.post-internet-header').should('not.exist');
  });

  it('should pick the config language if there is only one', () => {
    // Use an italian only config
    const customConfig = JSON.parse(JSON.stringify(testConfiguration));
    delete customConfig.de;
    delete customConfig.fr;
    delete customConfig.en;

    prepare('Header', 'Default', customConfig);

    cy.get('swisspost-internet-header')
      .shadow()
      .get('post-language-switch')
      .shadow()
      .get('.lang-btn span:not(.visually-hidden)')
      .should('have.text', 'it');
  });
});
