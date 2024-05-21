describe('Tabs', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--tabs');
    cy.waitForComponent('post-tab-header');
    cy.waitForComponent('post-tab-panel');
    cy.waitForComponent('post-tabs');
    cy.percySnapshot('Tabs', { widths: [1440] });
  });
});
