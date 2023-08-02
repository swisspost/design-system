describe('home', () => {
  before(() => {
    cy.visit('/iframe.html?id=home--docs', { timeout: 5000 });
  });

  it('should show the home page', () => {
    cy.get('.docs-header h1').should('have.text', 'Swiss PostDesign System');
  });
});
