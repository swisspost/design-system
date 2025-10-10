describe('Tabs', () => {
  beforeEach(() => {
    cy.visit('/tabs');
    cy.injectAxe();
    cy.get('post-tabs').first().as('panelTabs');
    cy.get('post-tabs').last().as('navTabs');
  });

  describe('Panel Variant - Default', () => {
    it('should render the tabs component', () => {
      cy.get('@panelTabs').should('exist');
    });

    it('should show three tab headers', () => {
      cy.get('@panelTabs').find('post-tab-item').should('have.length', 3);
    });

    it('should only show the first tab header as active', () => {
      cy.get('@panelTabs').find('post-tab-item').first().should('have.class', 'active');
      cy.get('@panelTabs').find('post-tab-item').eq(1).should('not.have.class', 'active');
      cy.get('@panelTabs').find('post-tab-item').eq(2).should('not.have.class', 'active');
    });

    it('should only show the tab panel associated with the first tab header', () => {
      cy.get('@panelTabs').find('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@panelTabs')
        .find('post-tab-item')
        .first()
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('@panel').invoke('attr', 'for').should('equal', tabName);
        });
    });

    it('should activate a clicked tab header and deactivate the tab header that was previously activated', () => {
      cy.get('@panelTabs').find('post-tab-item').last().click();

      cy.get('@panelTabs').find('post-tab-item').first().should('not.have.class', 'active');
      cy.get('@panelTabs').find('post-tab-item').last().should('have.class', 'active');
    });

    it('should show the panel associated with a clicked tab header', () => {
      cy.get('@panelTabs').find('post-tab-item').last().click();

      cy.get('@panelTabs').find('post-tab-panel:visible').should('have.length', 1);

      cy.get('@panelTabs')
        .find('post-tab-item')
        .last()
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('@panelTabs')
            .find('post-tab-panel:visible')
            .invoke('attr', 'for')
            .should('equal', tabName);
        });
    });
  });

  describe('Navigation Variant', () => {
    it('should render as navigation when tabs contain anchor elements', () => {
      cy.get('@navTabs').should('exist');
      cy.get('@navTabs').find('post-tab-item').should('have.length', 3);
      cy.get('@navTabs')
        .find('post-tab-item')
        .each($item => {
          cy.wrap($item).find('a').should('exist');
        });
    });

    it('should not render tab panels in navigation variant', () => {
      cy.get('@navTabs').find('post-tab-panel').should('not.exist');
      cy.get('@navTabs').find('[part="content"]').should('not.exist');
    });

    it('should render the tabs container as nav element', () => {
      cy.get('@navTabs').find('nav[role="navigation"], nav').should('exist');
    });

    it('should set proper ARIA attributes for navigation', () => {
      cy.get('@navTabs').find('nav').should('have.attr', 'aria-label', 'Tabs navigation');
    });

    it('should support programmatic tab activation via show() method', () => {
      cy.get('@navTabs').then($tabs => {
        const tabsElement = $tabs[0] as HTMLElement & { show: (tabName: string) => void };
        tabsElement.show('nav-second');
      });
      cy.get('@navTabs').find('post-tab-item').eq(1).should('have.class', 'active');
    });
  });

  describe('Accessibility - Panel Variant', () => {
    beforeEach(() => {
      cy.get('@panelTabs').as('tabs');
    });

    it('should have proper ARIA attributes for panels variant', () => {
      cy.get('@tabs').find('[role="tablist"]').should('exist');
      cy.get('@tabs').find('post-tab-item').should('have.attr', 'role', 'tab');
      cy.get('@tabs').find('post-tab-item').should('have.attr', 'aria-selected');
      cy.get('@tabs').find('post-tab-item').first().should('have.attr', 'aria-selected', 'true');
      cy.get('@tabs').find('post-tab-item').not(':first').should('have.attr', 'aria-selected', 'false');
    });

    it('should link tabs to panels with aria-controls and aria-labelledby', () => {
      cy.get('@tabs')
        .find('post-tab-item')
        .first()
        .then($tab => {
          const tabId = $tab.attr('id');
          const ariaControls = $tab.attr('aria-controls');

          cy.get(`post-tab-panel[id="${ariaControls}"]`).should('exist');
          cy.get(`post-tab-panel[id="${ariaControls}"]`).should(
            'have.attr',
            'aria-labelledby',
            tabId,
          );
        });
    });

    it('should manage tabindex properly', () => {
      cy.get('@tabs').find('post-tab-item').first().should('have.attr', 'tabindex', '0');
      cy.get('@tabs').find('post-tab-item').not(':first').should('have.attr', 'tabindex', '-1');

      cy.get('@tabs').find('post-tab-item').last().click();
      cy.get('@tabs').find('post-tab-item').last().should('have.attr', 'tabindex', '0');
      cy.get('@tabs').find('post-tab-item').not(':last').should('have.attr', 'tabindex', '-1');
    });
  });

  describe('Accessibility - Navigation Variant', () => {
    beforeEach(() => {
      cy.get('@navTabs').as('tabs');
    });

    it('should have proper ARIA attributes for navigation variant', () => {
      cy.get('@tabs').find('nav').should('have.attr', 'aria-label', 'Tabs navigation');
      cy.get('@tabs').find('post-tab-item').should('not.have.attr', 'role');
      cy.get('@tabs').find('post-tab-item').should('not.have.attr', 'tabindex');
    });

    it('should not have tablist role in navigation variant', () => {
      cy.get('@tabs').find('[role="tablist"]').should('not.exist');
    });
  });

  describe('Variant Detection', () => {
    it('should detect panel variant when no anchor elements are present', () => {
      cy.get('@panelTabs').should('exist');
      cy.get('@panelTabs').find('post-tab-panel').should('exist');
      cy.get('@panelTabs').find('[part="content"]').should('exist');
    });

    it('should detect navigation variant when anchor elements are present', () => {
      cy.get('@navTabs').should('exist');
      cy.get('@navTabs').find('post-tab-panel').should('not.exist');
      cy.get('@navTabs').find('nav').should('exist');
    });
  });

  describe('Accessibility Violations', () => {
    it('should not have any automatically detectable accessibility issues in panels variant', () => {
      cy.get('@panelTabs').should('be.visible');
      cy.get('@panelTabs').find('post-tab-item').first().should('be.visible');
      cy.get('@panelTabs').find('[role="tablist"]').then($tablist => {
        cy.checkA11y($tablist[0]);
      });
    });

    it('should not have any automatically detectable accessibility issues in navigation variant', () => {
      cy.get('@navTabs').should('be.visible');
      cy.get('@navTabs').find('post-tab-item').first().should('be.visible');
      cy.get('@navTabs').then($el => {
        cy.checkA11y($el[0]);
      });
    });
  });
});
