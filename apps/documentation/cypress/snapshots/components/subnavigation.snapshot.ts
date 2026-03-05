describe('Subnavigation', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--subnavigation');
    cy.get('.subnavigation', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Subnavigations', { widths: [1440] });
  });
});
