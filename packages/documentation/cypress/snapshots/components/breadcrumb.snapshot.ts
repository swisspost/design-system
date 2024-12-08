describe('Breadcrumb', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--breadcrumb');
    cy.get('post-breadcrumb.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Breadcrumb', { widths: [400] });
  });
});
