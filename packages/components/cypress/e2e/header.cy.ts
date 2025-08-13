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

    it('should close both megadropdown and mobile menu with one click', () => {
      // Open mobile menu
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('exist');
      // Open megadropdown
      cy.get('post-megadropdown-trigger').first().click();
      cy.get('post-megadropdown .megadropdown-container').should('be.visible');
      // Click menu button to close both
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('not.exist');
      cy.get('post-megadropdown .megadropdown-container').should('not.be.visible');
    });

    it('should animate megadropdown open after forced close', () => {
      // Open mobile menu and megadropdown
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('exist');
      cy.get('post-megadropdown-trigger').first().should('be.visible').click();
      cy.get('post-megadropdown .megadropdown-container').should('be.visible');

      // Force close by toggling menu
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('not.exist');
      cy.get('post-megadropdown .megadropdown-container').should('not.be.visible');

      // Reopen mobile menu before clicking the trigger again
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('exist');
      cy.get('post-megadropdown-trigger').first().should('be.visible').click();

      // Check if animation class is present
      cy.get('post-megadropdown .megadropdown-container')
        .should('be.visible')
        .should('have.class', 'slide-in')
    });
  });
});
