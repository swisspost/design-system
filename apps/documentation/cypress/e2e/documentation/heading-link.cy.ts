// Every documentation heading gets a link appended to it by "rehype-autolink-headings"
const DOCS_PAGE = '/iframe.html?id=76ade552-2c03-4d6d-9dce-28daa3405910--docs&viewMode=docs';
const HEADING = '.sbdocs-content .container > :is(h1, h2, h3, h4, h5, h6)';

function getLines(heading: HTMLElement): DOMRect[] {
  const range = heading.ownerDocument.createRange();
  range.selectNodeContents(heading.firstChild as ChildNode);

  return Array.from(range.getClientRects());
}

describe('Heading link', () => {
  beforeEach(() => {
    // narrow enough for some headings of this page to wrap over multiple lines
    cy.viewport(600, 800);
    cy.visit(DOCS_PAGE);
    cy.get(HEADING, { timeout: 30000 }).filter(':visible').as('headings');
  });

  it('should keep its place after the heading text, also when the heading wraps', () => {
    cy.get<JQuery<HTMLElement>>('@headings').should($headings => {
      const headings = $headings.toArray();
      const wrapping = headings.filter(heading => getLines(heading).length > 1);
      expect(wrapping.length, 'headings wrapping over multiple lines').to.be.greaterThan(0);

      headings.forEach(heading => {
        const link = heading.querySelector('a') as HTMLElement;
        const linkRect = link.getBoundingClientRect();
        const lastLine = getLines(heading).at(-1) as DOMRect;
        const label = `"${heading.textContent}"`;

        // the link takes up space even while hidden, so showing it never moves the text
        expect(linkRect.width, `link of ${label} takes up space`).to.be.greaterThan(0);
        expect(linkRect.left, `link of ${label} comes after the text`).to.be.at.least(
          lastLine.right - 1,
        );
        expect(linkRect.right, `link of ${label} stays within the heading`).to.be.at.most(
          heading.getBoundingClientRect().right + 1,
        );
      });
    });
  });
});
