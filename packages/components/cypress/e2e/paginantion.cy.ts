const PAGINATION_ID = 'd6f8b5c7-4e2a-4f3a-9d3a-1a2b3c4d5e6f'; // Replace with actual ID from your Storybook

describe('pagination', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID);
      cy.get('@pagination').find('.pagination-link').not('.pagination-control-button').as('pageButtons');
      cy.get('@pagination').find('.pagination-control-button').first().as('prevButton');
      cy.get('@pagination').find('.pagination-control-button').last().as('nextButton');
    });

    it('should render', () => {
      cy.get('@pagination').should('exist');
    });

    it('should render correct number of page buttons', () => {
      cy.get('@pagination')
        .invoke('attr', 'collection-size')
        .then(collectionSize => {
          cy.get('@pagination')
            .invoke('attr', 'page-size')
            .then(pageSize => {
              const expectedPages = Math.ceil(Number(collectionSize) / Number(pageSize));
              cy.get('@pageButtons').should('have.length.at.least', 1);
              cy.get('@pageButtons').should('have.length.at.most', expectedPages);
            });
        });
    });

    it('should highlight the current page with aria-current', () => {
      cy.get('@pagination')
        .invoke('attr', 'page')
        .then(currentPage => {
          cy.get('.pagination-link-active')
            .should('have.length', 1)
            .should('have.attr', 'aria-current', 'page')
            .find('span[aria-hidden="true"]')
            .should('contain', currentPage || '1');
        });
    });

    it('should only show one active page at a time', () => {
      cy.get('.pagination-link-active').should('have.length', 1);
      cy.get('[aria-current="page"]').should('have.length', 1);
    });

    it('should disable previous button on first page', () => {
      cy.get('@pagination').invoke('attr', 'page', '1');
      cy.wait(100);
      cy.get('@prevButton').should('be.disabled');
      cy.get('@prevButton').should('have.class', 'pagination-link-disabled');
    });

    it('should disable next button on last page', () => {
      cy.get('@pagination')
        .invoke('attr', 'collection-size')
        .then(collectionSize => {
          cy.get('@pagination')
            .invoke('attr', 'page-size')
            .then(pageSize => {
              const lastPage = Math.ceil(Number(collectionSize) / Number(pageSize));
              cy.get('@pagination').invoke('attr', 'page', String(lastPage));
              cy.wait(100);
              cy.get('@nextButton').should('be.disabled');
              cy.get('@nextButton').should('have.class', 'pagination-link-disabled');
            });
        });
    });

    it('should navigate to next page when next button is clicked', () => {
      cy.get('@pagination').invoke('attr', 'page', '1');
      cy.wait(100);
      
      cy.get('@nextButton').click();
      cy.wait(100);
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '2');
    });

    it('should navigate to previous page when previous button is clicked', () => {
      cy.get('@pagination').invoke('attr', 'page', '3');
      cy.wait(100);
      
      cy.get('@prevButton').click();
      cy.wait(100);
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '2');
    });

    it('should navigate to specific page when page button is clicked', () => {
      cy.get('@pageButtons').contains('3').click();
      cy.wait(100);
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '3');
    });

    it('should emit postChange event when page changes', () => {
      cy.get('@pagination').then($el => {
        const element = $el[0] as HTMLPostPaginationElement;
        
        cy.spy(element, 'dispatchEvent').as('dispatchEvent');
        
        cy.get('@nextButton').click();
        cy.wait(100);
        
        cy.get('@dispatchEvent').should('have.been.called');
      });
    });
  });

  describe('ellipsis', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID, 'many-pages');
      cy.get('@pagination').find('.pagination-ellipsis').as('ellipsis');
    });

    it('should display ellipsis when there are many pages', () => {
      cy.get('@ellipsis').should('exist');
    });

    it('should hide ellipsis content from screen readers', () => {
      cy.get('@ellipsis')
        .find('.pagination-ellipsis-content')
        .should('have.attr', 'aria-hidden', 'true');
    });

    it('should show ellipsis on left side when navigating to later pages', () => {
      cy.get('@pagination')
        .invoke('attr', 'collection-size')
        .then(collectionSize => {
          cy.get('@pagination')
            .invoke('attr', 'page-size')
            .then(pageSize => {
              const lastPage = Math.ceil(Number(collectionSize) / Number(pageSize));
              cy.get('@pagination').invoke('attr', 'page', String(lastPage));
              cy.wait(100);
              
              cy.get('.pagination-ellipsis').should('exist');
            });
        });
    });

    it('should update ellipsis position when navigating between pages', () => {
      cy.get('@pagination').invoke('attr', 'page', '1');
      cy.wait(100);
      
      const ellipsisCountFirst = Cypress.$('.pagination-ellipsis').length;
      
      cy.get('@pagination').invoke('attr', 'page', '5');
      cy.wait(100);
      
      cy.get('.pagination-ellipsis').should('exist');
      cy.get('.pagination-ellipsis').then($ellipsis => {
        expect($ellipsis.length).to.be.at.least(ellipsisCountFirst);
      });
    });
  });

  describe('dynamic updates', () => {
    beforeEach(() => {
      cy.getComponent('pagination', PAGINATION_ID, 'dynamic');
      cy.get('@pagination').find('.pagination-link').not('.pagination-control-button').as('pageButtons');
    });

    it('should update when page prop changes', () => {
      cy.get('@pagination').invoke('attr', 'page', '1');
      cy.wait(100);
      cy.get('.pagination-link-active').find('span[aria-hidden="true"]').should('contain', '1');
      
      cy.get('@pagination').invoke('attr', 'page', '3');
      cy.wait(100);
      cy.get('.pagination-link-active').find('span[aria-hidden="true"]').should('contain', '3');
    });

    it('should update when pageSize changes', () => {
      cy.get('@pagination').invoke('attr', 'page-size', '10');
      cy.wait(100);
      const initialButtonCount = Cypress.$('.pagination-link').not('.pagination-control-button').length;
      
      cy.get('@pagination').invoke('attr', 'page-size', '5');
      cy.wait(100);
      
      cy.get('@pageButtons').should('have.length.at.least', initialButtonCount);
    });

    it('should update when collectionSize changes', () => {
      cy.get('@pagination').invoke('attr', 'collection-size', '50');
      cy.wait(100);
      const initialButtonCount = Cypress.$('.pagination-link').not('.pagination-control-button').length;
      
      cy.get('@pagination').invoke('attr', 'collection-size', '100');
      cy.wait(100);
      
      cy.get('@pageButtons').should('have.length.at.least', initialButtonCount);
    });

    it('should clamp page to valid range when collectionSize decreases', () => {
      cy.get('@pagination').invoke('attr', 'page', '10');
      cy.get('@pagination').invoke('attr', 'collection-size', '20');
      cy.get('@pagination').invoke('attr', 'page-size', '10');
      cy.wait(100);
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .invoke('text')
        .then(text => {
          expect(Number(text)).to.be.at.most(2);
        });
    });
  });

  describe('edge cases', () => {
    it('should not render when collectionSize is smaller than pageSize', () => {
      cy.getComponent('pagination', PAGINATION_ID, 'single-page');
      cy.get('post-pagination').should('not.be.visible');
    });

    it('should not render when collectionSize is zero', () => {
      cy.getComponent('pagination', PAGINATION_ID, 'empty');
      cy.get('post-pagination').should('not.be.visible');
    });

    it('should clamp page to 1 when page is less than 1', () => {
      cy.getComponent('pagination', PAGINATION_ID);
      cy.get('@pagination').invoke('attr', 'page', '-1');
      cy.wait(100);
      
      cy.get('.pagination-link-active')
        .find('span[aria-hidden="true"]')
        .should('contain', '1');
    });

    it('should clamp page to last page when page exceeds total pages', () => {
      cy.getComponent('pagination', PAGINATION_ID);
      cy.get('@pagination')
        .invoke('attr', 'collection-size')
        .then(collectionSize => {
          cy.get('@pagination')
            .invoke('attr', 'page-size')
            .then(pageSize => {
              const lastPage = Math.ceil(Number(collectionSize) / Number(pageSize));
              cy.get('@pagination').invoke('attr', 'page', '9999');
              cy.wait(100);
              
              cy.get('.pagination-link-active')
                .find('span[aria-hidden="true"]')
                .should('contain', String(lastPage));
            });
        });
    });
  });

  describe('keyboard navigation', () => {
  beforeEach(() => {
    cy.getComponent('pagination', PAGINATION_ID);
    cy.get('@pagination').find('.pagination-link').not('.pagination-control-button').as('pageButtons');
    cy.get('@pagination').find('.pagination-control-button').first().as('prevButton');
    cy.get('@pagination').find('.pagination-control-button').last().as('nextButton');
  });

  it('should allow focus on all enabled controls', () => {
    cy.get('.pagination-link:not([disabled])').each($button => {
      cy.wrap($button).focus();
      cy.wrap($button).should('have.focus');
    });
  });

  it('should activate control with Enter key', () => {
    cy.get('@pagination').invoke('attr', 'page', '1');
    cy.wait(100);
    
    cy.get('@pageButtons').contains('2').focus().type('{enter}');
    cy.wait(100);
    
    cy.get('.pagination-link-active')
      .find('span[aria-hidden="true"]')
      .should('contain', '2');
  });

  it('should activate control with Space key', () => {
    cy.get('@pagination').invoke('attr', 'page', '1');
    cy.wait(100);
    
    cy.get('@pageButtons').contains('3').focus().type(' ');
    cy.wait(100);
    
    cy.get('.pagination-link-active')
      .find('span[aria-hidden="true"]')
      .should('contain', '3');
  });

  it('should activate next button with Enter key', () => {
    cy.get('@pagination').invoke('attr', 'page', '1');
    cy.wait(100);
    
    cy.get('@nextButton').focus().type('{enter}');
    cy.wait(100);
    
    cy.get('.pagination-link-active')
      .find('span[aria-hidden="true"]')
      .should('contain', '2');
  });

  it('should activate previous button with Space key', () => {
    cy.get('@pagination').invoke('attr', 'page', '3');
    cy.wait(100);
    
    cy.get('@prevButton').focus().type(' ');
    cy.wait(100);
    
    cy.get('.pagination-link-active')
      .find('span[aria-hidden="true"]')
      .should('contain', '2');
  });

  it('should not allow focus on disabled controls', () => {
    cy.get('@pagination').invoke('attr', 'page', '1');
    cy.wait(100);
    
    cy.get('@prevButton').should('be.disabled');
    cy.get('@prevButton').should('have.attr', 'tabindex', '-1');
  });

  it('should have proper focus management', () => {
    cy.get('@pagination').invoke('attr', 'page', '2');
    cy.wait(100);
    
    // Focus and activate a page button
    cy.get('@pageButtons').contains('3').focus().type('{enter}');
    cy.wait(100);
    
    // Verify the new page is active
    cy.get('.pagination-link-active')
      .find('span[aria-hidden="true"]')
      .should('contain', '3');
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

    it('should have aria-current on active page', () => {
      cy.get('.pagination-link-active').should('have.attr', 'aria-current', 'page');
    });

    it('should have appropriate aria-label for previous button', () => {
      cy.get('@pagination')
        .find('.pagination-control-button')
        .first()
        .should('have.attr', 'aria-label');
    });

    it('should have appropriate aria-label for next button', () => {
      cy.get('@pagination')
        .find('.pagination-control-button')
        .last()
        .should('have.attr', 'aria-label');
    });

    it('should have visually hidden label text for screen readers', () => {
      cy.get('.visually-hidden').should('exist');
      cy.get('.pagination-control-button').first().find('.visually-hidden').should('exist');
      cy.get('.pagination-control-button').last().find('.visually-hidden').should('exist');
    });

    it('should have descriptive aria-label for each page button', () => {
      cy.get('.pagination-link')
        .not('.pagination-control-button')
        .each($button => {
          cy.wrap($button).should('have.attr', 'aria-label');
          cy.wrap($button)
            .invoke('attr', 'aria-label')
            .should('match', /page|seite|pagina/i);
        });
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

    it('should hide ellipsis from screen readers', () => {
      cy.get('.pagination-ellipsis-content').each($ellipsis => {
        cy.wrap($ellipsis).should('have.attr', 'aria-hidden', 'true');
      });
    });

    it('should have proper tabindex for enabled controls', () => {
      cy.get('.pagination-link:not([disabled])').each($button => {
        cy.wrap($button).should('have.attr', 'tabindex', '0');
      });
    });

    it('should have tabindex -1 for disabled controls', () => {
      cy.get('.pagination-link[disabled]').each($button => {
        cy.wrap($button).should('have.attr', 'tabindex', '-1');
      });
    });
  });

  describe('responsive behavior', () => {
    it('should adapt to narrow viewport', () => {
      cy.viewport(375, 667); // Mobile
      cy.getComponent('pagination', PAGINATION_ID, 'many-pages');
      cy.wait(200); // Wait for resize handler
      
      cy.get('.pagination-link')
        .not('.pagination-control-button')
        .should('have.length.at.most', 7);
      cy.get('.pagination-ellipsis').should('exist');
    });

    it('should adapt to wide viewport', () => {
      cy.viewport(1920, 1080); // Desktop
      cy.getComponent('pagination', PAGINATION_ID, 'many-pages');
      cy.wait(200); // Wait for resize handler
      
      cy.get('.pagination-link').not('.pagination-control-button').should('exist');
    });

    it('should recalculate visible pages on resize', () => {
      cy.getComponent('pagination', PAGINATION_ID, 'many-pages');
      cy.viewport(1920, 1080);
      cy.wait(200);
      
      const wideCount = Cypress.$('.pagination-link').not('.pagination-control-button').length;
      
      cy.viewport(375, 667);
      cy.wait(200);
      
      cy.get('.pagination-link')
        .not('.pagination-control-button')
        .should('have.length.at.most', wideCount);
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('pagination');
    cy.checkA11y('#root-inner');
  });
});