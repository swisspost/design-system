describe('Table', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--table');
    cy.get('.table', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Tables', { widths: [780] });
  });
});
