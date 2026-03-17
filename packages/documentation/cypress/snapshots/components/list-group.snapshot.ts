describe('List group', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--list-group');
    cy.get('.list-group', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('List group', { widths: [1440] });
  });
});
