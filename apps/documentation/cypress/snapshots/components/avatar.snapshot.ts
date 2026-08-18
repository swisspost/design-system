describe('Avatar', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--avatar');
    cy.get('post-avatar.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Avatars', { widths: [1440] });
  });
});
