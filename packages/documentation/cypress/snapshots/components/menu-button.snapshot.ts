describe('MenuButton', () => {
    it('default', () => {
      cy.visit('/iframe.html?id=snapshots--menu-button');
      cy.get('post-menu.hydrated', { timeout: 30000 }).should('be.visible');
      cy.percySnapshot('Menu-Button', { widths: [1440] });
    });
  });
  