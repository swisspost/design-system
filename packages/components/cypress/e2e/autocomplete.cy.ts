const FIXTURE_PATH = './cypress/fixtures/post-autocomplete.test.html';
const DEBOUNCE_TIMEOUT = 300;
const AUTOCOMPLETE_ID = '5ef3cb45-86f6-4baf-bdbf-35bd2ddf0f3d';

describe('Extract markup', () => {
  it('should extract markup for consumer apps', () => {
    cy.visit(`/iframe.html?id=${AUTOCOMPLETE_ID}--default`);
    cy.get('post-autocomplete')
      .invoke('prop', 'outerHTML')
      .then(before => {
        cy.writeMarkup('post-autocomplete', before);
      });
  });
});

describe('autocomplete', { baseUrl: null, includeShadowDom: true }, () => {
  describe('nested listbox', () => {
    beforeEach(() => {
      cy.visit(FIXTURE_PATH);
      cy.get('post-autocomplete#autocomplete-nested[data-hydrated]').as('autocomplete');
      cy.get('@autocomplete').find('input').as('input');
      cy.get('@autocomplete').find('post-listbox[data-hydrated]').as('listbox');
      cy.get('@listbox').find('post-popovercontainer').as('popovercontainer');
    });

    it('should initialize the input with combobox semantics', () => {
      cy.get('@input')
        .should('have.attr', 'role', 'combobox')
        .and('have.attr', 'aria-autocomplete', 'list')
        .and('have.attr', 'aria-expanded', 'false');

      cy.get('@listbox')
        .invoke('attr', 'id')
        .should('match', /^[0-9a-f-]{36}$/)
        .then(listboxId => {
          cy.get('@input').should('have.attr', 'aria-controls', listboxId);
        });
    });

    it('should filter options and open the listbox after typing', () => {
      cy.get('@input').type('por');
      cy.wait(DEBOUNCE_TIMEOUT);

      cy.get('@autocomplete').should('have.attr', 'open');
      cy.get('@input').should('have.attr', 'aria-expanded', 'true');
      cy.get('@listbox').should('not.have.attr', 'hidden');
      cy.get('@listbox')
        .find('post-listbox-option[value="Portugal"]')
        .should('not.have.attr', 'hidden');
      cy.get('@listbox').find('post-listbox-option[value="Germany"]').should('have.attr', 'hidden');
    });

    it('should navigate and select the active option with the keyboard', () => {
      cy.get('@input').type('po');
      cy.wait(DEBOUNCE_TIMEOUT);
      cy.get('@input').type('{downarrow}');

      cy.get('@input').should('have.attr', 'aria-activedescendant');
      cy.get('@listbox')
        .find('post-listbox-option[value="Portugal"]')
        .should('have.attr', 'highlighted');

      cy.get('@input').type('{enter}');

      cy.get('@input').should('have.value', 'Portugal');
      cy.get('@listbox')
        .find('post-listbox-option[value="Portugal"]')
        .should('have.attr', 'selected');
      cy.get('@autocomplete').should('not.have.attr', 'open');
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
      cy.get('@popovercontainer').should('not.match', ':popover-open');
    });

    it('should restore the selected value on blur', () => {
      cy.get('@input').type('po');
      cy.wait(DEBOUNCE_TIMEOUT);
      cy.get('@input').type('{downarrow}{enter}');
      cy.get('@input').clear().type('temporary');
      cy.wait(DEBOUNCE_TIMEOUT);
      cy.get('@input').blur();

      cy.get('@input').should('have.value', 'Portugal');
      cy.get('@autocomplete').should('not.have.attr', 'open');
      cy.get('@popovercontainer').should('not.match', ':popover-open');
    });

    it('should clear the selected value when clicking the clear button', () => {
      cy.get('@input').type('po');
      cy.wait(DEBOUNCE_TIMEOUT);
      cy.get('@listbox').find('post-listbox-option[value="Portugal"]').click();

      cy.get('@autocomplete').shadow().find('.autocomplete-clear').click();

      cy.get('@input').should('have.value', '');
      cy.get('@listbox')
        .find('post-listbox-option[value="Portugal"]')
        .should('not.have.attr', 'selected');
      cy.get('@autocomplete').should('not.have.attr', 'open');
      cy.get('@popovercontainer').should('not.match', ':popover-open');
    });

    it('should close the listbox when pressing escape', () => {
      cy.get('@input').click();
      cy.get('@autocomplete').should('have.attr', 'open');

      cy.get('@input').type('{esc}');

      cy.get('@autocomplete').should('not.have.attr', 'open');
      cy.get('@input').should('have.attr', 'aria-expanded', 'false');
      cy.get('@popovercontainer').should('not.match', ':popover-open');
    });
  });

  describe('detached listbox', () => {
    beforeEach(() => {
      cy.visit(FIXTURE_PATH);
      cy.get('post-autocomplete#autocomplete-detached[data-hydrated]').as('autocomplete');
      cy.get('#detached-input').as('input');
      cy.get('post-listbox#detached-listbox[data-hydrated]').as('listbox');
      cy.get('@listbox').find('post-popovercontainer').as('popovercontainer');
    });

    it('should connect to an detached listbox via the listbox property', () => {
      cy.get('@input').should('have.attr', 'aria-controls', 'detached-listbox');
      cy.get('@input').type('fra');
      cy.wait(DEBOUNCE_TIMEOUT);

      cy.get('@autocomplete').should('have.attr', 'open');
      cy.get('@popovercontainer').should('match', ':popover-open');
      cy.get('@listbox')
        .find('post-listbox-option[value="France"]')
        .should('not.have.attr', 'hidden');
      cy.get('@listbox')
        .find('post-listbox-option[value="Portugal"]')
        .should('have.attr', 'hidden');

      cy.get('@listbox').find('post-listbox-option[value="France"]').click();

      cy.get('@input').should('have.value', 'France');
      cy.get('@autocomplete').should('not.have.attr', 'open');
      cy.get('@popovercontainer').should('not.match', ':popover-open');
    });
  });

  describe('filter threshold', () => {
    beforeEach(() => {
      cy.visit(FIXTURE_PATH);
      cy.get('post-autocomplete#autocomplete-nested[data-hydrated]').as('autocomplete');
      cy.get('#nested-input').as('input');
      cy.get('@autocomplete').find('post-listbox[data-hydrated]').as('listbox');
      cy.get('@autocomplete').invoke('attr', 'filter-threshold', '3');
    });

    it('should not filter before the threshold is reached', () => {
      cy.get('@input').type('it');
      cy.wait(DEBOUNCE_TIMEOUT);

      cy.get('@listbox')
        .find('post-listbox-option')
        .each($option => cy.wrap($option).should('not.have.attr', 'hidden'));
    });

    it('should filter once the threshold is reached', () => {
      cy.get('@input').type('ita');
      cy.wait(DEBOUNCE_TIMEOUT);

      cy.get('@autocomplete').should('have.attr', 'open');
      cy.get('@listbox')
        .find('post-listbox-option[value="Italy"]')
        .should('not.have.attr', 'hidden');
      cy.get('@listbox').find('post-listbox-option[value="Austria"]').should('have.attr', 'hidden');
    });
  });

  describe('cancelable filtering event', () => {
    beforeEach(() => {
      cy.visit(FIXTURE_PATH);
      cy.document().then(document => {
        const output = document.createElement('output');
        output.id = 'cancel-event-value';
        document.body.append(output);

        const autocomplete: HTMLPostAutocompleteElement = document.querySelector(
          'post-autocomplete#autocomplete-nested',
        );

        autocomplete.addEventListener('postFilteringEvent', event => {
          output.textContent = event.detail;
          event.preventDefault();
        });
      });

      cy.get('post-autocomplete#autocomplete-nested[data-hydrated]').as('autocomplete');
      cy.get('#nested-input').as('input');
      cy.get('@autocomplete').find('post-listbox[data-hydrated]').as('listbox');
      cy.get('#cancel-event-value').as('eventValue');
    });

    it('should allow consumers to prevent the default filtering behavior', () => {
      cy.get('@input').type('er');
      cy.wait(DEBOUNCE_TIMEOUT);

      cy.get('@eventValue').should('have.text', 'er');
      cy.get('@listbox')
        .find('post-listbox-option')
        .each($option => cy.wrap($option).should('not.have.attr', 'hidden'));
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit(FIXTURE_PATH);
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('body');
    });
  });
});
