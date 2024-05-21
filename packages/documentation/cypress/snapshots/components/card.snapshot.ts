describe('Card', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--card');
    cy.waitForIconInElement('.card');
    cy.percySnapshot('Cards', { widths: [1440] });
  });
});
