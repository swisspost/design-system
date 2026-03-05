describe('Tag', () => {
  it('tag (html)', () => {
    cy.visit('/iframe.html?id=snapshots--tag');
    cy.get('.tag post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Tag (Standard HTML)', { widths: [1440] });
  });

  it('post-tag (wc)', () => {
    cy.visit('/iframe.html?id=snapshots--post-tag');
    cy.get('post-tag', { timeout: 30000 }).shadow().get('post-icon').should('be.visible');
    cy.percySnapshot('Tag (Web Component)', { widths: [1440] });
  });
});
