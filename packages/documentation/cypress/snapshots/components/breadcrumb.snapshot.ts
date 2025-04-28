describe('Breadcrumbs', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--breadcrumbs');
    cy.get('post-breadcrumbs.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Breadcrumbs', { widths: [400] });
  });
});
