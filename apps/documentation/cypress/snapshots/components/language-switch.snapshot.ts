describe('LanguageSwitch', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--language-switch');
    cy.get('post-language-menu.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('LanguageSwitch', { widths: [1440] });
  });
});
