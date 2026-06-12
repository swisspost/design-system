describe('SideNavigation', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--post-sidenavigation');
    cy.get('post-sidenavigation[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('SideNavigation', { widths: [1440] });
  });
});