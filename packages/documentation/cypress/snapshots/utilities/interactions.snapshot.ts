describe('Interactions', () => {
  it('interactions', () => {
    cy.visit('/iframe.html?id=snapshots--interactions');
    cy.get('.interactions', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Interactions', { widths: [1440] });
  });
});
