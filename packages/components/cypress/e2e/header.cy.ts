const HEADER_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498';
const HEADER_CONFIGS = ['portal', 'microsite', 'one-pager'];
const VIEWPORTS: Record<string, Cypress.ViewportPreset> = {
  desktop: 'macbook-15',
  tablet: 'ipad-2',
  mobile: 'iphone-6',
};

describe('header', () => {
  function getContentTop() {
    return cy.get('.container').then($container => Math.round($container.position().top));
  }

  function checkLayoutShift() {
    cy.get('@header').should('exist');

    // get the content position before the header is hydrated
    let initialContentTop: number;
    getContentTop().then(pos => {
      initialContentTop = pos;
      cy.log(`content position before header hydration: ${pos.toString()}`);
      cy.get('@header').invoke('attr', 'data-hydrated').should('not.exist');
    });

    // check the content position did not change when the header is hydrated
    cy.get('@header')
      .invoke('attr', 'data-hydrated')
      .should('exist')
      .then(() => {
        getContentTop().should('eq', initialContentTop);
      });
  }

  HEADER_CONFIGS.forEach(config => {
    describe(config.replace('-', ' '), () => {
      beforeEach(() => {
        cy.visit(`/iframe.html?id=${HEADER_ID}--${config}`);
        cy.get('post-header').as('header');
      });

      Object.entries(VIEWPORTS).forEach(([viewportName, viewportPreset]) => {
        it(`should not shift layout on ${viewportName}`, () => {
          cy.viewport(viewportPreset);
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
      cy.get('div.burger-menu.extended').should('not.exist');
      cy.get('post-togglebutton').click();
      cy.get('div.burger-menu.extended').should('exist');

      removeAndReattachHeader();

      cy.get('div.burger-menu.extended').should('not.exist');
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
      cy.get('div.burger-menu.extended').should('exist');
      // Open megadropdown
      cy.get('post-megadropdown-trigger').first().click();
      cy.get('post-megadropdown').find('.back-button').should('be.visible');
      // Click menu button to close both
      cy.get('post-togglebutton').click();
      cy.get('div.burger-menu.extended').should('not.exist');
      cy.get('post-megadropdown').find('.back-button').should('not.be.visible');
    });

    it('should animate megadropdown open after forced close', () => {
      // Open mobile menu and megadropdown
      cy.get('post-togglebutton').click();
      cy.get('div.burger-menu.extended').should('exist');
      cy.get('post-megadropdown-trigger').first().should('be.visible').click();
      cy.get('post-megadropdown').find('.back-button').should('be.visible');

      // Force close by toggling menu
      cy.get('post-togglebutton').click();
      cy.get('div.burger-menu.extended').should('not.exist');
      cy.get('post-megadropdown').find('.back-button').should('not.be.visible');

      // Reopen mobile menu before clicking the trigger again
      cy.get('post-togglebutton').click();
      cy.get('div.burger-menu.extended').should('exist');
      cy.get('post-megadropdown-trigger').first().should('be.visible').click();
      cy.wait(600);

      // Check if animation class is present
      cy.get('post-megadropdown')
        .find('.megadropdown')
        .should('be.visible')
        .should('have.css', 'opacity', '1');
    });

    it('should update active class when active link changes within the same or different megadropdown', () => {
      cy.get('post-megadropdown#letters a[href="/sch"]').first().as('lettersFirstLink');
      cy.get('post-megadropdown#letters a[href="/kl"]').first().as('lettersSecondLink');
      cy.get('post-megadropdown#packages a[href="/sch"]').first().as('packagesLink');

      cy.get('post-megadropdown-trigger').find('button').first().as('lettersTrigger');
      cy.get('post-megadropdown-trigger').find('button').eq(1).as('packagesTrigger');

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

  describe('local navigation', () => {
    const localNavNextToTitle = 'slot[name="title"] + slot[name="local-nav"]';
    const localNavInNavigation = '.navigation slot[name="local-nav"]';

    beforeEach(() => {
      cy.getComponent('header', HEADER_ID, 'microsite');
    });

    it('should show the local navigation next to the title', () => {
      cy.get('@header').shadow().find(localNavNextToTitle).should('exist');
      cy.get('@header').shadow().find(localNavInNavigation).should('not.exist');
    });

    it('should show the local navigation next to the title', () => {
      cy.get('@header')
        .find('[slot="title"]')
        .then($title => {
          $title[0].remove();
        });

      cy.wait(300);

      cy.get('@header').shadow().find(localNavNextToTitle).should('not.exist');
      cy.get('@header').shadow().find(localNavInNavigation).should('exist');
    });
  });
});
