describe('Close button', () => {
  it('post-closebutton', () => {
    cy.visit('/iframe.html?id=snapshots--close-button');
    cy.get('.btn-icon-close', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Close button', { widths: [1440] });
  });
});
