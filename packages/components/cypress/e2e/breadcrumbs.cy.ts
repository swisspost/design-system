const BREADCRUMB_ITEM_ID = 'b7db7391-f893-4b1e-a125-b30c6f0b028d';
const BREADCRUMBS_ID = 'b7db7391-f893-4b1e-a125-b30c6f0b028b';

describe('breadcrumbs', () => {
  // Checks home collapses at a width no narrower than where the last item wraps, across a
  // range of widths rather than one fragile pixel value. Requires a `@breadcrumbs` alias.
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
        // The off-screen measurement clone always force-expands to variant="listitem", so it
        // never matches [variant="menuitem"] and doesn't need to be filtered out here.
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length', 15 - 6); // itemCount (15, Concatenated story) minus MAX_VISIBLE_ITEMS
      });

      it.skip('should collapse items starting from the earliest segment, closest to home', () => {
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item')
          // Excludes the off-screen measurement clone, which duplicates every item.
          .filter((_, el) => !el.closest('.invisible'))
          .then($items => {
            const variants = $items.toArray().map(item => item.getAttribute('variant'));
            const firstListItemIndex = variants.indexOf('listitem');
            expect(variants.slice(0, firstListItemIndex)).to.satisfy((v: string[]) =>
              v.every(variant => variant === 'menuitem'),
            );
          });
      });

      it.skip('should not mark the last item standalone while middle items are still visible', () => {
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length.greaterThan', 0);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[selected]:not([selected="false"])')
          .filter((_, el) => !el.closest('.invisible'))
          // `standalone` reflects as an empty-string attribute when true, not the text "true".
          .should('not.match', '[standalone]:not([standalone="false"])');
      });
    });

    // NOTE: viewport widths in the skipped tests below are unverified guesses — confirm against
    // a real Storybook build before un-skipping. Degrade order: middle items collapse first ->
    // home collapses into its own menu -> only then does the last item wrap.
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
        // Scoped to the visible nav — the off-screen measurement clone also embeds a copy.
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

    // NOTE: viewport widths below are unverified guesses — confirm against a real Storybook
    // build before un-skipping.
    describe('segment specific breadcrumbs', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'custom-home-text');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it.skip('should hide the home icon and display text-home visibly when home-text is true', () => {
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
        cy.viewport(400, 400);
        cy.get('@breadcrumbs')
          .find('post-breadcrumb-item[variant="menuitem"]')
          .should('have.length.greaterThan', 0);

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
