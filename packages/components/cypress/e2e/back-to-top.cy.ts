const BACK_TO_TOP_ID = '1a1b4cab-d0a8-4b01-bd85-b70e18668cb5';

describe('Back-to-top', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('post-back-to-top', BACK_TO_TOP_ID);
    });

    it('should render the post-back-to-top component', () => {
      cy.get('post-back-to-top').should('exist');
    });

    it('should log an error if the label is missing', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.spy(win.console, 'error').as('consoleError');
        },
      });
      cy.document().then(doc => {
        const element = doc.createElement('post-back-to-top');
        doc.body.appendChild(element);
      });
      cy.get('@consoleError').should(
        'be.calledWith',
        Cypress.sinon.match(
          'The `label` property of the `Post Back to Top` component is not defined.',
        ),
      );
    });

    it('should hide the label visually', () => {
      cy.get('post-back-to-top').shadow().find('.visually-hidden');
    });

    it('should scroll to top when clicked', () => {
      cy.window().then(win => {
        win.scrollTo(0, 3000); // Scroll down to simulate a user interaction
        cy.get('post-back-to-top').shadow().find('.back-to-top').click();
        cy.wait(500);
        cy.window().its('scrollY').should('equal', 0);
      });
    });

    it('should toggle visibility based on scroll position', () => {
      cy.window().then(win => {
        win.scrollTo(0, 0);
        cy.get('post-back-to-top')
          .shadow()
          .find('.back-to-top')
          .should('have.attr', 'aria-hidden', 'true');

        win.scrollTo(0, win.innerHeight + 2000);
        cy.get('post-back-to-top')
          .shadow()
          .find('.back-to-top')
          .should('have.attr', 'aria-hidden', 'false');
      });
    });
  });
  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load for all variants', () => {
      cy.getSnapshots('post-back-to-top');
      cy.checkA11y('post-back-to-top');
    });
  });
});
