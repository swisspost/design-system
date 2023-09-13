describe('Checkbox', () => {
  it('default', () => {
    cy.visit('iframe.html?id=snapshots--checkbox');
    cy.percySnapshot('Checkboxes', { widths: [400] });
  });
});
