describe('popovercontainer', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    const selector = isPopoverSupported() ? ':popover-open' : '.\\:popover-open';

    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-popover.test.html');

      // Ensure the component is hydrated, which is necessary to ensure the component is ready for interaction
      cy.get('post-popover[data-hydrated]').as('popover');

      // Aria-expanded is set by the web component, therefore it's a good measure to indicate the component is ready
      cy.get('post-popover-trigger[data-hydrated][for="popover-one"]')
        .children()
        .first()
        .as('trigger');

      cy.get('#testtext').as('content');
    });

    it('should show up on click', () => {
      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');
      cy.get('@trigger').click();
      cy.get('@content').should('be.visible');
      cy.get(selector).should('exist');
      // Light dismiss does not work with cypress triggers
      cy.get('post-closebutton').first().click();
      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');
    });

    it('should listen to API calls', () => {
      cy.get(selector).should('not.exist');
      Promise.all([cy.get('@trigger'), cy.get('@popover')])
        .then(
          ([$trigger, $popover]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
            $trigger.get(0),
            $popover.get(0),
          ],
        )
        .then(async ([trigger, popover]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
          await popover.show(trigger);
          cy.get('@content').should('be.visible');
          cy.get(selector).should('exist');
          await popover.hide();
          cy.get('@content').should('not.be.visible');
          cy.get(selector).should('not.exist');
          await popover.toggle(trigger);
          cy.get('@content').should('be.visible');
          cy.get(selector).should('exist');
          await popover.toggle(trigger);
          cy.get('@content').should('not.be.visible');
          cy.get(selector).should('not.exist');
        });
    });
  });
});

export function isPopoverSupported() {
  return (
    typeof HTMLElement !== 'undefined' &&
    typeof HTMLElement.prototype === 'object' &&
    'popover' in HTMLElement.prototype
  );
}
