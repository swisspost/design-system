describe('LanguageOptionSwitch', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--language-option-switch');
    cy.get('post-language-option-switch.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('LanguageOptionSwitch', { widths: [1440] });
  });
});
