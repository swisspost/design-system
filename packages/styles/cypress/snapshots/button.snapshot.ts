describe('Button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=hidden-button-snapshot-test--page');
    cy.percySnapshot('Buttons', { widths: [1440] });
  });
});
