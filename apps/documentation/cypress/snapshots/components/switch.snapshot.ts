describe('Switch', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--switch');
    cy.get('.form-switch', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Switches', { widths: [600] });
  });
});
