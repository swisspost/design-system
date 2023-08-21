describe('tabs', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('tabs');
      cy.get('post-tab-header').as('headers');
      cy.get('post-tab-panel').as('panels');
    });

    it('should render', () => {
      cy.get('@tabs').should('exist');
    });

    it('should show three tab headers', () => {
      cy.get('@headers').should('have.length', 3);
    });

    it('should only show the first tab header as active', () => {
      cy.get('@headers').each(($el, index) => {
        cy.wrap($el).find('.active').should(index === 0 ? 'exist' : 'not.exist');
      });
    });

    it('should only show the tab panel associated with the first tab header', () => {
      cy.get('@panels').should('have.length', 1);
      cy.get('@headers').first().invoke('attr', 'panel').then(panel => {
        cy.get('@panels').invoke('attr', 'name').should('equal', panel);
      });
    });

    it('should activate a clicked tab header and deactivate the tab header that was previously activated', () => {
      cy.get('@headers').last().click();

      cy.get('@headers').first().find('.active').should('not.exist');
      cy.get('@headers').last().find('.active').should('exist');
    });

    it('should show the panel associated with a clicked tab header and hide the panel that was previously shown', () => {
      cy.get('@headers').last().click();

      // wait for the fade out animation to complete
      cy.wait(200);

      cy.get('@headers').last().invoke('attr', 'panel').then(panel => {
        cy.get('@panels').should('have.length', 1);
        cy.get('@panels').invoke('attr', 'name').should('equal', panel);
      });
    });
  });

  describe('active panel', () => {
    beforeEach(() => {
      cy.getComponent('tabs', 'active-panel');
      cy.get('post-tab-header').as('headers');
      cy.get('post-tab-panel').as('panels');
    });

    it('should only show the requested active tab panel', () => {
      cy.get('@panels').should('have.length', 1);
      cy.get('@tabs').invoke('attr', 'active-panel').then(activePanel => {
        cy.get('@panels').invoke('attr', 'name').should('equal', activePanel);
      });
    });

    it('should show as active only the tab header associated with the requested active tab panel', () => {
      cy.get('@tabs').invoke('attr', 'active-panel').then(activePanel => {
        cy.get('@headers').each($el => {
          cy.wrap($el).invoke('attr', 'panel').then(panel => {
            cy.wrap($el).find('.active').should(panel === activePanel ? 'exist' : 'not.exist');
          });
        });
      });
    });
  });
});
