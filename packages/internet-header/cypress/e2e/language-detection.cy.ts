import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

describe('language detection from storybook', () => {
  it('should not render the header without languages in the config', () => {
    prepare(HEADER, 'Default');
    cy.get('swisspost-internet-header').should('exist');
    cy.get('.post-internet-header').should('not.exist');
  });

  it('should pick the config language if there is only one', () => {
    // Use an italian only config
    const customConfig = JSON.parse(JSON.stringify(testConfiguration));
    delete customConfig.de;
    delete customConfig.fr;
    delete customConfig.en;

    prepare(HEADER, 'Default', { config: customConfig });

    cy.get('swisspost-internet-header')
      .shadow()
      .get('post-language-switch-2')
      .shadow()
      .get('.lang-btn span:not(.visually-hidden)')
      .should('have.text', 'it');
  });
});
