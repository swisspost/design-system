describe('mainnavigation', { baseUrl: null, includeShadowDom: true }, () => {
  function isVisible($el: JQuery<HTMLElement>) {
    const mainNavigation = $el.parents('post-mainnavigation').get(0);

    const { left, right } = $el.get(0).getBoundingClientRect();
    return (
      Math.floor(left) <= mainNavigation.getBoundingClientRect().right &&
      Math.floor(right) >= mainNavigation.getBoundingClientRect().left
    );
  }

  function isFullyVisible($el: JQuery<HTMLElement>) {
    const mainNavigation = $el.parents('post-mainnavigation').get(0);
    const scrollLeft = mainNavigation.shadowRoot.querySelector('.scroll-left');
    const scrollRight = mainNavigation.shadowRoot.querySelector('.scroll-right');

    const leftEdge =
      scrollLeft.getBoundingClientRect().right || mainNavigation.getBoundingClientRect().left;
    const rightEdge =
      scrollRight.getBoundingClientRect().left || mainNavigation.getBoundingClientRect().right;

    const { left, right } = $el.get(0).getBoundingClientRect();
    return Math.ceil(left) >= leftEdge && Math.floor(right) <= rightEdge;
  }

  function clickUntilHidden($el: JQuery<HTMLElement>) {
    if ($el.is(':visible')) {
      cy.wrap($el).click().then(clickUntilHidden);
    }
  }

  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-mainnavigation.test.html');

      cy.get('post-mainnavigation[data-hydrated]').as('mainnavigation');
    });

    it('should not show the scroll buttons', () => {
      cy.get('@mainnavigation').find('.scroll-control').should('not.be.visible');
    });
  });

  describe('overflow', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-mainnavigation-overflow.test.html');

      cy.get('post-mainnavigation[data-hydrated]').as('mainnavigation');

      cy.get('@mainnavigation')
        .find('a:not(post-megadropdown *), post-megadropdown-trigger')
        .should('have.length', 19)
        .as('navigationItems');

      cy.get('@navigationItems').first().find('button').as('firstButton');
      cy.get('@navigationItems').last().find('button').as('lastButton');

      // remove smooth scroll to speed up the tests
      cy.get('@mainnavigation')
        .shadow()
        .find('nav')
        .then($nav => {
          $nav.css('scroll-behavior', 'auto');
        });
    });

    it('should always show the navigation item that is currently focused', () => {
      cy.get('@navigationItems').last().as('last').find('button').focus();
      cy.get('@last').should('be.visible');

      cy.get('@navigationItems').first().as('first').find('button').focus();
      cy.get('@first').should('be.visible');
    });

    describe('right scroll', () => {
      beforeEach(() => {
        cy.get('@mainnavigation').shadow().find('.scroll-right').as('rightScroll');
      });

      it('should correctly show the right scroll button', () => {
        cy.get('@mainnavigation').then($mainnavigation => {
          cy.get('@rightScroll').then($rightScroll => {
            expect($rightScroll.outerHeight()).eq($mainnavigation.innerHeight());
          });
        });
      });

      it('should click until the last navigation item is visible', () => {
        cy.get('@rightScroll').should('be.visible');

        cy.get('@rightScroll').then(clickUntilHidden);

        cy.get('@rightScroll').should('be.hidden');
        cy.get('@navigationItems').last().then(isFullyVisible).should('be.true');
      });

      it('should scroll continuously until the last navigation item is visible', () => {
        const rightScrollPosition = [Cypress.config('viewportWidth') - 5, 5];
        cy.get('@mainnavigation').trigger('mousedown', ...rightScrollPosition, { button: 0 });
        cy.wait(800);
        cy.get('@mainnavigation').trigger('mouseup');

        cy.get('@navigationItems').last().should('be.visible');
      });

      it('should focus until the last navigation item is visible', () => {
        cy.get('@rightScroll').should('be.visible');

        cy.get('@navigationItems').each($el => {
          if ($el.prop('localName') === 'a') {
            cy.wrap($el).focus();
          } else {
            cy.wrap($el).find('button').focus();
          }
          cy.wrap($el).then(isVisible).should('be.true');
        });

        cy.get('@rightScroll').should('be.hidden');
      });

      it('should not be able to click on a navigation item for a short amount of time after scroll', () => {
        const click = () => {
          cy.get('post-header').then($header => {
            cy.get('post-header').click(Cypress.config('viewportWidth') - 5, $header.height() - 5);
          });
        };

        // click until the last navigation item is visible
        cy.get('@navigationItems').each($el => {
          if (!isFullyVisible($el)) click();
        });

        // click on the position where the scroll right button was, the last item should not be triggered
        click();
        cy.get('@lastButton').invoke('attr', 'aria-expanded').should('not.eq', 'true');

        // wait and click again on the position where the scroll right button was, the last item should then be triggered
        cy.wait(400);
        click();
        cy.get('@lastButton').invoke('attr', 'aria-expanded').should('eq', 'true');
      });

      it('should show the mega-dropdown at the correct position after scroll', () => {
        // click until the last navigation item is visible
        cy.get('@lastButton').focus();

        // open the last mega-dropdown
        cy.get('@lastButton').click({ force: true });

        // check the mega-dropdown visible and position
        cy.get('@mainnavigation')
          .find('post-megadropdown')
          .last()
          .shadow()
          .find('.megadropdown')
          .should('have.css', 'display', 'block')
          .then($megadropdown => {
            expect($megadropdown.position().left).eq(0);
          });
      });
    });

    describe('left scroll', () => {
      beforeEach(() => {
        cy.get('@lastButton').focus();

        cy.get('@navigationItems')
          .then($options => $options.get().reverse())
          .as('navigationItemsReversed');

        cy.get('@mainnavigation').shadow().find('.scroll-left').as('leftScroll');

        cy.wait(0); // wait for rendering
      });

      it('should correctly show the left scroll button', () => {
        cy.get('@mainnavigation').then($mainnavigation => {
          cy.get('@leftScroll').then($leftScroll => {
            expect($leftScroll.outerHeight()).eq($mainnavigation.innerHeight());
          });
        });
      });

      it('should click until the first navigation item is visible', () => {
        cy.get('@leftScroll').should('be.visible');

        cy.get('@leftScroll').then(clickUntilHidden);

        cy.get('@leftScroll').should('be.hidden');
        cy.get('@navigationItems').first().should('be.visible');
      });

      it('should scroll continuously until the first navigation item is visible', () => {
        const leftScrollPosition = [5, 5];
        cy.get('@mainnavigation').trigger('mousedown', ...leftScrollPosition, { button: 0 });
        cy.wait(800);
        cy.get('@mainnavigation').trigger('mouseup');

        cy.get('@navigationItems').first().should('be.visible');
      });

      it('should focus until the first navigation item is visible', () => {
        cy.get('@leftScroll').should('be.visible');

        cy.get('@navigationItemsReversed').each($el => {
          if ($el.prop('localName') === 'a') {
            cy.wrap($el).focus();
          } else {
            cy.wrap($el).find('button').focus();
          }
          cy.wrap($el).then(isVisible).should('be.true');
        });

        cy.get('@leftScroll').should('be.hidden');
      });

      it('should not be able to click on a navigation item for a short amount of time after scroll', () => {
        const click = () => {
          cy.get('post-header').then($header => {
            cy.get('post-header').click(5, $header.height() - 5);
          });
        };
        // click until the first navigation item is visible
        cy.get('@navigationItemsReversed').each($el => {
          if (!isFullyVisible($el)) click();
        });

        // click on the position where the scroll left button was, the first item should not be triggered
        click();
        cy.get('@firstButton').invoke('attr', 'aria-expanded').should('not.eq', 'true');

        // wait and click again on the position where the scroll left button was, the first item should then be triggered
        cy.wait(400);
        click();
        cy.get('@firstButton').invoke('attr', 'aria-expanded').should('eq', 'true');
      });
    });

    describe('resize observer', () => {
      beforeEach(() => {
        cy.visit('./cypress/fixtures/post-mainnavigation-overflow.test.html');
        cy.get('post-mainnavigation[data-hydrated]').as('mainnavigation');
        cy.get('@mainnavigation').shadow().find('.scroll-left').as('leftScroll');
        cy.get('@mainnavigation').shadow().find('.scroll-right').as('rightScroll');
      });

      it('should update scrollability when viewport changes', () => {
        cy.viewport(1200, 600);
        cy.get('@rightScroll').should('be.visible');
        cy.get('@leftScroll').should('not.be.visible');

        cy.viewport(1600, 600);
        cy.get('@rightScroll').should('not.be.visible');
        cy.get('@leftScroll').should('not.be.visible');

        cy.viewport(1200, 600);
        cy.get('@rightScroll').should('be.visible');
        cy.get('@leftScroll').should('not.be.visible');
      });

      it('should hide scroll buttons after removing enough nav items', () => {
        cy.viewport(1200, 600);
        cy.get('@rightScroll').should('be.visible');
        cy.get('@leftScroll').should('not.be.visible');

        cy.get('@mainnavigation')
          .find('li')
          .its('length')
          .then(itemCount => {
            // Remove enough items to eliminate the need for scrolling
            cy.get('@mainnavigation')
              .find('ul')
              .then($navList => {
                const itemsToRemove = Math.floor(itemCount / 2);
                const items = $navList.find('li').slice(-itemsToRemove);
                items.each((_, item) => {
                  item.remove();
                });
              });
          });
        cy.get('@rightScroll').should('not.be.visible');
        cy.get('@leftScroll').should('not.be.visible');
      });

      it('should show left scroll button after scrolling right', () => {
        cy.viewport(1200, 600);

        cy.get('@rightScroll').should('be.visible');
        cy.get('@leftScroll').should('not.be.visible');

        cy.get('@rightScroll').click();

        cy.get('@leftScroll').should('be.visible');
        cy.get('@rightScroll').should('be.visible');
      });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-mainnavigation-overflow.test.html');
      cy.get('post-mainnavigation[data-hydrated]').should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-mainnavigation');
    });
  });
});
