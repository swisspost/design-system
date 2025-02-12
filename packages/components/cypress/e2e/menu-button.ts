const MENUBUTTON_ID = '8ca2bd70-56e6-4da9-b1fd-4e55388dca88';

describe('post-menu and post-menu-trigger', () => {
  describe('default behavior', () => {
    beforeEach(() => {
      // Load the components
      cy.getComponents(MENUBUTTON_ID, 'default', 'post-menu', 'post-menu-trigger');

      // Alias the elements for easier access
      cy.get('@post-menu').as('menu');
      cy.get('@post-menu-trigger').as('trigger');
      cy.get('@trigger').find('button').as('triggerButton');
    });

    it('should render the post-menu and post-menu-trigger', () => {
      cy.get('@menu').should('exist');
      cy.get('@trigger').should('exist');
    });

    it('should have a trigger button with aria-haspopup="menu"', () => {
      cy.get('@triggerButton').should('have.attr', 'aria-haspopup', 'menu');
    });

    it('should set aria-expanded to true when the menu is open', () => {
      // Click the trigger to open the menu
      cy.get('@triggerButton').click();

      // Check that aria-expanded is true
      cy.get('@triggerButton').should('have.attr', 'aria-expanded', 'true');
    });

    it('should set aria-expanded to false when the menu is closed', () => {
      // Click the trigger to open the menu
      cy.get('@triggerButton').click();

      // Click the trigger again to close the menu
      cy.get('@triggerButton').click();

      // Check that aria-expanded is false
      cy.get('@triggerButton').should('have.attr', 'aria-expanded', 'false');
    });

    it('should focus the first menu item when the menu is opened', () => {
      // Click the trigger to open the menu
      cy.get('@triggerButton').click();

      // Check that the first menu item is focused
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .first()
        .should('have.focus');
    });

    it('should restore focus to the trigger when the menu is closed', () => {
      // Click the trigger to open the menu
      cy.get('@triggerButton').click();

      // Click the trigger again to close the menu
      cy.get('@triggerButton').click();

      // Check that the trigger button is focused
      cy.get('@triggerButton').should('have.focus');
    });

    it('should propagate the "toggleMenu" event from post-menu to post-menu-trigger', () => {
      const EventHandlerMock = cy.spy();

      // Attach an event listener to the trigger
      cy.get('@trigger').then($el => {
        Cypress.$($el.get(0)).on('toggleMenu', EventHandlerMock);
      });

      // Click the trigger to open the menu
      cy.get('@triggerButton')
        .click()
        .then(() => {
          // Check that the event was emitted
          expect(EventHandlerMock).to.be.calledWith(true);
        });

      // Click the trigger again to close the menu
      cy.get('@triggerButton')
        .click()
        .then(() => {
          // Check that the event was emitted again
          expect(EventHandlerMock).to.be.calledWith(false);
        });
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      // Load the components
      cy.getComponents(MENUBUTTON_ID, 'default', 'post-menu', 'post-menu-trigger');

      // Alias the elements for easier access
      cy.get('@post-menu').as('menu');
      cy.get('@post-menu-trigger').as('trigger');
      cy.get('@trigger').find('button').as('triggerButton');

      // Open the menu
      cy.get('@triggerButton').click();
    });

    it('should navigate to the next menu item on ArrowDown', () => {
      // Press ArrowDown key
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .first()
        .type('{downarrow}');

      // Check that the second menu item is focused
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .eq(1)
        .should('have.focus');
    });

    it('should navigate to the previous menu item on ArrowUp', () => {
      // Press ArrowDown key twice to move to the third item
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .first()
        .type('{downarrow}{downarrow}');

      // Press ArrowUp key
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .eq(2)
        .type('{uparrow}');

      // Check that the second menu item is focused
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .eq(1)
        .should('have.focus');
    });

    it('should focus the first menu item on Home key', () => {
      // Press ArrowDown key twice to move to the third item
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .first()
        .type('{downarrow}{downarrow}');

      // Press Home key
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .eq(2)
        .type('{home}');

      // Check that the first menu item is focused
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .first()
        .should('have.focus');
    });

    it('should focus the last menu item on End key', () => {
      // Press End key
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .first()
        .type('{end}');

      // Check that the last menu item is focused
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .last()
        .should('have.focus');
    });

    it('should close the menu on Escape key', () => {
      // Press Escape key
      cy.get('@menu')
        .shadow()
        .find('[role="menuitem"]')
        .first()
        .type('{esc}');

      // Check that the menu is closed
      cy.get('@triggerButton').should('have.attr', 'aria-expanded', 'false');
    });
  });

  describe('Accessibility', () => {
    it('Has no detectable a11y violations on load for all variants', () => {
      cy.getSnapshots('post-menu');
      cy.getSnapshots('post-menu-trigger');
      cy.checkA11y('#root-inner');
    });
  });
});