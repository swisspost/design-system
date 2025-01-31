const TOGGLE_BUTTON_ID = '1a6f47c2-5e8a-45a0-b1c3-9f7e2b834c24';

describe('togglebutton', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('togglebutton', TOGGLE_BUTTON_ID);
    });

    it('should show expected content', () => {
      cy.get('@togglebutton').find('[data-showwhen="toggled"]').should('be.hidden');
      cy.get('@togglebutton').find('[data-showwhen="untoggled"]').should('be.visible');
    });

    it('should have correct ARIA attributes', () => {
      cy.get('@togglebutton')
        .should('have.attr', 'role', 'button')
        .and('have.attr', 'aria-pressed', 'false')
        .and('have.attr', 'tabindex', '0');
    });

    it('should toggle state when clicked', () => {
      cy.get('@togglebutton').click();

      cy.get('@togglebutton').find('[data-showwhen="toggled"]').should('be.visible');
      cy.get('@togglebutton').find('[data-showwhen="untoggled"]').should('be.hidden');
      cy.get('@togglebutton').should('have.attr', 'aria-pressed', 'true');
    });

    it('should toggle state when pressing Enter key', () => {
      cy.get('@togglebutton').trigger('keydown', { key: 'Enter' });

      cy.get('@togglebutton').find('[data-showwhen="toggled"]').should('be.visible');
      cy.get('@togglebutton').find('[data-showwhen="untoggled"]').should('be.hidden');
      cy.get('@togglebutton').should('have.attr', 'aria-pressed', 'true');
    });
  });

  describe('initially toggled', () => {
    beforeEach(() => {
      cy.getComponent('togglebutton', TOGGLE_BUTTON_ID, 'initially-toggled');
    });

    it('should show expected content', () => {
      cy.get('@togglebutton').find('[data-showwhen="toggled"]').should('be.visible');
      cy.get('@togglebutton').find('[data-showwhen="untoggled"]').should('be.hidden');
    });

    it('should have correct ARIA attributes', () => {
      cy.get('@togglebutton')
        .should('have.attr', 'role', 'button')
        .and('have.attr', 'aria-pressed', 'true')
        .and('have.attr', 'tabindex', '0');
    });

    it('should toggle state when clicked', () => {
      cy.get('@togglebutton').click();

      cy.get('@togglebutton').find('[data-showwhen="toggled"]').should('be.hidden');
      cy.get('@togglebutton').find('[data-showwhen="untoggled"]').should('be.visible');
      cy.get('@togglebutton').should('have.attr', 'aria-pressed', 'false');
    });

    it('should toggle state when pressing Enter key', () => {
      cy.get('@togglebutton').trigger('keydown', { key: 'Enter' });

      cy.get('@togglebutton').find('[data-showwhen="toggled"]').should('be.hidden');
      cy.get('@togglebutton').find('[data-showwhen="untoggled"]').should('be.visible');
      cy.get('@togglebutton').should('have.attr', 'aria-pressed', 'false');
    });
  });

  describe('content visibility', () => {
    beforeEach(() => {
      cy.getComponent('togglebutton', TOGGLE_BUTTON_ID, 'content-visibility');
    });

    it('should display correct contents on initial state', () => {
      cy.get('@togglebutton').find('[data-showwhen="toggled"]').should('be.hidden');
      cy.get('@togglebutton').find('[data-showwhen="untoggled"]').should('be.visible');
      cy.get('@togglebutton').find(':not([data-showwhen])').should('be.visible');
    });

    it('should display correct contents when clicked', () => {
      cy.get('@togglebutton').click();

      cy.get('@togglebutton').find('[data-showwhen="toggled"]').should('be.visible');
      cy.get('@togglebutton').find('[data-showwhen="untoggled"]').should('be.hidden');
      cy.get('@togglebutton').find(':not([data-showwhen])').should('be.visible');
    });

    it('should display correct contents when clicked twice', () => {
      cy.get('@togglebutton').dblclick();

      cy.get('@togglebutton').find('[data-showwhen="toggled"]').should('be.hidden');
      cy.get('@togglebutton').find('[data-showwhen="untoggled"]').should('be.visible');
      cy.get('@togglebutton').find(':not([data-showwhen])').should('be.visible');
    });
  });
});

describe('Accessibility', () => {
  beforeEach(() => {
    cy.getSnapshots('togglebutton');
  });

  it('Has no detectable a11y violations on load for all variants', () => {
    cy.checkA11y('#root-inner');
  });

  it('Should be keyboard navigable', () => {
    cy.get('post-togglebutton').first().focus().should('have.focus');
  });
});
