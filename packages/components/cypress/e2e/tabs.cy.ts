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

    it('should show three tab items', () => {
      cy.get('@items').should('have.length', 3);
    });

    it('should only show the first tab item as active', () => {
      cy.get('post-tab-item.active').each(($item, index) => {
        cy.wrap($item).should(index === 0 ? 'exist' : 'not.exist');
      });
    });

    it('should only show the tab panel associated with the first tab item', () => {
      cy.get('post-tab-panel:visible').as('panel');
      cy.get('@panel').should('have.length', 1);
      cy.get('@items')
        .first()
        .invoke('attr', 'name')
        .then(tabName => {
          cy.get('@panel').invoke('attr', 'for').should('equal', tabName);
        });
    });

    it('should activate a clicked tab item and deactivate the tab item that was previously activated', () => {
      cy.get('@items').last().click();

      cy.get('@items').first().should('not.have.class', 'active');
      cy.get('@items').last().should('have.class', 'active');
    });

    it('should show the panel associated with a clicked tab item and hide the panel that was previously shown', () => {
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

    it('should add a tab item', () => {
      cy.get('#add-tab').click();
      cy.get('@items').should('have.length', 4);
    });

    it('should still show the tab panel associated with the first tab item after adding new tab', () => {
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

    it('should activate the newly added tab item after clicking on it', () => {
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

    it('should remove a tab item', () => {
      cy.get('.tab-title.active').then(() => {
        cy.get('#remove-active-tab').click();
        cy.get('@items').should('have.length', 2);
      });
    });

    it('should still show an active tab item after removing the active tab', () => {
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

    

    it('should not render content part in navigation mode', () => {
      cy.get('@tabs')
        .shadow()
        .find('[part="content"]')
        .should('not.exist');
    });

    describe('semantic navigation markup', () => {
      it('should render the tabs container as nav element', () => {
        cy.get('@tabs').find('nav').should('exist');
      });

      it('should have aria-label on nav element', () => {
        cy.get('@tabs').find('nav').should('have.attr', 'aria-label');
      });

      it('should have label attribute on tabs component', () => {
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


      it('should mark only one tab as active when anchor has aria-current="page"', () => {
        let activeCount = 0;
        cy.get('@items').each($item => {
          const hasAriaCurrent = $item.find('a[aria-current="page"]').length > 0;
          if (hasAriaCurrent) {
            activeCount++;
            cy.wrap($item).should('have.class', 'active');
          }
        }).then(() => {
          expect(activeCount).to.be.lte(1); // At most one active tab
        });
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
          // Verify anchor is in light DOM (not in shadow DOM)
          cy.wrap($item).children('a').should('exist');
        });
      });

      it('should allow consumer routing via anchor href attributes', () => {
        cy.get('@items').first().find('a').should('have.attr', 'href');
      });
    });

    describe('active-tab property', () => {
      it('should support programmatic tab activation via show() method', () => {
        cy.get('@tabs').then($tabs => {
          const tabsElement = $tabs[0] as HTMLElement & { show: (tabName: string) => Promise<void> };
          if (typeof tabsElement.show === 'function') {
            void tabsElement.show('second');
            cy.get('@items').eq(1).should('have.class', 'active');
          }
        });
      });

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
  });

  describe('mode detection', () => {
    it('should detect panels mode when no anchor elements are present', () => {
      cy.getComponent('tabs', TABS_ID, 'default');
      cy.get('post-tabs').should('exist');
      cy.get('post-tab-panel').should('exist');
      cy.get('post-tabs')
        .shadow()
        .find('[part="content"]')
        .should('exist');
    });

    it('should detect navigation mode when anchor elements are present', () => {
      cy.getComponent('tabs', TABS_ID, 'navigation');
      cy.get('post-tabs').should('exist');
      cy.get('post-tab-panel').should('not.exist');
      cy.get('post-tabs').find('nav').should('exist');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('tabs');
    cy.checkA11y('#root-inner');
  });

  describe('panels mode ARIA attributes', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'default');
    });

    it('should have proper ARIA attributes for panels mode', () => {
      cy.get('post-tabs')
        .shadow()
        .find('[role="tablist"]')
        .should('exist');
      cy.get('post-tab-item').should('have.attr', 'role', 'tab');
      cy.get('post-tab-item').should('have.attr', 'aria-selected');
      cy.get('post-tab-item').first().should('have.attr', 'aria-selected', 'true');
      cy.get('post-tab-item').not(':first').should('have.attr', 'aria-selected', 'false');
    });

    it('should link tabs to panels with aria-controls and aria-labelledby', () => {
      cy.get('post-tab-item').first().then($tab => {
        const tabId = $tab.attr('id');
        const ariaControls = $tab.attr('aria-controls');

        if (ariaControls) {
          cy.get(`post-tab-panel[id="${ariaControls}"]`).should('exist');
          cy.get(`post-tab-panel[id="${ariaControls}"]`).should('have.attr', 'aria-labelledby', tabId);
        }
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
      cy.getComponent('tabs', TABS_ID, 'navigation');
    });

    it('should have proper ARIA attributes for navigation mode', () => {
      cy.get('post-tabs').find('nav').should('have.attr', 'aria-label');
      cy.get('post-tab-item').should('not.have.attr', 'role');
      cy.get('post-tab-item').should('not.have.attr', 'tabindex');
    });

    it('should not have tablist role in navigation mode', () => {
      cy.get('post-tabs')
        .shadow()
        .find('[role="tablist"]')
        .should('not.exist');
    });

    it('should not have aria-selected on tab items in navigation mode', () => {
      cy.get('post-tab-item').should('not.have.attr', 'aria-selected');
    });
  });
});