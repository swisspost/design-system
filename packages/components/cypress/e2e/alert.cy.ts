const ALERT_ID = '8fd36823-966e-46a8-8432-a4439f6e208f';

describe('alert', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('post-alert', ALERT_ID);
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
      cy.getComponent('post-alert', ALERT_ID, 'dismissible');
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

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('post-alert');
    cy.checkA11y('#root-inner');
  });
});
