const BASEURL = '/iframe.html?id=snapshots--input';
const types = ['text', 'password', 'date', 'datetime-local', 'month', 'week', 'time', 'color'];

describe('Input', () => {
  describe('types', () => {
    types.forEach(type => {
      it(type, () => {
        cy.visit(`${BASEURL}${type}`);
        cy.percySnapshot(`Inputs-${type}`, { widths: [320, 1024] });
      });
    });
  });
});
