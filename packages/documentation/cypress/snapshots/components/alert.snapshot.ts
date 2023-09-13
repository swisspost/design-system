describe('Alert', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--alert');
    cy.percySnapshot('Alerts', { widths: [320, 1440] });
  });
});
