describe('collapsible', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('collapsible');
      cy.get('@collapsible').find('.collapse').as('collapse');
      cy.get('#components-collapsible--default--button').as('toggler');
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
      cy.getComponent('collapsible', 'initially-collapsed');
      cy.get('@collapsible').find('.collapse').as('collapse');
      cy.get('#components-collapsible--initially-collapsed--button').as('toggler');
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
