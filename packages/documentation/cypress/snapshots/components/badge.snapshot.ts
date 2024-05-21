describe('Badge', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--badge');
    cy.waitForElement('.badge');
    cy.percySnapshot('Badges', { widths: [1440] });
  });
});
