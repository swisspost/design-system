describe('Textarea', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--textarea');
    cy.waitForElement('.form-control');
    cy.percySnapshot('Textareas', { widths: [400] });
  });
});
