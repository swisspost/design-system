describe('mainnavigation', { baseUrl: null, includeShadowDom: true }, () => {
  function isFullyVisible($el: JQuery<HTMLElement>) {
    const $mainnavigation = $el.parents('post-mainnavigation');
    const $listItem = $el.parents('post-list-item');

    let firstVisiblePosition = 0;
    if (!$listItem.is(':first-child')) {
      firstVisiblePosition += $mainnavigation.children('.left-scroll-button').width();
    }

    let lastVisiblePosition = Cypress.config('viewportWidth');
    if (!$listItem.is(':last-child')) {
      lastVisiblePosition -= $mainnavigation.children('.right-scroll-button').width();
    }

    const { left, width } = $el.get(0).getBoundingClientRect();
    return left >= firstVisiblePosition && left + width <= lastVisiblePosition;
  }

  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-mainnavigation.test.html');

      cy.get('post-mainnavigation[data-hydrated]').as('mainnavigation');

      cy.get('@mainnavigation')
        .find('post-megadropdown-trigger > button, a:not(post-megadropdown *)')
        .should('have.length', 20)
        .as('navigationItems');

      // remove scroll transition to speed up the tests
      cy.get('@mainnavigation')
        .find('nav')
        .then($nav => {
          $nav.css('transition', 'none');
        });
    });

    it('should be in a container with an hidden horizontal overflow', () => {
      cy.get('@mainnavigation')
        .parent('post-header')
        .parent()
        .then($parent => {
          expect($parent.css('overflow-x')).eq('hidden');
        });
    });

    it('should always show the navigation item that is currently focused', () => {
      cy.get('@navigationItems').last().as('last').focus();
      cy.get('@last').should('be.visible');

      cy.get('@navigationItems').first().as('first').focus();
      cy.get('@first').should('be.visible');
    });

    describe('right scroll', () => {
      beforeEach(() => {
        cy.get('@mainnavigation').find('.right-scroll-button button').as('rightScroll');
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

        cy.get('@navigationItems').each($el => {
          if (!isFullyVisible($el)) cy.get('@rightScroll').click();
          cy.wrap($el).then(isFullyVisible).should('be.true');
        });

        cy.get('@rightScroll').should('be.hidden');
      });

      it('should scroll continuously until the last navigation item is visible', () => {
        cy.get('@mainnavigation').trigger('mousedown', Cypress.config('viewportWidth') - 5, 5);
        cy.wait(800);
        cy.get('@mainnavigation').trigger('mouseup');

        cy.get('@navigationItems').last().should('be.visible');
      });

      it('should focus until the last navigation item is visible', () => {
        cy.get('@rightScroll').should('be.visible');

        cy.get('@navigationItems').each($el => {
          cy.wrap($el).focus().then(isFullyVisible).should('be.true');
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
        cy.get('@navigationItems').last().invoke('attr', 'aria-expanded').should('not.eq', 'true');

        // wait and click again on the position where the scroll right button was, the last item should then be triggered
        cy.wait(400);
        click();
        cy.get('@navigationItems').last().invoke('attr', 'aria-expanded').should('eq', 'true');
      });

      it('should show the mega-dropdown at the correct position after scroll', () => {
        // click until the last navigation item is visible
        cy.get('@navigationItems').last().focus();

        // open the last mega-dropdown
        cy.get('@navigationItems').last().click();

        // check the mega-dropdown visible and position
        cy.get('@mainnavigation')
          .find('post-megadropdown .megadropdown')
          .last()
          .should('be.visible')
          .then($megadropdown => {
            expect($megadropdown.position().left).eq(0);
          });
      });
    });

    describe('left scroll', () => {
      beforeEach(() => {
        cy.get('@navigationItems').last().focus();

        cy.get('@navigationItems')
          .then($options => $options.get().reverse())
          .as('navigationItemsReversed');

        cy.get('@mainnavigation').find('.left-scroll-button button').as('leftScroll');

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

        cy.get('@navigationItemsReversed').each($el => {
          if (!isFullyVisible($el)) cy.get('@leftScroll').click();
          cy.wrap($el).then(isFullyVisible).should('be.true');
        });

        cy.get('@leftScroll').should('be.hidden');
      });

      it('should scroll continuously until the first navigation item is visible', () => {
        cy.get('@mainnavigation').trigger('mousedown', 5, 5);
        cy.wait(800);
        cy.get('@mainnavigation').trigger('mouseup');

        cy.get('@navigationItems').first().should('be.visible');
      });

      it('should focus until the first navigation item is visible', () => {
        cy.get('@leftScroll').should('be.visible');

        cy.get('@navigationItemsReversed').each($el => {
          cy.wrap($el).focus().then(isFullyVisible).should('be.true');
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
        cy.get('@navigationItems').first().invoke('attr', 'aria-expanded').should('not.eq', 'true');

        // wait and click again on the position where the scroll left button was, the first item should then be triggered
        cy.wait(400);
        click();
        cy.get('@navigationItems').first().invoke('attr', 'aria-expanded').should('eq', 'true');
      });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-mainnavigation.test.html');
      cy.get('post-mainnavigation[data-hydrated]').should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-mainnavigation');
    });
  });
});
