const AUTOCOMPLETE_ID = 'f8e3a1b2-4c5d-6e7f-8a9b-0c1d2e3f4a5b';

describe('autocomplete', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponents(AUTOCOMPLETE_ID, 'default', 'post-autocomplete');

      // Ensure the component is hydrated
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-autocomplete').as('autocomplete');
      cy.get('post-autocomplete input').as('input');
    });

    it('should have an autocomplete component', () => {
      cy.get('@autocomplete').should('exist');
    });

    it('should have an input element', () => {
      cy.get('@input').should('exist');
    });

    it('should have combobox role on input', () => {
      cy.get('@input').should('have.attr', 'role', 'combobox');
    });

    it('should have aria-autocomplete attribute', () => {
      cy.get('@input').should('have.attr', 'aria-autocomplete', 'list');
    });

    it('should be initially collapsed', () => {
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
    });

    it('should show dropdown when typing', () => {
      cy.get('@input').type('Swi');
      cy.get('@autocomplete')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
    });

    it('should update aria-expanded when dropdown opens', () => {
      cy.get('@input').type('Swi');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
    });

    it('should filter options based on input', () => {
      cy.get('@input').type('Swi');
      cy.get('post-option[value="Switzerland"]').should('be.visible');
      cy.get('post-option[value="Germany"]').should('have.css', 'display', 'none');
    });

    it('should close dropdown when pressing Escape', () => {
      cy.get('@input').type('Swi');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').type('{esc}');
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
    });

    it('should select option with Enter key', () => {
      cy.get('@input').type('Swi');
      cy.get('@input').type('{downarrow}');
      cy.get('@input').type('{enter}');
      cy.get('@input').should('have.value', 'Switzerland');
    });

    it('should close dropdown after selection', () => {
      cy.get('@input').type('Swi');
      cy.get('@input').type('{enter}');
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
    });

    it('should navigate options with arrow keys', () => {
      cy.get('@input').type('A');
      // Wait for dropdown to open
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      
      // Navigate down
      cy.get('@input').type('{downarrow}');
      cy.get('@input').should('have.attr', 'aria-activedescendant');
    });

    it('should select option when clicking', () => {
      cy.get('@input').type('Swi');
      cy.get('post-option[value="Switzerland"]').click();
      cy.get('@input').should('have.value', 'Switzerland');
    });
  });

  describe('with disabled options', () => {
    beforeEach(() => {
      cy.getComponents(AUTOCOMPLETE_ID, 'with-disabled-options', 'post-autocomplete');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-autocomplete').as('autocomplete');
      cy.get('post-autocomplete input').as('input');
    });

    it('should not select disabled options', () => {
      cy.get('@input').type('Phone');
      cy.get('post-option[value="phone"]').should('have.attr', 'aria-disabled', 'true');
      cy.get('post-option[value="phone"]').click();
      cy.get('@input').should('not.have.value', 'Phone (Out of stock)');
    });

    it('should skip disabled options during keyboard navigation', () => {
      cy.get('@input').type('p');
      // First option should be highlighted, then skip disabled to next enabled
      cy.get('@input').type('{downarrow}');
      cy.get('@input').type('{downarrow}');
      // Should skip 'phone' which is disabled
    });
  });

  describe('with min-chars', () => {
    beforeEach(() => {
      cy.getComponents(AUTOCOMPLETE_ID, 'with-min-chars', 'post-autocomplete');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-autocomplete').as('autocomplete');
      cy.get('post-autocomplete input').as('input');
    });

    it('should not show dropdown with less than min-chars', () => {
      cy.get('@input').type('Sw');
      cy.get('@autocomplete')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should show dropdown when min-chars is reached', () => {
      cy.get('@input').type('Swi');
      cy.get('@autocomplete')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      cy.getComponents(AUTOCOMPLETE_ID, 'default', 'post-autocomplete');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-autocomplete').as('autocomplete');
      cy.get('post-autocomplete input').as('input');
    });

    it('should open dropdown with ArrowDown when closed', () => {
      cy.get('@input').focus();
      cy.get('@input').type('{downarrow}');
      // Dropdown should open but might be empty if no value
    });

    it('should jump to first option with Home key', () => {
      cy.get('@input').type('A');
      cy.get('@input').type('{downarrow}');
      cy.get('@input').type('{downarrow}');
      cy.get('@input').type('{home}');
      // Should be back at first option
    });

    it('should jump to last option with End key', () => {
      cy.get('@input').type('A');
      cy.get('@input').type('{end}');
      // Should be at last matching option
    });

    it('should close dropdown with Tab', () => {
      cy.get('@input').type('Swi');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').tab();
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
    });
  });

  describe('accessibility', () => {
    beforeEach(() => {
      cy.getComponents(AUTOCOMPLETE_ID, 'default', 'post-autocomplete');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-autocomplete').as('autocomplete');
      cy.get('post-autocomplete input').as('input');
    });

    it('should have aria-owns pointing to listbox', () => {
      cy.get('@input').should('have.attr', 'aria-owns');
    });

    it('should have aria-haspopup attribute', () => {
      cy.get('@input').should('have.attr', 'aria-haspopup', 'listbox');
    });

    it('should update aria-activedescendant during navigation', () => {
      cy.get('@input').type('A');
      cy.get('@input').type('{downarrow}');
      cy.get('@input')
        .should('have.attr', 'aria-activedescendant')
        .and('not.be.empty');
    });

    it('should have role=option on post-option elements', () => {
      cy.get('@input').type('A');
      cy.get('post-option').first().should('have.attr', 'role', 'option');
    });

    it('should have aria-selected on options', () => {
      cy.get('@input').type('A');
      cy.get('post-option').first().should('have.attr', 'aria-selected');
    });
  });
});
