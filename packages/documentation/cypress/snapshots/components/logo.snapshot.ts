describe('Logo', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--post-logo');
    cy.get('post-logo.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Logos', { widths: [1440] });
  });
});
