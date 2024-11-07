describe('List', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--post-list');
    cy.get('list-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('List', { widths: [1440] });
  });
});
