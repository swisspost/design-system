const BREADCRUMB_ITEM_ID = 'b7db7391-f893-4b1e-a125-b30c6f0b028d';
const BREADCRUMBS_ID = 'b7db7391-f893-4b1e-a125-b30c6f0b028b';

describe('breadcrumbs', () => {
  describe('item', () => {
    describe('default (internal anchor)', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumb-item', BREADCRUMB_ITEM_ID);
      });

      it('should render its own anchor in the shadow DOM when the url prop is set', () => {
        cy.get('post-breadcrumb-item').shadow().find('a').should('exist');
        cy.get('post-breadcrumb-item').children('a').should('not.exist');
      });
    });

    describe('client-side routing (slotted anchor)', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'client-side-routing');
        cy.get('post-breadcrumb-item[data-hydrated]', { timeout: 30000 }).first().as('item');
      });

      it('should not render an internal anchor in the shadow DOM', () => {
        cy.get('@item').shadow().find('a').should('not.exist');
      });

      it('should keep the slotted anchor in the light DOM so consumer routing can intercept clicks', () => {
        cy.get('@item').children('a').should('exist').and('have.attr', 'href');
      });

      it('should not auto-apply aria-current to the slotted anchor when selected changes', () => {
        cy.get('@item').children('a').invoke('removeAttr', 'aria-current');
        cy.get('@item').invoke('attr', 'selected', 'false');
        cy.get('@item').invoke('attr', 'selected', 'true');
        cy.get('@item').children('a').should('not.have.attr', 'aria-current');
      });

      it('should react to the slotted anchor being removed after the initial render', () => {
        cy.get('@item').invoke('attr', 'url', '/section2');
        cy.get('@item').shadow().find('a').should('not.exist');

        cy.get('@item').then($item => {
          $item.find('a').remove();
        });
        cy.get('@item').shadow().find('a').should('exist');
      });
    });
  });

  describe('concatenation', () => {
    describe('visible item cap', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'default');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it('should not collapse any items when everything fits comfortably', () => {
        cy.get('@breadcrumbs').find('post-breadcrumb-item[variant="menuitem"]').should('not.exist');
      });
    });

    describe('collapse ordering', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'concatenated');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it('should never show more than the maximum number of visible items, even with ample width', () => {
        cy.viewport(1920, 800);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item:not([variant="menuitem"])')
          .should('have.length', 6);
      });

      it('should collapse items starting from the earliest segment, closest to home', () => {
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item')
          .then($items => {
            const variants = $items.toArray().map(item => item.getAttribute('variant'));
            const firstListItemIndex = variants.indexOf('listitem');

            // Every collapsed ("menuitem") entry should come before every visible ("listitem")
            // entry — collapsing proceeds strictly from the start, never from the middle or end.
            expect(variants.slice(0, firstListItemIndex)).to.satisfy((v: string[]) =>
              v.every(variant => variant === 'menuitem'),
            );
          });
      });

      it('should not mark the last item standalone while middle items are still visible', () => {
        // The default cap already forces some items into the menu, but plenty of items remain
        // visible alongside a short, easily-fitting last item — it should not be wrapping yet.
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length.greaterThan', 0);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .should('have.attr', 'standalone', 'false');
      });
    });

    describe('three-stage degrade sequence', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'default');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it('should collapse middle items before the last item is marked standalone', () => {
        cy.viewport(500, 400);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length.greaterThan', 0);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .should('have.attr', 'standalone', 'false');
      });

      it('should mark the last item standalone once every middle item is collapsed', () => {
        cy.viewport(300, 400);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item:not([selected]):not([selected="false"])')
          .should('have.attr', 'variant', 'menuitem');
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .should('have.attr', 'standalone', 'true');
      });

      it('should restore all items once space is available again', () => {
        cy.viewport(300, 400);
        cy.get('@breadcrumbs').find('post-breadcrumb-item[variant="menuitem"]').should('exist');

        cy.viewport(1920, 800);
        cy.get('@breadcrumbs').find('post-breadcrumb-item[variant="menuitem"]').should('not.exist');
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .should('have.attr', 'standalone', 'false');
      });
    });
  });

  describe('home link', () => {
    describe('client-side routing (slotted anchor)', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'client-side-routing');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it('should render the slotted anchor instead of the internal one built from home-url', () => {
        // Scoped to the visible nav, since the off-screen clone used for overflow measurement
        // legitimately embeds a copy of the slotted anchor to measure its width.
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) a[href="/"]').should('not.exist');
        cy.get('@breadcrumbs').children('a[slot="home"]').should('exist').and('have.attr', 'href');
      });
    });

    describe('overflow measurement', () => {
      it('should collapse the same number of items whether the home link is internal or slotted', () => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'concatenated');
        cy.get('post-breadcrumb-item[variant="menuitem"]')
          .its('length')
          .then(defaultCollapsedCount => {
            expect(defaultCollapsedCount).to.be.greaterThan(0);

            cy.visit(
              `/iframe.html?id=${BREADCRUMBS_ID}--client-side-routing&args=itemCount:15&story=ClientSideRouting`,
            );
            cy.get('post-breadcrumb-item[data-hydrated]', { timeout: 30000 });
            cy.get('post-breadcrumb-item[variant="menuitem"]').should(
              'have.length',
              defaultCollapsedCount,
            );
          });
      });
    });

    describe('segment specific breadcrumbs', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'custom-home-text');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it('should hide the home icon and display text-home visibly when home-text is true', () => {
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) .home post-icon')
          .should('not.exist');
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) .home span')
          .should('not.have.class', 'visually-hidden')
          .and('have.text', 'This is a very long segment name for the first breadcrumb segment');
      });

      it('should restore the default home icon when home-text is set back to false', () => {
        cy.get('@breadcrumbs').invoke('removeAttr', 'home-text');
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) .home post-icon').should('exist');
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) .home span')
          .should('have.class', 'visually-hidden');
      });

      it('should render the home item in full, not wrapped, when there is enough space for it', () => {
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) .home')
          .should('exist')
          .and('not.have.class', 'home-menu');
      });

      it('should never truncate the last (selected) segment, wrapping it instead', () => {
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .shadow()
          .find('a, span')
          .then($selected => {
            expect($selected.get(0).scrollWidth).to.be.at.most($selected.get(0).clientWidth + 1);
          });
      });

      it('should collapse the middle segments into the overflow menu when the long home-text and selected segment leave no space for them', () => {
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length.greaterThan', 0);

        // The first (home) and last (selected) segments must never be collapsed, only the middle ones.
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .should('not.have.attr', 'variant', 'menuitem');
      });

      it('should collapse the home item into its own separate menu as a last resort, once the last item has wrapped and there is still no room', () => {
        cy.viewport(200, 400);

        // The home item's own menu is distinct from the middle-items menu — both exist at once.
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) .home-menu').should('exist');
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) .menu').should('exist');
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) .home:not(.home-menu)')
          .should('not.exist');

        // The last item should have already exhausted wrapping (standalone) before home gives up.
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .should('have.attr', 'standalone', 'true');
      });
    });
  });
});
