describe('Avatar Picture', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--avatar-picture');
    cy.get('post-avatar-picture.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Avatar Pictures', { widths: [1440] });
  });
});
