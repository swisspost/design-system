describe('Form grid', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--form-grid');
    cy.get('post-number-input, post-date-picker', { timeout: 30000 }).should($components => {
      expect($components.filter(':not([data-hydrated])')).to.have.length(0);
    });
    cy.percySnapshot('Form Grid', { widths: [400, 1440] });
  });
});
