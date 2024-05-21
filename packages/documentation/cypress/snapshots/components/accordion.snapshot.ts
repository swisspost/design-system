describe('Accordion', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--accordion');
    cy.waitForComponent('post-accordion');
    cy.percySnapshot('Accordions', { widths: [1440] });
  });
});
