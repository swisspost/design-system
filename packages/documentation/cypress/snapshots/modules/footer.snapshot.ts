describe('Footer', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--footer');
    cy.get('post-footer[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Footer', { widths: [320, 600, 1024, 1440] });
  });
});
