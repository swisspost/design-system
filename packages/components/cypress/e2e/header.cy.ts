const HEADER_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498';

describe('Header', () => {
  describe('React Navigation', { viewportHeight: 1000, viewportWidth: 400 }, () => {
    beforeEach(() => {
      cy.getComponent('header', HEADER_ID);
    });
    it('should close mobile nav menu after reattaching header', () => {
      cy.get('div.local-header-mobile-extended').should('not.exist');
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('exist');

      // Remove and re-attach the header
      cy.get('@header').then($header => {
        const headerElement = $header[0];
        headerElement.remove();
        cy.document().then(doc => {
          doc.body.prepend(headerElement);
        });
      });
      cy.get('div.local-header-mobile-extended').should('not.exist');
    });

    it.skip('should release scroll lock after reattaching header', () => {
      cy.get('[data-post-scroll-locked]').should('not.exist');
      cy.get('post-togglebutton').click();
      cy.get('[data-post-scroll-locked]').should('exist');

      // Remove and re-attach the header
      cy.get('@header').then($header => {
        const headerElement = $header[0];
        headerElement.remove();
        cy.get('[data-post-scroll-locked]').should('not.exist');
        cy.document().then(doc => {
          doc.body.prepend(headerElement);
        });
      });

      cy.get('[data-post-scroll-locked]').should('not.exist');
    });
  });
});
