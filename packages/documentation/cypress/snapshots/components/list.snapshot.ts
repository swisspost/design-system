describe('List', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--post-lists');
    cy.get('ol', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Lists', { widths: [1440] });
  });

  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--check-list');
    cy.get('ul', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Lists', { widths: [1440] });
  });
});
