describe('Card', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=hidden-cards-snapshot-test--page');
    cy.percySnapshot('Card', { widths: [1440] });
  });
});
