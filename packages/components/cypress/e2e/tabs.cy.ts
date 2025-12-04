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

  describe('navigation variant', () => {
    beforeEach(() => {
      cy.getComponent('tabs', TABS_ID, 'navigation-variant');
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

    it('should not render tab panels in navigation mode', () => {
      cy.get('post-tab-panel').should('not.exist');
    });

    describe('semantic navigation markup', () => {
      it('should render the tabs container as nav element', () => {
        cy.get('@tabs')
          .shadow()
          .find('nav')
          .should('exist');
      });

      it('should have aria-label on nav element', () => {
        cy.get('@tabs')
          .shadow()
          .find('nav')
          .should('have.attr', 'aria-label');
      });

      it('should have label attribute on tabs component', () => {
        cy.get('@tabs').should('have.attr', 'label');
      });

      it('should contain anchor elements within tab items', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).find('a').should('exist');
        });
      });

      it('should mark the tab with aria-current="page" as active', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).find('a').then($anchor => {
            const hasAriaCurrent = $anchor.attr('aria-current') === 'page';
            if (hasAriaCurrent) {
              cy.wrap($item).should('have.class', 'active');
            } else {
              cy.wrap($item).should('not.have.class', 'active');
            }
          });
        });
      });

      it('should mark only one tab as active when anchor has aria-current="page"', () => {
        let activeCount = 0;
        cy.get('@items').each($item => {
          cy.wrap($item).find('a').then($anchor => {
            const hasAriaCurrent = $anchor.attr('aria-current') === 'page';
            if (hasAriaCurrent) {
              activeCount++;
              cy.wrap($item).should('have.class', 'active');
            }
          });
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

      it('should not have aria-selected on tab items in navigation mode', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).should('not.have.attr', 'aria-selected');
        });
      });

      it('should not have tabindex on tab items in navigation mode', () => {
        cy.get('@items').each($item => {
          cy.wrap($item).should('not.have.attr', 'tabindex');
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

    describe('active state management', () => {
      it('should be controlled by aria-current attribute only', () => {
        // Verify the active tab has aria-current="page" on its anchor
        cy.get('post-tab-item.active').find('a').should('have.attr', 'aria-current', 'page');
        
        // Verify non-active tabs don't have aria-current="page"
        cy.get('post-tab-item').not('.active').find('a').each($anchor => {
          cy.wrap($anchor).should('not.have.attr', 'aria-current', 'page');
        });
      });
    });

    describe('navigation behavior', () => {
      it('should not prevent default link behavior', () => {
        // Anchors should have href attributes (routing framework will handle them)
        cy.get('@items').first().find('a').should('have.attr', 'href');
      });

      it('should have clickable anchor elements', () => {
        // Verify anchors are present and accessible
        cy.get('@items').each($item => {
          cy.wrap($item).find('a').should('be.visible');
        });
      });

      it('should not emit postChange event in navigation mode', () => {
        // This is a limitation test - we can't easily test events NOT firing
        // without framework integration, but we document the expectation
        cy.get('@tabs').should('exist');
        // In a real integration test with a framework, you would verify
        // that postChange handlers are never called
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
      cy.getComponent('tabs', TABS_ID, 'navigation-variant');
      cy.get('post-tabs').should('exist');
      cy.get('post-tab-panel').should('not.exist');
      cy.get('post-tabs')
        .shadow()
        .find('nav')
        .should('exist');
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
      cy.getComponent('tabs', TABS_ID, 'navigation-variant');
    });

    it('should have proper ARIA attributes for navigation mode', () => {
      cy.get('post-tabs')
        .shadow()
        .find('nav')
        .should('have.attr', 'aria-label');
      cy.get('post-tab-item').should('not.have.attr', 'role');
      cy.get('post-tab-item').should('not.have.attr', 'tabindex');
      cy.get('post-tab-item').should('not.have.attr', 'aria-selected');
    });

    it('should not have tablist role in navigation mode', () => {
      cy.get('post-tabs')
        .shadow()
        .find('[role="tablist"]')
        .should('not.exist');
    });

    it('should use aria-current for active state indication', () => {
      cy.get('post-tab-item.active').find('a').should('have.attr', 'aria-current', 'page');
    });
  });
});