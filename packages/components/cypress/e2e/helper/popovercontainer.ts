import { getBoundingRect } from '../utils/element';

const OPEN_SELECTOR = String.raw`post-popovercontainer:popover-open, post-popovercontainer.\:popover-open`;

export function preparePopoverContext(id: string) {
  cy.visit('./cypress/fixtures/post-popovercontainer.html');

  cy.get(`#popover-${id}[data-hydrated]`).as('popover');
  cy.get(`#popover-${id}-trigger[data-hydrated]`).children().first().as('trigger');
  cy.get(`#popover-${id}-content`).as('content');

  popoverShouldBeClosed();
}

export function popoverShouldBeOpen() {
  cy.get('@popover').find(OPEN_SELECTOR).should('exist');
  cy.get('@content').should('be.visible');
}

export function popoverShouldBeClosed() {
  cy.get('@popover').find(OPEN_SELECTOR).should('not.exist');
  cy.get('@content').should('not.be.visible');
}

export const getPopoverElement = () => cy.get<JQuery<HTMLPostPopoverElement>>('@popover').its(0);
export const getTriggerElement = () => cy.get<JQuery<HTMLButtonElement>>('@trigger').its(0);

type ScrollPosition = 'above' | 'below' | 'across';

function getTriggerScrollDistance(position: ScrollPosition, y: number) {
  return getBoundingRect('@trigger').then(rect => {
    if (position === 'above') return rect.bottom - y + 1;
    if (position === 'below') return rect.top - y - 1;
    return rect.top + rect.height / 2 - y;
  });
}

export function scrollTrigger(position: ScrollPosition, y: number) {
  getTriggerScrollDistance(position, y).then(distance => {
    cy.window().then(window => cy.scrollTo(0, window.scrollY + distance));
  });
}

export function scrollTriggerWithin(selector: string, position: ScrollPosition, y: number) {
  getTriggerScrollDistance(position, y).then(distance => {
    cy.get(selector)
      .its(0)
      .then(element => cy.get(selector).scrollTo(0, element.scrollTop + distance));
  });
}
