describe('Button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--button');
    cy.waitForIconInElement('.btn');
    cy.percySnapshot('Buttons', { widths: [1440] });
  });
});
