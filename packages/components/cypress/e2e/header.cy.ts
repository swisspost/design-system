const HEADER_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498';

describe('Header', () => {
  describe('React Navigation', { viewportHeight: 1000, viewportWidth: 400 }, () => {
    beforeEach(() => {
      cy.getComponent('header', HEADER_ID);
    });

    // Function to remove and reattach the header
    const removeAndReattachHeader = () => {
      cy.get('@header').then($header => {
        const headerElement = $header[0];
        headerElement.remove();
        cy.document().then(doc => {
          doc.body.prepend(headerElement);
        });
      });
    };

    it('should close mobile nav menu after reattaching header', () => {
      cy.get('div.local-header-mobile-extended').should('not.exist');
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('exist');

      removeAndReattachHeader();

      cy.get('div.local-header-mobile-extended').should('not.exist');
    });

    it('should release scroll lock after reattaching header', () => {
      cy.get('[data-post-scroll-locked]').should('not.exist');
      cy.get('post-togglebutton').click();
      cy.get('[data-post-scroll-locked]').should('exist');

      removeAndReattachHeader();

      cy.get('[data-post-scroll-locked]').should('not.exist');
    });
  });
});
