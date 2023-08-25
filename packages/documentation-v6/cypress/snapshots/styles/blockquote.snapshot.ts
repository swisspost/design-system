describe('Blockquote', () => {
  it('default', () => {
    cy.visit('./iframe.html?id=hidden-blockquote-snapshot-test--page');
    cy.percySnapshot('Blockquotes', { widths: [320, 1440] });
  });
});
