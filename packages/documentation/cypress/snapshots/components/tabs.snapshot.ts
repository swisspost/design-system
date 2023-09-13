describe('Tabs', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--tabs');
    cy.percySnapshot('Tabs', { widths: [1440] });
  });
});
