describe('SideNavigation', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--post-side-navigation');
    cy.get('post-side-navigation[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('SideNavigation', { widths: [1440] });
  });
});
