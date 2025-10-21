describe('Popover', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('post-popover.hydrated').as('popover');
    cy.get('post-popovercontainer.hydrated').as('popovercontainer');
    cy.get('#popoverContent').as('popoverContent');
    cy.get('post-popover-trigger.hydrated[for="popover-one"]').children().first().as('trigger');
  });

  // Existence
  it('should render in the DOM', () => {
    cy.get('@popover').should('exist');
    cy.get('@popovercontainer').should('exist');
    cy.get('@trigger').should('exist');
  });

  // Visibility
  it('should be visible, except popovercontainer', () => {
    cy.get('@popover').should('be.visible');
    cy.get('@popovercontainer').should('not.be.visible');
    cy.get('@trigger').should('be.visible');
  });

  // Custom Events
  it('should emit postToggle event when popovercontainer opens and closes', () => {
    cy.get('@popovercontainer')
      .should('exist')
      .then($popovercontainer => {
        const popoverEl = $popovercontainer[0] as HTMLElement & {
          toggle: (target: HTMLElement, force?: boolean) => Promise<boolean>;
        };

        const toggleSpy = cy.spy().as('toggleSpy');
        popoverEl.addEventListener('postToggle', toggleSpy);

        cy.get('@trigger').then(async $trigger => {
          const triggerEl = $trigger[0];

          const popovercontainerEl = $popovercontainer[0] as HTMLElement & {
            toggle: (target: HTMLElement, force?: boolean) => Promise<boolean>;
          };

          await popovercontainerEl.toggle(triggerEl);
          cy.get('@toggleSpy').should('have.been.calledWithMatch', {
            detail: Cypress.sinon.match({ isOpen: true }),
          });

          await popovercontainerEl.toggle(triggerEl);
          cy.get('@toggleSpy').should('have.been.calledWithMatch', {
            detail: Cypress.sinon.match({ isOpen: false }),
          });
        });
      });

    // To be added: errors checking after errorfilter PR merge (#6471)
  });
});
