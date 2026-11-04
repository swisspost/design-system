describe('Form grid', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--form-grid');
    cy.get('post-number-input[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Form Grid', { widths: [400, 1440] });
  });
});
