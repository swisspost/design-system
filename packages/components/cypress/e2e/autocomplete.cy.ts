describe('autocomplete', { baseUrl: null, includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/post-autocomplete.test.html');

    // Ensure the components are hydrated
    cy.get('post-autocomplete').first().should('have.attr', 'data-version');
    cy.get('post-listbox').first().should('have.attr', 'data-version');
    cy.get('post-option').first().should('have.attr', 'data-version');
  });

  describe('basic functionality', () => {
    beforeEach(() => {
      cy.get('#autocomplete-basic').as('autocomplete');
      cy.get('#country-input').as('input');
      cy.get('#country-listbox').as('listbox');
    });

    it('should render the autocomplete component', () => {
      cy.get('@autocomplete').should('exist');
      cy.get('@input').should('exist');
      cy.get('@listbox').should('exist');
    });

    it('should have ARIA attributes on the input', () => {
      cy.get('@input').should('have.attr', 'role', 'combobox');
      cy.get('@input').should('have.attr', 'aria-autocomplete', 'list');
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
      cy.get('@input').should('have.attr', 'aria-haspopup', 'listbox');
    });

    it('should open listbox on focus when filter-threshold is 0', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
    });

    it('should close listbox on blur', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('body').click();
      cy.get('@autocomplete').should('not.have.class', 'is-open');
    });

    it('should filter options when typing', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').type('Swi');
      // Wait for filtering to complete
      cy.wait(100);
      cy.get('@listbox').find('post-option:not([hidden])').should('have.length', 1);
      cy.get('@listbox').find('post-option:not([hidden])').should('contain.text', 'Switzerland');
    });

    it('should select an option on click', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      // Wait for listbox to be visible
      cy.get('@listbox').should('be.visible');
      cy.get('@listbox').find('post-option').contains('Germany').click({ force: true });
      cy.get('@input').should('have.value', 'Germany');
      cy.get('@autocomplete').should('have.attr', 'value', 'de');
    });

    it('should close listbox after selecting an option', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@listbox').should('be.visible');
      cy.get('@listbox').find('post-option').contains('France').click({ force: true });
      cy.get('@autocomplete').should('not.have.class', 'is-open');
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      cy.get('#autocomplete-basic').as('autocomplete');
      cy.get('#country-input').as('input');
      cy.get('#country-listbox').as('listbox');
    });

    it('should open listbox on ArrowDown', () => {
      cy.get('@input').focus();
      cy.get('body').click(); // Close first
      cy.get('@autocomplete').should('not.have.class', 'is-open');
      cy.get('@input').focus();
      cy.get('@input').type('{downArrow}');
      cy.get('@autocomplete').should('have.class', 'is-open');
    });

    it('should navigate options with ArrowDown', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').type('{downArrow}');
      cy.get('@listbox').find('post-option[data-active="true"]').should('exist');
    });

    it('should navigate options with ArrowUp', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').type('{downArrow}{downArrow}{upArrow}');
      cy.get('@listbox').find('post-option[data-active="true"]').should('exist');
    });

    it('should select option with Enter', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').type('{downArrow}{enter}');
      cy.get('@input').should('have.value', 'Switzerland');
    });

    it('should close listbox with Escape', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').type('{esc}');
      cy.get('@autocomplete').should('not.have.class', 'is-open');
    });

    it('should go to first option with Home', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').type('{downArrow}{downArrow}{downArrow}{home}');
      cy.get('@listbox')
        .find('post-option[data-active="true"]')
        .should('contain.text', 'Switzerland');
    });

    it('should go to last option with End', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').type('{end}');
      cy.get('@listbox')
        .find('post-option[data-active="true"]')
        .should('contain.text', 'United Kingdom');
    });
  });

  describe('filter threshold', () => {
    beforeEach(() => {
      cy.get('#autocomplete-threshold').as('autocomplete');
      cy.get('#city-input').as('input');
    });

    it('should not open listbox on focus when filter-threshold > 0', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('not.have.class', 'is-open');
    });

    it('should not open listbox when typing less than threshold', () => {
      cy.get('@input').focus();
      cy.get('@input').type('Z');
      cy.get('@autocomplete').should('not.have.class', 'is-open');
    });

    it('should open listbox when typing meets threshold', () => {
      cy.get('@input').focus();
      cy.get('@input').type('Zu');
      cy.get('@autocomplete').should('have.class', 'is-open');
    });
  });

  describe('clearable', () => {
    beforeEach(() => {
      cy.get('#autocomplete-clearable').as('autocomplete');
      cy.get('#fruit-input').as('input');
      cy.get('#fruit-listbox').as('listbox');
    });

    it('should show clear button when input has value', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@listbox').should('be.visible');
      cy.get('@listbox').find('post-option').contains('Apple').click({ force: true });
      cy.get('@autocomplete').find('.autocomplete-clear-button').should('be.visible');
    });

    it('should clear input when clear button is clicked', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@listbox').should('be.visible');
      cy.get('@listbox').find('post-option').contains('Banana').click({ force: true });
      cy.get('@input').should('have.value', 'Banana');
      cy.get('@autocomplete').find('.autocomplete-clear-button').click();
      cy.get('@input').should('have.value', '');
    });
  });

  describe('disabled option', () => {
    beforeEach(() => {
      cy.get('#autocomplete-disabled-option').as('autocomplete');
      cy.get('#color-input').as('input');
      cy.get('#color-listbox').as('listbox');
    });

    it('should not select disabled options on click', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@listbox').should('be.visible');
      cy.get('@listbox').find('post-option[disabled]').click({ force: true });
      cy.get('@input').should('have.value', '');
    });

    it('should skip disabled options during keyboard navigation', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      // Navigate: Red -> (skip Blue) -> Green
      cy.get('@input').type('{downArrow}{downArrow}');
      cy.get('@listbox').find('post-option[data-active="true"]').should('contain.text', 'Green');
    });
  });

  describe('disabled autocomplete', () => {
    beforeEach(() => {
      cy.get('#autocomplete-disabled').as('autocomplete');
      cy.get('#disabled-input').as('input');
    });

    it('should have disabled class', () => {
      cy.get('@autocomplete').should('have.class', 'is-disabled');
    });

    it('should not open listbox on disabled autocomplete', () => {
      // Check that clicking on the disabled autocomplete does not open it
      // (we can't focus a disabled input, so we just verify state)
      cy.get('@autocomplete').should('not.have.class', 'is-open');
      cy.get('@input').should('have.attr', 'disabled');
    });
  });

  describe('post-option', () => {
    beforeEach(() => {
      cy.get('#country-listbox').as('listbox');
    });

    it('should have role="option"', () => {
      cy.get('@listbox').find('post-option').first().should('have.attr', 'role', 'option');
    });

    it('should have aria-selected attribute', () => {
      cy.get('@listbox').find('post-option').first().should('have.attr', 'aria-selected', 'false');
    });

    it('should update aria-selected when selected', () => {
      cy.get('#country-input').focus();
      cy.get('#autocomplete-basic').should('have.class', 'is-open');
      cy.get('@listbox').should('be.visible');
      cy.get('@listbox').find('post-option').contains('Switzerland').click({ force: true });
      // Reopen to check aria-selected
      cy.get('#country-input').focus();
      cy.get('#autocomplete-basic').should('have.class', 'is-open');
      cy.get('@listbox')
        .find('post-option')
        .contains('Switzerland')
        .should('have.attr', 'aria-selected', 'true');
    });
  });

  describe('post-listbox', () => {
    beforeEach(() => {
      cy.get('#country-listbox').as('listbox');
      cy.get('#autocomplete-basic').as('autocomplete');
      cy.get('#country-input').as('input');
    });

    it('should have role="listbox"', () => {
      cy.get('@listbox').should('have.attr', 'role', 'listbox');
    });

    it('should filter options correctly', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').type('United');
      cy.wait(100);
      cy.get('@listbox').find('post-option:not([hidden])').should('have.length', 2);
    });

    it('should show all options when filter is cleared', () => {
      cy.get('@input').focus();
      cy.get('@autocomplete').should('have.class', 'is-open');
      cy.get('@input').type('United');
      cy.wait(100);
      cy.get('@listbox').find('post-option:not([hidden])').should('have.length', 2);
      cy.get('@input').clear();
      cy.wait(100);
      cy.get('@listbox').find('post-option:not([hidden])').should('have.length', 7);
    });
  });
});
