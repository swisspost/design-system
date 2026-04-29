describe('App', () => {
  it('should run', () => {
    // The Angular dev server may still be compiling when Cypress first fires in CI.
    // Retry the visit and wait longer for the content to appear.
    cy.visit('/', { retryOnNetworkFailure: true, retryOnStatusCodeFailure: true });
    cy.contains('Hurray, it works!', { timeout: 30000 });
  });
});
