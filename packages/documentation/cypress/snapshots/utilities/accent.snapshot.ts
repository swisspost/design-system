describe('Accent', () => {
  it('accent', () => {
    cy.visit('/iframe.html?id=snapshots--accent');
    cy.get('.accent-default', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Accents', { widths: [1440] });
  });
});
