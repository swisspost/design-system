const BREADCRUMB_ITEM_ID = 'b7db7391-f893-4b1e-a125-b30c6f0b028d';
const BREADCRUMBS_ID = 'b7db7391-f893-4b1e-a125-b30c6f0b028b';

describe('breadcrumbs', () => {
  // Scans a range of widths instead of asserting at one fragile pixel value, then checks that
  // home always collapses into its own menu at a width no narrower than where the last item
  // starts wrapping — independent of exact pixel values. Requires a `@breadcrumbs` alias.
  function assertHomeCollapsesNoLaterThanLastItemWraps() {
    const widths = [500, 400, 320, 280, 240, 200, 180, 160, 140, 120, 100, 90, 80];
    let homeCollapsedWidth: number | null = null;
    let standaloneWidth: number | null = null;

    widths.forEach(width => {
      cy.viewport(width, 400);

      cy.get('@breadcrumbs')
        .shadow()
        .then($shadow => {
          if (
            homeCollapsedWidth === null &&
            $shadow.find('nav:not(.invisible) .home-menu').length > 0
          ) {
            homeCollapsedWidth = width;
          }
        });

      cy.get('@breadcrumbs').then($breadcrumbs => {
        const selected = $breadcrumbs
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .filter((_, el) => !el.closest('.invisible'));
        if (standaloneWidth === null && selected.is('[standalone]:not([standalone="false"])')) {
          standaloneWidth = width;
        }
      });
    });

    cy.then(() => {
      expect(
        homeCollapsedWidth,
        'home never collapsed across the tested width range',
      ).to.not.equal(null);
      expect(
        standaloneWidth,
        'last item never wrapped across the tested width range',
      ).to.not.equal(null);
      expect(homeCollapsedWidth).to.be.at.least(standaloneWidth);
    });
  }

  describe('item', () => {
    describe('default (internal anchor)', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumb-item', BREADCRUMB_ITEM_ID);
      });

      it.skip('should render its own anchor in the shadow DOM when the url prop is set', () => {
        cy.get('post-breadcrumb-item').shadow().find('a').should('exist');
        cy.get('post-breadcrumb-item').children('a').should('not.exist');
      });
    });

    describe('client-side routing (slotted anchor)', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'client-side-routing');
        cy.get('post-breadcrumb-item[data-hydrated]', { timeout: 30000 }).first().as('item');
      });

      it.skip('should not render an internal anchor in the shadow DOM', () => {
        cy.get('@item').shadow().find('a').should('not.exist');
      });

      it.skip('should keep the slotted anchor in the light DOM so consumer routing can intercept clicks', () => {
        cy.get('@item').children('a').should('exist').and('have.attr', 'href');
      });

      it.skip('should not auto-apply aria-current to the slotted anchor when selected changes', () => {
        cy.get('@item').children('a').invoke('removeAttr', 'aria-current');
        cy.get('@item').invoke('attr', 'selected', 'false');
        cy.get('@item').invoke('attr', 'selected', 'true');
        cy.get('@item').children('a').should('not.have.attr', 'aria-current');
      });

      it.skip('should react to the slotted anchor being removed after the initial render', () => {
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

      it.skip('should not collapse any items when everything fits comfortably', () => {
        cy.get('@breadcrumbs').find('post-breadcrumb-item[variant="menuitem"]').should('not.exist');
      });
    });

    describe('collapse ordering', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'concatenated');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it.skip('should never show more than the maximum number of visible items, even with ample width', () => {
        cy.viewport(1920, 800);
        // Counting [variant="menuitem"] directly (rather than its inverse) avoids matching the
        // off-screen measurement clone: it always force-expands every item to variant="listitem"
        // while measuring, so it never has anything matching [variant="menuitem"] to begin with.
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length', 15 - 6); // itemCount (15, Concatenated story) minus MAX_VISIBLE_ITEMS
      });

      it.skip('should collapse items starting from the earliest segment, closest to home', () => {
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item')
          // Excludes the off-screen measurement clone, which duplicates every item inside the
          // shadow root and would otherwise also match this unscoped tag selector.
          .filter((_, el) => !el.closest('.invisible'))
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

      it.skip('should not mark the last item standalone while middle items are still visible', () => {
        // The default cap already forces some items into the menu, but plenty of items remain
        // visible alongside a short, easily-fitting last item — it should not be wrapping yet.
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length.greaterThan', 0);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .filter((_, el) => !el.closest('.invisible'))
          // `standalone` is a reflected boolean prop: Stencil serializes true as an empty-string
          // attribute value, not the literal text "true" — matching ":not([standalone='false'])"
          // (inclusive of both "true" and "") is the same convention the rest of this file uses.
          .should('not.match', '[standalone]:not([standalone="false"])');
      });
    });

    // NOTE: the viewport widths in the skipped tests below are unverified guesses — confirm and
    // adjust them against the real Storybook build before un-skipping. The one active test
    // further down doesn't depend on exact widths, only on the transition order, so it already
    // runs as-is.
    //
    // Degrade order: middle items collapse first -> home collapses into its own menu next (this
    // keeps the row single-line) -> only if that's still not enough does the last item wrap.
    describe('three-stage degrade sequence', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'default');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it.skip('should collapse middle items first, before home collapses or the last item wraps', () => {
        cy.viewport(280, 400);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length.greaterThan', 0);
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) .home-menu').should('not.exist');
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .filter((_, el) => !el.closest('.invisible'))
          .should('not.match', '[standalone]:not([standalone="false"])');
      });

      it('should collapse the home item at a width no narrower than where the last item starts wrapping', () => {
        assertHomeCollapsesNoLaterThanLastItemWraps();
      });

      it.skip('should mark the last item standalone only once home has also collapsed and there is still no room', () => {
        cy.viewport(120, 400);
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) .home-menu').should('exist');
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .filter((_, el) => !el.closest('.invisible'))
          .should('match', '[standalone]:not([standalone="false"])');
      });

      it.skip('should restore all items once space is available again', () => {
        cy.viewport(120, 400);
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) .home-menu').should('exist');

        cy.viewport(1920, 800);
        cy.get('@breadcrumbs').find('post-breadcrumb-item[variant="menuitem"]').should('not.exist');
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) .home-menu').should('not.exist');
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .filter((_, el) => !el.closest('.invisible'))
          .should('not.match', '[standalone]:not([standalone="false"])');
      });
    });
  });

  describe('home link', () => {
    describe('client-side routing (slotted anchor)', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'client-side-routing');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it.skip('should render the slotted anchor instead of the internal one built from home-url', () => {
        // Scoped to the visible nav, since the off-screen clone used for overflow measurement
        // legitimately embeds a copy of the slotted anchor to measure its width.
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) a[href="/"]').should('not.exist');
        cy.get('@breadcrumbs').children('a[slot="home"]').should('exist').and('have.attr', 'href');
      });
    });

    describe('overflow measurement', () => {
      it.skip('should collapse the same number of items whether the home link is internal or slotted', () => {
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

    // NOTE: like the "three-stage degrade sequence" tests above, most viewport widths below are
    // unverified guesses — confirm and adjust them against the real Storybook build before
    // un-skipping. The one active test further down doesn't depend on exact widths.
    describe('segment specific breadcrumbs', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'custom-home-text');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it.skip('should hide the home icon and display text-home visibly when home-text is true', () => {
        // Wide enough that home's long text and the last item's long text both still fit
        // single-line — under the corrected collapse order, home only stays uncollapsed once
        // both fit together with no wrapping cushion from the last item.
        cy.viewport(2000, 400);
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) .home post-icon')
          .should('not.exist');
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) .home span')
          .should('not.have.class', 'visually-hidden')
          .and('have.text', 'Private customers');
      });

      it.skip('should restore the default home icon when home-text is set back to false', () => {
        cy.viewport(2000, 400);
        cy.get('@breadcrumbs').invoke('removeAttr', 'home-text');
        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) .home post-icon').should('exist');
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) .home span')
          .should('have.class', 'visually-hidden');
      });

      it.skip('should render the home item in full, not wrapped, when there is enough space for it', () => {
        cy.viewport(2000, 400);
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) .home')
          .should('exist')
          .and('not.have.class', 'home-menu');
      });

      it.skip('should never truncate the last (selected) segment, wrapping it instead', () => {
        cy.viewport(120, 400);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .shadow()
          .find('a, span')
          .then($selected => {
            expect($selected.get(0).scrollWidth).to.be.at.most($selected.get(0).clientWidth + 1);
          });
      });

      it.skip('should collapse the middle segments into the overflow menu when there is not enough space for them', () => {
        // The story text is now realistic-length rather than artificially long, so this no
        // longer overflows at the default (wide) viewport on its own — needs an explicit
        // narrow width.
        cy.viewport(400, 400);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length.greaterThan', 0);

        // The first (home) and last (selected) segments must never be collapsed, only the middle ones.
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .should('not.have.attr', 'variant', 'menuitem');
      });

      it('should collapse the home item at a width no narrower than where the last item starts wrapping', () => {
        assertHomeCollapsesNoLaterThanLastItemWraps();
      });

      it.skip('should only wrap the last item once home has also collapsed and there is still no room', () => {
        cy.viewport(120, 400);

        cy.get('@breadcrumbs').shadow().find('nav:not(.invisible) .home-menu').should('exist');
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .filter((_, el) => !el.closest('.invisible'))
          .should('match', '[standalone]:not([standalone="false"])');
      });
    });
  });
});
