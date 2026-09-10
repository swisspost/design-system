describe('Tabs', () => {
  it('content tabs', () => {
    cy.visit('/iframe.html?id=snapshots--content-tabs');
    cy.get('post-tab-item[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Tabs', { widths: [320, 600, 1440] });
  });

  it('page tabs', () => {
    cy.visit('/iframe.html?id=snapshots--page-tabs');
    cy.get('post-tab-item[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Tabs', { widths: [320, 600, 1440] });
  });
});
