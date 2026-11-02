import { getBoundingRect } from '../utils/element';
import { Side } from '@floating-ui/utils';

const TOLERANCE = 1;

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
 * Aliases the elements of one of the popover setups in the currently visited fixture.
 *
 * Registers the following aliases, all derived from `id`:
 *  - `@popover`: the `post-popover` element, once hydrated
 *  - `@popovercontainer`: the `post-popovercontainer` element rendered by `@popover`
 *  - `@anchor`: the button rendered inside the `post-popover-trigger` element, once hydrated
 *  - `@content`: the content projected into the popover
 *
 * Asserts that the popover starts out closed, so every test begins from a known state.
 */
export function preparePopoverContext(id: string) {
  cy.get(`#popover-${id}[data-hydrated]`).as('popover');
  cy.get('@popover').find('post-popovercontainer').as('popovercontainer');
  cy.get(`#popover-${id}-trigger[data-hydrated]`).children().first().as('anchor');
  cy.get(`#popover-${id}-content`).as('content');

  popoverShouldBeClosed();
}

/** Yields the `post-popovercontainer` DOM element for `@popovercontainer`. */
export const getPopovercontainerElement = () =>
  cy.get<JQuery<HTMLPostPopovercontainerElement>>('@popovercontainer').its(0);

/** Yields the `post-popover` DOM element for `@popover`. */
export const getPopoverElement = () => cy.get<JQuery<HTMLPostPopoverElement>>('@popover').its(0);

/** Yields the DOM element for `@anchor`. */
export const getAnchorElement = () => cy.get<JQuery<HTMLButtonElement>>('@anchor').its(0);

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

/**
 * Asserts that `@popover` is positioned on the given `side` of `@anchor`.
 */
export function popoverShouldBeOnSide(side: Side) {
  getAnchorElement().then(anchor => {
    getPopovercontainerElement().should(popover => {
      const anchorRect = anchor.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();

      if (side == 'top') {
        expect(popoverRect.bottom).to.be.lessThanOrEqual(anchorRect.top + TOLERANCE);
      } else if (side == 'bottom') {
        expect(popoverRect.top).to.be.greaterThanOrEqual(anchorRect.bottom - TOLERANCE);
      } else if (side == 'left') {
        expect(popoverRect.right).to.be.lessThanOrEqual(anchorRect.left + TOLERANCE);
      } else if (side == 'right') {
        expect(popoverRect.left).to.be.greaterThanOrEqual(anchorRect.right - TOLERANCE);
      }
    });
  });

  cy.get('@popovercontainer').find('.arrow').should('have.attr', 'data-side', side);
}

/**
 * Asserts that `@popover` fits within the safe area of the viewport, respecting its `edgeGap`.
 */
export function popoverShouldFitInViewport() {
  cy.window().then(window => {
    const { clientWidth, clientHeight } = window.document.documentElement;

    getBoundingRect('post-header').then(headerRect => {
      getPopovercontainerElement().should(popover => {
        const padding = popover.edgeGap ?? 0;
        const popoverRect = popover.getBoundingClientRect();

        expect(popoverRect.top, 'top').to.be.at.least(headerRect.bottom + padding - TOLERANCE);
        expect(popoverRect.left, 'left').to.be.at.least(padding - TOLERANCE);
        expect(popoverRect.bottom, 'bottom').to.be.at.most(clientHeight - padding + TOLERANCE);
        expect(popoverRect.right, 'right').to.be.at.most(clientWidth - padding + TOLERANCE);
      });
    });
  });
}

/**
 * Asserts that the scrollable container of `@popover` overflows, and that its `@content` can be
 * fully revealed by scrolling it to the end.
 */
export function popoverShouldScrollInternally(selector: string) {
  cy.get(selector)
    .its(0)
    .should(element => {
      expect(element.scrollHeight, 'scrollHeight').to.be.greaterThan(element.clientHeight);
    });

  cy.get(selector).scrollTo('bottom', { ensureScrollable: true });

  getBoundingRect(selector).then(scrollableRect => {
    getBoundingRect('@content').then(contentRect => {
      expect(contentRect.bottom, 'bottom').to.be.at.most(scrollableRect.bottom + 1);
    });
  });
}

/**
 * Specifies where `@anchor` should end up relative to a horizontal line after scrolling.
 */
export type ScrollPosition = 'above' | 'below' | 'across';

/**
 * Computes the distance the page or a container has to be scrolled to move `@anchor` to the
 * requested `position` relative to the line at viewport coordinate `y`.
 */
function getAnchorScrollDistance(position: ScrollPosition, y: number) {
  return getBoundingRect('@anchor').then(rect => {
    if (position === 'above') return rect.bottom - y + 1;
    if (position === 'below') return rect.top - y - 1;
    return rect.top + rect.height / 2 - y;
  });
}

/**
 * Scrolls the window to move `@anchor` to the requested `position` relative to the line at
 * viewport coordinate `y`.
 */
export function scrollAnchor(position: ScrollPosition, y: number) {
  getAnchorScrollDistance(position, y).then(distance => {
    cy.window().then(window => cy.scrollTo(0, window.scrollY + distance));
  });
}

/**
 * Scrolls the container matched by `selector` to move `@anchor` to the requested `position`
 * relative to the line at viewport coordinate `y`.
 */
export function scrollAnchorWithin(selector: string, position: ScrollPosition, y: number) {
  getAnchorScrollDistance(position, y).then(distance => {
    cy.get(selector)
      .its(0)
      .then(element => cy.get(selector).scrollTo(0, element.scrollTop + distance));
  });
}

/**
 * Specifies where `@anchor` should be placed within the safe area of the viewport.
 */
export interface AnchorPosition {
  x?: 'left' | 'center' | 'right';
  y?: 'top' | 'center' | 'bottom';
}

/**
 * Moves `@anchor` to the given `position` within the safe area of the viewport.
 */
export function positionAnchor(position?: AnchorPosition) {
  cy.window().then(window => {
    const { clientWidth, clientHeight } = window.document.documentElement;

    getBoundingRect('post-header').then(headerRect => {
      getAnchorElement().then(anchor => {
        const { width, height } = anchor.getBoundingClientRect();

        let top: number, left: number;

        if (position?.x === 'left') left = 0;
        else if (position?.x === 'right') left = clientWidth - width;
        else left = (clientWidth - width) / 2;

        if (position?.y === 'top') top = headerRect.bottom;
        else if (position?.y === 'bottom') top = clientHeight - height;
        else top = (headerRect.bottom + clientHeight - height) / 2;

        anchor.style.top = `${window.scrollY + top}px`;
        anchor.style.left = `${window.scrollX + left}px`;
      });
    });
  });
}
