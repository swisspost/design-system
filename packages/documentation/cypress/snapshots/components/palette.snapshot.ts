describe('Palette', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--palette');
    cy.get('.palette-default', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Palettes', { widths: [1440] });
  });
});
