const PAGE_ID = '09aac03d-220e-4885-8fb8-1cfa01add188';

describe('Avatar-Picture', () => {
  describe('Structure & Props', () => {
    beforeEach(() => {
      cy.getComponent('post-avatar-picture', PAGE_ID);
      cy.window().then(win => {
        cy.wrap(cy.spy(win.console, 'error')).as('consoleError');
      });
    });

    it('should have no console errors', () => {
      cy.get('@consoleError').should('not.be.called');
    });

    it('should have no attributes but class "large" by default', () => {
      cy.get('@avatar-picture').should('exist');
      cy.get('@avatar-picture').should('not.have.attr', 'size');
      cy.get('@avatar-picture').should('not.have.attr', 'email');
      cy.get('@avatar-picture').should('not.have.attr', 'firstname');
      cy.get('@avatar-picture').should('not.have.attr', 'lastname');
      cy.get('@avatar-picture').should('have.class', 'large');
      cy.get('@avatar-picture').should('not.have.class', 'small');
    });

    it('should have class "small", when size attribute is set to "small"', () => {
      cy.get('@avatar-picture').invoke('attr', 'size', 'small');
      cy.get('@avatar-picture').should('have.class', 'small');
      cy.get('@avatar-picture').should('not.have.class', 'large');
    });

    it('should show fallback, when no attribute is defined', () => {
      cy.get('@avatar-picture').should('not.have.attr', 'email');
      cy.get('@avatar-picture').should('not.have.attr', 'firstname');
      cy.get('@avatar-picture').should('not.have.attr', 'lastname');

      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');
    });

    it('should show initials when, firstname and/or lastname is defined', () => {
      cy.get('@avatar-picture').should('not.have.attr', 'email');
      cy.get('@avatar-picture').should('not.have.attr', 'firstname');
      cy.get('@avatar-picture').should('not.have.attr', 'lastname');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');

      cy.get('@avatar-picture').invoke('attr', 'firstname', 'o');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('exist').and('have.text', 'o');
      cy.get('@avatar-picture').find('post-icon').should('not.exist');

      cy.get('@avatar-picture').invoke('attr', 'lastname', 's');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('exist').and('have.text', 'os');
      cy.get('@avatar-picture').find('post-icon').should('not.exist');

      cy.get('@avatar-picture').invoke('removeAttr', 'firstname');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('exist').and('have.text', 's');
      cy.get('@avatar-picture').find('post-icon').should('not.exist');

      cy.get('@avatar-picture').invoke('removeAttr', 'lastname');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');
    });

    it('should show image when, email with gravatar account is defined', () => {
      cy.get('@avatar-picture').should('not.have.attr', 'email');
      cy.get('@avatar-picture').should('not.have.attr', 'firstname');
      cy.get('@avatar-picture').should('not.have.attr', 'lastname');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');

      cy.get('@avatar-picture').invoke('attr', 'email', 'oss@post.ch');
      cy.get('@avatar-picture').find('img').should('exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('not.exist');

      cy.get('@avatar-picture').invoke('removeAttr', 'email');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');
    });

    it('should show fallback when, email with no gravatar account and no firstname and lastname is defined', () => {
      cy.get('@avatar-picture').should('not.have.attr', 'email');
      cy.get('@avatar-picture').should('not.have.attr', 'firstname');
      cy.get('@avatar-picture').should('not.have.attr', 'lastname');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');

      cy.get('@avatar-picture').invoke('attr', 'email', 'no.gravatar-account@post.ch');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');

      cy.get('@avatar-picture').invoke('removeAttr', 'email');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');
    });

    it('should show initials when, email with no gravatar account, but first and/or lastname is defined', () => {
      cy.get('@avatar-picture').should('not.have.attr', 'email');
      cy.get('@avatar-picture').should('not.have.attr', 'firstname');
      cy.get('@avatar-picture').should('not.have.attr', 'lastname');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');

      cy.get('@avatar-picture').invoke('attr', 'email', 'no.gravatar-account@post.ch');
      cy.get('@avatar-picture').invoke('attr', 'firstname', 'o');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('exist');
      cy.get('@avatar-picture').find('post-icon').should('not.exist');

      cy.get('@avatar-picture').invoke('attr', 'lastname', 's');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('exist');
      cy.get('@avatar-picture').find('post-icon').should('not.exist');

      cy.get('@avatar-picture').invoke('removeAttr', 'firstname');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('exist');
      cy.get('@avatar-picture').find('post-icon').should('not.exist');

      cy.get('@avatar-picture').invoke('removeAttr', 'email');
      cy.get('@avatar-picture').invoke('removeAttr', 'lastname');
      cy.get('@avatar-picture').find('img').should('not.exist');
      cy.get('@avatar-picture').find('div').should('not.exist');
      cy.get('@avatar-picture').find('post-icon').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load for all variants', () => {
      cy.getSnapshots('avatar-picture');
      cy.checkA11y('#root-inner');
    });
  });
});
