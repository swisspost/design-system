describe('Topic-Teaser', () => {
    it('default', () => {
      cy.visit('/iframe.html?id=snapshots--topic-teaser');
      cy.get('.topic-teaser-image').should('be.visible');
      cy.percySnapshot('Topic-Teaser', { widths: [320, 600, 1024] });
    });
  });
