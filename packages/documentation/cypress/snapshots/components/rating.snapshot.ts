describe('Post-Rating', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--rating');
    cy.waitForIconInComponentShadow('post-rating');
    cy.percySnapshot('Post-Rating', { widths: [600] });
  });
});
