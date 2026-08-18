describe('Accordion', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--accordion');
    cy.get('post-accordion[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Accordions', { widths: [1440] });
  });
});
