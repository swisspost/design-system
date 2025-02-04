describe('Align Element to Container', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--align-container');
    cy.get('.align-container-examples', { timeout: 30000 }).should('be.visible');

    // takes a screenshot for each breakpoint
    cy.percySnapshot('Align Container', { widths: [320, 720, 960, 1080, 1440] });
  });
});
