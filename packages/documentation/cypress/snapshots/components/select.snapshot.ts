describe('Select', () => {
  it('default', () => {
    cy.visit('./iframe.html?id=snapshots--select');
    cy.percySnapshot('Selects', { widths: [400] });
  });
});
