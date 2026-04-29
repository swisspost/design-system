describe('App', () => {
  it('should run', () => {
    cy.visit('/', { retryOnNetworkFailure: true });
    cy.contains('Hurray, it works!', { timeout: 20000 });
  });
});
