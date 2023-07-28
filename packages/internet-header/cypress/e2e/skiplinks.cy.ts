import { prepare } from '../support/prepare-story';

describe('skiplinks', () => {
  beforeEach(() => {
    prepare('Internet Header/Components/Header', 'Default');
  });

  it(`adds and removes skiplinks control`, () => {
    cy.changeArg('skiplinks', true);
    cy.get('post-skiplinks').should('exist').and('be.hidden');
    cy.changeArg('skiplinks', false);
    cy.get('post-skiplinks').should('not.exist');
  });
});
