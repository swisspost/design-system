describe('Sections', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--sections');
    cy.get('.section', { timeout: 30000 }).should('be.visible');

    // takes a screenshot for each breakpoint
    cy.percySnapshot('section', { widths: [320, 1440, 1920, 2000] });
  });
});
