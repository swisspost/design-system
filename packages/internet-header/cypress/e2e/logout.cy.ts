import { prepare } from '../support/prepare-story';

describe('logout', () => {
  describe('args', () => {
    describe('logoutUrl', () => {
      it('logout with url from config', () => {
        prepare('Internet Header/Header', 'Default', { loggedIn: true });
        logoutFromMenu();

        const origin = 'https://www.post.ch';
        // Get redirected location. (Requires cy.origin as it's a cross-domain request)
        cy.origin(origin, () => {
          cy.location('pathname').should('eq', '/logout');
        });
      });

      it(`overrides logout url from config`, () => {
        prepare('Internet Header/Header', 'Default', { loggedIn: true });
        cy.changeArg('logoutUrl', 'about:blank');
        logoutFromMenu();
        cy.location('pathname').should('eq', 'blank');
      });
    });
  });
});

function logoutFromMenu() {
  cy.get('post-klp-login-widget').shadow().get('.klp-widget-authenticated-session-link').click();
  cy.get('post-klp-login-widget').shadow().get('#klp-widget-authenticated-menu-logout').click();
}
