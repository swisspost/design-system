describe('AppStoreBadge', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--app-store-badge');
    cy.get('.app-store-badge', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Badges', { widths: [400] });
  });
});
