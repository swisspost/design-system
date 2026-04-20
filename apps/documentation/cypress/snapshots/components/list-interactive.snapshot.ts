describe('List interactive', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--list-interactive');
    cy.get('.list-interactive-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Chips', { widths: [1440] });
  });
});
