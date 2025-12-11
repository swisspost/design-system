
const DATEPICKER_ID = 'eb77cd02-48b2-42e1-a3e4-cd8a973d431e';

describe('datepicker', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('datepicker', DATEPICKER_ID);
      cy.get('@datepicker').find('input').as('input');
    });

    it('should render', () => {
      cy.get('@datepicker').should('exist');
      cy.get('@input').should('exist');
    });

    it('should update input value when selecting a day in the datepicker', () => {
      cy.get('@datepicker')
        .shadow()
        .find('button[aria-haspopup="true"]')
        .click()
        .wait(500);

      cy.get('@datepicker')
        .shadow()
        .find('.datepicker-container')
        .find('.air-datepicker-cell.-day-:not(.-other-month-)')
        .contains('15')
        .as('selectedCell')
        .click();

      cy.get('@selectedCell')
        .invoke('attr', 'data-iso-date')
        .then((isoDate) => {
          cy.get('@input').should('have.value', isoDate);
        });
    });

    it('should return focus to the input on Escape', () => {
      cy.get('@datepicker')
        .shadow()
        .find('button[aria-haspopup="true"]')
        .click();

      cy.get('@datepicker')
        .shadow()
        .find('.datepicker-container .air-datepicker-cell.-day-:not(.-other-month-)')
        .first()
        .focus()
        .trigger('keydown', { key: 'Escape' })
        .wait(500);

      cy.focused().should('have.prop', 'tagName', 'INPUT');
    });

    it('should have correct ARIA roles and labels', () => {
      cy.get('@datepicker')
        .shadow()
        .find('button[aria-haspopup="true"]')
        .click();

      cy.get('@datepicker')
        .shadow()
        .find('.datepicker-container [role="grid"]')
        .should('exist');

      cy.get('@datepicker')
        .shadow()
        .find('.datepicker-container .air-datepicker-nav--title button')
        .should('have.attr', 'aria-label', 'Switch to year view');

      cy.get('@datepicker')
        .shadow()
        .find('.datepicker-container [data-action="next"] button')
        .should('have.attr', 'aria-label', 'Next month');

      cy.get('@datepicker')
        .shadow()
        .find('.datepicker-container [data-action="prev"] button')
        .should('have.attr', 'aria-label', 'Previous month');

      cy.get('@datepicker')
        .shadow()
        .find('.datepicker-container .air-datepicker-cell')
        .first()
        .should('have.attr', 'role', 'gridcell');

    });
  });

  describe('inline', () => {
    beforeEach(() => {
      cy.getComponent('datepicker', DATEPICKER_ID, 'inline');
    });

    it('should render', () => {
      cy.get('@datepicker').should('exist');
      cy.get('@datepicker')
        .shadow()
        .find('.datepicker-container')
        .should('exist');
    });
  });

  describe('inline range', () => {
    beforeEach(() => {
      cy.getComponent('datepicker', DATEPICKER_ID, 'inline-range');
    });

    it('should render', () => {
      cy.get('@datepicker').should('exist');
    });
  });

  describe('range', () => {
    beforeEach(() => {
      cy.getComponent('datepicker', DATEPICKER_ID, 'range');
    });

    it('should render', () => {
      cy.get('@datepicker').should('exist');
    });
  });
});
