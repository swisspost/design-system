describe('Headings', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--heading');
    cy.percySnapshot('Headings', { widths: [1024] });
  });
});
