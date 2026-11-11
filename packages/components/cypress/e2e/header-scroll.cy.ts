import { HEADER_ID, getScrollMax, getScrollTopProperty, scrollAndWait } from './helper/header';

const HEADER_CONFIGS = ['portal', 'microsite', 'one-pager'];
const VIEWPORTS: Record<string, Cypress.ViewportPreset> = {
  desktop: 'macbook-15',
  tablet: 'ipad-2',
  mobile: 'iphone-6',
};

describe('header', () => {
  HEADER_CONFIGS.forEach(config => {
    describe(config.replace('-', ' '), () => {
      beforeEach(() => {
        cy.visit(`/iframe.html?id=${HEADER_ID}--${config}`);
        cy.get('post-header').as('header');
      });

      Object.entries(VIEWPORTS).forEach(([viewportName, viewportPreset]) => {
        it(`should stop updating the scroll position once fully reduced on ${viewportName}`, () => {
          cy.viewport(viewportPreset);
          cy.get('@header').should('have.attr', 'data-hydrated');

          getScrollMax().then(scrollMax => {
            // the page must be scrollable beyond the max, otherwise the last assertions would pass without testing anything
            cy.document().then(doc => {
              const { scrollHeight, clientHeight } = doc.scrollingElement;
              expect(scrollHeight - clientHeight).to.be.greaterThan(scrollMax + 300);
            });

            if (scrollMax > 1) {
              const below = Math.floor(scrollMax / 2);
              scrollAndWait(below);
              getScrollTopProperty().should('eq', `${below}px`);
            }

            scrollAndWait(scrollMax);
            getScrollTopProperty().should('eq', `${scrollMax}px`);

            scrollAndWait(scrollMax + 300);
            getScrollTopProperty().should('eq', `${scrollMax}px`);

            // a larger value must not change the header, otherwise the scroll max is too small
            // both values are measured synchronously without transitions, so loading content can't change the result
            cy.get('@header').then($header => {
              const header = $header[0];
              const rootStyle = header.ownerDocument.documentElement.style;
              const noTransitions = new header.ownerDocument.defaultView.CSSStyleSheet();
              noTransitions.replaceSync('*, :host { transition: none !important; }');
              header.shadowRoot.adoptedStyleSheets = [
                ...header.shadowRoot.adoptedStyleSheets,
                noTransitions,
              ];

              const getHeaderGeometry = (scrollTop: number) => {
                rootStyle.setProperty('--post-header-scroll-top', `${scrollTop}px`);
                return JSON.stringify(
                  [header, ...header.shadowRoot.querySelectorAll('*')].map(el => {
                    const { top, left, width, height } = el.getBoundingClientRect();
                    return [top, left, width, height].map(n => Math.round(n));
                  }),
                );
              };

              const reducedGeometry = getHeaderGeometry(scrollMax);
              const beyondGeometry = getHeaderGeometry(scrollMax + 300);
              rootStyle.setProperty('--post-header-scroll-top', `${scrollMax}px`);

              expect(beyondGeometry).to.eq(reducedGeometry);
            });
          });
        });
      });
    });
  });

  describe('DOM reattachment', { viewportHeight: 1000, viewportWidth: 400 }, () => {
    beforeEach(() => {
      cy.getComponent('header', HEADER_ID);
    });

    const removeAndReattachHeader = () => {
      cy.get('@header').then($header => {
        const headerElement = $header[0];
        headerElement.remove();
        cy.document().then(doc => {
          doc.body.prepend(headerElement);
        });
      });
    };

    it('should keep updating the scroll position limit after reattaching header', () => {
      removeAndReattachHeader();

      // the header does not shrink on mobile, but it does on desktop
      cy.viewport(1440, 1000);
      cy.get('@header')
        .shadow()
        .find('.scroll-max')
        .should($el => expect($el[0].getBoundingClientRect().width).to.be.greaterThan(1));

      getScrollMax().then(scrollMax => {
        const below = Math.floor(scrollMax / 2);
        scrollAndWait(below);
        getScrollTopProperty().should('eq', `${below}px`);
      });
    });
  });
});
