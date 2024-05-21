describe('Headings', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--heading');
    cy.waitForElement('h1');
    cy.percySnapshot('Headings', { widths: [1024] });
  });
});
