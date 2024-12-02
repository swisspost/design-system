describe('List', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--lists');
    cy.get('ol', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Lists', { widths: [1440] });
  });
});
