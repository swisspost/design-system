describe('App', () => {
  it('should run', () => {
    cy.visit('/');
    cy.contains('Hurray, it works!');
  });
});
