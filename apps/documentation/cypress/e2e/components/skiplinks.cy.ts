describe('Skiplinks', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=snapshots--skiplinks');
    cy.get('.skiplinks-container', { timeout: 30000 }).should('be.visible');
  });

  it('should take no space by default and be visible on focus', () => {
    cy.get('.skiplinks a[href="#navigation"]').should(el => {
      const clipValue = el.css('clip');
      const width = el.width();

      expect(clipValue).to.equal('rect(0px, 0px, 0px, 0px)');
      expect(width).to.equal(0);
    });
    cy.get('.skiplinks a[href="#navigation"]').focus();
    cy.get('.skiplinks a[href="#navigation"]').should(el => {
      const clipValue = el.css('clip');
      const width = el.width();

      expect(clipValue).to.equal('auto');
      expect(width).to.be.greaterThan(20);
    });
  });
});
