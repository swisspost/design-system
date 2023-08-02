describe('home', () => {
  before(() => {
    cy.visit('/iframe.html?id=home--docs');
  });

  it.skip('should show the home page', () => {
    cy.get('.docs-header h1').should('have.text', 'Swiss PostDesign System');
  });
});
