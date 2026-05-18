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

describe('menu keyboard navigation', { baseUrl: null, includeShadowDom: true }, () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/post-menu.test.html');
    cy.get('post-menu-trigger[data-hydrated]');
    cy.get('post-menu[data-hydrated]');
    cy.get('post-menu-trigger[for="menu-one"]').as('trigger');
    cy.get('post-menu#menu-one').as('menu');
  });

  it('should open menu with Space key on trigger', () => {
    cy.get('@trigger').find('button').focus().type(' ');
    cy.get('@menu').shadow().find('post-popovercontainer').should('not.have.css', 'display', 'none');
  });

  it('should navigate menu items with Arrow Down', () => {
    cy.get('@trigger').click();
    cy.get('@menu').find('button, a').first().as('firstItem');
    cy.get('@menu').find('button, a').eq(1).as('secondItem');

    cy.get('@firstItem').focus().type('{downarrow}', { force: true });
    cy.get('@secondItem').should('have.focus');
  });

  it('should navigate menu items with Arrow Up', () => {
    cy.get('@trigger').click();
    cy.get('@menu').find('button, a').first().as('firstItem');
    cy.get('@menu').find('button, a').last().as('lastItem');

    cy.get('@lastItem').focus().type('{uparrow}', { force: true });
    cy.get('@firstItem').should('have.focus');
  });

  it('should move focus to first item with Home key', () => {
    cy.get('@trigger').click();
    cy.get('@menu').find('button, a').first().as('firstItem');
    cy.get('@menu').find('button, a').last().as('lastItem');

    cy.get('@lastItem').focus().type('{home}', { force: true });
    cy.get('@firstItem').should('have.focus');
  });

  it('should not scroll page when pressing Home key', () => {
    cy.window().then(win => {
      cy.wrap(win.pageYOffset).as('initialScroll');
    });

    cy.get('@trigger').click();
    cy.get('@menu').find('button, a').last().focus();
    cy.get('@menu').find('button, a').last().type('{home}', { force: true });

    cy.window().then(win => {
      cy.get('@initialScroll').should('equal', win.pageYOffset);
    });
  });

  it('should move focus to last item with End key', () => {
    cy.get('@trigger').click();
    cy.get('@menu').find('button, a').first().as('firstItem');
    cy.get('@menu').find('button, a').last().as('lastItem');

    cy.get('@firstItem').focus().type('{end}', { force: true });
    cy.get('@lastItem').should('have.focus');
  });

  it('should not scroll page when pressing End key', () => {
    cy.window().then(win => {
      cy.wrap(win.pageYOffset).as('initialScroll');
    });

    cy.get('@trigger').click();
    cy.get('@menu').find('button, a').first().focus();
    cy.get('@menu').find('button, a').first().type('{end}', { force: true });

    cy.window().then(win => {
      cy.get('@initialScroll').should('equal', win.pageYOffset);
    });
  });

  it('should close menu with Escape key', () => {
    cy.get('@trigger').click();
    cy.get('@menu').shadow().find('post-popovercontainer').should('not.have.css', 'display', 'none');

    cy.get('@menu').find('button, a').first().focus().type('{esc}', { force: true });
    cy.get('@menu').shadow().find('post-popovercontainer').should('have.css', 'display', 'none');
  });
});
