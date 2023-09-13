describe('Alert', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--alert');
    cy.get('.alert', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Alerts', { widths: [320, 1440] });
  });
});
