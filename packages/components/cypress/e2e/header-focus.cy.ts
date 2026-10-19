import 'cypress-real-events';
import { getLanguageMenuTrigger, HEADER_ID, scrollAndWait } from './helper/header';

describe('header', () => {
  describe('focus and keyboard navigation', () => {
    describe('desktop', () => {
      beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.getComponent('header', HEADER_ID);
        cy.get('post-megadropdown-trigger[data-hydrated]')
          .find('button')
          .first()
          .as('megadropdown-trigger');
        cy.get('post-megadropdown').first().as('megadropdown');
        cy.get('@megadropdown').find('.close-button').as('close-btn');
        cy.get('@megadropdown').find('.megadropdown').as('megadropdown-container');
      });

      it('should have close button as the last tab element in megadropdown', () => {
        cy.get('@megadropdown-trigger').click({ force: true });
        cy.get('@close-btn').should('be.visible');

        cy.get('@megadropdown-container')
          .getDeepFocusableElements()
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

        it('should trap focus within the burger menu (loop from last element back to menu button)', () => {
          cy.get('@burger-menu-btn').click();
          cy.get('div.burger-menu.extended').should('exist');

          // Find all focusable elements in main navigation
          cy.get('@header')
            .find('post-mainnavigation')
            .should('be.visible')
            .getFocusableElements()
            .then(focusableElements => {
              expect(focusableElements.length).to.be.greaterThan(0);

              // Focus first element
              focusableElements[0].focus();

              // Tab through all elements to reach beyond the navigation
              const tabCount = focusableElements.length;
              for (let i = 0; i < tabCount; i++) {
                cy.press('Tab');
              }
              cy.press('Tab');

              // Verify the burger menu button is now focused
              cy.get('@burger-menu-btn').should('have.focus');
            });
        });

        describe('focus expansion with deep active element detection', () => {
          beforeEach(() => {
            cy.viewport(1920, 1080);
            cy.getComponent('header', HEADER_ID);
          });

          it('should add data-expanded when a global-header element receives keyboard focus while scrolled', () => {
            cy.scrollTo(0, 500);
            cy.get('@header').should('not.have.attr', 'data-expanded');

            cy.get('@header')
              .find('post-language-menu')
              .shadow()
              .find('button')
              .first()
              .as('langButton');

            cy.get('@langButton').then($el => {
              $el[0].focus();
            });

            cy.get('@header').should('have.attr', 'data-expanded');
          });

          it('should remove data-expanded once focus leaves the header', () => {
            cy.scrollTo(0, 500);
            cy.get('@header')
              .getFocusableElements()
              .then(focusableElements => {
                const globalHeaderEl = Array.from(focusableElements).find(
                  el => !el.closest('[slot="main-nav"]'),
                );
                cy.wrap(globalHeaderEl).focus();
              });

            cy.get('@header').should('have.attr', 'data-expanded');

            cy.get('body').click(0, 0);

            cy.get('@header').should('not.have.attr', 'data-expanded');
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

    describe('header expansion on focus', () => {
      beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.getComponent('header', HEADER_ID);
      });

      it('should add data-expanded when a global-header element receives keyboard focus while scrolled', () => {
        // Simulate the scrolled/reduced header state
        cy.scrollTo(0, 500);

        cy.get('@header').should('not.have.attr', 'data-expanded');

        // Grab the first focusable element that is NOT part of main-nav
        cy.get('@header')
          .getFocusableElements()
          .then(focusableElements => {
            const globalHeaderEl = Array.from(focusableElements).find(
              el => !el.closest('[slot="main-nav"]'),
            );
            cy.wrap(globalHeaderEl).focus();
          });

        cy.get('@header').should('have.attr', 'data-expanded');
      });

      it('should remove data-expanded once focus leaves the header', () => {
        cy.scrollTo(0, 500);

        cy.get('@header')
          .getFocusableElements()
          .then(focusableElements => {
            const globalHeaderEl = Array.from(focusableElements).find(
              el => !el.closest('[slot="main-nav"]'),
            );
            cy.wrap(globalHeaderEl).focus();
          });

        cy.get('@header').should('have.attr', 'data-expanded');

        cy.get('body').click(0, 0);

        cy.get('@header').should('not.have.attr', 'data-expanded');
      });

      it('should NOT add data-expanded when focus stays inside main navigation on desktop', () => {
        cy.scrollTo(0, 500);

        cy.get('post-megadropdown-trigger').find('button').first().focus();

        cy.get('@header').should('not.have.attr', 'data-expanded');
      });

      it('should remove data-expanded when focus moves from the global header to the main navigation on desktop', () => {
        cy.scrollTo(0, 500);

        cy.get('@header')
          .find('post-language-menu')
          .shadow()
          .find('post-menu-trigger button')
          .focus();

        cy.get('@header').should('have.attr', 'data-expanded');

        cy.get('post-megadropdown-trigger').find('button').first().focus();

        cy.get('@header').should('not.have.attr', 'data-expanded');
      });

      it('should add data-expanded again when focus moves back from the main navigation to the global header', () => {
        cy.scrollTo(0, 500);

        cy.get('post-megadropdown-trigger').find('button').first().focus();
        cy.get('@header').should('not.have.attr', 'data-expanded');

        getLanguageMenuTrigger().focus();
        cy.get('@header').should('have.attr', 'data-expanded');
      });

      it('should keep data-expanded on scroll while a global-header element has keyboard focus', () => {
        scrollAndWait(500);

        getLanguageMenuTrigger().focus();
        cy.get('@header').should('have.attr', 'data-expanded');

        // 501px is the maximum scroll position of the story
        scrollAndWait(501);
        cy.get('@header').should('have.attr', 'data-expanded');
      });
    });

    // real mouse events are needed here: synthetic clicks don't change the :focus-visible heuristic
    describe('header expansion with mouse interaction', () => {
      beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.getComponent('header', HEADER_ID);
        scrollAndWait(500);
      });

      function expandWithKeyboardOnGlobalHeaderElement() {
        cy.get('@header')
          .getFocusableElements()
          .then(focusableElements => {
            const globalHeaderEl = Array.from(focusableElements).find(
              el => !el.closest('[slot="main-nav"]'),
            );
            cy.wrap(globalHeaderEl).focus();
          });
        cy.get('@header').should('have.attr', 'data-expanded');
      }

      // https://github.com/swisspost/design-system/issues/8592
      it('should keep data-expanded and open the language menu when clicked after keyboard expansion', () => {
        expandWithKeyboardOnGlobalHeaderElement();

        getLanguageMenuTrigger().realClick();

        getLanguageMenuTrigger().should('have.attr', 'aria-expanded', 'true');
        cy.get('@header').find('post-language-menu-item').should('be.visible');
        cy.get('@header').should('have.attr', 'data-expanded');
      });

      it('should remove data-expanded on the next scroll after a click inside the expanded header', () => {
        expandWithKeyboardOnGlobalHeaderElement();

        getLanguageMenuTrigger().realClick();
        cy.get('@header').should('have.attr', 'data-expanded');

        scrollAndWait(501);
        cy.get('@header').should('not.have.attr', 'data-expanded');
      });

      it('should keep data-expanded on scroll when going back to the keyboard after a click', () => {
        expandWithKeyboardOnGlobalHeaderElement();

        getLanguageMenuTrigger().realClick();
        getLanguageMenuTrigger().should('have.attr', 'aria-expanded', 'true');

        cy.realPress('Escape');
        getLanguageMenuTrigger().should('have.attr', 'aria-expanded', 'false');

        cy.press(Cypress.Keyboard.Keys.TAB);
        cy.get('@header').should('have.attr', 'data-expanded');

        scrollAndWait(501);
        cy.get('@header').should('have.attr', 'data-expanded');
      });
    });

    describe('header expansion on focus (microsite)', () => {
      function focusFirstLocalNavElement() {
        cy.get('@header')
          .find('[slot="local-nav"]')
          .first()
          .then($localNav => {
            const localNav = $localNav[0];
            const focusable = localNav.matches('a, button')
              ? localNav
              : localNav.querySelector<HTMLElement>('a, button');

            expect(focusable, 'focusable element in local-nav').to.not.equal(null);
            focusable.focus();
          });
      }

      describe('desktop', () => {
        beforeEach(() => {
          cy.viewport(1920, 1080);
          cy.getComponent('header', HEADER_ID, 'microsite');
        });

        it('should keep data-expanded while focus moves from the language menu trigger into its flyout and back', () => {
          cy.scrollTo(0, 500);

          cy.get('@header')
            .find('post-language-menu')
            .shadow()
            .find('post-menu-trigger button')
            .as('langTrigger');

          cy.get('@langTrigger').focus();
          cy.get('@header').should('have.attr', 'data-expanded');

          // Open menu
          cy.get('@langTrigger').click({ scrollBehavior: false });
          cy.get('@langTrigger').should('have.attr', 'aria-expanded', 'true');
          cy.get('@header').find('post-language-menu-item').should('be.visible');
          cy.get('@header').should('have.attr', 'data-expanded');

          // Close menu with Escape
          cy.get('@header')
            .find('post-language-menu-item')
            .first()
            .trigger('keydown', { key: 'Escape', scrollBehavior: false });
          cy.get('@langTrigger').should('have.attr', 'aria-expanded', 'false');
          cy.get('@header').should('have.attr', 'data-expanded');
        });

        it('should NOT add data-expanded when focus is on a local-nav element', () => {
          cy.scrollTo(0, 500);

          cy.get('@header').should('not.have.attr', 'data-expanded');

          focusFirstLocalNavElement();

          cy.get('@header').should('not.have.attr', 'data-expanded');
        });
      });
    });
  });
});
