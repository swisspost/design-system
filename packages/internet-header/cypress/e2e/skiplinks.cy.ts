import { prepare } from '../support/prepare-story';

describe('skiplinks', () => {
  beforeEach(() => {
    prepare('ebb11274-091b-4cb7-9a3f-3e0451c9a865', 'Default');
    cy.changeArg('language', 'de');
  });

  it(`adds and removes skiplinks control`, () => {
    cy.changeArg('skiplinks', true);
    cy.get('post-skiplinks').should('exist').and('be.hidden');
    cy.changeArg('skiplinks', false);
    cy.get('post-skiplinks').should('not.exist');
  });
});
