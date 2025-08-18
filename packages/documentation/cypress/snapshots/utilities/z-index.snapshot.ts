describe('Z-Index', () => {
  it('z-index', () => {
    cy.visit('/iframe.html?id=snapshots--z-index');
    cy.get('.container-examples', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Z-Index', { widths: [1440] });
  });
});
