describe('Banner', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--banner');
    cy.get('post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Banners', { widths: [320, 1440] });
  });
});
