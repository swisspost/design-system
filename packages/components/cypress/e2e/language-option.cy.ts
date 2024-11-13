const LANGUAGE_OPTION_ID = '3753ab83-a659-47b5-a2f2-ac452ec97916';

describe('language-option', () => {
  describe('button', () => {
    beforeEach(() => {
      cy.getComponent('language-option', LANGUAGE_OPTION_ID);
      cy.get('@language-option').shadow().find('button').as('button');
    });

    it('should render', () => {
      cy.get('@language-option').should('exist');
    });

    it('should not render an anchor', () => {
      cy.get('@language-option').shadow().find('a').should('not.exist');
    });

    it('should render a button with correct properties', () => {
      cy.get('@button')
        .should('exist')
        .and('have.attr', 'aria-current', 'true')
        .and('have.attr', 'aria-label', 'English')
        .and('have.attr', 'lang', 'en');
    });

    it('should emit postChange event when clicked', () => {
      cy.get('@language-option').then($languageOption => {
        $languageOption.on('postChange', cy.spy().as('postChangeSpy'));
      });
      cy.get('@button').click({ force: true });
      cy.get('@postChangeSpy').should('have.been.called');
    });
  });

  describe('anchor', () => {
    beforeEach(() => {
      cy.getComponent('language-option', LANGUAGE_OPTION_ID, 'anchor');
      cy.get('@language-option').shadow().find('a').as('anchor');
    });

    it('should render', () => {
      cy.get('@language-option').should('exist');
    });

    it('should not render a button', () => {
      cy.get('@language-option').shadow().find('button').should('not.exist');
    });

    it('should render an anchor', () => {
      cy.get('@anchor')
        .should('exist')
        .and('have.attr', 'aria-current', 'page')
        .and('have.attr', 'aria-label', 'English')
        .and('have.attr', 'href', 'https://www.post.ch/en')
        .and('have.attr', 'hrefLang', 'en')
        .and('have.attr', 'lang', 'en');
    });
  });
});

describe('Accessibility', () => {
  it('Has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('language-option');
    cy.checkA11y('#root-inner');
  });
});
