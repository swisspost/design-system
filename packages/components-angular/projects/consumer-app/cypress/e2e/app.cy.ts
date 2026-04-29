describe('App', () => {
  it('should run', () => {
    const waitForServer = (retries = 20): Cypress.Chainable => {
      cy.log(`⏳ Waiting for Angular dev server... (${20 - retries + 1}/20)`);
      return cy
        .request({ url: '/', failOnStatusCode: false, timeout: 10000 })
        .then(res => {
          if (res.status === 200) {
            cy.log(`✅ Server ready with status ${res.status}`);
            return;
          }
          cy.log(`⚠️ Server returned ${res.status}, retrying in 3s... (${retries - 1} retries left)`);
          if (retries === 0) throw new Error('Angular dev server did not become ready in time');
          cy.wait(3000);
          return waitForServer(retries - 1);
        });
    };

    waitForServer();
    cy.log('🚀 Visiting the app...');
    cy.visit('/');
    cy.contains('Hurray, it works!', { timeout: 30000 });
    cy.log('✅ App loaded successfully');
  });
});