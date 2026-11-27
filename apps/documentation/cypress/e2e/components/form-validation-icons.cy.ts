const FORMS_VALIDATION_URL = '/iframe.html?id=d83829b2-7de2-48d2-be64-07a80c9caef3--validation';

// Every background layer needs an explicit width and height.
// A height on "auto" is rendered as a dot by iOS Safari < 18 for the validation icon svg (no intrinsic size).
const EXPLICIT_SIZE_LAYERS = /^\d[\d.]*px \d[\d.]*px(, \d[\d.]*px \d[\d.]*px)*$/;

describe('Form validation icons', () => {
  beforeEach(() => {
    cy.visit(FORMS_VALIDATION_URL);
    cy.get('.form-select', { timeout: 30000 }).should('be.visible');
  });

  describe('Select', () => {
    ['#form-select-valid', '#form-select-invalid'].forEach(selector => {
      it(`sets an explicit width and height on every background layer (${selector})`, () => {
        cy.get(selector).should($select => {
          expect(getComputedStyle($select[0]).backgroundSize).to.match(EXPLICIT_SIZE_LAYERS);
        });
      });
    });
  });

  describe('File input', () => {
    // The icon of a floating file input is drawn by the wrapper, above the (custom) "Choose File" button
    ['#form-file-valid', '#form-file-invalid'].forEach(selector => {
      it(`draws the validation icon above the "Choose File" button (${selector})`, () => {
        cy.get(selector)
          .parent('.form-floating')
          .should($floating => {
            const icon = getComputedStyle($floating[0], '::after');

            expect(icon.zIndex).to.equal('2');
            expect(icon.backgroundImage).to.contain('data:image/svg+xml');
          });
      });
    });
  });
});
