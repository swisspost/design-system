describe('Popover', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('post-popover.hydrated').as('popover');
    cy.get('post-popovercontainer.hydrated').as('popovercontainer');
    cy.get('#popoverContent').as('popoverContent');
    cy.get('post-popover-trigger.hydrated[for="popover-one"]').children().first().as('trigger');
  });

  it('should contain an HTML element inside the trigger, not just plain text', () => {
    cy.get('post-popover-trigger.hydrated[for="popover-one"]')
      .children()
      .should('have.length.at.least', 1);
  });
  it('should show up on click', () => {
    cy.get('@popoverContent').should('not.be.visible');
    cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
    cy.get('@trigger').click();
    cy.get('@popover').should('be.visible');
    cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
    // Void click light dismiss does not work in cypress for closing
  });

  // it('should show up when clicking on a nested element inside the trigger', () => {
  //   // Modify trigger by adding a nested span
  //   cy.get('@trigger').then($trigger => {
  //     const originalText = $trigger.text();
  //     $trigger.html(`<span class="nested-element">${originalText}</span>`);
  //   });

  //   cy.get('@popoverContent').should('not.be.visible');
  //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
  //   cy.get('.nested-element').click();
  //   cy.get('@popoverContent').should('be.visible');
  //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
  //   cy.get('.btn-close').click();
  //   cy.get('@popoverContent').should('not.be.visible');
  //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'false');
  // });

  // it('should show up when clicking on a deeply nested element inside the trigger', () => {
  //   // Set up a trigger with a deeply nested structure
  //   cy.get('@trigger').then($trigger => {
  //     const originalText = $trigger.text();
  //     $trigger.html(`
  //         <div class="level-1">
  //           <div class="level-2">
  //             <span class="level-3">${originalText}</span>
  //           </div>
  //         </div>
  //       `);
  //   });

  //   cy.get('@popoverContent').should('not.be.visible');
  //   cy.get('.level-3').click();
  //   cy.get('@popoverContent').should('be.visible');
  //   cy.get('@trigger').should('have.attr', 'aria-expanded', 'true');
  // });

  // it('should close on X click', () => {
  //   cy.get('@trigger').click();
  //   cy.get('@popoverContent').should('be.visible');
  //   cy.get('.btn-close').click();
  //   cy.get('@popoverContent').should('not.be.visible');
  // });

  // it('should open on enter and close on escape', () => {
  //   cy.get('@popoverContent').should('not.be.visible');
  //   cy.get('@trigger').focus().type('{enter}');
  //   cy.get('@popoverContent').should('be.visible');
  // });

  // it('should open and close with the API', () => {
  //   Promise.all([cy.get('@trigger'), cy.get('@popoverContent')])
  //     .then(([$trigger, $popover]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
  //       $trigger.get(0),
  //       $popover.get(0),
  //     ])
  //     .then(([trigger, popover]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
  //       cy.get('@popoverContent').should('not.be.visible');
  //       popover.show(trigger);
  //       cy.get('@popoverContent').should('be.visible');
  //       popover.hide();
  //       cy.get('@popoverContent').should('not.be.visible');
  //       popover.toggle(trigger);
  //       cy.get('@popoverContent').should('be.visible');
  //       popover.toggle(trigger);
  //       cy.get('@popoverContent').should('not.be.visible');
  //     });

  //   it('should switch position', () => {
  //     cy.get('post-popover').invoke('attr', 'placement', 'top');
  //     cy.get('@popoverContent').should('not.be.visible');

  //     Promise.all([cy.get('@trigger'), cy.get('@popover')])
  //       .then(
  //         ([$trigger, $popover]: [JQuery<HTMLButtonElement>, JQuery<HTMLPostPopoverElement>]) => [
  //           $trigger.get(0),
  //           $popover.get(0),
  //         ],
  //       )
  //       .then(([trigger, popover]: [HTMLButtonElement, HTMLPostPopoverElement]) => {
  //         const t = trigger.getBoundingClientRect();
  //         const p = popover.getBoundingClientRect();
  //         expect(t.top < p.top);
  //       });
  //   });
  // });
});
