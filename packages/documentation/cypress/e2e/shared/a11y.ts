interface IA11yOptions {
  storyName: string;
  storySelector: string;
  /**
   * Optional filter function to determine which color schemes to test.
   * By default, both schemes are tested.
   * @param scheme values from SCHEMES const below
   * @returns boolean
   */
  schemesFilter?: (scheme: string) => boolean;
  /**
   * Optional filter function to determine which color schemes implementation method to test.
   * By default, both methods are tested.
   * @param method values from METHODS const below
   * @returns boolean
   */
  methodsFilter?: (method: string) => boolean;
}

const SCHEMES = ['light', 'dark'];
const METHODS = ['preferred', 'forced'];

export function addA11yTests({
  storyName,
  storySelector,
  schemesFilter = () => true,
  methodsFilter = () => true,
}: IA11yOptions) {
  describe('Accessibility', () => {
    SCHEMES.filter(schemesFilter).forEach(scheme => {
      METHODS.filter(methodsFilter).forEach(method => {
        // Parts of this test (Cypress.automation()) are dependent on the Chrome DevTools Protocol (CDP - https://chromedevtools.github.io/devtools-protocol/)
        // and therefore only work in Chromium-based browsers. These parts are skipped in other browsers.
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
