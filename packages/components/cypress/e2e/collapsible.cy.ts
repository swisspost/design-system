describe('collapsible', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('collapsible');
      cy.get('@collapsible').find('.collapse').as('collapse');
      cy.get('@collapsible').find('.accordion-header').as('header');
      cy.get('@collapsible').find('.accordion-body').as('body');
    });

    it('should render', () => {
      cy.get('@collapsible').should('exist');
    });

    it('should have a header', () => {
      cy.get('@header').should('exist');
    });

    it('should have a body', () => {
      cy.get('@body').should('exist');
    });

    it('should be expanded', () => {
      cy.get('@collapse').should(`be.visible`);
    });

    it('should show the whole body', () => {
      cy.get('@body')
        .invoke('outerHeight')
        .then(bodyHeight => {
          cy.get('@collapse').invoke('innerHeight').should('to.be.at.least', bodyHeight);
        });
    });

    it('should have correct aria attributes', () => {
      cy.get('@collapse')
        .invoke('attr', 'id')
        .then(id => {
          cy.get('@header').find('button').should('have.attr', 'aria-controls', id);
        });
      cy.checkAriaExpanded('@collapse', 'true');
    });

    it('should be collapsed after clicking on the header once', () => {
      cy.get('@header').click();
      cy.get('@collapse').should(`be.hidden`);
    });

    it("should adapt the header's aria-expanded attribute after collapsing", () => {
      cy.get('@header').click();
      cy.checkAriaExpanded('@collapse', 'false');
    });

    it('should be expanded after clicking on the header twice', () => {
      cy.get('@header').dblclick();
      cy.get('@collapse').should(`be.visible`);
    });

    it("should adapt the header's aria-expanded attribute after expanding", () => {
      cy.get('@header').dblclick();
      cy.checkAriaExpanded('@collapse', 'true');
    });
  });

  describe('initially collapsed', () => {
    beforeEach(() => {
      cy.getComponent('collapsible', 'initially-collapsed');
      cy.get('@collapsible').find('.collapse').as('collapse');
      cy.get('@collapsible').find('.accordion-header').as('header');
    });

    it('should be collapsed', () => {
      cy.get('@collapse').should(`be.hidden`);
    });

    it('should have a correct aria-expanded attribute', () => {
      cy.checkAriaExpanded('@collapse', 'false');
    });

    it('should be expanded after clicking on the header once', () => {
      cy.get('@header').click();
      cy.get('@collapse').should(`be.visible`);
    });

    it('should be collapsed after clicking on the header twice', () => {
      cy.get('@header').dblclick();
      cy.get('@collapse').should(`be.hidden`);
    });
  });

  describe('custom trigger', () => {
    beforeEach(() => {
      cy.getComponent('collapsible', 'custom-trigger');
      cy.get('@collapsible').find('.collapse').as('collapse');
      cy.get('[aria-controls="collapsible-example--custom-trigger"]').as('controls');
      cy.get('@controls').contains('Toggle').as('toggle');
      cy.get('@controls').contains('Show').as('show');
      cy.get('@controls').contains('Hide').as('hide');
    });

    it('should not have a header', () => {
      cy.get('@collapsible').find('.accordion-header').should('not.exist');
    });

    it('should be expanded', () => {
      cy.get('@collapse').should(`be.visible`);
    });

    it('should be collapsed after clicking "Toggle" once', () => {
      cy.get('@toggle').click();
      cy.get('@collapse').should(`be.hidden`);
    });

    it('should be expanded after clicking "Toggle" twice', () => {
      cy.get('@toggle').dblclick();
      cy.get('@collapse').should(`be.visible`);
    });

    it('should be collapsed after clicking "Hide" once', () => {
      cy.get('@hide').click();
      cy.get('@collapse').should(`be.hidden`);
    });

    it('should be collapsed after clicking "Hide" twice', () => {
      cy.get('@hide').dblclick();
      cy.get('@collapse').should(`be.hidden`);
    });

    it('should be expanded after clicking "Show" once', () => {
      cy.get('@show').click();
      cy.get('@collapse').should(`be.visible`);
    });

    it('should be expanded after clicking "Show" twice', () => {
      cy.get('@show').dblclick();
      cy.get('@collapse').should(`be.visible`);
    });
  });
});
