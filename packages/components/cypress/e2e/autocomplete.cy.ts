const AUTOCOMPLETE_ID = 'a3e1c7f0-9d2b-4e8a-b6f5-7c3d9a1e4b2f';
const DEBOUNCE_MS = 350; // slightly over 300ms debounce to ensure it fires

describe('autocomplete', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponents(AUTOCOMPLETE_ID, 'default', 'post-autocomplete', 'post-listbox');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-listbox[data-hydrated]');
      cy.get('@autocomplete').find('input').as('input');
    });

    // Rendering
    it('should render the autocomplete component', () => {
      cy.get('@autocomplete').should('exist');
    });

    it('should render the listbox component', () => {
      cy.get('@listbox').should('exist');
    });

    it('should have options', () => {
      cy.get('post-option').should('have.length.greaterThan', 0);
    });

    it('should have the dropdown initially closed', () => {
      cy.get('@listbox')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should set combobox ARIA attributes on the input', () => {
      cy.get('@input').should('have.attr', 'role', 'combobox');
      cy.get('@input').should('have.attr', 'aria-autocomplete', 'list');
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
      cy.get('@input').should('have.attr', 'aria-haspopup', 'listbox');
      cy.get('@input').should('have.attr', 'autocomplete', 'off');
    });

    // Filtering — cy.clock() is fine here since we only check hidden attributes
    it('should filter options when typing', () => {
      cy.clock();
      cy.get('@input').type('Switz');
      cy.tick(DEBOUNCE_MS);
      cy.get('post-option:not([hidden])').should('have.length', 1);
      cy.get('post-option:not([hidden])').should('contain.text', 'Switzerland');
    });

    it('should show all options after clearing filter', () => {
      cy.clock();
      cy.get('@input').type('Switz');
      cy.tick(DEBOUNCE_MS);
      cy.get('@input').clear();
      cy.tick(DEBOUNCE_MS);
      cy.get('post-option[hidden]').should('have.length', 0);
    });

    // Selection — no cy.clock() so popover/selection events work naturally
    it('should select an option on click', () => {
      cy.get('@input').type('Switz');
      cy.get('post-option:not([hidden])').should('have.length', 1);
      cy.get('post-option:not([hidden])').first().click();
      cy.get('@input').should('have.value', 'Switzerland');
    });

    it('should close the dropdown after selection', () => {
      cy.get('@input').type('Switz');
      cy.get('post-option:not([hidden])').should('have.length', 1);
      cy.get('post-option:not([hidden])').first().click();
      cy.get('@listbox')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    // Keyboard Navigation — no cy.clock() so dropdown open/close works
    it('should open dropdown on ArrowDown', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').type('{downArrow}');
      cy.get('post-option[data-active="true"]').should('exist');
    });

    it('should navigate options with ArrowDown', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').type('{downArrow}');
      cy.get('@input').type('{downArrow}');
      cy.get('post-option[data-active="true"]').should('exist');
    });

    it('should navigate options with ArrowUp', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').type('{downArrow}');
      cy.get('@input').type('{downArrow}');
      cy.get('@input').type('{upArrow}');
      cy.get('post-option[data-active="true"]').should('exist');
    });

    it('should select highlighted option on Enter', () => {
      cy.get('@input').type('Switz');
      cy.get('post-option:not([hidden])').should('have.length', 1);
      cy.get('@input').type('{downArrow}');
      cy.get('@input').type('{enter}');
      cy.get('@input').should('have.value', 'Switzerland');
    });

    it('should close dropdown on Escape', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').type('{esc}');
      cy.get('@listbox')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should close dropdown on Tab', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').trigger('keydown', { key: 'Tab', keyCode: 9, which: 9 });
      cy.get('@input').blur();
      cy.get('@listbox')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should highlight first option on Home key', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').type('{downArrow}{downArrow}{downArrow}');
      cy.get('@input').trigger('keydown', { key: 'Home', keyCode: 36, which: 36 });
      cy.get('post-option:not([hidden])').first().should('have.attr', 'data-active', 'true');
    });

    it('should highlight last option on End key', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').trigger('keydown', { key: 'End', keyCode: 35, which: 35 });
      cy.get('post-option:not([hidden])').last().should('have.attr', 'data-active', 'true');
    });

    // Blur behavior — no cy.clock() so blur timer works
    it('should clear input on blur when no option is selected', () => {
      cy.get('@input').type('xyz');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').blur();
      // Wait for blur timer (150ms) to fire
      cy.wait(300);
      cy.get('@input').should('have.value', '');
    });

    it('should restore selected label on blur after text modification', () => {
      // First select an option
      cy.get('@input').type('Switz');
      cy.get('post-option:not([hidden])').should('have.length', 1);
      cy.get('post-option:not([hidden])').first().click();
      cy.get('@input').should('have.value', 'Switzerland');

      // Modify text then blur
      cy.get('@input').clear().type('modified');
      cy.get('@input').blur();
      cy.wait(300);
      cy.get('@input').should('have.value', 'Switzerland');
    });

    // Accessibility — no cy.clock() so axe-core timers work
    // Exclude page-level rules (Storybook artifacts) and design-theme issues
    const a11yRules = {
      rules: {
        'landmark-one-main': { enabled: false },
        'page-has-heading-one': { enabled: false },
        'region': { enabled: false },
        'color-contrast': { enabled: false },
        'scrollable-region-focusable': { enabled: false },
      },
    };

    it('should have no accessibility violations (closed state)', () => {
      cy.checkA11y(null, a11yRules);
    });

    it('should have no accessibility violations (open state)', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.checkA11y(null, a11yRules);
    });

    it('should update aria-expanded when dropdown opens', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
    });

    it('should update aria-activedescendant on keyboard nav', () => {
      cy.get('@input').type('A');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').type('{downArrow}');
      cy.get('@input').should('have.attr', 'aria-activedescendant');
    });
  });

  describe('clearable', () => {
    beforeEach(() => {
      cy.getComponents(AUTOCOMPLETE_ID, 'clearable', 'post-autocomplete', 'post-listbox');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-listbox[data-hydrated]');
      cy.get('@autocomplete').find('input').as('input');
    });

    it('should show clear button when input has value', () => {
      cy.get('@input').type('test');
      cy.get('@autocomplete').shadow().find('.clear-button').should('exist');
    });

    it('should clear input and selection on clear button click', () => {
      cy.get('@input').type('Switz');
      cy.get('post-option:not([hidden])').should('have.length', 1);
      cy.get('post-option:not([hidden])').first().click();
      cy.get('@input').should('have.value', 'Switzerland');

      cy.get('@autocomplete').shadow().find('.clear-button').click();
      cy.get('@input').should('have.value', '');
    });
  });

  describe('disabled options', () => {
    beforeEach(() => {
      cy.getComponents(AUTOCOMPLETE_ID, 'disabled-options', 'post-autocomplete', 'post-listbox');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-listbox[data-hydrated]');
      cy.get('@autocomplete').find('input').as('input');
    });

    it('should render disabled options with aria-disabled', () => {
      cy.get('post-option[disabled]').should('exist');
      cy.get('post-option[disabled]').should('have.attr', 'aria-disabled', 'true');
    });

    it('should not select a disabled option on click', () => {
      cy.get('@input').type('Alg');
      cy.get('post-option:not([hidden])').should('have.length.greaterThan', 0);
      cy.get('post-option[disabled]:not([hidden])').first().click({ force: true });
      cy.get('@input').should('not.have.value', 'Algeria');
    });

    it('should not select a disabled option on Enter', () => {
      cy.get('@input').type('Alg');
      cy.get('post-option:not([hidden])').should('have.length.greaterThan', 0);
      cy.get('@input').type('{downArrow}');
      cy.get('@input').type('{enter}');
      cy.get('@input').should('not.have.value', 'Algeria');
    });
  });

  describe('empty state', () => {
    beforeEach(() => {
      cy.getComponents(AUTOCOMPLETE_ID, 'empty-state', 'post-autocomplete', 'post-listbox');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-listbox[data-hydrated]');
      cy.get('@autocomplete').find('input').as('input');
    });

    it('should show blank-slate when no options match', () => {
      cy.get('@input').type('zzzzz');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      // Check that all options are hidden and the blank-slate slot content is rendered
      cy.get('post-option:not([hidden])').should('have.length', 0);
      cy.get('@listbox').shadow().find('.blank-slate').should('exist');
    });
  });
});
