const FIGMA_FILE_KEY = '3qYq4MN0QMWzumbLgkSh02';

describe('Header Selection Guide', () => {
  it('should embed the decision tree from Figma', () => {
    cy.visit('/iframe.html?id=3b69a918-06c3-4c4c-992a-714188b445c3--docs&viewMode=docs');
    cy.get('.header-decision-tree iframe').as('embed');

    cy.get('@embed').should('have.attr', 'title').and('not.be.empty');
    cy.get('@embed')
      .should('have.attr', 'src')
      .and('include', `https://embed.figma.com/board/${FIGMA_FILE_KEY}/`);
  });

  // embed.figma.com redirects to www.figma.com, so the CSP has to allow both hosts
  it('should allow Figma in the Content Security Policy', () => {
    cy.readFile('.storybook/preview-head.html').then((html: string) => {
      const frameSrc = /frame-src([^;]*);/.exec(html)?.[1].trim().split(/\s+/);
      expect(frameSrc, 'frame-src').to.include.members([
        'https://embed.figma.com',
        'https://www.figma.com',
      ]);
    });
  });
});
