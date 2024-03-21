const BASEURL = '/iframe.html?id=snapshots--input';
const types = ['text', 'password', 'date', 'datetimelocal', 'month', 'week', 'time'];

describe('Input', () => {
  describe('Accessibility', () => {
    types.forEach(type => {
      it(`Has no detectable a11y violations on load (${type})`, () => {
        cy.visit(`${BASEURL}${type}`);
        cy.get('.form-control', { timeout: 30000 }).should('be.visible');
        cy.injectAxe();

        cy.checkA11y('#root-inner');
      });
    });
  });
});
