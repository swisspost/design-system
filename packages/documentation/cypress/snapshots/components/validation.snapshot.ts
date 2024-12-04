describe('Validation', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--validation');
    cy.get('.snapshot', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Validation', { widths: [1440] });
  });
});
