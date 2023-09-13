describe('Table', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--table');
    cy.percySnapshot('Tables', { widths: [780] });
  });
});
