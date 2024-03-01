describe('Post-Rating', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--post-rating');
    cy.get('post-rating', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Post-Rating', { widths: [600] });
  });
});
