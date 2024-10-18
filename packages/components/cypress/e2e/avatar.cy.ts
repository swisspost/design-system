const PAGE_ID = '09aac03d-220e-4885-8fb8-1cfa01add188';

describe('Avatar', () => {
  describe('Structure & Props', () => {
    beforeEach(() => {
      cy.getComponent('post-avatar', PAGE_ID);
      cy.window().then(win => {
        cy.wrap(cy.spy(win.console, 'error')).as('consoleError');
      });
    });

    it('should have no console errors', () => {
      cy.get('@consoleError').should('not.be.called');
    });

    it('should have only the required attribute "firstname" by default', () => {
      cy.get('@avatar').should('exist');
      cy.get('@avatar').should('not.have.attr', 'email');
      cy.get('@avatar').should('have.attr', 'firstname');
      cy.get('@avatar').should('not.have.attr', 'lastname');
    });

    it('should have a console error, when attribute "firstname" is not defined', () => {
      cy.get('@avatar').invoke('removeAttr', 'firstname');
      cy.get('@consoleError').should('have.been.calledOnce');
    });

    it('should show initials when, firstname or firstname and lastname is defined', () => {
      cy.get('@avatar').find('.initials').as('initials');

      cy.get('@initials').should('exist');
      cy.get('@avatar').find('img').should('not.exist');

      cy.get('@avatar').invoke('attr', 'firstname', 'Open');
      cy.get('@initials').should('have.text', 'Open');

      cy.get('@avatar').invoke('attr', 'lastname', 'Source');
      cy.get('@initials').and('have.text', 'Open Source');
      cy.get('@consoleError').should('not.have.been.called');

      cy.get('@avatar').invoke('removeAttr', 'lastname');
      cy.get('@initials').should('have.text', 'Open');
      cy.get('@consoleError').should('not.have.been.called');

      cy.get('@avatar').invoke('removeAttr', 'firstname');
      cy.get('@initials').should('have.text', '');
      cy.get('@consoleError').should('have.been.calledOnce');
    });

    it('should show image, when email with gravatar account is defined', () => {
      cy.get('@avatar').invoke('attr', 'email', 'oss@post.ch');
      cy.get('@avatar').should('have.attr', 'email');
      cy.get('@avatar').find('slot img').should('exist');
      cy.get('@avatar').find('.initials').should('not.exist');

      cy.get('@avatar').invoke('removeAttr', 'email');
      cy.get('@avatar').find('slot img').should('not.exist');
      cy.get('@avatar').find('.initials').should('exist');
      cy.get('@consoleError').should('not.have.been.called');
    });

    it('should show initials, when email with no gravatar account is defined', () => {
      cy.get('@avatar').invoke('attr', 'email', 'no-gravatar-account@post.ch');
      cy.get('@avatar').should('have.attr', 'email');
      cy.get('@avatar').should('have.attr', 'firstname');
      cy.get('@avatar').find('slot img').should('not.exist');
      cy.get('@avatar').find('.initials').should('exist');
      cy.get('@consoleError').should('not.have.been.called');
    });

    it('should show image, when slotted image is defined', () => {
      cy.get('@avatar').invoke(
        'append',
        '<img src="/assets/images/logo-swisspost.svg" alt="Swiss Post Logo" />',
      );
      cy.get('@avatar').find('slot img').should('not.exist');
      cy.get('@avatar').find('.initials').should('not.exist');

      cy.get('@avatar').find('> img').invoke('remove');
      cy.get('@avatar').find('img').should('not.exist');
      cy.get('@avatar').find('.initials').should('exist');
      cy.get('@consoleError').should('not.have.been.called');
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load for all variants', () => {
      cy.getSnapshots('avatar');
      cy.checkA11y('#root-inner');
    });
  });
});
