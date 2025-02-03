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
          expect(EventHandlerMock).to.be.calledTwice;
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

    it('should not propagate "postToggle" event from nested post-accordion', () => {
      cy.document().then(document => {
        const EventHandlerMock = cy.spy();
        Cypress.$(document.querySelector('post-accordion')).on('postToggle', EventHandlerMock);

        cy.get('@collapsibles')
          .eq(3)
          .click()
          .then(() => {
            expect(EventHandlerMock).to.not.be.called;
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