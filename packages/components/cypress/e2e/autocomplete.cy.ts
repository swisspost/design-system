describe('autocomplete', { baseUrl: null, includeShadowDom: true }, () => {
  describe('basic functionality', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/post-autocomplete.test.html');

      // Ensure the components are hydrated
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('post-listbox[data-hydrated]');

      cy.get('#autocomplete-basic').as('autocomplete');
      cy.get('#input-basic').as('input');
      cy.get('#listbox-basic').as('listbox');
    });

    it('should have all required elements', () => {
      cy.get('@autocomplete').should('exist');
      cy.get('@input').should('exist');
      cy.get('@listbox').should('exist');
    });

    it('should have proper ARIA attributes on input', () => {
      cy.get('@input').should('have.attr', 'role', 'combobox');
      cy.get('@input').should('have.attr', 'aria-autocomplete', 'list');
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
      cy.get('@input').should('have.attr', 'aria-owns', 'listbox-basic');
      cy.get('@input').should('have.attr', 'aria-haspopup', 'listbox');
    });

    it('should have listbox role on post-listbox', () => {
      cy.get('@listbox').should('have.attr', 'role', 'listbox');
    });

    it('should have option role on post-option elements', () => {
      cy.get('@listbox').find('post-option').each($option => {
        cy.wrap($option).should('have.attr', 'role', 'option');
      });
    });

    it('should open listbox when typing in input', () => {
      cy.get('@input').type('s');
      cy.get('@listbox')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
    });

    it('should filter options based on input', () => {
      cy.get('@input').type('swi');
      // Switzerland should be visible
      cy.get('@listbox').find('post-option[value="ch"]').should('not.have.attr', 'hidden');
      // Others should be hidden
      cy.get('@listbox').find('post-option[value="de"]').should('have.attr', 'hidden');
      cy.get('@listbox').find('post-option[value="fr"]').should('have.attr', 'hidden');
    });

    it('should navigate options with arrow keys', () => {
      cy.get('@input').type('a');
      // Open the listbox first
      cy.get('@input').type('{downarrow}');
      // First option should be active
      cy.get('@listbox').find('post-option').first().should('have.attr', 'active');
    });

    it('should select option on Enter key', () => {
      cy.get('@input').type('swi');
      cy.get('@input').type('{downarrow}');
      cy.get('@input').type('{enter}');
      // Input should have the selected value
      cy.get('@input').should('have.value', 'Switzerland');
      // Listbox should be closed
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
    });

    it('should select option on click', () => {
      cy.get('@input').type('a');
      cy.get('@listbox').find('post-option[value="at"]').click();
      cy.get('@input').should('have.value', 'Austria');
    });

    it('should close listbox on Escape key', () => {
      cy.get('@input').type('a');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@input').type('{esc}');
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
    });

    it('should navigate to first option on Home key', () => {
      cy.get('@input').type('a');
      cy.get('@input').type('{downarrow}{downarrow}{downarrow}');
      cy.get('@input').type('{home}');
      cy.get('@listbox').find('post-option').first().should('have.attr', 'active');
    });

    it('should navigate to last option on End key', () => {
      cy.get('@input').type('a');
      cy.get('@input').type('{downarrow}');
      cy.get('@input').type('{end}');
      cy.get('@listbox')
        .find('post-option:not([hidden])')
        .last()
        .should('have.attr', 'active');
    });
  });

  describe('filter threshold', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/post-autocomplete.test.html');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('#autocomplete-threshold').as('autocomplete');
      cy.get('#input-threshold').as('input');
      cy.get('#listbox-threshold').as('listbox');
    });

    it('should not filter with less than threshold characters', () => {
      cy.get('@input').type('z');
      // Listbox should not be open yet (less than 2 chars)
      cy.get('@listbox')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should start filtering at threshold', () => {
      cy.get('@input').type('zu');
      cy.get('@listbox')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
      cy.get('@listbox').find('post-option[value="zurich"]').should('not.have.attr', 'hidden');
    });
  });

  describe('clearable', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/post-autocomplete.test.html');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('#autocomplete-clearable').as('autocomplete');
      cy.get('#input-clearable').as('input');
      cy.get('#listbox-clearable').as('listbox');
    });

    it('should have clearable attribute', () => {
      cy.get('@autocomplete').should('have.attr', 'clearable');
    });

    it('should have a clear button in shadow DOM', () => {
      cy.get('@autocomplete').shadow().find('.clear-button').should('exist');
    });

    it('should clear input when clear button is clicked', () => {
      // Select an option first
      cy.get('@input').type('en');
      cy.get('@listbox').find('post-option[value="en"]').click();
      cy.get('@input').should('have.value', 'English');

      // Click clear button
      cy.get('@autocomplete').shadow().find('.clear-button').click();
      cy.get('@input').should('have.value', '');
    });
  });

  describe('disabled state', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/post-autocomplete.test.html');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('#autocomplete-disabled').as('autocomplete');
      cy.get('#input-disabled').as('input');
    });

    it('should have disabled input', () => {
      cy.get('@input').should('be.disabled');
    });

    it('should not open listbox when input is disabled', () => {
      // Try to type (should not work)
      cy.get('@input').type('a', { force: true });
      cy.get('#listbox-disabled')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });
  });

  describe('events', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/post-autocomplete.test.html');
      cy.get('post-autocomplete[data-hydrated]');
      cy.get('#autocomplete-basic').as('autocomplete');
      cy.get('#input-basic').as('input');
      cy.get('#listbox-basic').as('listbox');
    });

    it('should emit postSelect event on selection', () => {
      const selectSpy = cy.spy().as('selectSpy');
      cy.get('@autocomplete').then($el => {
        $el[0].addEventListener('postSelect', selectSpy);
      });

      cy.get('@input').type('swi');
      cy.get('@listbox').find('post-option[value="ch"]').click();

      cy.get('@selectSpy').should('have.been.calledOnce');
    });

    it('should emit postFilterRequest event on input', () => {
      const filterSpy = cy.spy().as('filterSpy');
      cy.get('@autocomplete').then($el => {
        $el[0].addEventListener('postFilterRequest', filterSpy);
      });

      cy.get('@input').type('a');

      cy.get('@filterSpy').should('have.been.called');
    });
  });
});
