// 1. Component renders and exists in DOM
// 2. Component is visible (not hidden by CSS)
// 3. No errors originating from the tested component (not external sources) (Console errors
// Runtime exceptions)
// 4. Custom event bindings work correctly
// 5. Matrix test components across different framework versions (e.g., Angular 15/16/17)

describe('Popover', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('post-popover.hydrated').as('popover');
    cy.get('post-popovercontainer.hydrated').as('popovercontainer');
    cy.get('#popoverContent').as('popoverContent');
    cy.get('post-popover-trigger.hydrated[for="popover-one"]').children().first().as('trigger');
  });
});
