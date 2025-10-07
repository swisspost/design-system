describe('Tabs', () => {
  beforeEach(() => {
    cy.visit('/tabs');
    cy.get('post-tabs[data-hydrated]').first().as('panelTabs');
    cy.get('post-tabs[data-hydrated]').last().as('navTabs');
  });

  describe('Panel Variant', () => {
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

    it('should activate a clicked tab header', () => {
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
    });

    it('should render the tabs container as nav element', () => {
      cy.get('@navTabs').find('nav[role="navigation"], nav').should('exist');
    });

    it('should set proper ARIA attributes for navigation', () => {
      cy.get('@navTabs').find('nav').should('have.attr', 'aria-label', 'Tabs navigation');
    });
  });
});
