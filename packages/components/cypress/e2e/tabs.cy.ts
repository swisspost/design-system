const TABS_ID = 'bb1291ca-4dbb-450c-a15f-596836d9f39e';

describe('tabs', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID);
      cy.get('post-tab-item').as('items');
    });

    it('should render', () => {
      cy.get('@tabs').should('exist');
    });

    it('should show three tab headers', () => {
      cy.get('@items').should('have.length', 3);
    });

    it('should only show the first tab header as active', () => {
      cy.get('post-tab-item.active').each(($item, index) => {
        cy.wrap($item).should(index === 0 ? 'exist' : 'not.exist');
      });
    });

    it('should only show the tab panel associated with the first tab header', () => {
      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@items')
        .first()
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('@panel').invoke('attr', 'for').should('equal', tabName);
        });
    });

    it('should activate a clicked tab header and deactivate the tab header that was previously activated', () => {
      cy.get('@items').last().click();

      cy.get('@items').first().should('not.have.class', 'active');
      cy.get('@items').last().should('have.class', 'active');
    });

    it('should show the panel associated with a clicked tab header and hide the panel that was previously shown', () => {
      cy.get('@items').last().click();

      // wait for the fade out animation to complete
      cy.wait(200);

      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@items')
        .last()
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('@panel').invoke('attr', 'for').should('equal', tabName);
        });
    });
  });

  describe('active tab', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'active-tab');
      cy.get('post-tab-item').as('items');
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

    it('should show as active only the tab item associated with the requested active tab', () => {
      cy.get('@tabs')
        .invoke('attr', 'active-tab')
        .then(activeTab => {
          cy.get('@items').each($item => {
            cy.wrap($item)
              .invoke('attr', 'name')
              .then(tabName => {
                cy.wrap($item.filter('.active')).should(
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
      cy.get('post-tab-item').as('items');
    });

    it('should add a tab header', () => {
      cy.get('#add-tab').click();
      cy.get('@items').should('have.length', 4);
    });

    it('should still show the tab panel associated with the first tab header after adding new tab', () => {
      cy.get('#add-tab').click();

      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@items')
        .first()
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('@panel').invoke('attr', 'for').should('equal', tabName);
        });
    });

    it('should activate the newly added tab header after clicking on it', () => {
      cy.get('#add-tab').click();

      cy.get('post-tab-item').as('items');
      cy.get('@items').last().click();

      cy.get('@items').first().should('not.have.class', 'active');
      cy.get('@items').last().should('have.class', 'active');
    });

    it('should display the tab panel associated with the newly added tab after clicking on it', () => {
      cy.get('#add-tab').click();

      cy.get('post-tab-item').last().as('new-item');
      cy.get('@new-item').click();

      // wait for the fade out animation to complete
      cy.wait(200);

      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@new-item')
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('@panel').invoke('attr', 'for').should('equal', tabName);
        });
    });

    it('should remove a tab header', () => {
      cy.get('.tab-title.active').then(() => {
        cy.get('#remove-active-tab').click();
        cy.get('@items').should('have.length', 2);
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

  describe('navigation variant', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'navigation');
      cy.get('post-tab-item').as('items');
    });

    it('should render', () => {
      cy.get('@tabs').should('exist');
    });

    it('should show three tab items', () => {
      cy.get('@items').should('have.length', 3);
    });

    describe('semantic navigation markup', () => {
      it('should render as navigation element', () => {
        cy.get('@tabs')
          .find('nav')
          .should('exist');
      });

      it('should have aria-label on nav element for context', () => {
        cy.get('@tabs')
          .find('nav')
          .should('have.attr', 'aria-label');
      });

      it('should have required label attribute on tabs component', () => {
        cy.get('@tabs').should('have.attr', 'label');
      });

      it('should contain anchor elements within tab items', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).find('a').should('exist');
        });
      });

        it('should mark the current page tab as active when anchor has aria-current="page"', () => {
          cy.get('@items').each($item => {
            const hasAriaCurrent = $item.find('a[aria-current="page"]').length > 0;
            if (hasAriaCurrent) {
              cy.wrap($item).should('have.class', 'active');
            } else {
              cy.wrap($item).should('not.have.class', 'active');
            }
          });
        });
    });

    describe('mode detection', () => {
      it('should automatically enable navigation mode when <a> is present inside post-tab-item', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).should('have.attr', 'data-navigation-mode', 'true');
        });
      });

      it('should not have tab panel elements in navigation mode', () => {
        cy.get('post-tab-panel').should('not.exist');
      });
    });

    describe('tab item properties', () => {
      it('should have name property on each tab item', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).should('have.attr', 'name');
        });
      });

      it('should not have role="tab" on tab items in navigation mode', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).should('not.have.attr', 'role', 'tab');
        });
      });

      it('should not have tabindex on tab items in navigation mode', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).should('not.have.attr', 'tabindex');
        });
      });

      it('should not have aria-selected attribute in navigation mode', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).should('not.have.attr', 'aria-selected');
        });
      });
    });

    describe('anchor elements in light DOM', () => {
      it('should render anchor elements in light DOM for consumer routing integration', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).children('a').should('exist');
        });
      });

      it('should allow consumer routing via anchor href attributes', () => {
        cy.get('@items').first().find('a').should('have.attr', 'href');
      });
    });

    describe('active-tab property', () => {

      it('should mark the tab item matching active-tab as active', () => {
        cy.get('@tabs')
          .invoke('attr', 'active-tab')
          .then(activeTab => {
            if (activeTab) {
              cy.get(`post-tab-item[name="${activeTab}"]`).should('have.class', 'active');
            }
          });
      });
    });

    describe('panels ignored in navigation mode', () => {
      it('should not display content part in navigation mode', () => {
        cy.get('@tabs')
          .shadow()
          .find('[part="content"]')
          .should('not.exist');
      });

      it('should ignore any post-tab-panel elements if present', () => {
        cy.get('post-tab-panel').should('not.exist');
      });
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load for all variants', () => {
      cy.getSnapshots('tabs');
      cy.checkA11y('#root-inner');
    });
  });
});
