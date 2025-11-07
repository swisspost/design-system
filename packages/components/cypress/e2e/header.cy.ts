const HEADER_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498';
const TEST_FILES = ['post-header', 'post-header-without-title'];
const VIEWPORTS: Record<string, Cypress.ViewportPreset>= {
  desktop: 'macbook-15',
  tablet: 'ipad-2',
  mobile: 'iphone-6',
};

describe('header', () => {
  function getContentTop() {
    return cy.get('main').then($main => Math.round($main.position().top));
  }

  function checkLayoutShift() {
    cy.get('@header').should('exist');

    // get the content position before the header is visible
    let initialContentTop: number;
    getContentTop().then(pos => {
      initialContentTop = pos;
      cy.get('@header').should('not.be.visible');
    });

    // check the content position did not change when the header is visible
    cy.get('@header')
      .should('be.visible')
      .then(() => {
        getContentTop().should('eq', initialContentTop);
      });
  }

  TEST_FILES.forEach(testFile => {
    Object.entries(VIEWPORTS).forEach(([viewportName, viewportPreset]) => {
      describe(testFile.replaceAll('-', ' '), { baseUrl: null }, () => {
        beforeEach(() => {
          cy.viewport(viewportPreset);
          cy.visit(`./cypress/fixtures/${testFile}.test.html`);
          cy.get('post-header').as('header');
        });

        it(`should not shift layout on ${viewportName}`, () => {
          checkLayoutShift();
        });
      });
    });
  });

  describe('React Navigation', { viewportHeight: 1000, viewportWidth: 400 }, () => {
    beforeEach(() => {
      cy.getComponent('header', HEADER_ID);
    });

    // Function to remove and reattach the header
    const removeAndReattachHeader = () => {
      cy.get('@header').then($header => {
        const headerElement = $header[0];
        headerElement.remove();
        cy.document().then(doc => {
          doc.body.prepend(headerElement);
        });
      });
    };

    it('should close mobile nav menu after reattaching header', () => {
      cy.get('div.local-header-mobile-extended').should('not.exist');
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('exist');

      removeAndReattachHeader();

      cy.get('div.local-header-mobile-extended').should('not.exist');
    });

    it('should release scroll lock after reattaching header', () => {
      cy.get('[data-post-scroll-locked]').should('not.exist');
      cy.get('post-togglebutton').click();
      cy.get('[data-post-scroll-locked]').should('exist');

      removeAndReattachHeader();

      cy.get('[data-post-scroll-locked]').should('not.exist');
    });

    it('should close both megadropdown and mobile menu with one click', () => {
      // Open mobile menu
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('exist');
      // Open megadropdown
      cy.get('post-megadropdown-trigger').first().click();
      cy.get('post-megadropdown .megadropdown-container').should('be.visible');
      // Click menu button to close both
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('not.exist');
      cy.get('post-megadropdown .megadropdown-container').should('not.be.visible');
    });

    it('should animate megadropdown open after forced close', () => {
      // Open mobile menu and megadropdown
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('exist');
      cy.get('post-megadropdown-trigger').first().should('be.visible').click();
      cy.get('post-megadropdown .megadropdown-container').should('be.visible');

      // Force close by toggling menu
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('not.exist');
      cy.get('post-megadropdown .megadropdown-container').should('not.be.visible');

      // Reopen mobile menu before clicking the trigger again
      cy.get('post-togglebutton').click();
      cy.get('div.local-header-mobile-extended').should('exist');
      cy.get('post-megadropdown-trigger').first().should('be.visible').click();

      // Check if animation class is present
      cy.get('post-megadropdown .megadropdown-container')
        .should('be.visible')
        .should('have.class', 'slide-in');
    });

    it('should update active class when active link changes within the same or different megadropdown', () => {
      cy.get('post-megadropdown#letters a[href="/sch"]').first().as('lettersFirstLink');
      cy.get('post-megadropdown#letters a[href="/kl"]').first().as('lettersSecondLink');
      cy.get('post-megadropdown#packages a[href="/sch"]').first().as('packagesLink');

      cy.get('post-megadropdown-trigger button').first().as('lettersTrigger');
      cy.get('post-megadropdown-trigger button').eq(1).as('packagesTrigger');

      // Activate first link
      cy.get('@lettersFirstLink').then($link => $link.attr('aria-current', 'page'));
      cy.get('@lettersFirstLink').should('have.attr', 'aria-current', 'page');
      cy.get('@lettersTrigger').should('have.class', 'active');
      cy.get('@packagesTrigger').should('not.have.class', 'active');

      // Move active link within the same megadropdown
      cy.get('@lettersFirstLink').then($link => $link.removeAttr('aria-current'));
      cy.get('@lettersSecondLink').then($link => $link.attr('aria-current', 'page'));

      cy.get('@lettersTrigger').should('have.class', 'active');
      cy.get('@packagesTrigger').should('not.have.class', 'active');

      // Move active link to a different megadropdown
      cy.log('Change active link to a different megadropdown');
      cy.get('@lettersSecondLink').then($link => $link.removeAttr('aria-current'));
      cy.get('@packagesLink').then($link => $link.attr('aria-current', 'page'));

      cy.get('@lettersTrigger').should('not.have.class', 'active');
      cy.get('@packagesTrigger').should('have.class', 'active');
    });
  });

  describe('Accessibility', { baseUrl: null }, () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-header.test.html');
      cy.get('post-header[data-hydrated]').should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-mainnavigation');
    });
  });
});
