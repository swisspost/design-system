describe('popover', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('popup');
      // Aria-expanded is set by the web component, therefor it's a good measure to indicate the component is ready
      cy.get('[data-popup-target="popup-one"][aria-expanded]', { timeout: 30000 }).as('trigger');
      cy.get('#popup-one.hydrated').as('popup');
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

    // Light dismiss with esc does not work in cypress apparently
    /* it('should close on esc', () => {
      cy.get('@popover').should('not.be.visible');
      cy.get('@trigger').click();
      cy.get('@popover').should('be.visible');
      cy.get('@trigger').focus().type('{esc}');
      cy.get('@popover').should('not.be.visible');
    }); */

    it('should open and close with the API', () => {
      Promise.all([cy.get('@trigger'), cy.get('@popover')])
        .then(([$trigger, $popup]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
          $trigger.get(0),
          $popup.get(0),
        ])
        .then(([trigger, popup]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
          cy.get('@popover').should('not.be.visible');
          popup.show(trigger);
          cy.get('@popover').should('be.visible');
          popup.hide();
          cy.get('@popover').should('not.be.visible');
          popup.toggle(trigger);
          cy.get('@popover').should('be.visible');
          popup.toggle(trigger);
          cy.get('@popover').should('not.be.visible');
        });
    });

    it('should switch position', () => {
      cy.get('@popover').invoke('attr', 'placement', 'top').should('not.be.visible');
      cy.get('@trigger').click();
      cy.get('@popover').find('[popover]').should('have.css', 'top', '76px');
    });
  });
});
