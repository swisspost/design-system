const BANNER_ID = '105e67d8-31e9-4d0b-87ff-685aba31fd4c';

describe('banner', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('banner', BANNER_ID);
    });

    it('should render', () => {
      cy.get('@banner').should('exist');
    });

    it('should not have a close button', () => {
      cy.get('@banner').find('post-closebutton').should('not.exist');
    });
  });

  describe('dismissible', () => {
    beforeEach(() => {
      cy.getComponent('banner', BANNER_ID, 'dismissible');
    });

    it('should have a close button', () => {
      cy.get('@banner').find('post-closebutton').should('be.visible');
    });

    it('should be removed after the dismiss button is clicked', () => {
      cy.get('@banner').find('post-closebutton').click();
      cy.get('@banner').should('not.exist');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('banner');
    cy.checkA11y('#root-inner');
  });
});
