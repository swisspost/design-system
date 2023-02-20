describe('home', () => {
  before(() => {
    cy.visitStorybook();
  });

  it('should show the home page', () => {
    cy.loadStory('Home', 'Page');
    cy.get('.docs-header h1').should('have.text', 'Swiss PostDesign System');
  });
});
