describe('Header', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=internet-header-header-component--default');
    cy.percySnapshot('Header', { widths: [1440] });
  });
});
