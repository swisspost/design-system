const COLLAPSIBLE_ID = '6a91848c-16ec-4a23-bc45-51c797b5b2c3';

describe('collapsible', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('collapsible', COLLAPSIBLE_ID);
      cy.get('@collapsible').find('.collapse').as('collapse');
      cy.get(`#button--${COLLAPSIBLE_ID}--default`).as('toggler');
    });

    it('should render', () => {
      cy.get('@collapsible').should('exist');
    });

    it('should have a collapse', () => {
      cy.get('@collapse').should('exist');
    });

    it('should have a toggle button', () => {
      cy.get('@toggler').should('exist');
    });

    it('should be expanded', () => {
      cy.get('@collapse').should(`be.visible`);
    });

    it('should be collapsed after clicking on the toggle button once', () => {
      cy.get('@toggler').click();
      cy.get('@collapse').should(`be.hidden`);
    });

    it('should be expanded after clicking on the toggle button twice', () => {
      cy.get('@toggler').dblclick();
      cy.get('@collapse').should(`be.visible`);
    });
  });

  describe('initially collapsed', () => {
    beforeEach(() => {
      cy.getComponent('collapsible', COLLAPSIBLE_ID, 'initially-collapsed');
      cy.get('@collapsible').find('.collapse').as('collapse');
      cy.get(`#button--${COLLAPSIBLE_ID}--initially-collapsed`).as('toggler');
    });

    it('should be collapsed', () => {
      cy.get('@collapse').should(`be.hidden`);
    });

    it('should be expanded after clicking on the toggle button once', () => {
      cy.get('@toggler').click();
      cy.get('@collapse').should(`be.visible`);
    });

    it('should be collapsed after clicking on the toggle button twice', () => {
      cy.get('@toggler').dblclick();
      cy.get('@collapse').should(`be.hidden`);
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('collapsible');
    cy.checkA11y('#root-inner');
  });
});
