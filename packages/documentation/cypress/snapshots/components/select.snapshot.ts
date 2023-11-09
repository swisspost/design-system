const SELECTBASEURL = '/iframe.html?id=snapshots--select';
const multiple = ['default', 'multiple'];

describe('Select', () => {
  describe('multiple', () => {
    multiple.forEach(multiple => {
      it(multiple, () => {
        cy.visit(`${SELECTBASEURL}${multiple}`);
        cy.percySnapshot(`Selects-${multiple}`, { widths: [400] });
      });
    });

  });
});
