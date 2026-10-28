import { POPOVER_OPEN_SELECTOR } from './helper/popovercontainer';

const FIXTURE_PATH = './cypress/fixtures/post-select.test.html';

describe('select', { baseUrl: null, includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit(FIXTURE_PATH);
    cy.get('post-select#country-select[data-hydrated]').as('select');
    cy.get('@select').shadow().find('button[role="combobox"]').as('trigger');
    cy.get('@select').find('post-popovercontainer').as('popovercontainer');
  });

  it('renders the selected value and option text with an optional icon', () => {
    cy.get('@trigger')
      .should('contain.text', 'Switzerland')
      .and('have.attr', 'aria-labelledby', 'country-label');
    cy.get('@select')
      .find('post-select-option[value="Switzerland"]')
      .shadow()
      .find('post-icon[name="checkmark"]')
      .should('exist');
  });

  it('opens the listbox and selects an option by pointer', () => {
    cy.get('@trigger').click();
    cy.get('@popovercontainer').should('match', POPOVER_OPEN_SELECTOR);
    cy.get('@select').shadow().find('[role="listbox"]').should('exist');

    cy.get('@select').find('post-select-option[value="France"]').click();

    cy.get('@select').should('have.attr', 'value', 'France');
    cy.get('@trigger').should('contain.text', 'France').and('have.attr', 'aria-expanded', 'false');
    cy.get('@select').find('post-select-option[value="France"]').should('have.attr', 'selected');
    cy.get('@popovercontainer').should('not.match', POPOVER_OPEN_SELECTOR);
  });

  it('supports keyboard navigation and selection', () => {
    cy.get('@trigger').focus().type('{downarrow}{downarrow}');
    cy.get('@select')
      .find('post-select-option[value="Germany"]')
      .invoke('attr', 'id')
      .then(id => cy.get('@trigger').should('have.attr', 'aria-activedescendant', id));

    cy.get('@trigger').type('{enter}');

    cy.get('@select').should('have.attr', 'value', 'Germany');
    cy.get('@trigger').should('contain.text', 'Germany');
  });

  it('skips disabled options while navigating', () => {
    cy.get('@trigger').focus().type('{downarrow}{downarrow}{downarrow}{downarrow}');

    cy.get('@select')
      .find('post-select-option[value="Italy"]')
      .should('not.have.attr', 'highlighted');
    cy.get('@select')
      .find('post-select-option[value="Switzerland"]')
      .invoke('attr', 'id')
      .then(id => cy.get('@trigger').should('have.attr', 'aria-activedescendant', id));
  });

  it('renders custom option content when provided', () => {
    cy.get('@trigger').click();
    cy.get('#custom-select post-select-option[value="express"]')
      .find('strong')
      .should('have.text', 'Express');
  });

  it('does not open when disabled', () => {
    cy.get('#disabled-select').shadow().find('button').should('be.disabled').click({ force: true });
    cy.get('#disabled-select')
      .find('post-popovercontainer')
      .should('not.match', POPOVER_OPEN_SELECTOR);
  });
});
