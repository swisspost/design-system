const HEADER_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498';
const TEST_FILES = ['post-header', 'post-header-without-title'];

describe('header', () => {
  TEST_FILES.forEach(testFile => {
    describe(testFile.replaceAll('-', ' '), { baseUrl: null }, () => {
      beforeEach(() => {
        cy.visit(`./cypress/fixtures/${testFile}.test.html`);

        cy.get('post-header').as('header');
      });

      function getContentTop() {
        return cy.get('main').then($main => Math.round($main.position().top));
      }

      function checkLayoutShift() {
        cy.get('@header').should('exist');

        // get the content position before the header is visible
        let initialContentTop: number;
        getContentTop().then(pos => {
          initialContentTop = pos;
          cy.get('@header').should('not.be.visible');
        });

        // check the content position did not change when the header is visible
        cy.get('@header')
          .should('be.visible')
          .then(() => {
            getContentTop().should('eq', initialContentTop);
          });
      }

      it('should not shift layout on desktop', () => {
        checkLayoutShift();
      });

      it('should not shift layout on tablet', () => {
        cy.viewport('ipad-2');
        checkLayoutShift();
      });

      it('should not shift layout on mobile', () => {
        cy.viewport('iphone-6');
        checkLayoutShift();
      });
    });
  });

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

  describe('Accessibility', { baseUrl: null }, () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-header.test.html');
      cy.get('post-header[data-hydrated]').should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-mainnavigation');
    });
  });
});
