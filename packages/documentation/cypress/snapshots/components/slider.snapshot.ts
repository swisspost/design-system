describe('Slider', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--slider');
    cy.get('.form-range', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Sliders', { widths: [400] });
  });
});
