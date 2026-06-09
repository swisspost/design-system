const SIDENAVIGATION_ID = '8d15c75d-3cda-4793-9b85-81f11cabb81c';

describe('post-sidenavigation', () => {
  describe('desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.getComponents(
        SIDENAVIGATION_ID,
        'default',
        'post-sidenavigation',
        'post-sidenavigation-trigger',
      );
      cy.get('@sidenavigation-trigger').find('button').as('trigger');
    });

    it('should render', () => {
      cy.get('@sidenavigation').should('exist');
    });

    it('should render inline without a dialog', () => {
      cy.get('@sidenavigation').shadow().find('dialog').should('not.exist');
    });

    it('should be visible', () => {
      cy.get('@sidenavigation').should('be.visible');
    });

    it('should not respond to show()', () => {
      cy.get('@sidenavigation').then(([el]) => el.show());
      cy.get('@sidenavigation').shadow().find('dialog').should('not.exist');
    });

    it('should not respond to hide()', () => {
      cy.get('@sidenavigation').then(([el]) => el.hide());
      cy.get('@sidenavigation').should('be.visible');
    });

    it('should not respond to toggle()', () => {
      cy.get('@sidenavigation').then(([el]) => el.toggle());
      cy.get('@sidenavigation').shadow().find('dialog').should('not.exist');
    });
  });

  describe('mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
      cy.getComponents(
        SIDENAVIGATION_ID,
        'default',
        'post-sidenavigation',
        'post-sidenavigation-trigger',
      );
      cy.get('@sidenavigation-trigger').find('button').as('trigger');
    });

    it('should render', () => {
      cy.get('@sidenavigation').should('exist');
    });

    it('should render inside a dialog', () => {
      cy.get('@sidenavigation').shadow().find('dialog').should('exist');
    });

    it('should be hidden by default', () => {
      cy.get('@sidenavigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should open when show() is called', () => {
      cy.get('@sidenavigation').then(([el]) => el.show());
      cy.get('@sidenavigation').shadow().find('dialog').should('have.attr', 'open');
    });

    it('should close when hide() is called', () => {
      cy.get('@sidenavigation').then(([el]) => el.show());
      cy.get('@sidenavigation').then(([el]) => el.hide());
      cy.get('@sidenavigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should open and close when toggle() is called', () => {
      cy.get('@sidenavigation').then(([el]) => el.toggle());
      cy.get('@sidenavigation').shadow().find('dialog').should('have.attr', 'open');

      cy.get('@sidenavigation').then(([el]) => el.toggle());
      cy.get('@sidenavigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should close when the close button is clicked', () => {
      cy.get('@sidenavigation').then(([el]) => el.show());
      cy.get('@sidenavigation').shadow().find('post-closebutton').click();
      cy.get('@sidenavigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    // Escape on a non-collapsible-trigger element closes the dialog via the native
    // <dialog> cancel event. This is browser-native behaviour that cannot be simulated
    // through Cypress's DOM event API. The inverse case — Escape on a collapsible trigger
    // intercepted by the component — is covered in the 'collapsible inside navigation' suite.

    it('should move focus into the navigation on open', () => {
      cy.get('@sidenavigation').then(([el]) => el.show());
      cy.focused().then($focused => {
        cy.get('@sidenavigation').then($nav => {
          expect($nav[0].contains($focused[0])).to.be.true;
        });
      });
    });

    it('should emit postToggle with true when opened', () => {
      const spy = cy.spy().as('toggleSpy');
      cy.get('@sidenavigation').then(([el]) => {
        el.addEventListener('postToggle', spy);
        el.show();
      });
      cy.get('@toggleSpy').should('have.been.calledOnce');
      cy.get('@toggleSpy').its('firstCall.args.0.detail').should('equal', true);
    });

    it('should emit postToggle with false when closed', () => {
      cy.get('@sidenavigation').then(([el]) => el.show());
      const spy = cy.spy().as('toggleSpy');
      cy.get('@sidenavigation').then(([el]) => {
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
          'collapsible-not-linked',
          'post-sidenavigation',
          'post-sidenavigation-trigger',
        );
        cy.get('@sidenavigation').then(([el]) => el.show());
        cy.get('@sidenavigation').find('post-collapsible-trigger').find('button').as('collapsibleTrigger');
        cy.get('@sidenavigation').find('post-collapsible').as('collapsible');
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
        cy.get('@sidenavigation').shadow().find('dialog').should('have.attr', 'open');
      });
    });
  });
});

describe('post-sidenavigation-trigger', () => {
  describe('desktop', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
      cy.getComponents(
        SIDENAVIGATION_ID,
        'default',
        'post-sidenavigation',
        'post-sidenavigation-trigger',
      );
      cy.get('@sidenavigation-trigger').find('button').as('trigger');
    });

    it('should render', () => {
      cy.get('@sidenavigation-trigger').should('exist');
    });

    it('should set aria-controls to the sidenavigation id', () => {
      cy.get('@sidenavigation')
        .invoke('attr', 'id')
        .then(sidenavId => {
          cy.get('@trigger').should('have.attr', 'aria-controls', sidenavId);
        });
    });

    it('should set aria-expanded to false initially', () => {
      cy.get('@sidenavigation-trigger').find('button').should('have.attr', 'aria-expanded', 'false');
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
        'post-sidenavigation',
        'post-sidenavigation-trigger',
      );
      cy.get('@sidenavigation-trigger').find('button').as('trigger');
    });

    it('should render', () => {
      cy.get('@sidenavigation-trigger').should('exist');
    });

    it('should set aria-controls to the sidenavigation id', () => {
      cy.get('@sidenavigation')
        .invoke('attr', 'id')
        .then(sidenavId => {
          cy.get('@trigger').should('have.attr', 'aria-controls', sidenavId);
        });
    });

    it('should set aria-expanded to false initially', () => {
      cy.get('@sidenavigation-trigger').find('button').should('have.attr', 'aria-expanded', 'false');
    });

    it('should open the navigation on click', () => {
      cy.get('@trigger').click();
      cy.get('@sidenavigation').shadow().find('dialog').should('have.attr', 'open');
    });

    it('should set aria-expanded to true when the navigation opens', () => {
      cy.get('@sidenavigation').then(([el]) => el.show());
      cy.get('@sidenavigation-trigger').find('button').should('have.attr', 'aria-expanded', 'true');
    });

    it('should close the navigation on second click', () => {
      cy.get('@trigger').click();
      cy.get('@trigger').click({ force: true });
      cy.get('@sidenavigation').shadow().find('dialog').should('not.have.attr', 'open');
    });

    it('should set aria-expanded to false when the navigation closes', () => {
      cy.get('@sidenavigation').then(([el]) => el.show());
      cy.get('@sidenavigation-trigger').find('button').should('have.attr', 'aria-expanded', 'true');
      cy.get('@sidenavigation').then(([el]) => el.hide());
      cy.get('@sidenavigation-trigger').find('button').should('have.attr', 'aria-expanded', 'false');
    });

    it('should update aria-expanded when navigation is closed via the close button', () => {
      cy.get('@sidenavigation').then(([el]) => el.show());
      cy.get('@sidenavigation-trigger').find('button').should('have.attr', 'aria-expanded', 'true');
      cy.get('@sidenavigation').shadow().find('post-closebutton').click();
      cy.get('@sidenavigation-trigger').find('button').should('have.attr', 'aria-expanded', 'false');
    });

    it('should log a warning when mounted without a slotted button', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'warn').as('consoleWarn');
      });
      // Inject a trigger with no button child — the warning fires in componentDidLoad
      cy.get('@sidenavigation').then($nav => {
        const trigger = document.createElement('post-sidenavigation-trigger');
        trigger.setAttribute('for', $nav.attr('id'));
        $nav[0].parentElement.append(trigger);
      });
      cy.get('@consoleWarn').should('be.called');
    });
  });
});

describe('Accessibility', () => {
  it('has no detectable a11y violations on load for all variants', () => {
    cy.getSnapshots('post-sidenavigation');
    cy.checkA11y('#root-inner');
  });
});
