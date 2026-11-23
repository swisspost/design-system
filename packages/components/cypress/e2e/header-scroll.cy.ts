import 'cypress-real-events';
import {
  HEADER_ID,
  focusFirstMainNavigationLink,
  getScrollMax,
  getScrollTopProperty,
  scrollAndWait,
} from './helper/header';

const HEADER_CONFIGS = [
  'portal',
  'microsite',
  'one-pager',
  'application',
  'application-with-side-navigation',
];
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

  // Header with global header slots only (no main-nav and no title), not documented as a variant
  describe('global header only', () => {
    const getLogoHeight = () =>
      cy
        .get('@header')
        .find('post-logo')
        .then($logo => $logo[0].getBoundingClientRect().height);

    beforeEach(() => {
      cy.visit(`/iframe.html?id=${HEADER_ID}--portal`);
      cy.get('post-header').as('header');
      cy.get('@header').should('have.attr', 'data-hydrated');

      cy.get('@header')
        .find('[slot="main-nav"]')
        .then($mainNav => $mainNav.remove());
      cy.get('@header').find('[slot="main-nav"], [slot="title"]').should('not.exist');
      cy.get('@header').find('[slot="audience"], [slot="post-login"]').should('exist');
    });

    Object.keys(VIEWPORTS).forEach(viewportName => {
      it(`should not reduce the header on ${viewportName}`, () => {
        cy.viewport(VIEWPORTS[viewportName]);

        getScrollMax().should('be.lessThan', 2);
        getLogoHeight().then(expandedLogoHeight => {
          scrollAndWait(300);
          getScrollTopProperty().should('eq', '0px');
          getLogoHeight().should('eq', expandedLogoHeight);
        });
      });
    });
  });

  // Frameworks may keep the header of the previous route in the DOM with display: none
  describe('hidden duplicate header', () => {
    beforeEach(() => {
      cy.visit(`/iframe.html?id=${HEADER_ID}--portal`);
      cy.get('post-header').as('header');
      cy.get('@header').should('have.attr', 'data-hydrated');
      cy.viewport(VIEWPORTS.desktop);

      cy.get('@header').then($header => {
        const hiddenHeader = $header[0].cloneNode(true) as HTMLElement;
        hiddenHeader.removeAttribute('data-hydrated');
        hiddenHeader.removeAttribute('data-hidden');
        hiddenHeader.style.display = 'none';
        $header[0].before(hiddenHeader);
        $header.find('[slot="main-nav"]').remove();
      });
      cy.get('post-header').should('have.length', 2);
      cy.get('post-header[data-hidden]').should('have.length', 1);
    });

    it('should not reduce the visible header because of the hidden header main-nav', () => {
      cy.get('post-header:not([data-hidden])').as('visibleHeader');
      cy.get('@visibleHeader')
        .find('post-logo')
        .then($logo => {
          const expandedLogoHeight = $logo[0].getBoundingClientRect().height;

          scrollAndWait(300);
          getScrollTopProperty().should('eq', '0px');
          cy.get('@visibleHeader')
            .find('post-logo')
            .should($l => expect($l[0].getBoundingClientRect().height).to.eq(expandedLogoHeight));
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

    // the header only collapses on desktop
    // the page is loaded at that size, so the header doesn't depend on a device change event while it is detached
    it(
      'should keep the scroll position on keyboard focus after reattaching header',
      { viewportWidth: 1920, viewportHeight: 1080 },
      () => {
        scrollAndWait(500);

        removeAndReattachHeader();
        cy.get('@header').should('have.attr', 'data-hydrated');

        // removing the header shortens the page, the scroll position may have changed in the meantime
        cy.window().then(win => {
          const scrollY = win.scrollY;

          focusFirstMainNavigationLink();
          cy.get('@header').should('not.have.attr', 'data-expanded');

          cy.realPress(['Shift', 'Tab']);

          cy.get('@header').should('have.attr', 'data-expanded');
          cy.window().its('scrollY').should('equal', scrollY);
        });
      },
    );
  });
});
