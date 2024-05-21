describe('Spinner', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--spinner');
    cy.waitForElement('.loader');
    cy.percySnapshot('Spinners', { widths: [320, 1440] });
  });
});
