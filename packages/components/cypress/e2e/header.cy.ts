describe('header', { baseUrl: null, includeShadowDom: true }, () => {
  const testFiles = ['post-header', 'post-header-without-title'];

  testFiles.forEach(testFile => {
    describe(testFile.replaceAll('-', ' '), () => {
      beforeEach(() => {
        cy.visit(`./cypress/fixtures/${testFile}.test.html`);

        cy.get('post-header').as('header');
      });

      function getContentTop() {
        return cy.get('main').then($main => Math.round($main.position().top));
      }

      function checkLayoutShift() {
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

  describe('Accessibility', () => {
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
