
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

    it('should open calendar popover on button click', () => {
      cy.get('@datepicker')
        .shadow()
        .find('button[aria-haspopup="true"]')
        .click()
        .wait(500);
      cy.get('.popover-content').should('be.visible');
    });

    it('should have correct order in navigation', () => {
      cy.get('@datepicker')
        .shadow()
        .find('button[aria-haspopup="true"]')
        .click()
        .wait(500);

      cy.get('@datepicker').find('.air-datepicker-nav > div:first-child').should('have.class', 'air-datepicker-nav--title');
      cy.get('@datepicker').find('.air-datepicker-nav > div:nth-child(2)').should('have.attr', 'data-action', 'prev');
      cy.get('@datepicker').find('.air-datepicker-nav > div:nth-child(3)').should('have.attr', 'data-action', 'next');
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

    it('should open year view when clicking on title', () => {
      cy.get('@datepicker')
        .shadow()
        .find('button[aria-haspopup="true"]')
        .click()
        .wait(500);

      cy.get('@datepicker')
        .shadow()
        .find('.datepicker-container')
        .find('.air-datepicker-nav--title button')
        .click();

      cy.get('@datepicker')
        .find('.air-datepicker-body.-years-')
        .should('exist').should('not.have.class', '-hidden-');

      cy.get('@datepicker')
        .find('.air-datepicker-body.-days-')
        .should('have.class', '-hidden-');
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

    ['text-next-month', 'text-next-year', 'text-next-decade', 'text-previous-month', 'text-previous-year', 'text-previous-decade', 'text-switch-year', 'text-toggle-calendar'].forEach((label) => {
      it('should break if missing ' + label, () => {
        cy.window().then(win => {
          cy.spy(win.console, 'error').as('consoleError');
        });
        cy.get('@datepicker').invoke('attr', label, null);
        cy.get('@consoleError').should('be.called');
      });
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
