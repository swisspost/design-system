describe('Button-group', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--button-group');
    cy.waitForElement('.btn-group');
    cy.percySnapshot('Button-group', { widths: [1440] });
  });
});
