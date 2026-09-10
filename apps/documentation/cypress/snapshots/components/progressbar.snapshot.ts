describe('Progressbar', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--progressbar');
    cy.get('post-progressbar[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Progressbars', { widths: [1440] });
  });
});
