describe('welcome', () => {
  before(() => {
    cy.visitStorybook();
  });

  it('should show a welcome page', () => {
    cy.loadStory('Welcome', 'Page');
    cy.get('.docs-header h1').should('have.text', 'Swiss PostDesign System');
  });
});
