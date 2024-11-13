describe('List group', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--list-group');
    cy.get('.list-group-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Chips', { widths: [1440] });
  });
});
