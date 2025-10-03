const LANGUAGE_SWITCH_ID = 'decbb10c-2b39-4f47-b67d-337d8111a3ae';
const LANGUAGE_OPTION_ID = '3753ab83-a659-47b5-a2f2-ac452ec97916';

describe('post-language-switch', () => {
  describe('list variant', () => {
    beforeEach(() => {
      cy.getComponent('language-switch', LANGUAGE_SWITCH_ID);
    });

    it('should render', () => {
      cy.get('@language-switch').should('exist');
    });

    it('should have three language option items', () => {
      cy.get('@language-switch').find('post-language-option').as('language-options');
      cy.get('@language-options').should('have.length', 3);
    });

    it('should render as a list', () => {
      cy.get('@language-switch').find('.post-language-switch-list').should('exist');
    });

    it('should not render dropdown elements', () => {
      cy.get('@language-switch').find('post-menu-trigger').should('not.exist');
      cy.get('@language-switch').find('post-menu').should('not.exist');
    });

    it('should have the correct ARIA attributes', () => {
      cy.get('@language-switch')
        .find('[role="list"]')
        .should('have.attr', 'aria-label', 'Change the language')
        .and('have.attr', 'aria-describedby');

      cy.get('@language-switch')
        .find('[aria-describedby]')
        .should('contain.text', 'The currently selected language is English.');
    });

    it('should correctly set the active language option on click', () => {
      cy.get('@language-switch')
        .find('post-language-option[code="en"]')
        .should('have.attr', 'active');
      cy.get('@language-switch')
        .find('post-language-option[code="fr"]')
        .should('have.attr', 'active', 'false');
      cy.get('@language-switch')
        .find('post-language-option[code="de"]')
        .should('have.attr', 'active', 'false');

      cy.get('@language-switch').find('post-language-option[code="de"]').click();

      cy.get('@language-switch')
        .find('post-language-option[code="de"]')
        .should('have.attr', 'active');
      cy.get('@language-switch')
        .find('post-language-option[code="en"]')
        .should('not.have.attr', 'active', 'false');
      cy.get('@language-switch')
        .find('post-language-option[code="fr"]')
        .should('not.have.attr', 'active', 'false');
    });
  });

  describe('menu variant', () => {
    beforeEach(() => {
      cy.getComponent('language-switch', LANGUAGE_SWITCH_ID);
      cy.get('@language-switch').invoke('prop', 'variant', 'menu');
      cy.get('@language-switch').find('post-menu-trigger').as('trigger');
    });

    it('should render as a dropdown menu', () => {
      cy.get('@language-switch').find('post-menu-trigger').should('exist');
      cy.get('@language-switch').find('post-menu').should('exist');
    });

    it('should not render list elements', () => {
      cy.get('@language-switch').find('[role="list"]').should('not.exist');
    });

    it('should display the active language in the trigger button', () => {
      cy.get('@trigger').should('contain.text', 'en');
    });

    it('should show the menu on trigger click', () => {
      cy.get('@trigger').find('button').click();
      cy.get('@language-switch').find('post-language-option button').should('be.visible');
    });

    it('should correctly switch language and hide menu on option click', () => {
      cy.get('@trigger').find('button').click();
      cy.get('@language-switch').find('post-language-option[code="de"]').click();

      cy.get('@trigger').should('contain.text', 'de');
      cy.get('@language-switch').find('post-language-option').should('not.be.visible');
    });

    it('should have correct ARIA roles', () => {
      cy.get('@trigger').find('button').click();
      cy.get('@language-switch').find('post-menu').should('have.attr', 'role', 'menu');
      cy.get('@language-switch')
        .find('post-language-option')
        .find('button[role="menuitem"]')
        .should('have.length', 2);
    });
  });

  describe('language-option', () => {
    describe('button', () => {
      beforeEach(() => {
        cy.getComponent('language-option', LANGUAGE_OPTION_ID);
        cy.get('@language-option').find('button').as('button');
      });

      it('should render', () => {
        cy.get('@language-option').should('exist');
      });

      it('should not render an anchor', () => {
        cy.get('@language-option').find('a').should('not.exist');
      });

      it('should render a button with correct properties', () => {
        cy.get('@button')
          .should('exist')
          .and('have.attr', 'aria-current', 'true')
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
        cy.get('@language-option').find('a').as('anchor');
      });

      it('should render', () => {
        cy.get('@language-option').should('exist');
      });

      it('should not render a button', () => {
        cy.get('@language-option').find('button').should('not.exist');
      });

      it('should render an anchor', () => {
        cy.get('@anchor')
          .should('exist')
          .and('have.attr', 'aria-current', 'page')
          .and('have.attr', 'href', 'https://www.post.ch/en')
          .and('have.attr', 'hrefLang', 'en')
          .and('have.attr', 'lang', 'en');
      });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.getComponent('language-switch', LANGUAGE_SWITCH_ID);
      cy.get('@language-switch').invoke('prop', 'variant', 'menu');
      cy.get('@language-switch').find('post-menu-trigger').as('trigger');
      cy.get('@language-switch').find('post-language-option').as('language-options');
    });

    it('Has no detectable a11y violations for all variants', () => {
      cy.get('post-language-switch').as('languageSwitch');
      cy.get('@languageSwitch').invoke('prop', 'variant', 'menu');
      cy.checkA11y('#root-inner');
      cy.get('@languageSwitch').invoke('prop', 'variant', 'list');
      cy.checkA11y('#root-inner');
    });
  });
});
