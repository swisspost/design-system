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
        cy.get('post-megadropdown-trigger').find('button').first().as('megadropdown-trigger');
        cy.get('post-megadropdown').first().as('megadropdown');
      });

      it('should have close button as the last tab element in megadropdown', () => {
        // Open megadropdown
        cy.get('@megadropdown-trigger').click();
        cy.get('@megadropdown').shadow().find('.megadropdown').should('be.visible');

        // Get the close button
        cy.get('@megadropdown').shadow().find('.close-button').as('close-btn');

        // Get all focusable elements inside the megadropdown
        cy.get('@megadropdown').then($megadropdown => {
          const focusableElements = $megadropdown[0].shadowRoot!.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );

          // The close button should be the last focusable element
          expect(focusableElements[focusableElements.length - 1]).to.equal(
            $megadropdown[0].shadowRoot!.querySelector('.close-button'),
          );
        });
      });

      it('should close megadropdown and focus next nav item when tabbing after close button', () => {
        // Open megadropdown
        cy.get('@megadropdown-trigger').click();
        cy.get('@megadropdown').shadow().find('.megadropdown').should('be.visible');

        // Get the close button and focus it
        cy.get('@megadropdown').shadow().find('.close-button').focus();

        // Get the next megadropdown trigger (next nav item)
        cy.get('post-megadropdown-trigger').find('button').eq(1).as('next-trigger');

        // Tab from the close button
        cy.get('@megadropdown')
          .shadow()
          .find('.close-button')
          .then($closeBtn => {
            // Simulate tab key press
            cy.wrap($closeBtn).trigger('keydown', { key: 'Tab', code: 'Tab' });
          });

        // Megadropdown should close
        cy.get('@megadropdown').shadow().find('.megadropdown').should('not.be.visible');

        // Next nav item should be focused
        cy.get('@next-trigger').should('have.focus');
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
          // Open burger menu
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          // Get all focusable elements
          cy.get('@header').then($header => {
            const shadowRoot = $header[0].shadowRoot!;

            // Check that global header elements can receive focus
            const globalHeaderFocusable = shadowRoot.querySelectorAll(
              '.global-header a[href], .global-header button:not([disabled])',
            );
            expect(globalHeaderFocusable.length).to.be.greaterThan(0);

            // Tab through and verify focus
            cy.get('@header')
              .shadow()
              .find('.global-header')
              .find('a, button')
              .first()
              .focus()
              .should('have.focus');

            // Check that burger menu elements can receive focus
            const burgerMenuFocusable = shadowRoot.querySelectorAll(
              '.burger-menu a[href], .burger-menu button:not([disabled])',
            );
            expect(burgerMenuFocusable.length).to.be.greaterThan(0);

            // Verify burger menu items can be focused
            cy.get('@header')
              .shadow()
              .find('.burger-menu')
              .find('a, button')
              .first()
              .focus()
              .should('have.focus');

            // Check that local header elements can receive focus if present
            const localHeaderFocusable = shadowRoot.querySelectorAll(
              '.local-header a[href], .local-header button:not([disabled])',
            );
            if (localHeaderFocusable.length > 0) {
              cy.get('@header')
                .shadow()
                .find('.local-header')
                .find('a, button')
                .first()
                .focus()
                .should('have.focus');
            }
          });
        });

        it('should trap focus within burger menu when first level is opened', () => {
          // Open burger menu
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          // Get first and last focusable elements
          cy.get('@header').then($header => {
            const shadowRoot = $header[0].shadowRoot!;
            const focusableElements = shadowRoot.querySelectorAll(
              'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            // Focus last element
            lastElement.focus();
            cy.wrap(lastElement).should('have.focus');

            // Tab forward should wrap to first element
            cy.wrap(lastElement).trigger('keydown', { key: 'Tab', code: 'Tab' });
            cy.wrap(firstElement).should('have.focus');

            // Shift+Tab should wrap back to last element
            cy.wrap(firstElement).trigger('keydown', {
              key: 'Tab',
              code: 'Tab',
              shiftKey: true,
            });
            cy.wrap(lastElement).should('have.focus');
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
          // Open burger menu
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          // Open megadropdown
          cy.get('@megadropdown-trigger').click();
          cy.get('@megadropdown').should('be.visible');

          // Try to focus on an element outside megadropdown (should not be possible)
          cy.get('@header')
            .shadow()
            .find('.global-header')
            .find('a, button')
            .first()
            .then($el => {
              // Element should exist but not be focusable when megadropdown is open
              const element = $el[0] as HTMLElement;
              element.focus();

              // Focus should be trapped in megadropdown
              cy.focused().then($focused => {
                const focusedElement = $focused[0];
                cy.get('@megadropdown').then($megadropdown => {
                  const megadropdownElement = $megadropdown[0];
                  expect(megadropdownElement.contains(focusedElement)).to.be.true;
                });
              });
            });
        });

        it('should have back button as the last focusable element in megadropdown', () => {
          // Open burger menu
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          // Open megadropdown
          cy.get('@megadropdown-trigger').click();
          cy.get('@megadropdown').should('be.visible');

          // Get back button
          cy.get('@megadropdown').shadow().find('.back-button').as('back-btn');

          // Get all focusable elements in megadropdown
          cy.get('@megadropdown').then($megadropdown => {
            const focusableElements = $megadropdown[0].shadowRoot!.querySelectorAll(
              'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );

            // Back button should be the last focusable element
            expect(focusableElements[focusableElements.length - 1]).to.equal(
              $megadropdown[0].shadowRoot!.querySelector('.back-button'),
            );
          });
        });

        it('should trap focus within megadropdown with back button as last element', () => {
          // Open burger menu
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          // Open megadropdown
          cy.get('@megadropdown-trigger').click();
          cy.get('@megadropdown').should('be.visible');

          // Get first and last focusable elements
          cy.get('@megadropdown').then($megadropdown => {
            const shadowRoot = $megadropdown[0].shadowRoot!;
            const focusableElements = shadowRoot.querySelectorAll(
              'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            // Verify last element is the back button
            expect(lastElement).to.equal(shadowRoot.querySelector('.back-button'));

            // Focus last element (back button)
            lastElement.focus();
            cy.wrap(lastElement).should('have.focus');

            // Tab forward should wrap to first element
            cy.wrap(lastElement).trigger('keydown', { key: 'Tab', code: 'Tab' });
            cy.wrap(firstElement).should('have.focus');

            // Shift+Tab should wrap back to last element (back button)
            cy.wrap(firstElement).trigger('keydown', {
              key: 'Tab',
              code: 'Tab',
              shiftKey: true,
            });
            cy.wrap(lastElement).should('have.focus');
          });
        });
      });

      describe('tablet', () => {
        beforeEach(() => {
          cy.viewport('ipad-2');
          cy.getComponent('header', HEADER_ID);
          cy.get('post-togglebutton').as('burger-menu-btn');
          cy.get('post-megadropdown-trigger').find('button').first().as('megadropdown-trigger');
          cy.get('post-megadropdown').first().as('megadropdown');
        });

        it('should trap focus within megadropdown on tablet', () => {
          // Open burger menu
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          // Open megadropdown
          cy.get('@megadropdown-trigger').click();
          cy.get('@megadropdown').should('be.visible');

          // Verify focus trap works the same as on mobile
          cy.get('@megadropdown').then($megadropdown => {
            const shadowRoot = $megadropdown[0].shadowRoot!;
            const focusableElements = shadowRoot.querySelectorAll(
              'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            // Back button should be last
            expect(lastElement).to.equal(shadowRoot.querySelector('.back-button'));

            // Test focus trap
            lastElement.focus();
            cy.wrap(lastElement).should('have.focus');
            cy.wrap(lastElement).trigger('keydown', { key: 'Tab', code: 'Tab' });
            cy.wrap(firstElement).should('have.focus');
          });
        });
      });
    });
  });
});
