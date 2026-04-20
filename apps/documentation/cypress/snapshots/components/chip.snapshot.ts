describe('Chip', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--chip');
    cy.get('.chip', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Chips', { widths: [1440] });
  });
});
