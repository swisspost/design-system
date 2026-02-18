const MENUBUTTON_ID = '8ca2bd70-56e6-4da9-b1fd-4e55388dca88';

describe('menu', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponents(MENUBUTTON_ID, 'default', 'post-menu', 'post-menu-trigger');

      // Ensure the components are hydrated, which is necessary to ensure the component is ready for interaction
      cy.get('post-menu-trigger[data-hydrated]');
      cy.get('post-menu[data-hydrated]');

      cy.get('@menu-trigger').find('.btn').as('trigger');
    });

    it('should have a menu', () => {
      cy.get('@menu').should('exist');
    });

    it('should have a trigger', () => {
      cy.get('@trigger').should('exist');
    });

    it('should be initially hidden', () => {
      cy.get('@menu').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
    });

    it('should update the "aria-expanded" attribute after showing the menu', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    });

    it('should show the menu after clicking on the trigger', () => {
      cy.get('@trigger').click();
      cy.get('@menu')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
    });

    it('should hide the menu after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@menu').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
    });

    it('should update the "aria-expanded" attribute after hiding the menu', () => {
      cy.get('@trigger').dblclick();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });

    it('should have a label attribute with a value', () => {
      cy.get('@menu').should('have.attr', 'label').and('not.be.empty');
    });
  });
});

describe('menus', { baseUrl: null, includeShadowDom: true }, () => {
  describe('multiple menus', () => {
    beforeEach(() => {
      cy.visit('cypress/fixtures/post-menu.test.html');

      // Ensure the components are hydrated, which is necessary to ensure the component is ready for interaction
      cy.get('post-menu-trigger[data-hydrated]');
      cy.get('post-menu[data-hydrated]');

      cy.get('post-menu-trigger[for="menu-one"]').as('triggerA');
      cy.get('post-menu#menu-one').as('menuA');
      cy.get('post-menu-trigger[for="menu-two"]').as('triggerB');
      cy.get('post-menu#menu-two').as('menuB');
      cy.get('post-menu-trigger[for="menu-three"]').first().as('triggerC');
      cy.get('post-menu-trigger[for="menu-three"]').eq(1).as('triggerD');
      cy.get('post-menu#menu-three').as('menuC');
      cy.get('post-menu#menu-four').as('menuD');
    });

    it('should have all triggers and menus', () => {
      cy.get('@triggerA').should('exist');
      cy.get('@triggerB').should('exist');
      cy.get('@triggerC').should('exist');
      cy.get('@triggerD').should('exist');
      cy.get('@menuA').should('exist');
      cy.get('@menuB').should('exist');
      cy.get('@menuC').should('exist');
      cy.get('@menuD').should('exist');
    });

    it('should be initially hidden', () => {
      cy.get('@menuA').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
      cy.get('@menuB').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
      cy.get('@menuC').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
      cy.get('@menuD').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
    });

    it('should toggle menuA when clicking triggerA', () => {
      cy.get('@triggerA').click();
      cy.get('@menuA')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
      cy.get('@menuB').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
    });

    it('should toggle menuB when clicking triggerB', () => {
      cy.get('@triggerB').click();
      cy.get('@menuB')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
      cy.get('@menuA').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
    });

    it('should toggle menuC when clicking triggerC or triggerD', () => {
      cy.get('@triggerC').click();
      cy.get('@menuC')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
      cy.get('@menuD').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');

      cy.get('@triggerC').click();
      cy.get('@triggerD').click();
      cy.get('@menuC')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
    });

    it('should not affect menuD when clicking triggerC or triggerD', () => {
      cy.get('@triggerC').click();
      cy.get('@menuD').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');

      cy.get('@triggerD').click();
      cy.get('@menuD').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
    });
  });
});
