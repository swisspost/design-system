import 'cypress-real-events';

const FIXTURE_PATH = './cypress/fixtures/post-select.test.html';

describe('select', { baseUrl: null, includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit(FIXTURE_PATH);
    cy.get('post-select#country-select[data-hydrated]').as('select');
    cy.get('@select').shadow().find('select').as('control');
  });

  it('renders a native select with the selected value and optional icon', () => {
    cy.get('@control')
      .should('have.value', 'Switzerland')
      .and('have.attr', 'aria-labelledby', 'country-label');
    cy.get('@control').find('option[value="Switzerland"] post-icon[name="2558"]').should('exist');
    cy.get('@control').find('selectedcontent').should('contain.text', 'Switzerland');
    cy.get('@select')
      .find('post-select-option[value="Switzerland"]')
      .should('have.attr', 'selected');
  });

  it('uses the customizable select picker at the control width where supported', () => {
    cy.get('@control').should('have.css', 'width', '320px');
    cy.get('@control').realClick();
    cy.get('@control').then($select => {
      const select = $select[0];
      if (CSS.supports('appearance', 'base-select')) {
        expect(getComputedStyle(select).appearance).to.equal('base-select');
        expect(getComputedStyle(select, '::picker(select)').width).to.equal(
          `${select.getBoundingClientRect().width}px`,
        );
      }
    });
  });

  it('selects an option and emits postChange once', () => {
    cy.get('@select').then($select => {
      const changes: string[] = [];
      $select[0].addEventListener('postChange', (event: Event) => {
        changes.push((event as CustomEvent<string>).detail);
      });
      cy.get('@control').select('France');
      cy.get('@select').should('have.attr', 'value', 'France');
      cy.get('@select').find('post-select-option[value="France"]').should('have.attr', 'selected');
      cy.wrap(changes).should('deep.equal', ['France']);
    });
  });

  it('uses native keyboard navigation and skips disabled options', () => {
    cy.get('@control').find('option[value="Italy"]').should('be.disabled');
    cy.get('@control').focus().realPress('ArrowDown').realPress('ArrowDown').realPress('Enter');
    cy.get('@control').should('have.value', 'Germany');
  });

  it('renders custom option content when provided', () => {
    cy.get('#custom-select')
      .shadow()
      .find('option[value="express"] strong')
      .should('have.text', 'Express');
  });

  it('reflects external changes to the value and options', () => {
    cy.get('@select').invoke('attr', 'value', 'Germany');
    cy.get('@control').should('have.value', 'Germany');
    cy.get('@select').find('post-select-option[value="Germany"]').invoke('attr', 'disabled', '');
    cy.get('@control').find('option[value="Germany"]').should('be.disabled');
  });

  it('does not open when disabled', () => {
    cy.get('#disabled-select').shadow().find('select').should('be.disabled');
  });
});
