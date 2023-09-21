describe('Choice card', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--choice-card');
    cy.get('.radio-button-card', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Choice cards', { widths: [1440] });
  });
});
