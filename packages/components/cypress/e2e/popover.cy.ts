describe('popover', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-popover.test.html');
      // Aria-expanded is set by the web component, therefore it's a good measure to indicate the component is ready
      cy.get('[data-popover-target="popover-one"][aria-expanded]').as('trigger');
      cy.get('div.popover-container').as('popover');
    });

    it('should show up on click', () => {
      cy.get('@popover').should('not.be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
      cy.get('@trigger').click();
      cy.get('@popover').should('be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
      // Void click light dismiss does not work in cypress for closing
    });

    it('should close on X click', () => {
      cy.get('@trigger').click();
      cy.get('@popover').should('be.visible');
      cy.get('.btn-close').click();
      cy.get('@popover').should('not.be.visible');
    });

    it('should open and close on enter', () => {
      cy.get('@popover').should('not.be.visible');
      cy.get('@trigger').focus().type('{enter}');
      cy.get('@popover').should('be.visible');
      cy.get('@trigger').type('{enter}');
      cy.get('@popover').should('not.be.visible');
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
      cy.get('post-popover').invoke('attr', 'placement', 'top').should('not.be.visible');
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
      // Aria-expanded is set by the web component, therefore it's a good measure to indicate the component is ready
      cy.get('[data-popover-target="popover-one"][aria-expanded]').as('trigger');

      cy.injectAxe();
    });

    it.only('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-popover');
    });
  });
});
