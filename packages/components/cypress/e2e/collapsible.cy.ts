const COLLAPSIBLE_ID = '6a91848c-16ec-4a23-bc45-51c797b5b2c3';
const FIXTURE_PATH = './cypress/fixtures/post-collapsible.test.html';

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
      cy.get('@collapsible').should('be.visible');
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
      cy.get('@collapsible').should('be.hidden');
    });

    it('should update the "aria-expanded" attribute after hiding the collapsible', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });

    it('should show the collapsible after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@collapsible').should('be.visible');
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
      cy.get('@collapsible').should('be.hidden');
    });

    it('should show the collapsible after clicking on the trigger once', () => {
      cy.get('@trigger').click();
      cy.get('@collapsible').should('be.visible');
    });

    it('should hide the collapsible after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@collapsible').should('be.hidden');
    });
  });

  describe('wrapped collapsible', () => {
    beforeEach(() => {
      cy.getComponents(COLLAPSIBLE_ID, 'wrapped-collapsible', 'post-collapsible', 'post-collapsible-trigger');
      cy.get('@collapsible-trigger').find('.btn').as('trigger');
    });

    it('should have a collapsible', () => {
      cy.get('@collapsible').should('exist');
    });

    it('should show the collapsible', () => {
      cy.get('@collapsible').should('be.visible');
    });

    it('should set aria-controls to an auto-generated id on the trigger', () => {
      cy.get('@collapsible')
        .invoke('attr', 'id')
        .then(collapsibleId => {
          expect(collapsibleId).to.match(/^collapsible-/);
          cy.get('@trigger').should('have.attr', 'aria-controls', collapsibleId);
        });
    });

    it('should set aria-expanded to true when the collapsible is expanded', () => {
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should hide the collapsible after clicking on the trigger once', () => {
      cy.get('@trigger').click();
      cy.get('@collapsible').should('be.hidden');
    });

    it('should update aria-expanded to false after hiding the collapsible', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });

    it('should show the collapsible after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@collapsible').should('be.visible');
    });

    it('should update aria-expanded to true after showing the collapsible', () => {
      cy.get('@trigger').dblclick();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });
  });

  describe('trigger wiring ignores buttons inside the collapsible panel', { baseUrl: null }, () => {
    beforeEach(() => {
      cy.visit(FIXTURE_PATH);

      cy.get('#nested-inner-button').as('section');
      cy.get('@section')
        .find('post-collapsible[data-hydrated]')
        .as('collapsible');

      cy.get('[data-testid="real-trigger"]').as('trigger');
    });

    it('wires the button outside the panel, not the one inside it', () => {
      cy.get('@collapsible').should('be.visible');

      cy.get('@trigger').click();

      cy.get('@collapsible').should('be.hidden');
    });

    it('does not toggle when the inner button is clicked', () => {
      cy.get('@collapsible').should('be.visible');

      cy.get('@collapsible')
        .find('button')
        .contains('Button inside the panel')
        .click();

      cy.get('@collapsible').should('be.visible');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('collapsible');
    cy.checkA11y('#root-inner');
  });
});
