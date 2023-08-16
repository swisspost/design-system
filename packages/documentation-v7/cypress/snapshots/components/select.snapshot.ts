describe('Alert', () => {
  it('default', () => {
    cy.visit('./iframe.html?id=snapshots--select');
    cy.percySnapshot('Alerts', { widths: [400] });
  });
});
