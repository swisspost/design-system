describe('Slider', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--slider');
    cy.waitForElement('.form-range');
    cy.percySnapshot('Sliders', { widths: [400] });
  });
});
