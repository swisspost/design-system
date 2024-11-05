describe('List', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--list');
    cy.get('post-accordion[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Lists', { widths: [1440] });
  });
});
