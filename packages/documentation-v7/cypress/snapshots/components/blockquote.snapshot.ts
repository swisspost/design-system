describe('Blockquote', () => {
  it('default', () => {
    cy.visit('./iframe.html?id=hidden-snapshots-components--blockquote');
    cy.percySnapshot('Blockquotes', { widths: [320, 1440] });
  });
});
