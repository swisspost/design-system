describe('Containers', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--containers');
    cy.get('.container', { timeout: 30000 }).should('be.visible');

    // takes a screenshot for each breakpoint
    cy.percySnapshot('Containers', { widths: [320, 720, 960, 1080, 1440] });
  });
});
