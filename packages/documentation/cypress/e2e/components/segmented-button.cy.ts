describe('Segmented Button', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--segmented-button');
      cy.get('.segmented-button', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner');
    });
  });

  describe('Responsiveness', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--segmented-button');
      cy.get('.segmented-button', { timeout: 30000 }).should('be.visible');
    });

    it('Displays vertical layout when viewport is narrower than 600px', () => {
      cy.viewport(500, 600);
      cy.get('.segmented-button')
        .should('have.css', 'flex-direction', 'column');
    });
  });

  describe('Input Selection', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--segmented-button');
      cy.get('.segmented-button', { timeout: 30000 }).should('be.visible');
    });

    it('Allows selecting an input and updates the state', () => {
      cy.get('.segmented-button label').first().click();

      cy.get('.segmented-button label input').first().should('be.checked');

      cy.get('.segmented-button label').eq(1).click();

      cy.get('.segmented-button label input').eq(1).should('be.checked');

      cy.get('.segmented-button label input').first().should('not.be.checked');
    });
  });
});
