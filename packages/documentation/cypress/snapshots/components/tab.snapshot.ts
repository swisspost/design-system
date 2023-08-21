describe('Tab', () => {
  it('default', () => {
    cy.visit('./iframe.html?id=snapshots--tab');
    cy.percySnapshot('Tabs', { widths: [1440] });
  });
});
