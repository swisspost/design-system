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

    it('should show the menu after clicking on the trigger', () => {
      cy.get('@trigger').click();
      cy.get('@menu')
        .shadow()
        .find('post-popovercontainer')
        .should('not.have.css', 'display', 'none');
    });

    it('should hide the menu after clicking on the trigger twice', () => {
      cy.get('@trigger').dblclick();
      cy.get('@menu')
        .shadow()
        .find('post-popovercontainer')
        .should('have.css', 'display', 'none');
    });

    it('should update the "aria-expanded" attribute after hiding the menu', () => {
      cy.get('@trigger').dblclick();
      cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    });
  });
});

describe('menus', { baseUrl: null, includeShadowDom: true }, () => {
describe('multiple menus', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/post-menu.test.html'); 
    cy.get('post-menu-trigger[for="menu-one"]').as('triggerA');
    cy.get('post-menu#menu-one').as('menuA');
    cy.get('post-menu-trigger[for="menu-two"]').as('triggerB');
    cy.get('post-menu#menu-two').as('menuB');
  });

  it('should have both triggers and menus', () => {
    cy.get('@triggerA').should('exist');
    cy.get('@triggerB').should('exist');
    cy.get('@menuA').should('exist');
    cy.get('@menuB').should('exist');
  });

  it('should be initially hidden', () => {
    cy.get('@menuA').should('not.be.visible');
    cy.get('@menuB').should('not.be.visible');
  });

  
  it('should toggle menuA when clicking triggerA', () => {
    cy.get('@triggerA').click();
    cy.get('@menuA')
      .shadow()
      .find('post-popovercontainer')
      .should('not.have.css', 'display', 'none'); // Ensure menuA is visible
    cy.get('@menuB')
      .shadow()
      .find('post-popovercontainer')
      .should('have.css', 'display', 'none'); // Ensure menuB remains hidden
  });

  it('should toggle menuB when clicking triggerB', () => {
    cy.get('@triggerB').click();
    cy.get('@menuB')
      .shadow()
      .find('post-popovercontainer')
      .should('not.have.css', 'display', 'none');
    cy.get('@menuA')
      .shadow()
      .find('post-popovercontainer')
      .should('have.css', 'display', 'none');
  });

  it('should hide menuA when clicking triggerA twice', () => {
    cy.get('@triggerA').dblclick();
    cy.get('@menuA')
      .shadow()
      .find('post-popovercontainer')
      .should('have.css', 'display', 'none');
  });

  it('should hide menuB when clicking triggerB twice', () => {
    cy.get('@triggerB').dblclick();
    cy.get('@menuB')
      .shadow()
      .find('post-popovercontainer')
      .should('have.css', 'display', 'none');
  });
});
});