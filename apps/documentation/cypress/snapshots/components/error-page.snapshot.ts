describe('ErrorPage', () => {
  it('error page', () => {
    cy.visit('/iframe.html?id=snapshots--error-page');
    cy.get('.error', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Error page', { widths: [1440] });
  });
});
