describe('Collapsible', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--collapsible');
    cy.get('post-collapsible.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Collapsible');
  });
});
