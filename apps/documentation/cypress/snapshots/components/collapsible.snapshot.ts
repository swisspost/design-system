describe('Collapsible', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--collapsible');
    cy.get('post-collapsible[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.wait(500); // Wait for collapse animation to run
    cy.percySnapshot('Collapsible');
  });
});
