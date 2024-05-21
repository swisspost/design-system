describe('Select', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--select');
    cy.waitForElement('.form-select');
    cy.percySnapshot('Selects', { widths: [400] });
  });
});
