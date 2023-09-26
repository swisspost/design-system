describe('alert', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('post-alert');
    });

    it('should render', () => {
      cy.get('@alert').should('exist');
    });

    it('should not have a close button', () => {
      cy.get('@alert').find('.btn-close').should('not.exist');
    });
  });

  describe('dismissible', () => {
    beforeEach(() => {
      cy.getComponent('post-alert', 'dismissible');
    });

    it('should have a close button', () => {
      cy.get('@alert').find('.btn-close').should('be.visible');
    });

    it('should be removed after the dismiss button is clicked', () => {
      cy.get('@alert').find('.btn-close').click();
      cy.get('@alert').should('not.exist');
    });
  });
});
