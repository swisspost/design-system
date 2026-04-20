describe('Gutters', () => {
  it('Gutters', () => {
    cy.visit('/iframe.html?id=snapshots--gutters');
    cy.get('.gutters-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Gutters', { widths: [320, 780, 1024, 1440] });
  });
});
