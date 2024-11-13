describe('Spinner', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--spinner');
    cy.get('.loader', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Spinners', { widths: [320, 1440] });
  });
});
