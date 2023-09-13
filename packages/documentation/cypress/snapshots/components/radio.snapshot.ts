describe('Radio', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--radio');
    cy.get('.form-check').should('be.visible');
    cy.percySnapshot('Radios', { widths: [400] });
  });
});
