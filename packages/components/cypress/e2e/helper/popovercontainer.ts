import { getBoundingRect } from '../utils/element';

/**
 * A CSS selector that matches an open popover element.
 *
 * Uses a combined selector to cover:
 *  - native popover support (:popover-open);
 *  - the popover polyfill (.\:popover-open class).
 *
 * Note: This function runs in the Cypress runner (Node.js), where CSS.supports is not available,
 * so we cannot feature-detect at import time.
 */
export const POPOVER_OPEN_SELECTOR = String.raw`post-popovercontainer:popover-open, post-popovercontainer.\:popover-open`;

/**
 * Visits the popover fixture and aliases the elements of one of its popover setups.
 *
 * Registers the following aliases, all derived from `id`:
 *  - `@popover`: the `post-popover` element, once hydrated
 *  - `@trigger`: the button rendered inside the `post-popover-trigger` element, once hydrated
 *  - `@content`: the content projected into the popover
 *
 * Asserts that the popover starts out closed, so every test begins from a known state.
 */
export function preparePopoverContext(id: string) {
  cy.visit('./cypress/fixtures/post-popovercontainer.html');

  cy.get(`#popover-${id}[data-hydrated]`).as('popover');
  cy.get(`#popover-${id}-trigger[data-hydrated]`).children().first().as('trigger');
  cy.get(`#popover-${id}-content`).as('content');

  popoverShouldBeClosed();
}

/**
 * Asserts that `@popover` is open, and its `@content` is visible.
 */
export function popoverShouldBeOpen() {
  cy.get('@popover').find(POPOVER_OPEN_SELECTOR).should('exist');
  cy.get('@content').should('be.visible');
}

/**
 * Asserts that `@popover` is closed, and its `@content` is not visible.
 */
export function popoverShouldBeClosed() {
  cy.get('@popover').find(POPOVER_OPEN_SELECTOR).should('not.exist');
  cy.get('@content').should('not.be.visible');
}

/** Yields the `post-popover` DOM element for `@popover`. */
export const getPopoverElement = () => cy.get<JQuery<HTMLPostPopoverElement>>('@popover').its(0);

/** Yields the DOM element for `@trigger`. */
export const getTriggerElement = () => cy.get<JQuery<HTMLButtonElement>>('@trigger').its(0);

/**
 * Specifies where `@trigger` should end up relative to a horizontal line after scrolling.
 */
type ScrollPosition = 'above' | 'below' | 'across';

/**
 * Computes the distance the page or a container has to be scrolled to move `@trigger` to the
 * requested `position` relative to the line at viewport coordinate `y`.
 */
function getTriggerScrollDistance(position: ScrollPosition, y: number) {
  return getBoundingRect('@trigger').then(rect => {
    if (position === 'above') return rect.bottom - y + 1;
    if (position === 'below') return rect.top - y - 1;
    return rect.top + rect.height / 2 - y;
  });
}

/**
 * Scrolls the window to move `@trigger` to the requested `position` relative to the line at
 * viewport coordinate `y`.
 */
export function scrollTrigger(position: ScrollPosition, y: number) {
  getTriggerScrollDistance(position, y).then(distance => {
    cy.window().then(window => cy.scrollTo(0, window.scrollY + distance));
  });
}

/**
 * Scrolls the container matched by `selector` to move `@trigger` to the requested `position`
 * relative to the line at viewport coordinate `y`.
 */
export function scrollTriggerWithin(selector: string, position: ScrollPosition, y: number) {
  getTriggerScrollDistance(position, y).then(distance => {
    cy.get(selector)
      .its(0)
      .then(element => cy.get(selector).scrollTo(0, element.scrollTop + distance));
  });
}
