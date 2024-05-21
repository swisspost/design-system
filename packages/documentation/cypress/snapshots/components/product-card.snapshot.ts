describe('Product Card', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--product-card');
    cy.waitForIconInElement('.card');
    cy.percySnapshot('Product Cards', { widths: [320, 1024, 1440] });
  });
});
