import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

describe('logout', () => {
  describe('args', () => {
    describe('logoutUrl', () => {
      it('logout with url from config', () => {
        prepare(HEADER, 'Default', { loggedIn: true });
        logoutFromMenu();
      });

      it(`overrides logout url from config`, () => {
        prepare(HEADER, 'Default', { loggedIn: true });
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
