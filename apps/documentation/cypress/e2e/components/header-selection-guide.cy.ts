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
      .and('include', `https://www.figma.com/board/${FIGMA_FILE_KEY}/`);
  });

  it('should be served by Figma as an embeddable page', () => {
    cy.get('@embed')
      .invoke('attr', 'src')
      .then(src => {
        cy.request({ url: src as string, followRedirect: false, failOnStatusCode: false }).then(
          response => {
            // a redirect or an error means Figma no longer serves the board at this URL
            expect(response.status, 'status').to.eq(200);

            // Figma sends "X-Frame-Options: SAMEORIGIN" on its non-embed pages, which blocks the iframe
            expect(response.headers, 'headers').not.to.have.property('x-frame-options');
            expect(String(response.headers['content-security-policy'] ?? '')).not.to.include(
              'frame-ancestors',
            );

            expect(response.body, 'body').to.include(FIGMA_FILE_KEY);
          },
        );
      });
  });
});
