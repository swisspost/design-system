describe('Select', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--select');
    cy.get('.form-select', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Selects', { widths: [400] });
  });
});
