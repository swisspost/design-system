const TOGGLE_BUTTON_ID = '1a6f47c2-5e8a-45a0-b1c3-9f7e2b834c24';

describe('togglebutton', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=snapshots--toggle-button');
    cy.get('post-togglebutton', { timeout: 30000 }).should('be.visible');
  });

  describe('default behavior', () => {
    it('should toggle state when clicked', () => {
      cy.get('post-togglebutton')
        .first()
        .as('button')
        .shadow()
        .find('slot[name="untoggled"]')
        .should('exist');

      cy.get('@button').click();

      cy.get('@button').shadow().find('slot[name="toggled"]').should('exist');
    });

    it('should toggle state when pressing Enter key', () => {
      cy.get('post-togglebutton')
        .first()
        .as('button')
        .shadow()
        .find('slot[name="untoggled"]')
        .should('exist');

      cy.get('@button').trigger('keydown', { key: 'Enter' });

      cy.get('@button').shadow().find('slot[name="toggled"]').should('exist');
    });

    it('should have correct ARIA attributes', () => {
      cy.get('post-togglebutton')
        .first()
        .as('button')
        .should('have.attr', 'role', 'button')
        .and('have.attr', 'aria-pressed', 'false')
        .and('have.attr', 'tabindex', '0');

      cy.get('@button').click();

      cy.get('@button').should('have.attr', 'aria-pressed', 'true');
    });
  });

  describe('initial state', () => {
    it('should respect initial toggled state', () => {
      cy.get('post-togglebutton[toggled="true"]')
        .first()
        .as('toggledButton')
        .shadow()
        .find('slot[name="toggled"]')
        .should('exist');

      cy.get('@toggledButton').should('have.attr', 'aria-pressed', 'true');
    });
  });

  describe('slot content', () => {
    it('should display correct slot content based on toggle state', () => {
      cy.get('post-togglebutton').first().as('button');

      cy.get('@button').shadow().find('slot[name="untoggled"]').should('exist');

      cy.get('@button').click();

      cy.get('@button').shadow().find('slot[name="toggled"]').should('exist');

      cy.get('@button').click();

      cy.get('@button').shadow().find('slot[name="untoggled"]').should('exist');
    });
  });

  describe('version attribute', () => {
    it('should have the correct version data attribute', () => {
      cy.get('post-togglebutton').first().should('have.attr', 'data-version');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner');
    });

    it('Should be keyboard navigable', () => {
      cy.get('post-togglebutton')
        .first()
        .focus()
        .should('have.focus')
        .trigger('keydown', { key: 'Enter' })
        .should('have.attr', 'aria-pressed', 'true');
    });
  });
});
