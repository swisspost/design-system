describe('Banner', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--banner');
    cy.get('.banner post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Banners (Standard HTML)', { widths: [320, 1440] });
  });

  it('post-banner', () => {
    cy.visit('/iframe.html?id=snapshots--post-banner');
    cy.get('post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Banners (Web Component)', { widths: [320, 1440] });
  });
});
