const OPEN_SELECTOR = String.raw`post-popovercontainer:popover-open, post-popovercontainer.\:popover-open`;

export function preparePopoverContext(id: string) {
  cy.visit('./cypress/fixtures/post-popovercontainer.html');

  // Ensure the component is hydrated, which is necessary to ensure the component is ready for interaction
  cy.get(`#popover-${id}[data-hydrated]`).as('popover');

  // Aria-expanded is set by the web component, therefore it's a good measure to indicate the component is ready
  cy.get(`#popover-${id}-trigger[data-hydrated]`).children().first().as('trigger');

  cy.get(`#popover-${id}-content`).as('content');
}

export function popoverShouldBeOpen() {
  cy.get('@popover').find(OPEN_SELECTOR).should('exist');
  cy.get('@content').should('be.visible');
}

export function popoverShouldBeClosed() {
  cy.get('@popover').find(OPEN_SELECTOR).should('not.exist');
  cy.get('@content').should('not.be.visible');
}

interface PopoverContext {
  trigger: HTMLButtonElement;
  popover: HTMLPostPopoverElement;
}

export function withPopoverContext(callback: (context: PopoverContext) => Promise<void>) {
  cy.get('@trigger').then($trigger =>
    cy.get('@popover').then($popover =>
      callback({
        trigger: $trigger.get(0) as HTMLButtonElement,
        popover: $popover.get(0) as HTMLPostPopoverElement,
      }),
    ),
  );
}
