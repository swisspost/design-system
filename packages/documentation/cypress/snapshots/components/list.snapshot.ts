describe('List', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--lists');
    cy.get('#storybook-root', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Lists', { widths: [1440] });
  });
});
