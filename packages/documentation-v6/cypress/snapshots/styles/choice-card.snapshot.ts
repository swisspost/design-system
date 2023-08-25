describe('Choice cards', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=hidden-choice-card-snapshot-test--page');
    cy.percySnapshot('Choice card', { widths: [320, 1024] });
  });
});
