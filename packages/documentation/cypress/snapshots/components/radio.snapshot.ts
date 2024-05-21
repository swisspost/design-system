describe('Radio', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--radio');
    cy.waitForElement('.form-check');
    cy.percySnapshot('Radios', { widths: [400] });
  });
});
