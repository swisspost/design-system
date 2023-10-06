describe('toast', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit(`/iframe.html?id=components-toast--auto-close`);
      cy.get('button.btn').as('triggerCreateToast');
    });

    it('should hide on close button click', () => {
      cy.get('@triggerCreateToast').click();
      cy.get('.toast').should('exist');
      cy.get('.toast-close-button').click();
      cy.get('.toast').should('not.exist');
    });
  });
});
