describe('Headings', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=hidden-snapshots-components--heading');
    cy.percySnapshot('Headings', { widths: [1024] });
  });
});
