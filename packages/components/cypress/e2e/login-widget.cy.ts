const PAGE_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

describe('login-widget', () => {
  describe('Structure & Props', () => {
    beforeEach(() => {
      cy.intercept('https://n.account.post.ch/v1/session/subscribe', {
        statusCode: 200,
        body: { data: null },
      });

      cy.getComponent('post-login-widget', PAGE_ID, 'default');
    });

    it('should render', () => {
      cy.get('@login-widget').should('exist');
    });

    it('should have all required props with correct default values', () => {
      cy.get('@login-widget')
        .should('have.attr', 'login-url', 'https://account.post.ch/login')
        .and('have.attr', 'logout-url', 'https://account.post.ch/logout')
        .and('have.attr', 'text-user-profile', 'My Profile')
        .and('have.attr', 'text-messages', 'Messages')
        .and('have.attr', 'text-settings', 'Settings')
        .and('have.attr', 'text-logout', 'Logout');
    });

    it('should log an error when loginUrl prop is missing', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@login-widget').invoke('removeAttr', 'login-url');
      cy.get('@consoleError').should('be.called');
    });

    it('should log an error when logoutUrl prop is missing', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@login-widget').invoke('removeAttr', 'logout-url');
      cy.get('@consoleError').should('be.called');
    });

    it('should log an error when textUserProfile prop is missing', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@login-widget').invoke('removeAttr', 'text-user-profile');
      cy.get('@consoleError').should('be.called');
    });

    it('should log an error when textMessages prop is missing', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@login-widget').invoke('removeAttr', 'text-messages');
      cy.get('@consoleError').should('be.called');
    });

    it('should log an error when textSettings prop is missing', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@login-widget').invoke('removeAttr', 'text-settings');
      cy.get('@consoleError').should('be.called');
    });

    it('should log an error when textLogout prop is missing', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });
      cy.get('@login-widget').invoke('removeAttr', 'text-logout');
      cy.get('@consoleError').should('be.called');
    });
  });

  describe('not logged in state', () => {
    beforeEach(() => {
      cy.intercept('https://n.account.post.ch/v1/session/subscribe', {
        statusCode: 200,
        body: { data: null },
      });

      cy.getComponent('post-login-widget', PAGE_ID, 'default');
    });

    it('should render a login link', () => {
      cy.get('@login-widget').find('a').should('exist').and('be.visible');
    });

    it('should display correct login URL', () => {
      cy.get('@login-widget')
        .find('a')
        .should('have.attr', 'href', 'https://account.post.ch/login');
    });

    it('should display login text with icon', () => {
      cy.get('@login-widget').find('a').should('contain.text', 'Login');
      cy.get('@login-widget').find('post-icon[name="login"]').should('exist');
    });
  });

  describe('logged in state', () => {
    beforeEach(() => {
      cy.intercept('https://n.account.post.ch/v1/session/subscribe', {
        statusCode: 200,
        body: {
          data: {
            name: 'John',
            surname: 'Doe',
            email: 'john.doe@example.com',
            userType: 'user',
          },
        },
      });

      cy.getComponent('post-login-widget', PAGE_ID, 'default');
    });

    it('should render the menu trigger with avatar', () => {
      cy.get('@login-widget').find('post-menu-trigger').should('exist');
      cy.get('@login-widget').find('post-avatar').should('exist');
    });

    it('should initially hide the menu', () => {
      cy.get('@login-widget')
        .find('post-menu')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should show the menu when clicking the trigger button', () => {
      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
    });

    it('should display user name in menu header', () => {
      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu')
        .find('[slot="header"] p')
        .should('contain.text', 'John Doe');
    });

    it('should display four menu items', () => {
      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu-item')
        .should('have.length', 4);
    });

    it('should have a profile link with correct href and text', () => {
      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu-item')
        .first()
        .find('a')
        .should('have.attr', 'href', 'https://www.post.ch/selfadmin/')
        .and('contain.text', 'My Profile');
    });

    it('should have a messages link with correct href and text', () => {
      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu-item')
        .eq(1)
        .find('a')
        .should('have.attr', 'href', 'https://www.post.ch/selfadmin/messages/')
        .and('contain.text', 'Messages');
    });

    it('should have a settings link with correct href and text', () => {
      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu-item')
        .eq(2)
        .find('a')
        .should('have.attr', 'href', 'https://www.post.ch/selfadmin/settings/')
        .and('contain.text', 'Settings');
    });

    it('should have a logout button with correct text', () => {
      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu-item')
        .last()
        .find('button')
        .should('contain.text', 'Logout');
    });

    it('should display correct icons for menu items', () => {
      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu-item')
        .eq(0)
        .find('post-icon')
        .should('have.attr', 'name', 'profile');
      cy.get('@login-widget')
        .find('post-menu-item')
        .eq(1)
        .find('post-icon')
        .should('have.attr', 'name', 'letter');
      cy.get('@login-widget')
        .find('post-menu-item')
        .eq(2)
        .find('post-icon')
        .should('have.attr', 'name', 'gear');
      cy.get('@login-widget')
        .find('post-menu-item')
        .eq(3)
        .find('post-icon')
        .should('have.attr', 'name', 'logout');
    });

    it('should hide menu when clicking the trigger button again', () => {
      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');

      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should emit postLogout event when logout button is clicked', () => {
      const EventHandlerMock = cy.spy();

      cy.get('@login-widget').then($el => {
        Cypress.$($el.get(0)).on('postLogout', EventHandlerMock);
      });

      cy.get('@login-widget').find('post-menu-trigger').find('button').click();
      cy.get('@login-widget')
        .find('post-menu-item')
        .last()
        .find('button')
        .click()
        .then(() => {
          cy.wrap(EventHandlerMock).should('have.been.called');
        });
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      cy.intercept('https://n.account.post.ch/v1/session/subscribe', {
        statusCode: 500,
      });

      cy.getComponent('post-login-widget', PAGE_ID, 'default');
    });

    it('should fall back to login link when session fetch fails', () => {
      cy.get('@login-widget').find('a').should('exist').and('be.visible');
    });
  });

  describe('dynamic prop updates', () => {
    beforeEach(() => {
      cy.intercept('https://n.account.post.ch/v1/session/subscribe', {
        statusCode: 200,
        body: { data: null },
      });

      cy.getComponent('post-login-widget', PAGE_ID, 'default');
    });

    it('should update login URL when prop changes', () => {
      const newUrl = 'https://new-login-url.example.com';
      cy.get('@login-widget').invoke('attr', 'login-url', newUrl);
      cy.get('@login-widget')
        .find('a')
        .should('have.attr', 'href', newUrl);
    });
  });
});

describe('Accessibility', () => {
  beforeEach(() => {
    cy.getSnapshots('post-login-widget');
  });

  it('Has no detectable a11y violations on load for all variants', () => {
    cy.checkA11y('#root-inner');
  });
});
