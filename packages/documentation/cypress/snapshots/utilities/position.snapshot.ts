describe('Position', () => {
  it('position', () => {
    cy.visit('/iframe.html?id=snapshots--position');
    cy.get('.position-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Position', { widths: [320, 1440] });
  });
});
