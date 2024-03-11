const TABS_ID = 'bb1291ca-4dbb-450c-a15f-596836d9f39e';

describe('tabs', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID);
      cy.get('post-tab-header').as('headers');
    });

    it('should render', () => {
      cy.get('@tabs').should('exist');
    });

    it('should show three tab headers', () => {
      cy.get('@headers').should('have.length', 3);
    });

    it('should only show the first tab header as active', () => {
      cy.get('@headers').each(($header, index) => {
        cy.wrap($header)
          .find('.active')
          .should(index === 0 ? 'exist' : 'not.exist');
      });
    });

    it('should only show the tab panel associated with the first tab header', () => {
      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@headers')
        .first()
        .invoke('attr', 'panel')
        .then(panel => {
          cy.get('@panel').invoke('attr', 'name').should('equal', panel);
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

      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@headers')
        .last()
        .invoke('attr', 'panel')
        .then(panel => {
          cy.get('@panel').invoke('attr', 'name').should('equal', panel);
        });
    });
  });

  describe('active panel', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'active-panel');
      cy.get('post-tab-header').as('headers');
      cy.get('post-tab-panel:visible').as('panel');
    });

    it('should only show the requested active tab panel', () => {
      cy.get('@panel').should('have.length', 1);
      cy.get('@tabs')
        .invoke('attr', 'active-panel')
        .then(activePanel => {
          cy.get('@panel').invoke('attr', 'name').should('equal', activePanel);
        });
    });

    it('should show as active only the tab header associated with the requested active tab panel', () => {
      cy.get('@tabs')
        .invoke('attr', 'active-panel')
        .then(activePanel => {
          cy.get('@headers').each($header => {
            cy.wrap($header)
              .invoke('attr', 'panel')
              .then(panel => {
                cy.wrap($header)
                  .find('.active')
                  .should(panel === activePanel ? 'exist' : 'not.exist');
              });
          });
        });
    });
  });

  describe('async', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'async');
      cy.get('post-tab-header').as('headers');
    });

    it('should add a tab header', () => {
      cy.get('#add-tab').click();
      cy.get('@headers').should('have.length', 4);
    });

    it('should still show the tab panel associated with the first tab header after adding new tab', () => {
      cy.get('#add-tab').click();

      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@headers')
        .first()
        .invoke('attr', 'panel')
        .then(panel => {
          cy.get('@panel').invoke('attr', 'name').should('equal', panel);
        });
    });

    it('should activate the newly added tab header after clicking on it', () => {
      cy.get('#add-tab').click();

      cy.get('post-tab-header').as('headers');
      cy.get('@headers').last().click();

      cy.get('@headers').first().find('.active').should('not.exist');
      cy.get('@headers').last().find('.active').should('exist');
    });

    it('should display the tab panel associated with the newly added tab after clicking on it', () => {
      cy.get('#add-tab').click();

      cy.get('post-tab-header').last().as('new-panel');
      cy.get('@new-panel').click();

      // wait for the fade out animation to complete
      cy.wait(200);

      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@new-panel')
        .invoke('attr', 'panel')
        .then(panel => {
          cy.get('@panel').invoke('attr', 'name').should('equal', panel);
        });
    });

    it('should remove a tab header', () => {
      cy.get('.tab-title.active').then(() => {
        cy.get('#remove-active-tab').click();
        cy.get('@headers').should('have.length', 2);
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
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('tabs');
    cy.checkA11y('#root-inner');
  });
});
