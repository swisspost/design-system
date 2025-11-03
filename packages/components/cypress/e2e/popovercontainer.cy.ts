describe('popovercontainer', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    const selector = isPopoverSupported() ? ':popover-open' : '.\\:popover-open';

    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-popover.test.html');

      // Ensure the component is hydrated, which is necessary to ensure the component is ready for interaction
      cy.get('post-popover[data-hydrated]');

      // Aria-expanded is set by the web component, therefore it's a good measure to indicate the component is ready
      cy.get('post-popover-trigger[data-hydrated][for="popover-one"]')
        .children()
        .first()
        .as('trigger');

      cy.get('#testtext').as('container');
    });

    it('should show up on click', () => {
      cy.get('@container').should('not.be.visible');
      cy.get(selector).should('not.exist');
      cy.get('@trigger').click();
      cy.get('@container').should('be.visible');
      cy.get(selector).should('exist');
      // Light dismiss does not work with cypress triggers
      cy.get('post-closebutton').click();
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
