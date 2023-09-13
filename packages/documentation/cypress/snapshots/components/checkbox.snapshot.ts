describe('Checkbox', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--checkbox');
    cy.get('.form-check').should('be.visible');
    cy.percySnapshot('Checkboxes', { widths: [400] });
  });
});
