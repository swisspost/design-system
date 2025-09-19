const ACCORDION_ID = '4d1b4185-e04d-494a-ab38-2b56c1778b0b';

describe('accordion', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('accordion', ACCORDION_ID);
      cy.get('@accordion').find('post-accordion-item').as('collapsibles');
    });

    it('should render', () => {
      cy.get('@accordion').should('exist');
    });

    it('should show three post-collapsible elements', () => {
      cy.get('@collapsibles').should('have.length', 3);
    });

    it('should only show the first element as expanded', () => {
      cy.get('@collapsibles').first().shadow().find('post-collapsible').should('be.visible');
    });

    it('should show the last element as expanded after clicking it', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').last().shadow().find('post-collapsible').should('be.visible');
    });

    it('should not show the first element as expanded after clicking the last element', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').first().shadow().find('post-collapsible').should('be.hidden');
    });

    it('should propagate "postToggle" event from post-accordion-item on post-accordion', () => {
      const EventHandlerMock = cy.spy();

      cy.get('@accordion').then($el => {
        Cypress.$($el.get(0)).on('postToggle', EventHandlerMock);
      });

      cy.get('@collapsibles')
        .last()
        .click()
        .then(() => {
          cy.wrap(EventHandlerMock).should('have.been.calledTwice');
        });
    });

    describe('icon rotation behavior', () => {
      it('should have icons in all accordion items', () => {
        cy.get('@collapsibles').each(($item) => {
          cy.wrap($item)
            .shadow()
            .find('post-icon[name="chevrondown"]')
            .should('exist');
        });
      });

      it('should show expanded icon (no collapsed class) for the first item initially', () => {
        cy.get('@collapsibles')
          .first()
          .shadow()
          .find('.accordion-button')
          .should('not.have.class', 'collapsed');
      });

      it('should show collapsed icons (collapsed class) for non-expanded items initially', () => {
        cy.get('@collapsibles')
          .not(':first')
          .each(($item) => {
            cy.wrap($item)
              .shadow()
              .find('.accordion-button')
              .should('have.class', 'collapsed');
          });
      });

      
      it('should rotate icon when clicking to expand collapsed item', () => {
        cy.get('@collapsibles')
          .last()
          .shadow()
          .find('.accordion-button')
          .should('have.class', 'collapsed');

        cy.get('@collapsibles')
          .last()
          .shadow()
          .find('.accordion-button')
          .click({ force: true });

        cy.get('@collapsibles')
          .last()
          .shadow()
          .find('.accordion-button')
          .should('not.have.class', 'collapsed');
      });

      it('should rotate icon when clicking to collapse expanded item', () => {
        cy.get('@collapsibles')
          .first()
          .shadow()
          .find('.accordion-button')
          .should('not.have.class', 'collapsed');
        cy.get('@collapsibles')
          .first()
          .shadow()
          .find('.accordion-button')
          .click({ force: true });

        cy.get('@collapsibles')
          .first()
          .shadow()
          .find('.accordion-button')
          .should('have.class', 'collapsed');
      });

      it('should have correct icon transform states for collapsed vs expanded', () => {
        cy.get('@collapsibles')
          .first()
          .shadow()
          .find('post-icon')
          .then(($expandedIcon) => {
            const expandedTransform = $expandedIcon.css('transform');

            cy.get('@collapsibles')
              .last()
              .shadow()
              .find('post-icon')
              .then(($collapsedIcon) => {
                const collapsedTransform = $collapsedIcon.css('transform');
                
                expect(expandedTransform).to.not.equal(collapsedTransform);
              });
          });
      });
    });
  });

  describe('nested', () => {
    beforeEach(() => {
      cy.getComponent('accordion', ACCORDION_ID, 'nested');
      cy.get('@accordion').find('post-accordion-item').as('collapsibles');
    });

    it('should show the first nested element of the first element', () => {
      cy.get('@collapsibles').eq(1).click();
      cy.get('@collapsibles').eq(1).shadow().find('post-collapsible').should('be.visible');
    });

    it('should not show the first nested element as expanded after clicking the last nested element', () => {
      cy.get('@collapsibles').eq(2).click();
      cy.get('@collapsibles').eq(1).shadow().find('post-collapsible').should('be.hidden');
      cy.get('@collapsibles').eq(2).shadow().find('post-collapsible').should('be.visible');
    });

    it('should show the first nested element wrapped in a div in the second parent accordion element', () => {
      cy.get('@collapsibles').eq(4).click();
      cy.get('@collapsibles').eq(5).click();
      cy.get('@collapsibles').eq(4).shadow().find('post-collapsible').should('be.visible');
      cy.get('@collapsibles').eq(5).shadow().find('post-collapsible').should('be.visible');
    });

    it('should not show the first nested element wrapped in a div as expanded after clicking the last nested element', () => {
      cy.get('@collapsibles').eq(4).click();
      cy.get('@collapsibles').eq(7).click();
      cy.get('@collapsibles').eq(5).shadow().find('post-collapsible').should('be.hidden');
      cy.get('@collapsibles').eq(4).shadow().find('post-collapsible').should('be.visible');
      cy.get('@collapsibles').eq(7).shadow().find('post-collapsible').should('be.visible');
    });

    it('should propagate "postToggle" event from nested post-accordion', () => {
      cy.document().then(document => {
        const EventHandlerMock = cy.spy();
        Cypress.$(document.querySelector('post-accordion')).on('postToggle', EventHandlerMock);

        cy.get('@collapsibles')
          .eq(3)
          .click()
          .then(() => {
            cy.wrap(EventHandlerMock).should('have.been.called');
          });
      });
    });
  });

  describe('multiple open panels', () => {
    beforeEach(() => {
      cy.getComponent('accordion', ACCORDION_ID, 'multiple-open-panels');
      cy.get('@accordion').find('post-accordion-item').as('collapsibles');
    });

    it('should show the last element as expanded after clicking it', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').last().shadow().find('post-collapsible').should('be.visible');
    });

    it('should still show the first element as expanded after clicking the last element', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').first().shadow().find('post-collapsible').should('be.visible');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('accordion');
    cy.checkA11y('#root-inner');
  });
});
