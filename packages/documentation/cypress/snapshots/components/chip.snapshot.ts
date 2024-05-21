describe('Chip', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--chip');
    cy.waitForElement('.chip');
    cy.percySnapshot('Chips', { widths: [1440] });
  });
});
