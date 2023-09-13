describe('Choice card', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--choice-card');
    cy.percySnapshot('Choice cards', { widths: [1440] });
  });
});
