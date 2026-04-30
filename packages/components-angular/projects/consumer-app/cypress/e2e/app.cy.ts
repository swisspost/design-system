describe('App', () => {
  it('should run', () => {
    cy.log('⏳ Polling for Angular dev server readiness...');

    const waitForServer = (retries = 30): Cypress.Chainable => {
      return cy
        .request({ url: '/', failOnStatusCode: false, timeout: 10000 })
        .then(res => {
          if (res.status === 200) {
            cy.log(`✅ Server ready after ${30 - retries + 1} attempt(s)`);
            return;
          }
          if (retries === 0) throw new Error('Angular dev server did not become ready in time');
          cy.log(`⚠️ Not ready yet (status ${res.status}), retrying... (${retries - 1} left)`);
          cy.wait(3000);
          return waitForServer(retries - 1);
        });
    };

    waitForServer();
    cy.visit('/');
    cy.contains('Hurray, it works!', { timeout: 30000 });
  });
});