const BASEURL = '/iframe.html?id=snapshots--input';
const types = ['text', 'password', 'date', 'datetimelocal', 'month', 'week', 'time'];

describe('Input', () => {
  describe('types', () => {
    types.forEach(type => {
      it(type, () => {
        cy.visit(`${BASEURL}${type}`);
        cy.get('.form-control', { timeout: 30000 }).should('be.visible');
        cy.percySnapshot(`Inputs-${type}`, { widths: [320, 1024] });
      });
    });
  });
});
