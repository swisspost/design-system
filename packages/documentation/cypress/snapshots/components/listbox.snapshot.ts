describe('Listbox', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--post-listbox');
    cy.get('ol', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Listbox', { widths: [1440] });
  });
});
