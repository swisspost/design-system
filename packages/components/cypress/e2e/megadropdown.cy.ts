const MEGADROPDOWN_ID = '212efc4e-875b-4497-912d-d28c6baf32f5';

describe('megadropdown', () => {
  describe('default', () => {
    describe('desktop', () => {
      beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.getComponents(
          MEGADROPDOWN_ID,
          'tests',
          'post-megadropdown',
          'post-megadropdown-trigger',
        );
        cy.get('@megadropdown').find('.back-button').as('back-btn');
        cy.get('@megadropdown').find('.close-button').as('close-btn');
      });

      it('should render', () => {
        cy.get('@megadropdown').should('exist');
        cy.get('@megadropdown-trigger').should('exist');
        cy.get('@megadropdown').should(`be.hidden`);
      });

      it('should open on trigger click', () => {
        cy.get('@megadropdown-trigger').should('exist');
        cy.get('@megadropdown-trigger').click();
        cy.get('@megadropdown').should(`be.visible`);
      });

      it('should show close button', () => {
        cy.get('@megadropdown-trigger').click();
        cy.get('@close-btn').should(`be.visible`);
      });

      it('should not show back button', () => {
        cy.get('@megadropdown-trigger').click();
        cy.get('@back-btn').should(`be.hidden`);
      });

      it('should close on close button click', () => {
        cy.get('@megadropdown-trigger').click();
        cy.get('@close-btn').click();
        cy.get('@megadropdown').should(`be.hidden`);
      });
    });

    describe('mobile', () => {
      beforeEach(() => {
        cy.viewport(500, 1200);
        cy.getComponents(
          MEGADROPDOWN_ID,
          'tests',
          'post-megadropdown',
          'post-megadropdown-trigger',
        );
        cy.get('@megadropdown').find('.back-button').as('back-btn');
        cy.get('@megadropdown').find('.close-button').as('close-btn');
      });

      it('should open on trigger click', () => {
        cy.get('@megadropdown-trigger').click();
        cy.get('@megadropdown').should(`be.visible`);
      });

      it('should show back button', () => {
        cy.get('@megadropdown-trigger').click();
        cy.get('@back-btn').should(`be.visible`);
      });

      it('should not show close button', () => {
        cy.get('@megadropdown-trigger').click();
        cy.get('@close-btn').should(`be.hidden`);
      });
    });
  });
});
