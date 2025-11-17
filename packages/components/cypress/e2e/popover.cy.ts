describe('popover', { baseUrl: null, includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit('./cypress/fixtures/post-popover.test.html');

      // For/id relationship case
      cy.get('post-popover[data-hydrated][id="popover-one"]').as('post-popover');

      cy.get('post-popover-trigger[data-hydrated][for="popover-one"]').as('post-popover-trigger');

      cy.get('post-popover-trigger[data-hydrated][for="popover-one"]').find('button').as('trigger');

      cy.get('#testtext').as('popover-content');

      // Wrapped popover case
      cy.get('post-popover-trigger[data-hydrated][id="popover-two"]').as(
        'post-popover-trigger-wrapped',
      );
    });

    it('should open and close with the API', () => {
      cy.get('@popover-content').should('not.be.visible');

      Promise.all([cy.get('@trigger'), cy.get('@popover-content')])
        .then(
          ([$trigger, $popover]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
            $trigger.get(0),
            $popover.get(0),
          ],
        )
        .then(([trigger, popover]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
          popover.show(trigger);
          cy.get('@popover-content').should('be.visible');
          popover.toggle(trigger);
          cy.get('@popover-content').should('not.be.visible');
          // popover.toggle(trigger);
          // cy.get('@popover-content').should('be.visible');
          // popover.toggle(trigger);
          // cy.get('@popover-content').should('not.be.visible');
        });
    });

    // it('if the element inside the trigger is not interactive, it should at least have a set tabindex="0" and role="button"', () => {
    //   cy.window().then(win => {
    //     cy.stub(win.console, 'warn').as('consoleWarn');
    //   });

    //   cy.get('@post-popover-trigger')
    //     .find('button')
    //     .invoke('replaceWith', '<div id="not-interactive">No interactive content.</div>')
    //     .then(() => {
    //       cy.get('@post-popover-trigger').children().first().should('have.attr', 'tabindex', '0');
    //       cy.get('@post-popover-trigger').children().first().should('have.attr', 'role', 'button');
    //     });
    // });

    // it('if the trigger is empty', () => {
    //   cy.window().then(win => {
    //     cy.spy(win.console, 'error').as('consoleError');
    //   });

    //   cy.get('@post-popover-trigger')
    //     .find('button')
    //     .invoke('replaceWith', '')
    //     .then($children => {
    //       if ($children.length == 0) {
    //         cy.get('@consoleError').should(
    //           'be.calledWith',
    //           'No content found in the post-popover-trigger slot. Please insert a focusable element or content that can receive focus.',
    //         );
    //       }
    //     });
    // });

    // it('should show up on click', () => {
    //   cy.get('@popover-content').should('not.be.visible');
    //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    //   cy.get('@trigger').click();
    //   cy.get('@popover-content').should('be.visible');
    //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');

    //   // Void click light dismiss does not work in cypress for closing
    // });

    // it('should show up when clicking on a nested element inside the trigger', () => {
    //   // Modify trigger by adding a nested span
    //   cy.get('@trigger').then($trigger => {
    //     const originalText = $trigger.text();
    //     $trigger.html(`<span class="nested-element">${originalText}</span>`);
    //   });

    //   cy.get('@popover-content').should('not.be.visible');
    //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    //   cy.get('.nested-element').click();
    //   cy.get('@popover-content').should('be.visible');
    //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    //   cy.get('@post-popover').find('post-closebutton').click();
    //   cy.get('@popover-content').should('not.be.visible');
    //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    // });

    // it('should show up when clicking on a deeply nested element inside the trigger', () => {
    //   // Set up a trigger with a deeply nested structure
    //   cy.get('@trigger').then($trigger => {
    //     const originalText = $trigger.text();
    //     $trigger.html(`
    //             <div class="level-1">
    //               <div class="level-2">
    //                 <span class="level-3">${originalText}</span>
    //               </div>
    //             </div>
    //           `);
    //   });

    //   cy.get('@popover-content').should('not.be.visible');
    //   cy.get('.level-3').click();
    //   cy.get('@popover-content').should('be.visible');
    //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    // });

    // it('should close on X click', () => {
    //   cy.get('@trigger').click();
    //   cy.get('@popover-content').should('be.visible');
    //   cy.get('@post-popover').find('post-closebutton').click();
    //   cy.get('@popover-content').should('not.be.visible');
    // });

    // it('should open on enter and first focusable element should be focused', () => {
    //   cy.get('@popover-content').should('not.be.visible');
    //   cy.get('@trigger').focus().type('{enter}');
    //   cy.get('@popover-content').should('be.visible');

    //   // find the first focusable element (e.g., button, input, link, etc.)
    //   cy.get('@popover-content')
    //     .find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    //     .first()
    //     .should('have.focus');
    // });

    // it('should switch position', () => {
    //   cy.get('@post-popover').invoke('attr', 'placement', 'top');
    //   cy.get('@popover-content').should('not.be.visible');

    //   Promise.all([cy.get('@trigger'), cy.get('@popover-content')])
    //     .then(
    //       ([$trigger, $popover]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
    //         $trigger.get(0),
    //         $popover.get(0),
    //       ],
    //     )
    //     .then(([trigger, popover]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
    //       const t = trigger.getBoundingClientRect();
    //       const p = popover.getBoundingClientRect();
    //       expect(t.top < p.top);
    //     });
    // });

    // it('should warn only if there is a for reference set but no popover in the DOM with this ID', () => {
    //   cy.window().then(win => {
    //     cy.stub(win.console, 'warn').as('consoleWarn');
    //   });

    //   cy.get('@post-popover-trigger')
    //     .invoke('attr', 'for')
    //     .then(forId => {
    //       cy.get(`post-popover#${forId}`).should('exist');

    //       cy.get('@trigger').click();
    //       cy.get('@consoleWarn').should('not.be.called');

    //       cy.get('@trigger').click();
    //       cy.get('@consoleWarn').should('not.be.called');

    //       // remove popover
    //       cy.get(`post-popover#${forId}`).invoke('remove');

    //       cy.get('@trigger').click();
    //       cy.get('@consoleWarn').should(
    //         'be.calledWithMatch',
    //         new RegExp(`No post-popover found with ID: ${forId}\\.`),
    //       );
    //     });
    // });

    // it('should warn if there is no internal popover wrapped', () => {
    //   cy.window().then(win => {
    //     cy.spy(win.console, 'warn').as('consoleWarning');
    //   });

    //   cy.get('@post-popover-trigger-wrapped').find('post-popover').invoke('remove');

    //   cy.get('post-popover-trigger[id="popover-two"][data-hydrated]').find('button').click();

    //   cy.get('@consoleWarning').should(
    //     'be.calledWithMatch',
    //     /No post-popover found inside the <post-popover-trigger>/,
    //   );
    // });
  });

  // describe('Accessibility', () => {
  //   beforeEach(() => {
  //     cy.visit('./cypress/fixtures/post-popover.test.html');
  //     cy.injectAxe();
  //   });

  //   it('Has no detectable a11y violations on load', () => {
  //     cy.checkA11y('post-popover');
  //   });
  // });
});
