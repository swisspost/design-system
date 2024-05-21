describe('Checkbox', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--checkbox');
    cy.waitForElement('.form-check');
    cy.percySnapshot('Checkboxes', { widths: [400] });
  });
});
