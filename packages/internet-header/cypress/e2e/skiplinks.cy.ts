import { prepare } from '../support/prepare-story';

describe('skiplinks', () => {
  beforeEach(() => {
    prepare('Components/Internet Header/Header', 'Default');
    cy.changeArg('language', 'de');
  });

  it(`adds and removes skiplinks control`, () => {
    cy.changeArg('skiplinks', true);
    cy.get('post-skiplinks').should('exist').and('be.hidden');
    cy.changeArg('skiplinks', false);
    cy.get('post-skiplinks').should('not.exist');
  });
});
