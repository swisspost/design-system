describe('Textarea', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--textarea');
    cy.percySnapshot('Textareas', { widths: [400] });
  });
});
