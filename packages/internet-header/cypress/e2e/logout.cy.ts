import { prepare } from '../support/prepare-story';

describe('logout', () => {
  describe('args', () => {
    describe('logoutUrl', () => {
      it('logout with url from config', () => {
        prepare('ebb11274-091b-4cb7-9a3f-3e0451c9a865', 'Default', { loggedIn: true });
        logoutFromMenu();
      });

      it(`overrides logout url from config`, () => {
        prepare('ebb11274-091b-4cb7-9a3f-3e0451c9a865', 'Default', { loggedIn: true });
        cy.changeArg('logoutUrl', 'about:blank');
        logoutFromMenu();
      });
    });
  });
});

function logoutFromMenu() {
  cy.get('post-klp-login-widget')
    .shadow()
    .get('.klp-widget-authenticated-session-link', { timeout: 10000 })
    .click();
  cy.get('post-klp-login-widget')
    .shadow()
    .get('#klp-widget-authenticated-menu-logout')
    .should('be.visible');
}
