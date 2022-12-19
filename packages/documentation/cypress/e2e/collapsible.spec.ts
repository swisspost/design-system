Cypress.Commands.add('checkAriaExpanded', () => {
  cy.get('@collapse').invoke('attr', 'id').then(id => {
    cy.get('@collapse').invoke('hasClass', 'show').then(isExpanded => {
      cy.get(`[aria-controls="${id}"]`).should('have.attr', 'aria-expanded', `${isExpanded}`);
    });
  });
});

describe('collapsible', () => {
  beforeEach(() => {
    cy.get('post-collapsible').as('collapsible');
    cy.get('@collapsible').find('.collapse').as('collapse');
  });

  describe('default', () => {
    before(() => {
      cy.visit('iframe.html?args=&id=components-collapsible--default');
    });

    beforeEach(() => {
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
      cy.get('@collapse').should('be.visible');
    });

    it('should show the whole body', () => {
      cy.get('@body').invoke('outerHeight').then(bodyHeight => {
        cy.get('@collapse').invoke('innerHeight').should('to.be.at.least', bodyHeight);
      });
    });

    it('should have correct aria attributes', () => {
      cy.get('@collapse').invoke('attr', 'id').then(id => {
        cy.get('@header').find('button').should('have.attr', 'aria-controls', id);
      });
      cy.checkAriaExpanded();
    });

    it('should be collapsed after clicking on the header', () => {
      cy.get('@header').click();
      cy.get('@collapse').should('be.hidden');
    });

    it('should adapt the header\'s aria-expanded attribute after collapsing', () => {
      cy.checkAriaExpanded();
    });

    it('should be expanded after clicking on the header again', () => {
      cy.get('@header').click();
      cy.get('@collapse').should('be.visible');
    });

    it('should adapt the header\'s aria-expanded attribute after expanding', () => {
      cy.checkAriaExpanded();
    });
  });

  describe('initially collapsed', () => {
    before(() => {
      cy.visit('iframe.html?args=&id=components-collapsible--initially-collapsed');
    });

    beforeEach(() => {
      cy.get('@collapsible').find('.accordion-header').as('header');
    });

    it('should be collapsed', () => {
      cy.get('@collapse').should('be.hidden');
    });

    it('should have a correct aria-expanded attribute', () => {
      cy.checkAriaExpanded();
    });

    it('should be expanded after clicking on the header', () => {
      cy.get('@header').click();
      cy.get('@collapse').should('be.hidden');
    });

    it('should be collapsed after clicking on the header again', () => {
      cy.get('@header').click();
      cy.get('@collapse').should('be.visible');
    });
  });

  describe('custom trigger', () => {
    before(() => {
      cy.visit('iframe.html?args=&id=components-collapsible--custom-trigger');
    });

    beforeEach(() => {
      cy.get('[aria-controls="collapsible-example--custom-trigger"]').as('controls');
      cy.get('@controls').contains('Toggle').as('toggle');
      cy.get('@controls').contains('Show').as('show');
      cy.get('@controls').contains('Hide').as('hide');
    });

    it('should not have a header', () => {
      cy.get('@collapsible').find('.accordion-header').should('not.exist');
    });

    it('should be expanded', () => {
      cy.get('@collapse').should('be.visible');
    });

    it('should be collapsed after clicking "Toggle"', () => {
      cy.get('@toggle').click();
      cy.get('@collapse').should('be.hidden');
    });

    it('should be expanded after clicking "Toggle" again', () => {
      cy.get('@toggle').click();
      cy.get('@collapse').should('be.visible');
    });

    it('should be collapsed after clicking "Hide"', () => {
      cy.get('@hide').click();
      cy.get('@collapse').should('be.hidden');
    });

    it('should remain collapsed after clicking "Hide" again', () => {
      cy.get('@hide').click();
      cy.get('@collapse').should('be.hidden');
    });

    it('should be expanded after clicking "Show"', () => {
      cy.get('@show').click();
      cy.get('@collapse').should('be.visible');
    });

    it('should remain expanded after clicking "Show" again', () => {
      cy.get('@show').click();
      cy.get('@collapse').should('be.visible');
    });
  });
});
