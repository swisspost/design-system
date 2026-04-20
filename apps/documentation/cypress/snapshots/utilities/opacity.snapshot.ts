describe('Opacity', () => {
  it('opacity', () => {
    cy.visit('/iframe.html?id=snapshots--opacity');
    cy.get('.opacity-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Opacity', { widths: [1440] });
  });
});
