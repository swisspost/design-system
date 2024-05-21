describe('Tag', () => {
  it('tag (html)', () => {
    cy.visit('/iframe.html?id=snapshots--tag');
    cy.waitForIconInElement('.tag');
    cy.percySnapshot('Tag (Standard HTML)', { widths: [1440] });
  });

  it('post-tag (wc)', () => {
    cy.visit('/iframe.html?id=snapshots--post-tag');
    cy.waitForIconInComponentShadow('post-tag');
    cy.percySnapshot('Tag (Web Component)', { widths: [1440] });
  });
});
