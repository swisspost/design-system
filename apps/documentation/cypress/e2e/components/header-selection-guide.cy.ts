const FIGMA_FILE_KEY = '3qYq4MN0QMWzumbLgkSh02';

describe('Header Selection Guide', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=3b69a918-06c3-4c4c-992a-714188b445c3--docs&viewMode=docs');
    cy.get('.header-decision-tree iframe').as('embed');
  });

  it('should embed the decision tree from Figma', () => {
    cy.get('@embed').should('have.attr', 'title').and('not.be.empty');
    cy.get('@embed')
      .should('have.attr', 'src')
      .and('include', `https://embed.figma.com/board/${FIGMA_FILE_KEY}/`);
  });

  it('should be served by Figma as an embeddable page', () => {
    cy.get('@embed')
      .invoke('attr', 'src')
      .then(src => {
        // embed.figma.com redirects to Figma's embed page, so the redirect has to be followed
        cy.request({ url: src as string, failOnStatusCode: false }).then(response => {
          expect(response.status, 'status').to.eq(200);

          // Figma sends "X-Frame-Options: SAMEORIGIN" on its non-embed pages, which blocks the iframe
          expect(response.headers, 'headers').not.to.have.property('x-frame-options');

          const csp = String(response.headers['content-security-policy'] ?? '');
          const frameAncestors = /frame-ancestors([^;]*)/.exec(csp)?.[1].trim();
          if (frameAncestors) expect(frameAncestors, 'frame-ancestors').to.eq('*');

          expect(response.body, 'body').to.include(FIGMA_FILE_KEY);
        });
      });
  });
});
