describe('Product Card', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--product-card');
    cy.get('.card post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Product Cards', { widths: [320, 1024, 1440] });
  });
});
