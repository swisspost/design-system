import { getGravatarUrl } from '../../src/components/post-avatar/avatar-utils';

const PAGE_ID = '09aac03d-220e-4885-8fb8-1cfa01add188';

describe('Avatar', () => {
  describe('Structure & Props', () => {
    beforeEach(() => {
      cy.getComponent('post-avatar', PAGE_ID);
    });

    it('should have only the required attribute "firstname" by default', () => {
      cy.get('@avatar').should('exist');
      cy.get('@avatar').should('not.have.attr', 'email');
      cy.get('@avatar').should('have.attr', 'firstname');
      cy.get('@avatar').should('not.have.attr', 'lastname');
    });

    it('should log a console error, when attribute "firstname" is not defined', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@avatar').invoke('removeAttr', 'firstname');
      cy.get('@consoleError').should('be.called');
    });

    it('should show initials when, firstname or firstname and lastname is defined', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@avatar').find('.initials').as('initials');

      cy.get('@initials').should('exist');
      cy.get('@avatar').find('img').should('not.exist');

      cy.get('@avatar').invoke('attr', 'firstname', 'Open');
      cy.get('@avatar').invoke('removeAttr', 'decription');
      cy.get('@avatar').invoke('attr', 'description', 'The current user is Open');
      cy.get('@initials').should('have.text', 'OThe current user is Open');

      cy.get('@avatar').invoke('attr', 'lastname', 'Source');
      cy.get('@avatar').invoke('attr', 'description', 'The current user is Open Source');
      cy.get('@initials').and('have.text', 'OSThe current user is Open Source');

      cy.get('@avatar').invoke('removeAttr', 'lastname');
      cy.get('@avatar').invoke('attr', 'description', 'The current user is Open');
      cy.get('@initials').should('have.text', 'OThe current user is Open');

      cy.get('@avatar').invoke('removeAttr', 'firstname').invoke('removeAttr', 'lastname');
      cy.get('@consoleError').should('be.called');
      cy.get('@initials').should('not.have.text');
    });

    it('should show initials if gravatar does not exist, otherwise show img', () => {
      const email = 'no-gravatar-account@post.ch';
      const url = getGravatarUrl(email);

      cy.request({
        url,
        failOnStatusCode: false,
      }).then(response => {
        cy.get('@avatar').invoke('attr', 'email', email);
        cy.get('@avatar').should('have.attr', 'email');
        cy.get('@avatar').should('have.attr', 'firstname');

        if (response.status === 200) {
          cy.get('@avatar').find('slot img').should('exist');
          cy.get('@avatar').find('.initials').should('not.exist');
        } else {
          cy.get('@avatar').find('slot img').should('not.exist');
          cy.get('@avatar').find('.initials').should('exist');
        }
      });
    });

    it('should show image, when slotted image is defined', () => {
      cy.get('@avatar').invoke(
        'append',
        '<img src="/assets/images/logo-swisspost.svg" alt="Swiss Post Logo" />',
      );
      cy.get('@avatar').find('slot img').should('not.exist');
      cy.get('@avatar').find('.initials').should('not.exist');
    });

    it('should not show image, when slotted image is not defined', () => {
      cy.get('@avatar').invoke(
        'append',
        '<img src="/assets/images/logo-swisspost.svg" alt="Swiss Post Logo" />',
      );

      cy.get('@avatar').find('img').invoke('remove');
      cy.get('@avatar').find('img').should('not.exist');
      cy.get('@avatar').find('.initials').should('exist');
    });

    it('should not show image but fallback to initials, when slotted image is invalid', () => {
      cy.get('@avatar').invoke(
        'append',
        '<img src="/assets/images/invalid-image.svg" alt="Invalid image" />',
      );
      cy.get('@avatar').find('img').should('be.not.visible');
      cy.get('@avatar').find('.initials').should('exist');
    });

    it('should show initials, when image is not visible', () => {
      cy.get('@avatar').invoke(
        'append',
        '<img src="/assets/images/logo-swisspost.svg" alt="Swiss Post Logo" />',
      );
      cy.get('@avatar').find('img').invoke('css', 'display', 'none');
      cy.get('@avatar').find('.initials').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load for all variants', () => {
      cy.getSnapshots('avatar');
      cy.checkA11y('#root-inner');
    });
  });
});
