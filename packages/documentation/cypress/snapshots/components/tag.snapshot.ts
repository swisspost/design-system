describe('Tag', () => {
  it('tag (html)', () => {
    cy.visit('/iframe.html?id=snapshots--tag');
    cy.get('.tag post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Tag (Standard HTML)', { widths: [1440] });
  });
});
