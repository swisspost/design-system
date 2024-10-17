describe('Tabs', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--tabs');
    cy.get('post-tab-header[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Tabs', { widths: [1440] });
  });
});
