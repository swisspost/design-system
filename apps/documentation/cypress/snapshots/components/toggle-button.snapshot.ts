describe('Toggle Button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--toggle-button');
    cy.get('post-togglebutton[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Toggle Buttons', { widths: [320, 600, 1024] });
  });
});
