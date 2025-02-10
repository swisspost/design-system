const COLLAPSIBLE_ID = '6a91848c-16ec-4a23-bc45-51c797b5b2c3';

describe('collapsible', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponents(COLLAPSIBLE_ID, 'default', 'post-collapsible', 'post-collapsible-trigger');
      cy.get('@collapsible-trigger').find('.btn').as('trigger');
    });

    it('should have a collapsible', () => {
      cy.get('@collapsible').should('exist');
    });

    it('should have a trigger', () => {
      cy.get('@trigger').should('exist');
    });

    it('should show the collapsible', () => {
      cy.get('@collapsible').should(`be.visible`);
    });

    it('should set the correct ARIA attribute on the trigger', () => {
      cy.get('@collapsible')
        .invoke('attr', 'id')
        .then(collapsibleId => {
          cy.get('@trigger').should('have.attr', 'aria-controls', collapsibleId);
        });
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should hide the collapsible after clicking on the trigger once', () => {
      cy.get('@trigger').click();
      cy.get('@collapsible').should(`be.hidden`);
    });

    it('should update the "aria-expanded" attribute after hiding the collapsible', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });

    it('should show the collapsible after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@collapsible').should(`be.visible`);
    });

    it('should update the "aria-expanded" attribute after showing the collapsible', () => {
      cy.get('@trigger').dblclick();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });
  });

  describe('initially collapsed', () => {
    beforeEach(() => {
      cy.getComponents(
        COLLAPSIBLE_ID,
        'initially-collapsed',
        'post-collapsible',
        'post-collapsible-trigger',
      );
      cy.get('@collapsible-trigger').find('.btn').as('trigger');
    });

    it('should hide the collapsible', () => {
      cy.get('@collapsible').should(`be.hidden`);
    });

    it('should show the collapsible after clicking on the trigger once', () => {
      cy.get('@trigger').click();
      cy.get('@collapsible').should(`be.visible`);
    });

    it('should hide the collapsible after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@collapsible').should(`be.hidden`);
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('collapsible');
    cy.checkA11y('#root-inner');
  });
});
