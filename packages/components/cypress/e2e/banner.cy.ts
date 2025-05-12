const BANNER_ID = '8fd36823-966e-46a8-8432-a4439f6e208f';

describe('banner', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('post-banner', BANNER_ID);
    });

    it('should render', () => {
      cy.get('@banner').should('exist');
    });

    it('should not have a close button', () => {
      cy.get('@banner').find('.btn-close').should('not.exist');
    });
  });

  describe('dismissible', () => {
    beforeEach(() => {
      cy.getComponent('post-banner', BANNER_ID, 'dismissible');
    });

    it('should have a close button', () => {
      cy.get('@banner').find('.btn-close').should('be.visible');
    });

    it('should be removed after the dismiss button is clicked', () => {
      cy.get('@banner').find('.btn-close').click();
      cy.get('@banner').should('not.exist');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('post-banner');
    cy.checkA11y('#root-inner');
  });
});
