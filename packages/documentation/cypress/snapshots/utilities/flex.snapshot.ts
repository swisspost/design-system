describe('Flex', () => {
  it('flex', () => {
    cy.visit('/iframe.html?id=snapshots--flex');
    cy.get('.flex-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Flex', { widths: [320, 1440] });
  });
});
