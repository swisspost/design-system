describe('Tabs', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--tabs');
    cy.get('post-tab-header.hydrated').should('be.visible');
    cy.percySnapshot('Tabs', { widths: [1440] });
  });
});
