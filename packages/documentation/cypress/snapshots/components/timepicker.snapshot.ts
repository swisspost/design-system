describe('Input', () => {
  describe('types', () => {
    types.forEach(type => {
      it(type, () => {
        cy.visit('/iframe.html?id=snapshots--timepicker');
        cy.get('.form-control', { timeout: 30000 }).should('be.visible');
        cy.percySnapshot(`Timepicker`, { widths: [320, 1024] });
      });
    });
  });
});
