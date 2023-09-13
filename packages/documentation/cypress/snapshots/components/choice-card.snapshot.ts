describe('Choice card', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--choice-card');
    cy.get('.radio-button-card').should('be.visible');
    cy.percySnapshot('Choice cards', { widths: [1440] });
  });
});
