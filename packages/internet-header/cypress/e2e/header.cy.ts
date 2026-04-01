import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

describe('header', () => {
  beforeEach(() => {
    prepare(HEADER, 'Default');
    cy.changeArg('language', 'de');
  });

  context('initial state', () => {
    it('renders', () => {
      cy.get('swisspost-internet-header', { timeout: 30000 }).should('have.attr', 'data-hydrated');
    });
  });
});
