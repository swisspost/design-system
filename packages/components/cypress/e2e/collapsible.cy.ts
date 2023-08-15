describe('collapsible', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.registerCollapsibleFrom('/iframe.html?id=components-collapsible--default');
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
      cy.checkVisibility('visible');
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
      cy.checkAriaExpanded('true');
    });

    it('should be collapsed after clicking on the header once', () => {
      cy.get('@header').click();
      cy.checkVisibility('hidden');
    });

    it("should adapt the header's aria-expanded attribute after collapsing", () => {
      cy.get('@header').click();
      cy.checkAriaExpanded('false');
    });

    it('should be expanded after clicking on the header twice', () => {
      cy.get('@header').dblclick();
      cy.checkVisibility('visible');
    });

    it("should adapt the header's aria-expanded attribute after expanding", () => {
      cy.get('@header').dblclick();
      cy.checkAriaExpanded('true');
    });
  });

  describe('initially collapsed', () => {
    beforeEach(() => {
      cy.registerCollapsibleFrom(
        '/iframe.html?id=components-collapsible--initially-collapsed',
      );
      cy.get('@collapsible').find('.accordion-header').as('header');
    });

    it('should be collapsed', () => {
      cy.checkVisibility('hidden');
    });

    it('should have a correct aria-expanded attribute', () => {
      cy.checkAriaExpanded('false');
    });

    it('should be expanded after clicking on the header once', () => {
      cy.get('@header').click();
      cy.checkVisibility('visible');
    });

    it('should be collapsed after clicking on the header twice', () => {
      cy.get('@header').dblclick();
      cy.checkVisibility('hidden');
    });
  });

  describe('custom trigger', () => {
    beforeEach(() => {
      cy.registerCollapsibleFrom('/iframe.html?id=components-collapsible--custom-trigger');
      cy.get('[aria-controls="collapsible-example--custom-trigger"]').as('controls');
      cy.get('@controls').contains('Toggle').as('toggle');
      cy.get('@controls').contains('Show').as('show');
      cy.get('@controls').contains('Hide').as('hide');
    });

    it('should not have a header', () => {
      cy.get('@collapsible').find('.accordion-header').should('not.exist');
    });

    it('should be expanded', () => {
      cy.checkVisibility('visible');
    });

    it('should be collapsed after clicking "Toggle" once', () => {
      cy.get('@toggle').click();
      cy.checkVisibility('hidden');
    });

    it('should be expanded after clicking "Toggle" twice', () => {
      cy.get('@toggle').dblclick();
      cy.checkVisibility('visible');
    });

    it('should be collapsed after clicking "Hide" once', () => {
      cy.get('@hide').click();
      cy.checkVisibility('hidden');
    });

    it('should be collapsed after clicking "Hide" twice', () => {
      cy.get('@hide').dblclick();
      cy.checkVisibility('hidden');
    });

    it('should be expanded after clicking "Show" once', () => {
      cy.get('@show').click();
      cy.checkVisibility('visible');
    });

    it('should be expanded after clicking "Show" twice', () => {
      cy.get('@show').dblclick();
      cy.checkVisibility('visible');
    });
  });
});
