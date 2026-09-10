describe('Close button', () => {
  it('post-closebutton', () => {
    cy.visit('/iframe.html?id=snapshots--post-closebutton');
    cy.get('post-closebutton[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Close button (Web Component)', { widths: [1440] });
  });
});
