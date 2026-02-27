const PAGE_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

const MOCK_SESSION = {
  name: 'Jane',
  surname: 'Doe',
  email: 'jane.doe@post.ch',
  userType: 'private',
};

describe('login-widget', () => {
  describe('Logged out', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/v1/session/subscribe', {
        statusCode: 200,
        body: { data: null },
      }).as('sessionRequest');

      cy.getComponent('post-login-widget', PAGE_ID);
      cy.wait('@sessionRequest');
      cy.get('post-login-widget[data-hydrated]');
    });

    it('should render a login link', () => {
      cy.get('@post-login-widget').shadow().find('a').should('exist');
    });

    it('should not render an avatar trigger or menu', () => {
      cy.get('@post-login-widget').shadow().find('post-menu-trigger').should('not.exist');
      cy.get('@post-login-widget').shadow().find('post-menu').should('not.exist');
    });

    it('should point the login link to the login-url prop', () => {
      cy.get('@post-login-widget')
        .shadow()
        .find('a')
        .should('have.attr', 'href', 'https://account.post.ch/login');
    });

    it('should render a login icon inside the link', () => {
      cy.get('@post-login-widget').shadow().find('a post-icon').should('exist');
    });

    it('should log a console error when the required login-url prop is missing', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@post-login-widget').invoke('removeAttr', 'login-url');
      cy.get('@consoleError').should('be.called');
    });
  });

  describe('Logged in', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/v1/session/subscribe', {
        statusCode: 200,
        body: { data: MOCK_SESSION },
      }).as('sessionRequest');

      cy.getComponent('post-login-widget', PAGE_ID);
      cy.wait('@sessionRequest');
      cy.get('post-login-widget[data-hydrated]');
    });

    it('should not render a login link', () => {
      cy.get('@post-login-widget').shadow().find('a').should('not.exist');
    });

    it('should render a menu trigger with an avatar', () => {
      cy.get('@post-login-widget').shadow().find('post-menu-trigger').should('exist');
      cy.get('@post-login-widget').shadow().find('post-avatar').should('exist');
    });

    it('should render a menu', () => {
      cy.get('@post-login-widget').shadow().find('post-menu').should('exist');
    });

    it('should initially have the menu hidden', () => {
      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should open the menu when clicking the avatar trigger', () => {
      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu-trigger button')
        .click();

      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
    });

    it('should close the menu when clicking the trigger again', () => {
      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu-trigger button')
        .dblclick();

      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should show the user name in the menu header', () => {
      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu-trigger button')
        .click();

      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu [slot="header"]')
        .should('contain.text', MOCK_SESSION.name)
        .and('contain.text', MOCK_SESSION.surname);
    });

    it('should emit a postLogout event when the logout button is clicked', () => {
      const logoutHandler = cy.spy().as('logoutHandler');

      cy.get('@post-login-widget').then($el => {
        $el.get(0).addEventListener('postLogout', logoutHandler);
      });

      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu-trigger button')
        .click();

      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu button')
        .last()
        .click();

      cy.get('@logoutHandler').should('have.been.calledOnce');
    });

    it('should include the logout-url in the postLogout event payload', () => {
      let emittedDetail: string;

      cy.get('@post-login-widget').then($el => {
        $el.get(0).addEventListener('postLogout', (e: CustomEvent) => {
          emittedDetail = e.detail;
        });
      });

      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu-trigger button')
        .click();

      cy.get('@post-login-widget')
        .shadow()
        .find('post-menu button')
        .last()
        .click();

      cy.then(() => {
        expect(emittedDetail).to.equal('https://account.post.ch/logout');
      });
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load for all variants', () => {
      cy.getSnapshots('post-login-widget');
      cy.checkA11y('#root-inner');
    });
  });
});
