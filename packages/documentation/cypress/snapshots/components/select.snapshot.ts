describe('Select', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--select');
    cy.get('.form-select').should('be.visible');
    cy.percySnapshot('Selects', { widths: [400] });
  });
});
