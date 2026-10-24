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

  describe('grief', () => {
    beforeEach(() => {
      cy.getComponent('banner', BANNER_ID);
      cy.get('@banner').invoke('attr', 'type', 'grief');
    });

    it('should render a hidden candle icon', () => {
      cy.get('@banner')
        .shadow()
        .find('.grief-icon')
        .should('have.attr', 'aria-hidden', 'true')
        .find('post-icon')
        .should('have.attr', 'name', 'candle');
    });

    it('should use the dark color scheme for its slotted content only', () => {
      cy.get('@banner').should('not.have.attr', 'data-color-scheme');
      cy.get('@banner')
        .children(':not([slot="close-button"])')
        .first()
        .should('have.css', 'color-scheme', 'dark');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('banner');
    cy.checkA11y('#root-inner', undefined, (violations) => {
      expect(violations).to.have.length(0);
    });
  });
});
