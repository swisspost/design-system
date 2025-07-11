describe('tooltips', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#target1').as('target1');
      cy.get('#target2').as('target2');
      cy.get('#tooltip-one').find('post-popovercontainer[popover]').as('tooltip');
      cy.get('post-tooltip-trigger[for="tooltip-one"]').as('trigger');
    });

    it('should contain an HTML element inside the trigger, not just plain text', () => {
      cy.get('@trigger').children().should('have.length.at.least', 1);
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

    it('should patch aria after trigger is inserted', () => {
      cy.document().then(doc => {
        const trigger = doc.createElement('post-tooltip-trigger');
        trigger.setAttribute('for', 'tooltip-one');

        const btn = doc.createElement('button');
        btn.id = 'added-later';
        btn.textContent = 'added after the fact';

        trigger.appendChild(btn);
        doc.body.appendChild(trigger);
      });

      cy.get('#added-later').should('exist').and('have.attr', 'aria-describedby', 'tooltip-one');
    });

    describe('trigger behavior', () => {
      it('should initialize trigger with correct attributes', () => {
        cy.get('@trigger')
          .first()
          .within(() => {
            cy.get('button')
              .should('have.attr', 'aria-describedby')
              .then(ariaDescribedBy => {
                expect(ariaDescribedBy).to.include('tooltip-one');
              });
          });
      });

      it('should show tooltip on trigger hover', () => {
        cy.get('@tooltip').should('not.be.visible');
        cy.get('@trigger').first().trigger('pointerenter');
        cy.wait(100);
        cy.get('.\\:popover-open, :popover-open').should('exist');
      });

      it('should hide tooltip on trigger pointerout', () => {
        cy.get('@trigger').first().trigger('pointerenter');
        cy.wait(100);
        cy.get('.\\:popover-open, :popover-open').should('exist');
        cy.get('@trigger').first().trigger('pointerleave');
        cy.wait(100);
        cy.get('@tooltip').should('not.be.visible');
      });

      it('should show tooltip on trigger focus', () => {
        cy.get('@tooltip').should('not.be.visible');
        cy.get('@trigger').first().find('button').focus();
        cy.get('.\\:popover-open, :popover-open').should('exist');
      });

      it('should hide tooltip on trigger blur', () => {
        cy.get('@trigger').first().find('button').focus();
        cy.get('.\\:popover-open, :popover-open').should('exist');
        cy.get('@trigger').first().find('button').blur();
        cy.get('@tooltip').should('not.be.visible');
      });
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
      cy.get('@target-child').trigger('pointerenter');
      cy.wait(100);
      cy.get('.\\:popover-open, :popover-open').should('exist');
    });
  });

  describe('non-focusable element', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-tooltip.test.html');
      cy.get('#non-focusable-span').as('target');
    });

    it('should add tabindex', () => {
      cy.get('@target').should('have.attr', 'tabindex').and('eq', '0');
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
