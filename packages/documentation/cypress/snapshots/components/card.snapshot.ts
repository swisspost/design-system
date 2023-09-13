describe('Card', () => {
  it('default', () => {
    cy.visit('iframe.html?id=snapshots--card');
    cy.percySnapshot('Cards', { widths: [1440] });
  });
});
