describe('Input', () => {
  const inputTypes = ['text', 'password', 'date', 'datetimelocal', 'month', 'week', 'time'];

  describe('types', () => {
    inputTypes.forEach(type => {
      it(type, () => {
        cy.visit(`/iframe.html?id=snapshots--input${type}`);
        cy.waitForElement('.form-control');
        cy.percySnapshot(`Inputs (type="${type}")`, { widths: [320, 1024] });
      });
    });
  });
});
