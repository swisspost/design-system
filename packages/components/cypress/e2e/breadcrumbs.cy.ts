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

  describe('home link', () => {
    describe('client-side routing (slotted anchor)', () => {
      beforeEach(() => {
        cy.getComponent('breadcrumbs', BREADCRUMBS_ID, 'client-side-routing');
        cy.get('post-breadcrumbs[data-hydrated]', { timeout: 30000 }).as('breadcrumbs');
      });

      it('should render the slotted anchor instead of the internal one built from home-url', () => {
        // Scoped to the visible nav, since the off-screen clone used for overflow measurement
        // legitimately embeds a copy of the slotted anchor to measure its width.
        cy.get('@breadcrumbs')
          .shadow()
          .find('nav:not(.invisible) a[href="/"]')
          .should('not.exist');
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
              `/iframe.html?id=${BREADCRUMBS_ID}--client-side-routing&args=itemCount:15`,
            );
            cy.get('post-breadcrumb-item[data-hydrated]', { timeout: 30000 });
            cy.get('post-breadcrumb-item[variant="menuitem"]').should(
              'have.length',
              defaultCollapsedCount,
            );
          });
      });
    });
  });
});
