describe('Headings', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=hidden-headings-snapshot-test--page');
    cy.percySnapshot('Headings', { widths: [1024] });
  });
});
