const MENUBUTTON_ID = '8ca2bd70-56e6-4da9-b1fd-4e55388dca88';

describe('menu', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponents(MENUBUTTON_ID, 'default', 'post-menu', 'post-menu-trigger');
      cy.get('@menu-trigger').find('.btn').as('trigger');
    });

    it('should have a menu', () => {
      cy.get('@menu').should('exist');
    });

    it('should have a trigger', () => {
      cy.get('@trigger').should('exist');
    });

    it('should be initially hidden', () => {
      cy.get('@menu').should('not.be.visible');
    }); 

    it('should update the "aria-expanded" attribute after showing the menu', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should hide the menu after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@menu').should(`be.hidden`);
    });

    it('should update the "aria-expanded" attribute after hiding the menu', () => {
      cy.get('@trigger').dblclick();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });
  });
});