const BREADCRUMB_ITEM_ID = 'b7db7391-f893-4b1e-a125-b30c6f0b028d';

describe('breadcrumb-item', () => {
  describe('default (internal anchor)', () => {
    beforeEach(() => {
      cy.getComponent('breadcrumb-item', BREADCRUMB_ITEM_ID);
    });

    it('should render its own anchor in the shadow DOM when the url prop is set', () => {
      cy.get('post-breadcrumb-item').shadow().find('a').should('exist');
      cy.get('post-breadcrumb-item').children('a').should('not.exist');
    });
  });

  describe('slotted link', () => {
    beforeEach(() => {
      cy.getComponent('breadcrumb-item', BREADCRUMB_ITEM_ID, 'slotted-link');
      cy.get('post-breadcrumb-item').as('item');
    });

    it('should not render an internal anchor in the shadow DOM', () => {
      cy.get('@item').shadow().find('a').should('not.exist');
    });

    it('should keep the slotted anchor in the light DOM so consumer routing can intercept clicks', () => {
      cy.get('@item').children('a').should('exist').and('have.attr', 'href');
    });
  });
});
