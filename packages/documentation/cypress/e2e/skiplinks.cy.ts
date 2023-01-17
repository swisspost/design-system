import { prepare } from '../support/prepare-story';

describe('skiplinks', () => {
  beforeEach(() => {
    prepare('Internet Header/Header', 'Default');
  });

  it(`adds and removes skiplinks control`, () => {
    cy.changeArg('skiplinks', true);
    cy.get('post-skiplinks').should('exist').and('be.hidden');
    cy.changeArg('skiplinks', false);
    cy.get('post-skiplinks').should('not.exist');
  });

  // TODO: this test does not work because a click on the skiplink redirects to a different page
  // maybe the skiplink functionality needs to be updated
  /* it('should focus the search button', () => {
    prepare();
    cy.get('swisspost-internet-header')
      .shadow()
      .get('[href="#post-internet-header-search-button"')
      .click({ force: true });
    cy.get('swisspost-internet-header')
      .shadow()
      .get('post-search')
      .then(search => {
        console.log(search[0].shadowRoot?.activeElement);
      });
  }); */
});
