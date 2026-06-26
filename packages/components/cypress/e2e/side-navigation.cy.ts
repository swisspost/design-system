const SIDENAVIGATION_ID = '9f26d86e-7edb-5804-ac96-92g22f91c9d9';

describe('post-side-navigation', () => {
  describe('desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.getComponents(
        SIDENAVIGATION_ID,
        'default',
        'post-side-navigation',
        'post-side-navigation-trigger',
      );
      cy.get('@side-navigation-trigger').find('button').as('trigger');
    });

    it('should render', () => {
      cy.get('@side-navigation').should('exist');
    });

    it('should render inline without a dialog', () => {
      cy.get('@side-navigation').shadow().find('dialog').should('not.exist');
    });

    it('should be visible', () => {
      cy.get('@side-navigation').should('be.visible');
    });

    it('should not respond to show()', () => {
      cy.get('@side-navigation').then(([el]) => el.show());
      cy.get('@side-navigation').shadow().find('dialog').should('not.exist');
    });

    it('should not respond to hide()', () => {
      cy.get('@side-navigation').then(([el]) => el.hide());
      cy.get('@side-navigation').should('be.visible');
    });

    it('should not respond to toggle()', () => {
      cy.get('@side-navigation').then(([el]) => el.toggle());
      cy.get('@side-navigation').shadow().find('dialog').should('not.exist');
    });

    it('should not have the small class by default', () => {
      cy.get('@side-navigation').should('not.have.class', 'post-side-navigation-small');
    });
  });

  describe('size prop', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.getComponents(
        SIDENAVIGATION_ID,
        'small',
        'post-side-navigation',
        'post-side-navigation-trigger',
      );
    });

    it('should add the small class when size is "small"', () => {
      cy.get('@side-navigation').should('have.class', 'post-side-navigation-small');
    });
  });

  describe('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.getComponents(
        SIDENAVIGATION_ID,
        'default',
        'post-side-navigation',
        'post-side-navigation-trigger',
      );
      cy.get('@side-navigation-trigger').find('button').as('trigger');
    });

    it('should render', () => {
      cy.get('@side-navigation').should('exist');
    });

    it('should render inside a dialog', () => {
      cy.get('@side-navigation').shadow().find('dialog').should('exist');
    });

    it('should be hidden by default', () => {
      cy.get('@side-navigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should open when show() is called', () => {
      cy.get('@side-navigation').then(([el]) => el.show());
      cy.get('@side-navigation').shadow().find('dialog').should('have.attr', 'open');
    });

    it('should close when hide() is called', () => {
      cy.get('@side-navigation').then(([el]) => el.show());
      cy.get('@side-navigation').then(([el]) => el.hide());
      cy.get('@side-navigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should open and close when toggle() is called', () => {
      cy.get('@side-navigation').then(([el]) => el.toggle());
      cy.get('@side-navigation').shadow().find('dialog').should('have.attr', 'open');

      cy.get('@side-navigation').then(([el]) => el.toggle());
      cy.get('@side-navigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should close when the close button is clicked', () => {
      cy.get('@side-navigation').then(([el]) => el.show());
      cy.get('@side-navigation').shadow().find('post-closebutton').click();
      cy.get('@side-navigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should move focus into the navigation on open', () => {
      cy.get('@side-navigation').then(([el]) => el.show());
      cy.focused().then($focused => {
        cy.get('@side-navigation').then($nav => {
          expect($nav[0].contains($focused[0])).to.equal(true);
        });
      });
    });

    it('should emit postToggle with true when opened', () => {
      const spy = cy.spy().as('toggleSpy');
      cy.get('@side-navigation').then(([el]) => {
        el.addEventListener('postToggle', spy);
        el.show();
      });
      cy.get('@toggleSpy').should('have.been.calledOnce');
      cy.get('@toggleSpy').its('firstCall.args.0.detail').should('equal', true);
    });

    it('should emit postToggle with false when closed', () => {
      cy.get('@side-navigation').then(([el]) => el.show());
      const spy = cy.spy().as('toggleSpy');
      cy.get('@side-navigation').then(([el]) => {
        el.addEventListener('postToggle', spy);
        el.hide();
      });
      cy.get('@toggleSpy').should('have.been.calledOnce');
      cy.get('@toggleSpy').its('firstCall.args.0.detail').should('equal', false);
    });

    describe('collapsible inside navigation', () => {
      beforeEach(() => {
        cy.getComponents(
          SIDENAVIGATION_ID,
          'default',
          'post-side-navigation',
          'post-side-navigation-trigger',
        );
        cy.get('@side-navigation').then(([el]) => el.show());
        cy.get('@side-navigation')
          .find('post-collapsible-trigger')
          .first()
          .find('> button')
          .as('collapsibleTrigger');
        cy.get('@side-navigation')
          .find('post-collapsible-trigger')
          .first()
          .find('> post-collapsible')
          .as('collapsible');
      });

      it('should collapse the section on Escape when focus is on a collapsible trigger', () => {
        cy.get('@collapsibleTrigger').click();
        cy.get('@collapsible').should('be.visible');
        cy.get('@collapsibleTrigger').focus().trigger('keydown', { key: 'Escape' });
        cy.get('@collapsible').should('be.hidden');
      });

      it('should keep focus on the collapsible trigger after collapsing on Escape', () => {
        cy.get('@collapsibleTrigger').click();
        cy.get('@collapsibleTrigger').focus().trigger('keydown', { key: 'Escape' });
        cy.get('@collapsibleTrigger').should('have.focus');
      });

      it('should not close the dialog when Escape collapses a section', () => {
        cy.get('@collapsibleTrigger').click();
        cy.get('@collapsibleTrigger').focus().trigger('keydown', { key: 'Escape' });
        cy.get('@side-navigation').shadow().find('dialog').should('have.attr', 'open');
      });
    });
  });
});

describe('post-side-navigation-trigger', () => {
  describe('desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.getComponents(
        SIDENAVIGATION_ID,
        'default',
        'post-side-navigation',
        'post-side-navigation-trigger',
      );
      cy.get('@side-navigation-trigger').find('button').as('trigger');
    });

    it('should render', () => {
      cy.get('@side-navigation-trigger').should('exist');
    });

    it('should set aria-controls to the sidenavigation id', () => {
      cy.get('@side-navigation')
        .invoke('attr', 'id')
        .then(sidenavId => {
          cy.get('@trigger').should('have.attr', 'aria-controls', sidenavId);
        });
    });

    it('should set aria-expanded to false initially', () => {
      cy.get('@side-navigation-trigger').find('button').should('have.attr', 'aria-expanded', 'false');
    });

    it('should hide the trigger button on desktop', () => {
      cy.get('@trigger').should('not.be.visible');
    });
  });

  describe('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.getComponents(
        SIDENAVIGATION_ID,
        'default',
        'post-side-navigation',
        'post-side-navigation-trigger',
      );
      cy.get('@side-navigation-trigger').find('button').as('trigger');
    });

    it('should render', () => {
      cy.get('@side-navigation-trigger').should('exist');
    });

    it('should set aria-controls to the sidenavigation id', () => {
      cy.get('@side-navigation')
        .invoke('attr', 'id')
        .then(sidenavId => {
          cy.get('@trigger').should('have.attr', 'aria-controls', sidenavId);
        });
    });

    it('should set aria-expanded to false initially', () => {
      cy.get('@side-navigation-trigger').find('button').should('have.attr', 'aria-expanded', 'false');
    });

    it('should open the navigation on click', () => {
      cy.get('@trigger').click();
      cy.get('@side-navigation').shadow().find('dialog').should('have.attr', 'open');
    });

    it('should set aria-expanded to true when the navigation opens', () => {
      cy.get('@side-navigation').then(([el]) => el.show());
      cy.get('@side-navigation-trigger').find('button').should('have.attr', 'aria-expanded', 'true');
    });

    it('should close the navigation on second click', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').click({ force: true });
      cy.get('@side-navigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should set aria-expanded to false when the navigation closes', () => {
      cy.get('@side-navigation').then(([el]) => el.show());
      cy.get('@side-navigation-trigger').find('button').should('have.attr', 'aria-expanded', 'true');
      cy.get('@side-navigation').then(([el]) => el.hide());
      cy.get('@side-navigation-trigger').find('button').should('have.attr', 'aria-expanded', 'false');
    });

    it('should update aria-expanded when navigation is closed via the close button', () => {
      cy.get('@side-navigation').then(([el]) => el.show());
      cy.get('@side-navigation-trigger').find('button').should('have.attr', 'aria-expanded', 'true');
      cy.get('@side-navigation').shadow().find('post-closebutton').click();
      cy.get('@side-navigation-trigger').find('button').should('have.attr', 'aria-expanded', 'false');
    });

    it('should log a warning when mounted without a slotted button', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'warn').as('consoleWarn');
      });
      cy.get('@side-navigation').then($nav => {
        const trigger = document.createElement('post-side-navigation-trigger');
        trigger.setAttribute('for', $nav.attr('id'));
        $nav[0].parentElement.append(trigger);
      });
      cy.get('@consoleWarn').should('be.called');
    });
  });
});

describe('Accessibility', () => {
  it('has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('post-side-navigation');
    cy.checkA11y('#root-inner');
  });
});