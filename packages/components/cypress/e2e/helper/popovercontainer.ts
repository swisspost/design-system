/**
 * Returns a CSS selector that matches an open popover element.
 * Uses a combined selector to cover both:
 *  - Native popover support (:popover-open)
 *  - The popover polyfill (.\:popover-open class)
 *
 * Note: This function runs in the Cypress runner (Node.js), where CSS.supports
 * is not available, so we cannot feature-detect at import time.
 */
export function getPopoverOpenSelector(): string {
  return String.raw`:popover-open, .\:popover-open`;
}
