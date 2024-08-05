const AVATAR_ID = 'ecf5e441-ebe3-4516-a2c9-e5ff20b8c361';

describe('avatar', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('avatar', AVATAR_ID);
    });

    it('should render', () => {
      cy.get('@avatar').should('exist');
    });

    it('should show a post-avatar-picture', () => {
      cy.get('@avatar').shadow().find('post-avatar-picture').should('exist');
    });

    it("should show the user's firstname", () => {
      cy.get('@avatar').shadow().find('.userInfo__username').should('include.text', 'Mika');
    });

    it("should show the user's lastname", () => {
      cy.get('@avatar').shadow().find('.userInfo__username').should('include.text', 'Muster');
    });

    it("should show the user's company name", () => {
      cy.get('@avatar').shadow().find('.userInfo__company').should('include.text', 'Muster AG');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('avatar');
    cy.checkA11y('#root-inner');
  });
});
