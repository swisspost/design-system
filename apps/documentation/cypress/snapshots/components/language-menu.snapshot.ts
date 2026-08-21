describe('LanguageMenu', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--language-menu');
    cy.get('post-language-menu.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('LanguageMenu', { widths: [1440] });
  });
});
