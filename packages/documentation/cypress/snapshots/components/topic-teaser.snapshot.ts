describe('Topic-Teaser', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--topic-teaser');
    cy.waitForElement('.topic-teaser-image');
    cy.percySnapshot('Topic-Teaser', { widths: [320, 600, 1024] });
  });
});
