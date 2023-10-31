describe('popovercontainer', () => {
  describe('default', () => {
    let selector = isPopoverSupported() ? ':popover-open' : '.\\:popover-open';

    beforeEach(() => {
      // There is no dedicated docs page for the popovercontainer
      cy.getComponent('popover');
      cy.get('[data-popover-target="popover-one"][aria-expanded]').as('trigger');
      cy.get('post-popovercontainer').as('container');
    });

    it('should show up on click', () => {
      cy.get('@container').should('not.be.visible');
      cy.get(selector).should('not.exist');
      cy.get('@trigger').click();
      cy.get('@container').should('be.visible');
      cy.get(selector).should('exist');
      // Light dismiss does not work with cypress triggers
      cy.get('.btn-close').click();
      cy.get('@container').should('not.be.visible');
      cy.get(selector).should('not.exist');
    });

    it('should listen to API calls', () => {
      cy.get('@container').should('not.be.visible');
      cy.get(selector).should('not.exist');
      Promise.all([cy.get('@trigger'), cy.get('@container')])
        .then(
          ([$trigger, $container]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
            $trigger.get(0),
            $container.get(0),
          ],
        )
        .then(async ([trigger, container]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
          await container.show(trigger);
          cy.get('@container').should('be.visible');
          cy.get(selector).should('exist');
          await container.hide();
          cy.get('@container').should('not.be.visible');
          cy.get(selector).should('not.exist');
          await container.toggle(trigger);
          cy.get('@container').should('be.visible');
          cy.get(selector).should('exist');
          await container.toggle(trigger);
          cy.get('@container').should('not.be.visible');
          cy.get(selector).should('not.exist');
        });
    });
  });
});

function isPopoverSupported() {
  return (
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype === 'object' &&
    'popover' in HTMLElement.prototype
  );
}
