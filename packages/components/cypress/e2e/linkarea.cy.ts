const LINKAREA_ID = '1d52b794-768b-464e-90eb-4fd15774aa90';

describe('post-linkarea', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('linkarea', LINKAREA_ID);
    });

    it('should exist', () => {
      cy.get('@linkarea').should('exist');
    });

    it('should delegate click to first slotted link by default', () => {
      cy.get('@linkarea').then($linkArea => {
        const firstLink = $linkArea.find('a').first();
        const linkHref = firstLink.attr('href');
        cy.get('@linkarea').click();
        cy.url().should('include', linkHref);
      });
    });
  });

  describe('with specified link selector', () => {
    beforeEach(() => {
      cy.getComponent('linkarea', LINKAREA_ID, 'initially-specified');
      cy.get('@linkarea').as('linkArea');
    });

    it('should delegate click to link with data-link attribute', () => {
      cy.get('@linkarea').find('a[data-link]').as('linkAreaTarget');

      cy.get('@linkAreaTarget').should('exist');
      cy.get('@linkAreaTarget').then($link => {
        const expectedHref = $link.attr('href');

        cy.get('post-linkarea').click();

        cy.url().should('include', expectedHref);
      });
    });
  });
});
