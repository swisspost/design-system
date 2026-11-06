import 'cypress-real-events';

const KLP_LOGIN_WIDGET_ID = '787282bd-aea2-49e5-b98d-3bf852ca9dd7';

const SIGNED_IN_SESSIONS = {
  'b2c': { fullName: 'Alan Turing', switchSlot: null },
  'b2c-multi-account': { fullName: 'Katherine Johnson', switchSlot: 'text-account-switch' },
  'b2b-multi-account': { fullName: 'Ada Lovelace', switchSlot: 'text-account-switch' },
  'b2b-multi-company': { fullName: 'Grace Hopper', switchSlot: 'text-company-switch' },
} as const;

// The stories answer through a fake KLP platform, whose session is picked by the `session` arg.
function visitStory(id: string, story = 'default', args: Record<string, string | number> = {}) {
  const query = Object.entries(args)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
  cy.visit(`/iframe.html?id=${id}--${story}${query ? `&args=${query}` : ''}`);
  cy.get('post-klp-login-widget[data-hydrated]', { timeout: 30000 }).as('widget');
  cy.injectAxe();
}

function getTrigger() {
  return cy.get('@widget').shadow().find('post-menu-trigger button');
}

function getMenu() {
  return cy.get('@widget').shadow().find('post-menu');
}

// The trigger only renders once the session is known, after the widget is hydrated, and
// `post-menu-trigger` wires its button on load: `aria-haspopup` is set right before its listeners.
function aliasTrigger() {
  getTrigger().should('have.attr', 'aria-haspopup', 'menu').as('trigger');
}

function checkWidgetA11y() {
  cy.checkA11y('post-klp-login-widget', undefined, violations => {
    expect(violations).to.have.length(0);
  });
}

describe('klp login widget', () => {
  describe('anonymous visitor', () => {
    beforeEach(() => {
      visitStory(KLP_LOGIN_WIDGET_ID, 'default', { session: 'anonymous' });
    });

    it('shows only the login link', () => {
      cy.get('@widget')
        .shadow()
        .find('.login-link')
        .should('be.visible')
        .and('contain.text', 'Login');
      cy.get('@widget').shadow().find('post-menu-trigger').should('not.exist');
    });

    it('has no detectable a11y violations', () => {
      cy.get('@widget').shadow().find('.login-link').should('be.visible');
      checkWidgetA11y();
    });
  });

  describe('before the session is known', () => {
    beforeEach(() => {
      visitStory(KLP_LOGIN_WIDGET_ID, 'initial-state');
    });

    it('hides the placeholder from assistive technology', () => {
      cy.get('@widget')
        .shadow()
        .find('.user-menu-placeholder')
        .should('have.attr', 'aria-hidden', 'true');
    });

    it('has no detectable a11y violations', () => {
      cy.get('@widget').shadow().find('.user-menu-placeholder').should('exist');
      checkWidgetA11y();
    });
  });

  Object.entries(SIGNED_IN_SESSIONS).forEach(([session, { fullName, switchSlot }]) => {
    describe(`signed in as ${session}`, () => {
      beforeEach(() => {
        visitStory(KLP_LOGIN_WIDGET_ID, 'default', { session });
        aliasTrigger();
      });

      it('names the trigger after the user and the menu it opens', () => {
        cy.get('@trigger')
          .should('have.attr', 'aria-haspopup', 'menu')
          .and('have.attr', 'aria-expanded', 'false')
          .and('contain.text', 'Open user menu');
        cy.get('@trigger')
          .find('post-avatar')
          .shadow()
          .find('.initials')
          .should('contain.text', `Current user is ${fullName}.`);

        // The menu gets its role and name on the first open.
        cy.get('@trigger').click();
        getMenu().should('have.attr', 'role', 'menu').and('have.attr', 'aria-label', 'User links');
      });

      it('has no detectable a11y violations with the menu closed', () => {
        checkWidgetA11y();
      });

      it('opens the menu from the keyboard and closes it with Escape', () => {
        cy.get('@trigger').focus().realPress('Enter');
        cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
        cy.focused().should('have.attr', 'role', 'menuitem');

        cy.realPress('Escape');
        cy.get('@trigger').should('have.attr', 'aria-expanded', 'false').and('have.focus');
      });

      it('has no detectable a11y violations with the menu open', () => {
        cy.get('@trigger').click();
        cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
        checkWidgetA11y();
      });

      it('offers only the switch the session allows', () => {
        cy.get('@trigger').click();
        getMenu()
          .find('slot[name$="-switch"]')
          .should('have.length', switchSlot ? 1 : 0);
        ['text-account-switch', 'text-company-switch'].forEach(slot => {
          getMenu()
            .find(`slot[name="${slot}"]`)
            .should(slot === switchSlot ? 'exist' : 'not.exist');
        });
      });

      it('offers profile, messages, settings and logout', () => {
        cy.get('@trigger').click();
        ['text-my-profile', 'text-messages', 'text-settings', 'text-logout'].forEach(slot => {
          getMenu().find(`slot[name="${slot}"]`).should('exist');
        });
        getMenu()
          .find('post-menu-item a')
          .filter(':visible')
          .should('have.length', switchSlot ? 5 : 4);
      });
    });
  });

  describe('unread messages', () => {
    beforeEach(() => {
      visitStory(KLP_LOGIN_WIDGET_ID, 'default', { session: 'b2b-multi-account', unread: 3 });
      aliasTrigger();
    });

    it('announces the count in the messages entry, not on the trigger', () => {
      cy.get('@trigger').find('.badge').should('have.attr', 'aria-hidden', 'true');
      cy.get('@trigger').click();
      getMenu()
        .find('post-menu-item .badge .visually-hidden')
        .should('have.text', '3 unread messages');
    });

    it('has no detectable a11y violations with the menu open', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
      checkWidgetA11y();
    });
  });

  describe('custom entries', () => {
    beforeEach(() => {
      visitStory(KLP_LOGIN_WIDGET_ID, 'custom-items');
      aliasTrigger();
    });

    it('reaches the custom entry by keyboard between settings and logout', () => {
      cy.get('@trigger').focus().realPress('Enter');
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');

      cy.realPress('End');
      cy.focused().find('slot[name="text-logout"]').should('exist');
      cy.realPress('ArrowUp');
      cy.focused().should('have.attr', 'role', 'menuitem').and('contain.text', 'My orders');
      cy.realPress('ArrowUp');
      cy.focused().find('slot[name="text-settings"]').should('exist');
    });

    it('has no detectable a11y violations with the menu open', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
      checkWidgetA11y();
    });
  });
});
