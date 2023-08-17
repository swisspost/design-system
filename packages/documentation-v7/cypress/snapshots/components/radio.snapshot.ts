describe('Radio', () => {
  it('default', () => {
    cy.visit('./iframe.html?id=snapshots--card');
    cy.percySnapshot('Radios', { widths: [400] });
  });
});
