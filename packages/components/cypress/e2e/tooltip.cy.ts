describe('tooltips', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#target1').as('target1');
      cy.get('#target2').as('target2');
      cy.get('#tooltip-one').find('post-popovercontainer[popover]').as('tooltip');
    });

    it('should display a tooltip', () => {
      cy.get('@tooltip').should('not.be.visible');
      cy.get('@target2').focus();
      // Checking if a popover is open is a bit tricky, but it either matches the pseudo selector :popover-open
      // or the polyfill sets the class :popover-open (a bit tricky to escape)
      // https://github.com/oddbird/popover-polyfill#caveats
      // prettier-ignore
      cy.get('.\\:popover-open, :popover-open').should('exist');
      cy.get('@target2').blur();
      cy.get('@tooltip').should('not.be.visible');
    });

    it('tooltip placement right', () => {
      cy.get('#tooltip-one').invoke('attr', 'placement', 'right');
      cy.get('@target2').focus();
      cy.wait(10);
      cy.get('@tooltip')
        .should('have.css', 'left')
        .then((v: unknown) => {
          expect(parseInt(v as string)).to.be.greaterThan(120);
        });
    });

    it('should append aria-describedby without deleting existing values', () => {
      cy.get('@target1')
        .should('have.attr', 'aria-describedby')
        .should('eq', 'existing-value tooltip-one');
    });

    it('should patch aria after button has been inserted', () => {
      cy.document().then(doc => {
        const btn = doc.createElement('post-tooltip-trigger');
        btn.setAttribute('for', 'tooltip-one');
        btn.innerHTML = 'added after the fact';
        btn.id = 'added-later';
        doc.body.appendChild(btn);
      });
      cy.get('#added-later').should('have.attr', 'aria-describedby').should('eq', 'tooltip-one');
      cy.get('#added-later').should('have.attr', 'tabindex').should('eq', '0');
    });
  });

  describe('with child element', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#target-child-element').as('target');
      cy.get('#target-child-element span').as('target-child');
      cy.get('#tooltip-one').find('post-popovercontainer[popover]').as('tooltip');
    });

    it('should show tooltip on hovered child element', () => {
      cy.get('@tooltip').should('not.be.visible');
      cy.get('@target-child').trigger('pointerover');
      cy.get('.\\:popover-open, :popover-open').should('exist');
    });
  });

  describe('non-focusable element', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#non-focusable-span').as('target');
    });

    it('should add tabindex', () => {
      cy.get('@target').should('have.attr', 'tabindex').should('eq', '0');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#target1').as('target1');

      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-tooltip');
    });
  });
});
