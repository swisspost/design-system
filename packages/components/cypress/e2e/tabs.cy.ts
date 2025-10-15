const TABS_ID = 'bb1291ca-4dbb-450c-a15f-596836d9f39e';

describe('tabs', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID);
      cy.get('post-tab-item').as('tabItems');
    });

    it('should render', () => {
      cy.get('@tabs').should('exist');
    });

    it('should show three tab headers', () => {
      cy.get('@tabItems').should('have.length', 3);
    });

    it('should only show the first tab header as active', () => {
      cy.get('post-tab-item.active').each(($header, index) => {
        cy.wrap($header).should(index === 0 ? 'exist' : 'not.exist');
      });
    });

    it('should only show the tab panel associated with the first tab header', () => {
      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@tabItems')
        .first()
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('@panel').invoke('attr', 'for').should('equal', tabName);
        });
    });

    it('should activate a clicked tab header and deactivate the tab header that was previously activated', () => {
      cy.get('@tabItems').last().click();

      cy.get('@tabItems').first().should('not.have.class', 'active');
      cy.get('@tabItems').last().should('have.class', 'active');
    });

    it('should show the panel associated with a clicked tab header and hide the panel that was previously shown', () => {
      cy.get('@tabItems').last().click();

      // Wait for transition to complete
      cy.get('post-tab-panel:visible').should('have.length', 1);
      
      cy.get('@tabItems')
        .last()
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('post-tab-panel:visible').invoke('attr', 'for').should('equal', tabName);
        });
    });
  });

  describe('active panel', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'active-tab');
      cy.get('post-tab-item').as('tabItems');
      cy.get('post-tab-panel:visible').as('panel');
    });

    it('should only show the requested active tab panel', () => {
      cy.get('@panel').should('have.length', 1);
      cy.get('@tabs')
        .invoke('attr', 'active-tab')
        .then(activeTab => {
          cy.get('@panel').invoke('attr', 'for').should('equal', activeTab);
        });
    });

    it('should show as active only the tab header associated with the requested active tab panel', () => {
      cy.get('@tabs')
        .invoke('attr', 'active-tab')
        .then(activeTab => {
          cy.get('@tabItems').each($header => {
            cy.wrap($header)
              .invoke('attr', 'name')
              .then(tabName => {
                cy.wrap($header.filter('.active')).should(
                  tabName === activeTab ? 'exist' : 'not.exist',
                );
              });
          });
        });
    });
  });

  describe('async', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'async');
      cy.get('post-tab-item').as('tabItems');
    });

    it('should add a tab header', () => {
      cy.get('#add-tab').click();
      cy.get('@tabItems').should('have.length', 4);
    });

    it('should still show the tab panel associated with the first tab header after adding new tab', () => {
      cy.get('#add-tab').click();

      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@tabItems')
        .first()
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('@panel').invoke('attr', 'for').should('equal', tabName);
        });
    });

    it('should activate the newly added tab header after clicking on it', () => {
      cy.get('#add-tab').click();

      cy.get('post-tab-item').as('tabItems');
      cy.get('@tabItems').last().click();

      cy.get('@tabItems').first().should('not.have.class', 'active');
      cy.get('@tabItems').last().should('have.class', 'active');
    });

    it('should display the tab panel associated with the newly added tab after clicking on it', () => {
      cy.get('#add-tab').click();

      cy.get('post-tab-item').last().as('new-tab');
      cy.get('@new-tab').click();

      cy.get('post-tab-panel:visible').should('have.length', 1);
      
      cy.get('@new-tab')
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('post-tab-panel:visible').invoke('attr', 'for').should('equal', tabName);
        });
    });

    it('should remove a tab header', () => {
      cy.get('.tab-title.active').then(() => {
        cy.get('#remove-active-tab').click();
        cy.get('@tabItems').should('have.length', 2);
      });
    });

    it('should still show an active tab header after removing the active tab', () => {
      cy.get('.tab-title.active').then(() => {
        cy.get('#remove-active-tab').click();
        cy.get('.tab-title.active').should('exist');
      });
    });

    it('should still show a tab panel after removing the active tab', () => {
      cy.get('.tab-title.active').then(() => {
        cy.get('#remove-active-tab').click();
        cy.get('post-tab-panel:visible').should('exist');
      });
    });
  });

  describe('navigation mode', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'navigation-variant');
      cy.get('post-tab-item').as('tabItems');
    });

    it('should render as navigation when tabs contain anchor elements', () => {
      cy.get('@tabs').should('exist');
      cy.get('@tabItems').should('have.length', 3);
      cy.get('@tabItems').each($item => {
        cy.wrap($item).find('a').should('exist');
      });
    });

    it('should not render tab panels in navigation mode', () => {
      cy.get('post-tab-panel').should('not.exist');
      cy.get('@tabs').find('[part="content"]').should('not.exist');
    });

    it('should render the tabs container as nav element', () => {
      cy.get('@tabs').find('nav[role="navigation"], nav').should('exist');
    });

    it('should set proper ARIA attributes for navigation', () => {
      cy.get('@tabs').find('nav').should('have.attr', 'aria-label', 'Tabs navigation');
    });

    it('should support programmatic tab activation via show() method', () => {
      cy.get('@tabs').then($tabs => {
        const tabsElement = $tabs[0] as HTMLElement & { show: (tabName: string) => void };
        tabsElement.show('second');
      });
      cy.get('@tabItems').eq(1).should('have.class', 'active');
    });

    it('should detect active tab based on aria-current="page"', () => {
      cy.getComponent('tabs', TABS_ID, 'navigation-with-current');
      
      cy.get('post-tab-item').eq(1).should('have.class', 'active');
    });
  });

  describe('mode detection', () => {
    it('should detect panels mode when no anchor elements are present', () => {
      cy.getComponent('tabs', TABS_ID, 'default');
      cy.get('post-tabs').should('exist');
      cy.get('post-tab-panel').should('exist');
      cy.get('post-tabs').find('[part="content"]').should('exist');
    });

    it('should detect navigation mode when anchor elements are present', () => {
      cy.getComponent('tabs', TABS_ID, 'navigation-variant');
      cy.get('post-tabs').should('exist');
      cy.get('post-tab-panel').should('not.exist');
      cy.get('post-tabs').find('nav').should('exist');
    });

    it('should handle mixed mode usage', () => {
      cy.getComponent('tabs', TABS_ID, 'mixed-mode');
      
      cy.get('post-tabs').should('exist');
      cy.get('post-tab-item').should('exist');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('tabs');
    
    cy.get('post-tabs').should('be.visible');
    cy.get('post-tab-item').should('exist');
    
    cy.wait(100);
    
    cy.checkA11y('#root-inner');
  });

  describe('panels mode ARIA attributes', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'default');
    });

    it('should have proper ARIA attributes for panels mode', () => {
      cy.get('post-tabs').find('[role="tablist"]').should('exist');
      cy.get('post-tab-item').should('have.attr', 'role', 'tab');
      cy.get('post-tab-item').should('have.attr', 'aria-selected');
      cy.get('post-tab-item').first().should('have.attr', 'aria-selected', 'true');
      cy.get('post-tab-item').not(':first').should('have.attr', 'aria-selected', 'false');
    });

    it('should link tabs to panels with aria-controls and aria-labelledby', () => {
      cy.get('post-tab-item').first().then($tab => {
        const tabId = $tab.attr('id');
        const ariaControls = $tab.attr('aria-controls');
        
        cy.get(`post-tab-panel[id="${ariaControls}"]`).should('exist');
        cy.get(`post-tab-panel[id="${ariaControls}"]`).should('have.attr', 'aria-labelledby', tabId);
      });
    });

    it('should manage tabindex properly', () => {
      cy.get('post-tab-item').first().should('have.attr', 'tabindex', '0');
      cy.get('post-tab-item').not(':first').should('have.attr', 'tabindex', '-1');
      
      cy.get('post-tab-item').last().click();
      cy.get('post-tab-item').last().should('have.attr', 'tabindex', '0');
      cy.get('post-tab-item').not(':last').should('have.attr', 'tabindex', '-1');
    });
  });

  describe('navigation mode ARIA attributes', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'navigation-variant');
    });

    it('should have proper ARIA attributes for navigation mode', () => {
      cy.get('post-tabs').find('nav').should('have.attr', 'aria-label', 'Tabs navigation');
      cy.get('post-tab-item').should('not.have.attr', 'role');
      cy.get('post-tab-item').should('not.have.attr', 'tabindex');
    });

    it('should not have tablist role in navigation mode', () => {
      cy.get('post-tabs').find('[role="tablist"]').should('not.exist');
    });
  });
});