describe('Topic-Teaser', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--toggle-button');
    cy.get('post-togglebutton', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Toggle-Button', { widths: [320, 600, 1024] });
  });
});
