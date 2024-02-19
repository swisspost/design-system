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
      cy.get('@collapsibles').first().find('.collapse').should('be.visible');
    });

    it('should show the last element as expanded after clicking it', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').last().find('.collapse').should('be.visible');
    });

    it('should still show the first element as expanded after clicking the last element', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').first().find('.collapse').should('be.hidden');
    });
  });

  describe('multiple open panels', () => {
    beforeEach(() => {
      cy.getComponent('accordion', ACCORDION_ID, 'multiple-open-panels');
      cy.get('@accordion').find('post-accordion-item').as('collapsibles');
    });

    it('should show the last element as expanded after clicking it', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').last().find('.collapse').should('be.visible');
    });

    it('should still show the first element as expanded after clicking the last element', () => {
      cy.get('@collapsibles').last().click();
      cy.get('@collapsibles').first().find('.collapse').should('be.visible');
    });
  });
});

describe('Accessibility', () => {
  it.only('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('accordion');
    cy.checkA11y('#root-inner');
  });
});
