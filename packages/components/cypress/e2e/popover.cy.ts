describe('popover', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-popover.test.html');

      // Ensure the component is hydrated, which is necessary to ensure the component is ready for interaction
      cy.get('post-popover[data-hydrated]');

      // Aria-expanded is set by the web component, therefore it's a good measure to indicate the component is ready
      cy.get('post-popover-trigger[data-hydrated][for="popover-one"]')
        .children()
        .first()
        .as('trigger');
      cy.get('#testtext').as('popover');
    });

    it('should contain an HTML element inside the trigger, not just plain text', () => {
      cy.get('post-popover-trigger[data-hydrated][for="popover-one"]')
        .children()
        .should('have.length.at.least', 1);
    });

    it('should show up on click and first focusable element should be focused', () => {
      cy.get('@popover').should('not.be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
      cy.get('@trigger').click();
      cy.get('@popover').should('be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
      cy.get('@popover').within(() => {
        cy.get('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
          .first()
          .then($el => {
            // ensure at least one focusable element exists
            expect($el.length).to.be.greaterThan(0);

            // check that it has focus
            cy.focused().should('have.get', $el.get(0));
          });
      });
      // Void click light dismiss does not work in cypress for closing
    });

    it('should show up when clicking on a nested element inside the trigger', () => {
      // Modify trigger by adding a nested span
      cy.get('@trigger').then($trigger => {
        const originalText = $trigger.text();
        $trigger.html(`<span class="nested-element">${originalText}</span>`);
      });

      cy.get('@popover').should('not.be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
      cy.get('.nested-element').click();
      cy.get('@popover').should('be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
      cy.get('.btn-close').click();
      cy.get('@popover').should('not.be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });

    it('should show up when clicking on a deeply nested element inside the trigger', () => {
      // Set up a trigger with a deeply nested structure
      cy.get('@trigger').then($trigger => {
        const originalText = $trigger.text();
        $trigger.html(`
            <div class="level-1">
              <div class="level-2">
                <span class="level-3">${originalText}</span>
              </div>
            </div>
          `);
      });

      cy.get('@popover').should('not.be.visible');
      cy.get('.level-3').click();
      cy.get('@popover').should('be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should close on X click', () => {
      cy.get('@trigger').click();
      cy.get('@popover').should('be.visible');
      cy.get('.btn-close').click();
      cy.get('@popover').should('not.be.visible');
    });

    it('should open on enter', () => {
      cy.get('@popover').should('not.be.visible');
      cy.get('@trigger').focus().type('{enter}');
      cy.get('@popover').should('be.visible');
    });

    it('should open and close with the API', () => {
      Promise.all([cy.get('@trigger'), cy.get('@popover')])
        .then(
          ([$trigger, $popover]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
            $trigger.get(0),
            $popover.get(0),
          ],
        )
        .then(([trigger, popover]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
          cy.get('@popover').should('not.be.visible');
          popover.show(trigger);
          cy.get('@popover').should('be.visible');
          popover.hide();
          cy.get('@popover').should('not.be.visible');
          popover.toggle(trigger);
          cy.get('@popover').should('be.visible');
          popover.toggle(trigger);
          cy.get('@popover').should('not.be.visible');
        });
    });

    it('should switch position', () => {
      cy.get('post-popover').invoke('attr', 'placement', 'top');
      cy.get('@popover').should('not.be.visible');

      Promise.all([cy.get('@trigger'), cy.get('@popover')])
        .then(
          ([$trigger, $popover]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
            $trigger.get(0),
            $popover.get(0),
          ],
        )
        .then(([trigger, popover]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
          const t = trigger.getBoundingClientRect();
          const p = popover.getBoundingClientRect();
          expect(t.top < p.top);
        });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-popover.test.html');

      // Ensure the component is hydrated, which is necessary to ensure the component is ready for interaction
      cy.get('post-popover[data-hydrated]');

      // Aria-expanded is set by the web component, therefore it's a good measure to indicate the component is ready

      cy.get('post-popover-trigger[data-hydrated][for="popover-one"]').as('trigger');

      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-popover');
    });
  });
});
