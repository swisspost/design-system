import { isPopoverSupported } from './popovercontainer.cy';

describe('popover', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    const selector = isPopoverSupported() ? ':popover-open' : '.\\:popover-open';

    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-popover.test.html');

      // For/id relationship case
      cy.get('post-popover[data-hydrated][id="popover-one"]').as('popover');
      cy.get('post-popover-trigger[data-hydrated][for="popover-one"]').as('popoverTrigger');
      cy.get('post-popover-trigger[data-hydrated][for="popover-one"]')
        .find('button')
        .as('triggerButton');
      cy.get('#testtext').as('content');

      cy.get('@popover').find('post-closebutton').as('closebutton');

      // Wrapped popover case
      cy.get('post-popover-trigger[data-hydrated][data-cy-id="popover-two"]').as('popoverTrigger2');
    });

    it('if the element inside the trigger is not interactive, it should at least have a set tabindex="0" and role="button"', () => {
      cy.get('@triggerButton').invoke(
        'replaceWith',
        '<div id="not-interactive">No interactive content.</div>',
      );
      cy.get('#not-interactive')
        .should('have.attr', 'tabindex', '0')
        .and('have.attr', 'role', 'button');
    });

    it('if the trigger is empty', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });

      cy.get('@triggerButton')
        .invoke('replaceWith', '')
        .then($children => {
          if ($children.length == 0) {
            cy.get('@consoleError').should(
              'be.calledWith',
              'No content found in the post-popover-trigger slot. Please insert a focusable element or content that can receive focus.',
            );
          }
        });
    });

    it('should show up on click', () => {
      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');
      cy.get('@triggerButton').should('have.attr', 'aria-expanded', 'false');
      cy.get('@triggerButton').click();
      cy.get('@content').should('be.visible');
      cy.get(selector).should('exist');
      cy.get('@triggerButton').should('have.attr', 'aria-expanded', 'true');

      // Void click light dismiss does not work in cypress for closing
    });

    it('should show up when clicking on a nested element inside the trigger', () => {
      // Modify trigger by adding a nested span
      cy.get('@triggerButton').then($trigger => {
        const originalText = $trigger.text();
        $trigger.html(`<span class="nested-element">${originalText}</span>`);
      });

      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');
      cy.get('@triggerButton').should('have.attr', 'aria-expanded', 'false');
      cy.get('.nested-element').click();
      cy.get('@content').should('be.visible');
      cy.get(selector).should('exist');
      cy.get('@triggerButton').should('have.attr', 'aria-expanded', 'true');
      cy.get('@closebutton').click();
      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');
      cy.get('@triggerButton').should('have.attr', 'aria-expanded', 'false');
    });

    it('should show up when clicking on a deeply nested element inside the trigger', () => {
      // Set up a trigger with a deeply nested structure
      cy.get('@triggerButton').then($trigger => {
        const originalText = $trigger.text();
        $trigger.html(`
                <div class="level-1">
                  <div class="level-2">
                    <span class="level-3">${originalText}</span>
                  </div>
                </div>
              `);
      });

      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');
      cy.get('.level-3').click();
      cy.get('@content').should('be.visible');
      cy.get(selector).should('exist');
      cy.get('@triggerButton').should('have.attr', 'aria-expanded', 'true');
    });

    it('should close on X click', () => {
      cy.get('@triggerButton').click();
      cy.get('@content').should('be.visible');
      cy.get(selector).should('exist');
      cy.get('@closebutton').click();
      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');
    });

    it('should open on enter and first focusable element should be focused', () => {
      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');
      cy.get('@triggerButton').focus().type('{enter}');
      cy.get('@content').should('be.visible');
      cy.get(selector).should('exist');
      // find the first focusable element (e.g., button, input, link, etc.)
      cy.get('@content')
        .find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        .first()
        .should('have.focus');
    });

    it('should switch position', () => {
      cy.get('@popover').invoke('attr', 'placement', 'top');
      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');

      Promise.all([cy.get('@triggerButton'), cy.get('@content')])
        .then(
          ([$trigger, $popover]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
            $trigger.get(0),
            $popover.get(0),
          ],
        )
        .then(([trigger, popover]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
          const t = trigger.getBoundingClientRect();
          const p = popover.getBoundingClientRect();
          expect(t.top < p.top);
        });
    });

    it('should log an error if there is a for reference set but no popover in the DOM with this ID', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });

      cy.get('@popoverTrigger')
        .invoke('attr', 'for')
        .then(forId => {
          cy.get(`post-popover#${forId}`).should('exist');

          cy.get('@triggerButton').click();
          cy.get('@consoleError').should('not.be.called');

          // remove popover
          cy.get(`post-popover#${forId}`).invoke('remove');

          cy.get('@triggerButton').click();
          cy.get('@consoleError').should(
            'be.calledWithMatch',
            new RegExp(`No post-popover found with ID: ${forId}\\.`),
          );
        });
    });

    it('should log an error if there is no internal popover wrapped', () => {
      cy.window().then(win => {
        cy.spy(win.console, 'error').as('consoleError');
      });

      cy.get('@popoverTrigger2').find('post-popover').invoke('remove');

      cy.get('@popoverTrigger2').find('button').click();

      cy.get('@consoleError').should(
        'be.calledWithMatch',
        /No post-popover found inside the <post-popover-trigger>/,
      );
    });
    it('should Open and Close with the API', () => {
      cy.get('@content').should('not.be.visible');
      cy.get(selector).should('not.exist');
      Promise.all([cy.get('@triggerButton'), cy.get('@popover')])
        .then(
          ([$trigger, $popover]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
            $trigger.get(0),
            $popover.get(0),
          ],
        )
        .then(async ([trigger, popover]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
          await popover.show(trigger);
          cy.get('@content').should('be.visible');
          cy.get(selector).should('exist');
          await popover.hide();
          cy.get('@content').should('not.be.visible');
          cy.get(selector).should('not.exist');
          await popover.toggle(trigger);
          cy.get('@content').should('be.visible');
          cy.get(selector).should('exist');
          await popover.toggle(trigger);
          cy.get('@content').should('not.be.visible');
          cy.get(selector).should('not.exist');
        });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-popover.test.html');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load', () => {
      cy.checkA11y('post-popover');
    });
  });
});
