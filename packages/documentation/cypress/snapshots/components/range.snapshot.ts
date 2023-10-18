describe('Range', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--range');
    cy.get('.form-range', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Ranges', { widths: [400] });
  });
});
