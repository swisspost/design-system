import { LocalizedConfig } from '../../src/models/general.model';
import rawTestConfiguration from '../fixtures/internet-header/test-configuration.json';
import { prepare } from '../support/prepare-story';
import { BREADCRUMBS } from './shared/variables';

const testConfiguration: LocalizedConfig = rawTestConfiguration;

describe('breadcrumb', () => {
  describe('configuration', () => {
    it(`should not rendered if no config present`, () => {
      // Cast the imported JSON object to the LocalizedConfig interface
      const config: LocalizedConfig = testConfiguration;
      const modifiedConfig = JSON.parse(JSON.stringify(config));

      // Clear breadcrumb config
      modifiedConfig.breadcrumbs = undefined;

      prepare(BREADCRUMBS, 'Default', { config: modifiedConfig });
      cy.get('swisspost-internet-breadcrumbs').should('exist');
      cy.get('post-breadcrumbs').should('not.exist');
    });

    it(`should add custom elements`, () => {
      prepare(BREADCRUMBS, 'CustomItems');

      cy.changeArg('custom-items', [
        { text: 'Test1', url: '/x/y/z' },
        { text: 'Test2', url: '/a/b/c' },
      ]);

      cy.get('post-breadcrumbs')
        .as('breadcrumbs')
        .shadow()
        .find('post-breadcrumb-item')
        .should('to.have.length', 4);

      // Contains both elements and sets the url to the post-breadcrumb-item
      cy.get('@breadcrumbs')
        .shadow()
        .contains('post-breadcrumb-item', 'Test1')
        .should('to.have.attr', 'url', '/x/y/z');
      cy.get('@breadcrumbs')
        .shadow()
        .contains('post-breadcrumb-item', 'Test2')
        .should('to.have.attr', 'url', '/a/b/c');
    });
  });
});
