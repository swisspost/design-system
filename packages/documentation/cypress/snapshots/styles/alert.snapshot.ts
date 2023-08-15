describe('Alert', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=hidden-alert-snapshot-test--page');
    cy.percySnapshot('Alerts', { widths: [320, 600, 1440] });
  });
});
