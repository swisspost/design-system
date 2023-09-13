describe('Card', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--card');
    cy.get('.card').should('be.visible');
    cy.percySnapshot('Cards', { widths: [1440] });
  });
});
