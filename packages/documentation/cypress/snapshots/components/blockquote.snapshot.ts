describe('Blockquote', () => {
  it('default', () => {
    cy.visit('iframe.html?id=snapshots--blockquote');
    cy.percySnapshot('Blockquotes', { widths: [320, 1440] });
  });
});
