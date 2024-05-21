describe('Toast', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--toast');
    cy.waitForElement('.toast');
    cy.percySnapshot('Toasts', { widths: [400, 1024] });
  });
});
