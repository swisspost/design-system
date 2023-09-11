describe('Switch', () => {
    it('default', () => {
      cy.visit('/iframe.html?id=snapshots--switch');
      cy.percySnapshot('Switches', { widths: [600] });
    });
  });