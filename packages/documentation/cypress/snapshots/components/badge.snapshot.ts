describe('Badge', () => {
    it('default', () => {
      cy.visit('/iframe.html?id=snapshots--badge');
      cy.percySnapshot('Badges', { widths: [400] });
    });
  });
