describe('LanguageOption', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--language-option');
    cy.get('post-language-option.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('LanguageOptions', { widths: [1440] });
  });
});
