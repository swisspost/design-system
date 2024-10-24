describe('List', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--list');
    cy.get('post-list', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('List', { widths: [1440] });
  });
});
