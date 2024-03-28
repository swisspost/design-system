describe('Textarea', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--textarea');
    cy.get('textarea', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Textareas', { widths: [400] });
  });
});
