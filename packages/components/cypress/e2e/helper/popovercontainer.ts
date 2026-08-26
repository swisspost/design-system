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

export function getPopoverElement() {
  return cy.get<JQuery<HTMLPostPopoverElement>>('@popover').its(0);
}

export function getTriggerElement() {
  return cy.get<JQuery<HTMLButtonElement>>('@trigger').its(0);
}

export function getHeaderBoundingRect() {
  return cy
    .get('post-header')
    .its(0)
    .then(element => element.getBoundingClientRect());
}

export function scrollTrigger(position: 'above' | 'across' | 'below', y: number) {
  cy.get('@trigger').then($trigger => {
    const { top, bottom, height } = $trigger.get(0).getBoundingClientRect();

    // Scrolling down by a positive distance moves the trigger up by the same distance
    const distance = {
      above: bottom - y + 1,
      across: top + height / 2 - y,
      below: top - y - 1,
    }[position];

    cy.window().then(win => cy.scrollTo(0, Math.max(win.scrollY + distance, 0)));
  });
}
