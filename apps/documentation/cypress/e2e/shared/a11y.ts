/**
 * Adds accessibility tests for a snapshot URL (e.g. http://localhost:9000/iframe.html?id=snapshots--{storyName}).
 *
 * @param {IA11yOptions} options - Configuration options for the accessibility tests.
 * @param {string} options.storyName - The name of the story to test.
 * @param {string} options.storySelector - The CSS selector for the story element.
 * @param {(scheme: string) => boolean} [options.filterSchemes] - Optional filter function to determine which color schemes to test.
 * By default, all schemes are tested. The `scheme` parameter can be one of the values from the `testSchemes` enum.
 * @param {(method: string) => boolean} [options.filterMethods] - Optional filter function to determine which implementation methods to test.
 * By default, all methods are tested. The `method` parameter can be one of the values from the `testMethods` enum.
 *
 * @example
 * ```typescript
 * import { testMethods, addA11yTests } from '../shared/a11y';
 *
 * addA11yTests({
 *   storyName: 'button-group',
 *   storySelector: '.btn-group',
 *   filterMethods: method => method === testMethods.Forced,
 * });
 * ```
 *
 * @remarks
 * This function uses Cypress for end-to-end testing and relies on the Chrome DevTools Protocol (CDP) for certain features.
 * These features are only supported in Chromium-based browsers. Non-Chromium browsers will skip parts of the test.
 *
 * The tests check for accessibility violations using the `axe-core` library, ensuring that the component adheres to WCAG standards.
 *
 * @see {@link https://chromedevtools.github.io/devtools-protocol/ | Chrome DevTools Protocol}
 * @see {@link https://www.deque.com/axe/ | axe-core}
 */

export interface IA11yOptions {
  storyName: string;
  storySelector: string;
  filterSchemes?: (scheme: string) => boolean;
  filterMethods?: (method: string) => boolean;
}

export enum testSchemes {
  Light = 'light',
  Dark = 'dark',
}
export enum testMethods {
  Preferred = 'preferred',
  Forced = 'forced',
}

const SCHEMES = Object.values(testSchemes);
const METHODS = Object.values(testMethods);

export function addA11yTests({
  storyName,
  storySelector,
  filterSchemes = () => true,
  filterMethods = () => true,
}: IA11yOptions) {
  describe('Accessibility', () => {
    SCHEMES.filter(filterSchemes).forEach(scheme => {
      METHODS.filter(filterMethods).forEach(method => {
        const runTest = method === 'forced' || Cypress.browser.family === 'chromium';

        if (runTest) {
          describe(`${scheme}-${method}`, () => {
            beforeEach(() => {
              cy.visit(`/iframe.html?id=snapshots--${storyName}`);
              cy.get('[data-color-scheme]').as('color-scheme');

              if (method === 'forced') {
                cy.get('@color-scheme').invoke('attr', 'data-color-scheme', scheme);
              } else {
                cy.get('@color-scheme').invoke('removeAttr', 'data-color-scheme');
                cy.wrap(
                  Cypress.automation('remote:debugger:protocol', {
                    command: 'Emulation.setEmulatedMedia',
                    params: {
                      media: 'page',
                      features: [
                        {
                          name: 'prefers-color-scheme',
                          value: scheme,
                        },
                      ],
                    },
                  }),
                );
              }

              cy.get(storySelector, { timeout: 30000 }).should('be.visible');
              cy.injectAxe();
            });

            it('Has no detectable a11y violations', () => {
              cy.checkA11y('#root-inner');
            });
          });
        }
      });
    });
  });
}
