describe('back-to-top', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-back-to-top.test.html');
    });

    it('should render the post-back-to-top component', () => {
      cy.get('post-back-to-top').should('exist');
    });

    it('should throw an error if the label is missing', () => {
      cy.on('uncaught:exception', err => {
        expect(err.message).to.include(
          'The label property of the Back to Top component is required for accessibility purposes. Please ensure it is set.',
        );
        return false;
      });
      cy.document().then(doc => {
        const element = doc.createElement('post-back-to-top');
        doc.body.appendChild(element);
      });
    });

    it('should hide the label visually', () => {
      cy.get('post-back-to-top').shadow().find('.visually-hidden');
    });

    it('should scroll to top when clicked', () => {
      cy.window().then(win => {
        win.scrollTo(0, 1000); // Scroll down to simulate a user interaction
        cy.get('post-back-to-top').shadow().find('.back-to-top').click();
        cy.window().its('scrollY').should('equal', 0);
      });
    });

    it('should toggle visibility based on scroll position', () => {
      cy.window().then(win => {
        win.scrollTo(0, 0); // At the top, button should be hidden
        cy.get('post-back-to-top')
          .shadow()
          .find('.back-to-top')
          .should('have.attr', 'aria-hidden', 'true');

        win.scrollTo(0, win.innerHeight + 100); // Scroll below fold
        cy.get('post-back-to-top')
          .shadow()
          .find('.back-to-top')
          .should('have.attr', 'aria-hidden', 'false');
      });
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load', () => {
      cy.injectAxe(); // Ensure Axe is injected for a11y testing
      cy.get('post-back-to-top').should('exist');
      cy.checkA11y(); // Check for accessibility violations
    });
  });
});
