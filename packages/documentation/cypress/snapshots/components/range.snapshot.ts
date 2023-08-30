describe('Range', () => {
  it('default', () => {
    cy.visit('./iframe.html?id=snapshots--range');
    cy.percySnapshot('Ranges', { widths: [400] });
  });
});
