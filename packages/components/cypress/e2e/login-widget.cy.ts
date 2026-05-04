const SESSION_URL = 'https://n.account.post.ch/v1/session/subscribe';

const AUTH_FIXTURE = {
  typ: 'sub',
  adr: '16881ddc-a5b8-4597-88b4-ca6dsf4f5250',
  ttl: 600000,
  data: {
    name: 'First Name',
    surname: 'Last Name',
    email: 'Email',
    userType: 'B2C',
    authLevel: 'PASSWORD',
    support: false,
    changeUserAndProfile: 'notAvailable',
  },
};

const UNAUTH_FIXTURE = {};

const FIXTURE_PATH = './cypress/fixtures/post-login-widget.html';

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
    cy.get('[data-testid="user-menu"]').should('be.visible');
    cy.get('[data-testid="login-link"]').should('not.be.visible');
  });

  it('renders the unauthenticated slot when the API returns no user data', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    cy.get('[data-testid="login-link"]').should('be.visible');
    cy.get('[data-testid="user-menu"]').should('not.be.visible');
  });

  // ─── refresh() updates state and UI ───────────────────────────────────────

  it('refresh() re-fetches and switches to authenticated slot', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session1');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session1');
    cy.get('[data-testid="login-link"]').should('be.visible');

    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session2');
    cy.get('post-login-widget').then(([el]) => el.refresh());
    cy.wait('@session2');
    cy.get('[data-testid="user-menu"]').should('be.visible');
    cy.get('[data-testid="login-link"]').should('not.be.visible');
  });

  // ─── postChange event ─────────────────────────────────────────────────
  // Note: delay is intentional — gives the spy time to attach before the
  // response arrives, preventing a race condition between visit and intercept.

  it('emits postChange with authenticated=true when user data present', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE, delay: 100 }).as('session');
    cy.visit(FIXTURE_PATH);
    const spy = cy.spy().as('changeSpy');
    cy.get('post-login-widget').then(([el]) => {
      el.addEventListener('postChange', spy);
    });
    cy.wait('@session');
    cy.get('@changeSpy').should('have.been.calledOnce');
    cy.get('@changeSpy').should('have.been.calledWithMatch', {
      detail: { authenticated: true },
    });
  });

  it('emits postChange with authenticated=false when no user data', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE, delay: 100 }).as('session');
    cy.visit(FIXTURE_PATH);
    const spy = cy.spy().as('changeSpy');
    cy.get('post-login-widget').then(([el]) => {
      el.addEventListener('postChange', spy);
    });
    cy.wait('@session');
    cy.get('@changeSpy').should('have.been.calledOnce');
    cy.get('@changeSpy').should('have.been.calledWithMatch', {
      detail: { authenticated: false },
    });
  });

  // ─── isAuthenticated() method ────────────────────────────────────────────

  it('isAuthenticated() returns true after successful auth', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    cy.get('[data-testid="user-menu"]').should('be.visible');
    cy.get('post-login-widget').then(([el]) => {
      el.isAuthenticated().then(value => {
        expect(value).to.equal(true);
      });
    });
  });

  it('isAuthenticated() returns false when not authenticated', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    cy.get('[data-testid="login-link"]').should('be.visible');
    cy.get('post-login-widget').then(([el]) => {
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
    cy.get('[data-testid="login-link"]').should('be.visible');
    cy.get('[data-testid="user-menu"]').should('not.be.visible');
  });

  it('renders the unauthenticated slot when the API returns a non-2xx status', () => {
    cy.intercept('GET', SESSION_URL, { statusCode: 401, body: {} }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');
    cy.get('[data-testid="login-link"]').should('be.visible');
    cy.get('[data-testid="user-menu"]').should('not.be.visible');
  });

  // ─── No unnecessary re-renders ────────────────────────────────────────────

  it('does not emit postChange if state has not changed', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    cy.visit(FIXTURE_PATH);
    cy.wait('@session');

    // attach spy only after initial fetch completes so it does not capture the mount event
    cy.get('[data-testid="user-menu"]').should('be.visible');

    const spy = cy.spy().as('changeSpy');
    cy.get('post-login-widget').then(([el]) => {
      el.addEventListener('postChange', spy);
    });

    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session2');
    cy.get('post-login-widget').then(([el]) => el.refresh());
    cy.wait('@session2');

    cy.get('@changeSpy').should('not.have.been.called');
  });
});
