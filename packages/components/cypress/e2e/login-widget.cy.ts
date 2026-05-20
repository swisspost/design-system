const SESSION_URL = 'https://n.account.post.ch/v1/session/subscribe';

const AUTH_FIXTURE = {
  typ: 'sub',
  adr: '16881ddc-a5b8-4597-88b4-ca6dsf4f5250',
  ttl: 600000,
  data: {
    name: 'First Name',
    surname: 'Last Name',
    email: 'email@post.ch',
    userType: 'B2C',
    authLevel: 'PASSWORD',
    support: false,
    changeUserAndProfile: 'notAvailable',
  },
};

const UNAUTH_FIXTURE = {};

const FIXTURE_PATH = './cypress/fixtures/post-login-widget.html';

const getLoginWidget = () => cy.get('post-login-widget');

const getLoginWidgetShadow = () => getLoginWidget().shadow();

const assertAuthenticatedState = () => {
  getLoginWidgetShadow().find('post-menu-trigger').should('exist').and('be.visible');
  getLoginWidgetShadow().find('post-menu').should('exist');
  getLoginWidgetShadow().find('slot[name="login-link"]').should('not.exist');
};

const assertUnauthenticatedState = () => {
  getLoginWidgetShadow().find('slot[name="login-link"]').should('exist');
  getLoginWidgetShadow().find('post-menu-trigger').should('not.exist');
  getLoginWidgetShadow().find('post-menu').should('not.exist');
};

describe('post-login-widget', { baseUrl: null }, () => {
  // ─── API is called on initialization ──────────────────────────────────────

  it('calls the session API on mount', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
  });

  // ─── Correct slot rendered based on authentication state ──────────────────

  it('renders the authenticated slot when the API returns user data', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    assertAuthenticatedState();
  });

  it('renders the unauthenticated slot when the API returns no user data', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    assertUnauthenticatedState();
  });

  // ─── refresh() updates state and UI ───────────────────────────────────────

  it('refresh() re-fetches and switches to authenticated slot', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session1');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session1');
    assertUnauthenticatedState();

    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session2');
    getLoginWidget().then(([el]) => el.refresh());
    cy.wait('@session2');
    assertAuthenticatedState();
  });

  // ─── postChange event ─────────────────────────────────────────────────
  // Note: delay is intentional — gives the spy time to attach before the
  // response arrives, preventing a race condition between visit and intercept.

  it('emits postChange with authenticated=true when user data present', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE, delay: 100 }).as('session');
    cy.visit(FIXTURE_PATH, {
      onBeforeLoad(win) {
        (
          win as Window & { postChangeEvents?: Array<{ authenticated: boolean }> }
        ).postChangeEvents = [];
        win.document.addEventListener('postChange', event => {
          const customEvent = event as CustomEvent<{ authenticated: boolean }>;
          (
            win as Window & { postChangeEvents?: Array<{ authenticated: boolean }> }
          ).postChangeEvents?.push(customEvent.detail);
        });
      },
    });
    cy.wait('@session');
    cy.window()
      .its('postChangeEvents')
      .should('deep.equal', [{ authenticated: true }]);
  });

  it('emits postChange with authenticated=false when no user data', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE, delay: 100 }).as('session');
    cy.visit(FIXTURE_PATH, {
      onBeforeLoad(win) {
        (
          win as Window & { postChangeEvents?: Array<{ authenticated: boolean }> }
        ).postChangeEvents = [];
        win.document.addEventListener('postChange', event => {
          const customEvent = event as CustomEvent<{ authenticated: boolean }>;
          (
            win as Window & { postChangeEvents?: Array<{ authenticated: boolean }> }
          ).postChangeEvents?.push(customEvent.detail);
        });
      },
    });
    cy.wait('@session');
    cy.window()
      .its('postChangeEvents')
      .should('deep.equal', [{ authenticated: false }]);
  });

  // ─── isAuthenticated() method ────────────────────────────────────────────

  it('isAuthenticated() returns true after successful auth', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    assertAuthenticatedState();
    getLoginWidget().then(([el]) => {
      el.isAuthenticated().then(value => {
        expect(value).to.equal(true);
      });
    });
  });

  it('isAuthenticated() returns false when not authenticated', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    assertUnauthenticatedState();
    getLoginWidget().then(([el]) => {
      el.isAuthenticated().then(value => {
        expect(value).to.equal(false);
      });
    });
  });

  // ─── Fallback on API failure ───────────────────────────────────────────────

  it('renders the unauthenticated slot when the API request fails', () => {
    cy.intercept('GET', SESSION_URL, { forceNetworkError: true }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    assertUnauthenticatedState();
  });

  it('renders the unauthenticated slot when the API returns a non-2xx status', () => {
    cy.intercept('GET', SESSION_URL, { statusCode: 401, body: {} }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    assertUnauthenticatedState();
  });

  // ─── No unnecessary re-renders ────────────────────────────────────────────

  it('does not emit postChange if state has not changed', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');

    // attach spy only after initial fetch completes so it does not capture the mount event
    assertAuthenticatedState();

    const spy = cy.spy().as('changeSpy');
    getLoginWidget().then(([el]) => {
      el.addEventListener('postChange', spy);
    });

    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session2');
    getLoginWidget().then(([el]) => el.refresh());
    cy.wait('@session2');

    cy.get('@changeSpy').should('not.have.been.called');
  });
});
