describe('Sizing', () => {
  it('Sizing', () => {
    cy.visit('/iframe.html?id=snapshots--sizing');
    cy.get('.snapshot', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Sizing', { widths: [320, 1440] });
  });
});