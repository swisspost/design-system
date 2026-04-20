describe('SelectionCard', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--selection-card');
    cy.get('.form-check-input', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Selection card', { widths: [1440] });
  });
});
