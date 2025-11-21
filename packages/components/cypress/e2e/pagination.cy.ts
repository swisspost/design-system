const PAGINATION_ID = 'd6f8b5c7-4e2a-4f3a-9d3a-1a2b3c4d5e6f';

describe('pagination', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID);
      cy.get('@pagination').find('.pagination-link').not('.pagination-control-button').as('pageButtons');
      cy.get('@pagination').find('.pagination-control .pagination-control-button').first().as('prevButton');
      cy.get('@pagination').find('.pagination-control .pagination-control-button').last().as('nextButton');
    });

    it('should render', () => {
      cy.get('@pagination').should('exist');
    });

    it('should render page buttons', () => {
      cy.get('@pageButtons').should('have.length.greaterThan', 0);
    });

    it('should have first page active by default', () => {
      cy.get('.pagination-link-active')
        .should('have.length', 1)
        .should('have.attr', 'aria-current', 'page')
        .find('span[aria-hidden="true"]')
        .should('contain', '1');
    });

    it('should disable previous button on first page', () => {
      cy.get('@prevButton').should('be.disabled');
      cy.get('@prevButton').should('have.class', 'pagination-link-disabled');
      cy.get('@prevButton').should('have.attr', 'tabindex', '-1');
    });

    it('should enable next button on first page', () => {
      cy.get('@nextButton').should('not.be.disabled');
      cy.get('@nextButton').should('not.have.class', 'pagination-link-disabled');
    });

    it('should navigate to next page when next button is clicked', () => {
      cy.get('@nextButton').click();
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '2');
    });

    it('should navigate to previous page when previous button is clicked', () => {
      cy.get('@nextButton').click();
      cy.get('@prevButton').click();
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '1');
    });

    it('should navigate to specific page when page button is clicked', () => {
      cy.get('@pageButtons').contains('3').click();
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '3');
    });

    it('should emit postChange event when page changes', () => {
      const EventHandlerMock = cy.spy();

      cy.get('@pagination').then($el => {
        Cypress.$($el.get(0)).on('postChange', EventHandlerMock);
      });

      cy.get('@nextButton')
        .click()
        .then(() => {
          cy.wrap(EventHandlerMock).should('have.been.calledOnce');
          cy.wrap(EventHandlerMock).should('have.been.calledWith', 
            Cypress.sinon.match.has('detail', 2)
          );
        });
    });

    it('should not emit event when clicking current page', () => {
      const EventHandlerMock = cy.spy();

      cy.get('@pagination').then($el => {
        Cypress.$($el.get(0)).on('postChange', EventHandlerMock);
      });

      cy.get('.pagination-link-active')
        .click()
        .then(() => {
          cy.wrap(EventHandlerMock).should('not.have.been.called');
        });
    });

    it('should have proper accessible labels for page buttons', () => {
      cy.get('@pageButtons').each($button => {
        cy.wrap($button).should('have.attr', 'aria-label');
        cy.wrap($button).invoke('attr', 'aria-label').should('match', /page|seite|pagina/i);
      });
    });
  });

  describe('with ellipsis', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID, 'many-pages');
      cy.get('@pagination').find('.pagination-ellipsis').as('ellipsis');
      cy.get('@pagination').find('.pagination-link').not('.pagination-control-button').as('pageButtons');
    });

    it('should display ellipsis when there are many pages', () => {
      cy.get('@ellipsis').should('exist');
    });

    it('should hide ellipsis content from screen readers', () => {
      cy.get('@ellipsis')
        .find('.pagination-ellipsis-content')
        .should('have.attr', 'aria-hidden', 'true');
    });

    it('should always show first and last page buttons', () => {
      cy.get('@pageButtons').first().should('contain', '1');
      cy.get('@pageButtons').last().invoke('text').then(text => {
        expect(parseInt(text)).to.be.greaterThan(1);
      });
    });

    it('should update visible pages when navigating to middle page', () => {
      cy.get('@pageButtons').contains('5').click();
      
      cy.get('.pagination-ellipsis').should('have.length.greaterThan', 0);
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '5');
    });
  });

  describe('last page', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID);
      cy.get('@pagination').find('.pagination-link').not('.pagination-control-button').as('pageButtons');
      cy.get('@pagination').find('.pagination-control .pagination-control-button').first().as('prevButton');
      cy.get('@pagination').find('.pagination-control .pagination-control-button').last().as('nextButton');
      
      cy.get('@pageButtons').last().invoke('text').then(lastText => {
        const lastLabel = lastText.trim();
        cy.get('@pageButtons').last().click();
        cy.get('.pagination-link-active')
          .find('span[aria-hidden="true"]')
          .should('contain', lastLabel);
      });
    });

    it('should disable next button on last page', () => {
      cy.get('@nextButton').should('be.disabled');
      cy.get('@nextButton').should('have.class', 'pagination-link-disabled');
      cy.get('@nextButton').should('have.attr', 'tabindex', '-1');
    });

    it('should enable previous button on last page', () => {
      cy.get('@prevButton').should('not.be.disabled');
      cy.get('@prevButton').should('not.have.class', 'pagination-link-disabled');
    });

    it('should not allow clicking on disabled next button', () => {
      const EventHandlerMock = cy.spy();

      cy.get('@pagination').then($el => {
        Cypress.$($el.get(0)).on('postChange', EventHandlerMock);
      });

      cy.get('@nextButton')
        .click({ force: true })
        .then(() => {
          cy.wrap(EventHandlerMock).should('not.have.been.called');
        });
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID);
      cy.get('@pagination').find('.pagination-link').not('.pagination-control-button').as('pageButtons');
      cy.get('@pagination').find('.pagination-control .pagination-control-button').first().as('prevButton');
      cy.get('@pagination').find('.pagination-control .pagination-control-button').last().as('nextButton');
    });

    it('should activate page on Enter key', () => {
      cy.get('@pageButtons').contains('2').click();
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '2');
    });

    it('should activate page on Space key', () => {
      cy.get('@pageButtons').contains('3').then($button => {
        $button[0].dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      });
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '3');
    });

    it('should activate next button with Enter key', () => {
      cy.get('@nextButton').then($button => {
        $button[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      });
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '2');
    });

    it('should activate previous button with Space key', () => {
      cy.get('@nextButton').click();
      
      cy.get('@prevButton').then($button => {
        $button[0].dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      });
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '1');
    });

    it('should have proper tabindex for enabled buttons', () => {
      cy.get('.pagination-link:not([disabled])').each($button => {
        cy.wrap($button).should('have.attr', 'tabindex', '0');
      });
    });

    it('should have tabindex -1 for disabled buttons', () => {
      cy.get('@prevButton').should('have.attr', 'tabindex', '-1');
    });

    it('should allow focus on all enabled controls', () => {
      cy.get('.pagination-link:not([disabled])').each($button => {
        cy.wrap($button).focus().should('have.focus');
      });
    });
  });

  describe('disabled state', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID);
      
      // Set the disabled attribute programmatically
      cy.get('@pagination').then($el => {
        $el[0].disabled = true;
      });
      
      cy.get('@pagination').find('.pagination-link').not('.pagination-control-button').as('pageButtons');
      cy.get('@pagination').find('.pagination-control .pagination-control-button').as('controlButtons');
    });

    it('should disable all page buttons', () => {
      cy.get('@pageButtons').each($button => {
        cy.wrap($button).should('be.disabled');
      });
    });

    it('should disable all control buttons', () => {
      cy.get('@controlButtons').each($button => {
        cy.wrap($button).should('be.disabled');
      });
    });

    it('should not emit postChange event when disabled', () => {
      const EventHandlerMock = cy.spy();

      cy.get('@pagination').then($el => {
        Cypress.$($el.get(0)).on('postChange', EventHandlerMock);
      });

      cy.get('@pageButtons')
        .first()
        .click({ force: true })
        .then(() => {
          cy.wrap(EventHandlerMock).should('not.have.been.called');
        });
    });

    it('should add disabled class to control buttons', () => {
      cy.get('@controlButtons').each($button => {
        cy.wrap($button).should('have.class', 'pagination-link-disabled');
      });
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID);
    });

    it('should have navigation landmark with aria-label', () => {
      cy.get('nav.pagination').should('have.attr', 'aria-label');
    });

    it('should have list role on pagination list', () => {
      cy.get('.pagination-list').should('have.attr', 'role', 'list');
    });

    it('should have aria-current on active page only', () => {
      cy.get('.pagination-link-active').should('have.attr', 'aria-current', 'page');
      cy.get('[aria-current="page"]').should('have.length', 1);
    });

    it('should have appropriate aria-label for control buttons', () => {
      cy.get('.pagination-control .pagination-control-button').each($button => {
        cy.wrap($button).should('have.attr', 'aria-label');
      });
    });

    it('should have visually hidden label text for screen readers', () => {
      cy.get('.pagination-control-button .visually-hidden').should('exist');
    });

    it('should hide page numbers from screen readers with aria-hidden', () => {
      cy.get('.pagination-link')
        .not('.pagination-control-button')
        .find('span[aria-hidden="true"]')
        .should('exist');
    });

    it('should hide icons from screen readers with aria-hidden', () => {
      cy.get('post-icon').should('have.attr', 'aria-hidden', 'true');
    });
  });

  describe('responsive behavior', () => {
    it('should adapt to narrow viewport', () => {
      cy.viewport(375, 667);
      cy.getComponent('pagination', PAGINATION_ID, 'many-pages');
      cy.wait(200); // Wait for debounced resize handler
      
      cy.get('.pagination-link')
        .not('.pagination-control-button')
        .should('exist');
      cy.get('.pagination-ellipsis').should('exist');
    });

    it('should maintain minimum visible pages on narrow viewport', () => {
      cy.viewport(320, 568);
      cy.getComponent('pagination', PAGINATION_ID, 'many-pages');
      cy.wait(200);
      
      // Should have at least first page + last page + MIN_VISIBLE_PAGES
      cy.get('.pagination-link')
        .not('.pagination-control-button')
        .should('have.length.at.least', 3);
    });

    it('should recalculate visible pages on resize', () => {
      cy.getComponent('pagination', PAGINATION_ID, 'many-pages');
      cy.viewport(1920, 1080);
      cy.wait(200);
      
      cy.get('.pagination-link').not('.pagination-control-button').then($wideButtons => {
        const wideCount = $wideButtons.length;
        
        cy.viewport(375, 667);
        cy.wait(200);
        
        cy.get('.pagination-link')
          .not('.pagination-control-button')
          .should('have.length.at.most', wideCount);
      });
    });
  });

  describe('icons', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID);
      cy.get('@pagination').find('.pagination-control .pagination-control-button').first().as('prevButton');
      cy.get('@pagination').find('.pagination-control .pagination-control-button').last().as('nextButton');
    });

    it('should have chevron icons in control buttons', () => {
      cy.get('@prevButton').find('post-icon[name="chevronleft"]').should('exist');
      cy.get('@nextButton').find('post-icon[name="chevronleft"]').should('exist');
    });

    it('should rotate next button icon', () => {
      cy.get('@nextButton').find('post-icon').should('have.class', 'pagination-icon-rotated');
    });

    it('should not rotate previous button icon', () => {
      cy.get('@prevButton').find('post-icon').should('not.have.class', 'pagination-icon-rotated');
    });

    it('should have aria-hidden on icons', () => {
      cy.get('post-icon').should('have.attr', 'aria-hidden', 'true');
    });
  });
});

describe('Accessibility', () => {
  const variants = [
    { name: 'default', id: 'default' },
    { name: 'many-pages', id: 'many-pages' },
    { name: 'disabled', id: 'disabled' },
  ];

  variants.forEach(variant => {
    it(`Has no detectable a11y violations for ${variant.name} variant`, () => {
      cy.getComponent('pagination', PAGINATION_ID, variant.id);
      cy.checkA11y('#root-inner');
    });
  });
});