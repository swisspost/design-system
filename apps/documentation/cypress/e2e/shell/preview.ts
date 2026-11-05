/**
 * Helpers for the shell specs, which run against the built documentation (`pnpm preview`, one origin).
 */

export const BUTTON_DOCS_ID = 'eb78afcb-ce92-4990-94b6-6536d5ec6af4--docs';
export const BUTTON_STORY_ID = 'eb78afcb-ce92-4990-94b6-6536d5ec6af4--default';

/**
 * Answers the Google Tag Manager request with an empty script: the specs must not send analytics,
 * and the CSP intercept in `cypress/support/e2e.ts` fails a test when the request cannot be made.
 * The shell still pushes its entries to `window.dataLayer`.
 */
export function stubAnalytics() {
  cy.intercept('https://www.googletagmanager.com/**', { statusCode: 200, body: '' });
}

/**
 * The body of the embedded preview, once it has rendered the docs page with the given heading.
 */
export function getPreviewBody(heading: string) {
  return cy
    .get<HTMLIFrameElement>('#storybook-preview-iframe')
    .its('0.contentDocument.body')
    .should(body => {
      // the docs root; Storybook's hidden "No Preview" message has an h1 too
      expect(body.querySelector('#storybook-docs h1')?.textContent).to.contain(heading);
    })
    .then(body => cy.wrap(body as HTMLElement));
}

/**
 * Waits until the shell shows the rendered page (the loading cover is gone).
 */
export function waitForPreview() {
  cy.get('#storybook-preview-iframe').should('have.attr', 'data-is-loaded', 'true');
  cy.get('docs-preview').should('not.have.attr', 'loading');
}

/**
 * Opens a section of the navigation (they start collapsed), e.g. `openSection('sidebar', 'components')`.
 * `tree` is the id prefix of the tree: `sidebar` (desktop) or `sheet` (mobile panel).
 */
export function openSection(tree: 'sidebar' | 'sheet', section: string) {
  cy.get(`post-collapsible-trigger[for="${tree}-${section}"] button`).click();
  cy.get(`#${tree}-${section}`).should('not.have.attr', 'data-animating');
}

/**
 * Marks the window, so a spec can check that a navigation did not reload the shell.
 */
export function markWindow() {
  cy.window().then(win => ((win as unknown as Record<string, boolean>).__shellMarker = true));
}

export function expectSameWindow() {
  cy.window().its('__shellMarker').should('equal', true);
}

/**
 * Clicks a link to `href` in the shell, as a link on the page would (e.g. to open an unknown page).
 */
export function clickLink(href: string) {
  cy.document().then(doc => {
    const link = doc.createElement('a');
    link.href = href;
    doc.body.append(link);
    link.click();
    link.remove();
  });
}
