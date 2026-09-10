describe('Hint', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--hint');
    cy.get('hint', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Hint', { widths: [400] });
  });
});
