import { stubAnalytics } from './preview';

describe('shell search', () => {
  beforeEach(() => {
    stubAnalytics();
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('finds pages by their aliases', () => {
    cy.get('docs-sidebar .search-input').type('Text Field');
    cy.get('docs-sidebar [role="option"]')
      .should('have.length', 1)
      .first()
      .should('contain.text', 'Form Input')
      .and('contain.text', 'Text Field');
  });

  it('opens the active result with Enter and clears the field', () => {
    cy.get('docs-sidebar .search-input').type('modal{enter}');
    cy.location('pathname').should('equal', '/components/dialog');
    cy.get('docs-sidebar .search-input').should('have.value', '');
  });

  it('clears the search with Escape', () => {
    cy.get('docs-sidebar .search-input').type('button{esc}');
    cy.get('docs-sidebar .search-input').should('have.value', '');
    cy.get('docs-sidebar [role="listbox"]').should('not.be.visible');
  });

  it('shows dev-only pages in dev mode only', () => {
    cy.get('docs-sidebar .search-input').type('Accessibility Practices');
    cy.get('docs-sidebar .search-empty').should('be.visible');

    cy.visit('/?devModeEnabled=true');
    cy.get('docs-sidebar .search-input').type('Accessibility Practices');
    cy.get('docs-sidebar [role="option"]').should('have.length.greaterThan', 0);
  });

  it('focuses the field with Ctrl+K', () => {
    cy.get('body').type('{ctrl}k');
    cy.focused().should('have.class', 'search-input');
  });
});
