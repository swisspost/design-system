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

const WIDGET_HTML = `
  <post-login-widget>
    <a slot="unauthenticated" href="/login" data-testid="login-link">Login</a>
    <div slot="authenticated" data-testid="user-menu">User Menu</div>
  </post-login-widget>
`;

describe('post-login-widget', () => {
  // ─── API is called on initialization ──────────────────────────────────────

  it('calls the session API on mount', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    cy.mount(WIDGET_HTML);
    cy.wait('@session');
  });

  // ─── Correct slot rendered based on authentication state ──────────────────

  it('renders the authenticated slot when the API returns user data', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    cy.mount(WIDGET_HTML);
    cy.wait('@session');

    cy.get('[data-testid="user-menu"]').should('be.visible');
    cy.get('[data-testid="login-link"]').should('not.exist');
  });

  it('renders the unauthenticated slot when the API returns no user data', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session');
    cy.mount(WIDGET_HTML);
    cy.wait('@session');

    cy.get('[data-testid="login-link"]').should('be.visible');
    cy.get('[data-testid="user-menu"]').should('not.exist');
  });

  // ─── refresh() updates state and UI ───────────────────────────────────────

  it('refresh() re-fetches and switches to authenticated slot', () => {
    // First call → unauthenticated
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session1');
    cy.mount(WIDGET_HTML);
    cy.wait('@session1');
    cy.get('[data-testid="login-link"]').should('be.visible');

    // Second call (after refresh) → authenticated
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session2');
    cy.get('post-login-widget').then(([el]) => el.refresh());
    cy.wait('@session2');

    cy.get('[data-testid="user-menu"]').should('be.visible');
    cy.get('[data-testid="login-link"]').should('not.exist');
  });

  // ─── post-login-change event ───────────────────────────────────────────────

  it('emits post-login-change with authenticated=true when user data present', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    const spy = cy.spy().as('changeSpy');
    cy.mount(WIDGET_HTML);
    cy.get('post-login-widget').then(([el]) => {
      el.addEventListener('postLoginChange', spy);
    });
    cy.wait('@session');
    cy.get('@changeSpy').should('have.been.calledOnce');
    cy.get('@changeSpy').should('have.been.calledWithMatch', {
      detail: { authenticated: true },
    });
  });

  it('emits post-login-change with authenticated=false when no user data', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session');
    const spy = cy.spy().as('changeSpy');
    cy.mount(WIDGET_HTML);
    cy.get('post-login-widget').then(([el]) => {
      el.addEventListener('postLoginChange', spy);
    });
    cy.wait('@session');
    cy.get('@changeSpy').should('have.been.calledOnce');
    cy.get('@changeSpy').should('have.been.calledWithMatch', {
      detail: { authenticated: false },
    });
  });

  // ─── authenticated prop synced ─────────────────────────────────────────────

  it('reflects authenticated=true prop after successful auth', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    cy.mount(WIDGET_HTML);
    cy.wait('@session');
    cy.get('post-login-widget').should('have.attr', 'authenticated', 'true');
  });

  it('reflects authenticated=false prop when not authenticated', () => {
    cy.intercept('GET', SESSION_URL, { body: UNAUTH_FIXTURE }).as('session');
    cy.mount(WIDGET_HTML);
    cy.wait('@session');
    cy.get('post-login-widget').should('have.attr', 'authenticated', 'false');
  });

  // ─── Fallback on API failure ──────────────────────────────────────────────

  it('renders the unauthenticated slot when the API request fails', () => {
    cy.intercept('GET', SESSION_URL, { forceNetworkError: true }).as('session');
    cy.mount(WIDGET_HTML);
    cy.wait('@session');
    cy.get('[data-testid="login-link"]').should('be.visible');
    cy.get('[data-testid="user-menu"]').should('not.exist');
  });

  it('renders the unauthenticated slot when the API returns a non-2xx status', () => {
    cy.intercept('GET', SESSION_URL, { statusCode: 401, body: {} }).as('session');
    cy.mount(WIDGET_HTML);
    cy.wait('@session');
    cy.get('[data-testid="login-link"]').should('be.visible');
  });

  // ─── No unnecessary re-renders ────────────────────────────────────────────

  it('does not emit post-login-change if state has not changed', () => {
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session');
    const spy = cy.spy().as('changeSpy');
    cy.mount(WIDGET_HTML);
    cy.get('post-login-widget').then(([el]) => {
      el.addEventListener('postLoginChange', spy);
    });
    cy.wait('@session');

    // refresh with the same auth result
    cy.intercept('GET', SESSION_URL, { body: AUTH_FIXTURE }).as('session2');
    cy.get('post-login-widget').then(([el]) => el.refresh());
    cy.wait('@session2');

    // Still only called once — no duplicate event
    cy.get('@changeSpy').should('have.been.calledOnce');
  });
});
