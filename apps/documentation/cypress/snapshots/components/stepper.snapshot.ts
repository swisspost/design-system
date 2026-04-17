describe('Stepper', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--stepper');
    cy.get('.stepper', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Steppers', { widths: [320, 1440] });
  });
});
