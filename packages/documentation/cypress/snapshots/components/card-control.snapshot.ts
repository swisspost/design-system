describe('CardControl', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--card-control');
    cy.get('post-card-control.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('CardControls', { widths: [1440] });
  });
});
