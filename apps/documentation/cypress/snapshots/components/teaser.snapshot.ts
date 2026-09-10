describe('Teaser', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--teaser');
    cy.get('.teaser-container', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Teaser', { widths: [1440] });
  });
});
