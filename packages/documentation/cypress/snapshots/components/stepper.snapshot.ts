describe('Stepper', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--stepper');
    cy.get('.stepper', { timeout: 30000 }).should('be.visible');
    cy.get(".stepper-item-completed[aria-current='step'] > .stepper-link").should($links => {
      expect($links.length).to.be.greaterThan(0);

      $links.each((_, link) => {
        expect(getComputedStyle(link, '::before').color).to.equal('rgba(0, 0, 0, 0)');
        expect(getComputedStyle(link, '::after').maskImage).not.to.equal('none');
      });
    });
    cy.percySnapshot('Steppers', { widths: [320, 1440] });
  });
});
