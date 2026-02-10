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

    it('should log an error if the textMenu prop is not set', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@header').invoke('attr', 'text-menu').should('not.be.empty').and('not.eq', '0');
      cy.get('@consoleError').should('not.be.called');
      // Remove burger menu label
      cy.get('@header').invoke('removeAttr', 'text-menu');
      cy.get('@consoleError').should('be.called');
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

      // Check if animation is applied
      cy.get('post-megadropdown')
        .shadow()
        .find('.back-button')
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

    it('should show the local navigation in the mobile menu when the page is scrolled', () => {
      cy.viewport('iphone-6');

      // Initial state
      cy.get('@header').shadow().find('.local-header').should('be.visible');
      cy.get('div.burger-menu.extended').should('not.exist');

      cy.scrollTo(0, 500);

      // Page is scrolled down
      cy.get('@header').shadow().find('.local-header').should('not.be.visible');
      cy.get('post-togglebutton').click();

      // Burger menu is opened
      cy.get('div.burger-menu.extended').should('exist').should('be.visible');
      cy.get('@header').shadow().find('.local-header').should('be.visible');
    });
  });

  describe('keyboard navigation', () => {
    describe('desktop', () => {
      beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.getComponent('header', HEADER_ID);
        cy.get('post-megadropdown-trigger[data-hydrated]').find('button').first().as('megadropdown-trigger');
        cy.get('post-megadropdown').first().as('megadropdown');
        cy.get('@megadropdown').find('.close-button').as('close-btn');
        cy.get('@megadropdown').find('.megadropdown').as('megadropdown-container');
      });

      it('should have close button as the last tab element in megadropdown', () => {
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@close-btn').should('be.visible');

        cy.get('@megadropdown-container')
          .getFocusableElements()
          .then(focusableElements => {
            cy.get('@close-btn')
              .find('button')
              .then($closeBtn => {
                expect(focusableElements[focusableElements.length - 1]).to.equal($closeBtn[0]);
              });
          });
      });

      it('should close megadropdown and focus next nav item when pressing tab from close button', () => {
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@close-btn').should('be.visible');

        cy.get('@close-btn').find('button').focus();
        cy.press(Cypress.Keyboard.Keys.TAB);

        cy.get('@megadropdown-container').should('not.be.visible');
        
        cy.focused().then($focused => {
          cy.get('@megadropdown').then($megadropdown => {
            cy.wrap($megadropdown[0].contains($focused[0])).should('be.false');
          });
        });
      });
    });

    describe('mobile and tablet', () => {
      describe('first level navigation', () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.getComponent('header', HEADER_ID);
          cy.get('post-togglebutton').as('burger-menu-btn');
        });

        it('should allow focus on all elements from global header, local header and burger menu when first level is opened', () => {
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          cy.get('@header')
            .find('post-mainnavigation')
            .should('be.visible')
            .find('post-megadropdown-trigger')
            .first()
            .find('button')
            .focus()
            .should('have.focus');

          cy.get('@burger-menu-btn').focus().should('have.focus');

          cy.get('@header')
            .shadow()
            .find('.local-header')
            .then($localHeader => {
              const focusableElements = $localHeader.find('a, button');
              if (focusableElements.length > 0) {
                cy.wrap(focusableElements[0]).focus().should('have.focus');
              }
            });
        });
      });

      describe('second level navigation (megadropdown)', () => {
        beforeEach(() => {
          cy.viewport('iphone-6');
          cy.getComponent('header', HEADER_ID);
          cy.get('post-togglebutton').as('burger-menu-btn');
          cy.get('post-megadropdown-trigger').find('button').first().as('megadropdown-trigger');
          cy.get('post-megadropdown').first().as('megadropdown');
        });

        it('should only allow focus on megadropdown elements when second level is opened', () => {
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          cy.get('@megadropdown-trigger').click();
          cy.get('@megadropdown').should('be.visible');

          cy.get('@megadropdown')
            .shadow()
            .getFocusableElements()
            .then(focusableElements => {
              expect(focusableElements.length).to.be.greaterThan(0);
              
              focusableElements[0].focus();
              
              // Verify each focused element is within megadropdown
              for (let i = 0; i < focusableElements.length; i++) {
                cy.focused().then($focused => {
                  const currentElement = $focused[0];
                  const isInList = Array.from(focusableElements).includes(currentElement);
                  cy.wrap(isInList).should('be.true');
                });
                
                // Move to next element
                if (i < focusableElements.length - 1) {
                  cy.press(Cypress.Keyboard.Keys.TAB);
                }
              }
            });
        });

        it('should have back button as the last focusable element in megadropdown', () => {
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          cy.get('@megadropdown-trigger').click();
          cy.get('@megadropdown').should('be.visible');

          cy.get('@megadropdown').shadow().find('.back-button').as('back-btn');

          cy.get('@megadropdown')
            .shadow()
            .getFocusableElements()
            .then(focusableElements => {
              cy.get('@back-btn').then($backBtn => {
                expect(focusableElements[focusableElements.length - 1]).to.equal($backBtn[0]);
              });
            });
        });

        it('should focus on megadropdown trigger when clicking back button', () => {
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          cy.get('@megadropdown-trigger').click();
          cy.get('@megadropdown').should('be.visible');

          cy.get('@megadropdown').shadow().find('.back-button').click();
          cy.get('@megadropdown').should('not.be.visible');

          cy.focused().then($focused => {
          cy.get('@megadropdown-trigger').then($trigger => {
            expect($focused[0]).to.equal($trigger[0]);
          });
        });
        });
      });
    });
  });
});
