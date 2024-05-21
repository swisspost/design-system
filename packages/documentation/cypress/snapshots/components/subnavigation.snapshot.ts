describe('Subnavigation', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--subnavigation');
    cy.waitForElement('.subnavigation');
    cy.percySnapshot('Subnavigations', { widths: [1440] });
  });
});
