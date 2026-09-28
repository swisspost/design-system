import {
  DATE_FORMAT_RANGE_SEPARATOR,
  DATE_FORMAT_STRING_OPTIONS,
} from '../../src/components/post-date-picker/constants';
import { UNICODE_BIDI } from '../../src/utils/locales';
import { LOCALES_MAP } from './helper/date-picker';
import { POPOVER_OPEN_SELECTOR } from './helper/popovercontainer';

const DATEPICKER_ID = 'eb77cd02-48b2-42e1-a3e4-cd8a973d431e';

const LABEL_PROPERTIES = [
  'text-next-month',
  'text-next-year',
  'text-next-decade',
  'text-previous-month',
  'text-previous-year',
  'text-previous-decade',
  'text-switch-year',
  'text-toggle-calendar',
];

// Presses Tab (or Shift+Tab) up to maxPresses times and asserts focus eventually loops back to
// the starting element, without assuming an exact count of focusable elements up front.
function assertTabLoopsBackToStart(shiftKey: boolean, initial: HTMLElement, maxPresses = 8) {
  const attempt = (count: number) => {
    cy.focused().trigger('keydown', { key: 'Tab', shiftKey });
    cy.focused().then($el => {
      if ($el[0] === initial) return;
      if (count >= maxPresses) {
        throw new Error(`Focus did not loop back to the starting element within ${maxPresses} tab presses`);
      }
      attempt(count + 1);
    });
  };
  attempt(1);
}

describe('date-picker', { includeShadowDom: true }, () => {
  describe('default', () => {
    beforeEach(() => {
      cy.getComponent('date-picker', DATEPICKER_ID);
      cy.get('@date-picker').find('input').as('input');
      cy.get('@date-picker').shadow().find('button[aria-haspopup="true"]').as('toggle');
      cy.get('@date-picker').shadow().find('.air-datepicker-nav').as('navigation');
      cy.get('@date-picker').shadow().find('.datepicker-container').as('container');
    });

    it('should render', () => {
      cy.get('@date-picker').should('exist');
      cy.get('@input').should('exist');
    });

    describe('attributes & properties', () => {
      it('should have correct ARIA roles and labels', () => {
        cy.get('@toggle').click();

        cy.get('@container').find('[role="grid"]').should('exist');

        cy.get('@container')
          .find('.air-datepicker-nav--title button .visually-hidden')
          .should('have.text', ', Switch to year view');

        cy.get('@container')
          .find('[data-action="next"] button')
          .should('have.attr', 'aria-label', 'Next month');

        cy.get('@container')
          .find('[data-action="prev"] button')
          .should('have.attr', 'aria-label', 'Previous month');

        cy.get('@container')
          .find('.air-datepicker-cell')
          .first()
          .should('have.attr', 'role', 'gridcell');
      });

      LABEL_PROPERTIES.forEach(label => {
        it('should break if missing ' + label, () => {
          cy.window().then(win => {
            cy.spy(win.console, 'error').as('consoleError');
          });
          cy.get('@date-picker').invoke('attr', label, null);
          cy.get('@consoleError').should('be.called');
        });
      });
    });

    describe('popover behavior', () => {
      it('should open calendar popover on button click', () => {
        cy.get(POPOVER_OPEN_SELECTOR).should('not.exist');
        cy.get('@toggle').click().wait(500);
        cy.get(POPOVER_OPEN_SELECTOR).should('exist');
      });

      it('should have correct order in navigation', () => {
        cy.get('@toggle').click().wait(500);

        cy.get('@navigation')
          .find('div:first-child')
          .should('have.class', 'air-datepicker-nav--title');
        cy.get('@navigation').find('div:nth-child(2)').should('have.attr', 'data-action', 'prev');
        cy.get('@navigation').find('div:nth-child(3)').should('have.attr', 'data-action', 'next');
      });

      it('should open year view when clicking on title', () => {
        cy.get('@toggle').click().wait(500);

        cy.get('@navigation').find('.air-datepicker-nav--title button').click();

        cy.get('@date-picker')
          .find('.air-datepicker-body.-years-')
          .should('exist')
          .should('not.have.class', '-hidden-');

        cy.get('@date-picker').find('.air-datepicker-body.-days-').should('have.class', '-hidden-');
      });

      it('should return focus to the input on Escape', () => {
        cy.get('@toggle').click();

        cy.get('@container')
          .find('.air-datepicker-cell.-day-:not(.-other-month-)')
          .first()
          .focus()
          .trigger('keydown', { key: 'Escape' })
          .wait(500);

        cy.focused().should('have.prop', 'tagName', 'INPUT');
      });

      it('should close the popover on Escape', () => {
        cy.get('@toggle').click().wait(500);
        cy.get(POPOVER_OPEN_SELECTOR).should('exist');

        cy.get('@input').type('{esc}');
        cy.get(POPOVER_OPEN_SELECTOR).should('not.exist');
      });

      it('should move focus to a nav button tabbing forward from the active grid cell, and back on shift+tab', () => {
        cy.get('@toggle').click().wait(500);

        cy.focused().should('have.attr', 'role', 'gridcell');
        cy.focused().trigger('keydown', { key: 'Tab' });
        cy.focused().should('match', '[data-action] button, .air-datepicker-nav--title button');

        cy.focused().trigger('keydown', { key: 'Tab', shiftKey: true });
        cy.focused().should('have.attr', 'role', 'gridcell');
      });

      it('should trap tab focus in a loop inside the popover container', () => {
        cy.get('@toggle').click().wait(500);

        cy.focused().then($initial => {
          const initial = $initial[0];
          assertTabLoopsBackToStart(false, initial);
          assertTabLoopsBackToStart(true, initial);
        });
      });

      it('should trap tab focus in a loop in the months view', () => {
        cy.get('@toggle').click().wait(500);

        // days -> years (title always jumps to years) -> pick a year -> months
        cy.get('@navigation').find('.air-datepicker-nav--title button').click();
        cy.get('@container').find('.air-datepicker-cell.-year-:not(.-other-decade-)').first().click();
        cy.get('@date-picker')
          .find('.air-datepicker-body.-months-')
          .should('not.have.class', '-hidden-');

        cy.focused().then($initial => {
          const initial = $initial[0];
          assertTabLoopsBackToStart(false, initial);
          assertTabLoopsBackToStart(true, initial);
        });
      });

      it('should trap tab focus in a loop in the years view, which has no title button', () => {
        cy.get('@toggle').click().wait(500);

        cy.get('@navigation').find('.air-datepicker-nav--title button').click();
        cy.get('@date-picker')
          .find('.air-datepicker-body.-years-')
          .should('not.have.class', '-hidden-');
        cy.get('@container').find('.air-datepicker-nav--title button').should('not.exist');

        cy.focused().then($initial => {
          const initial = $initial[0];
          assertTabLoopsBackToStart(false, initial);
          assertTabLoopsBackToStart(true, initial);
        });
      });

      it('should keep focus trapped in the popover container after clicking a navigation button with the mouse', () => {
        cy.get('@toggle').click().wait(500);

        cy.get('@container').find('[data-action="next"] button').click();
        cy.focused().trigger('keydown', { key: 'Tab' });

        cy.focused().should($el => {
          const el = $el[0];
          const isTrapped =
            el.matches('[data-action] button, .air-datepicker-nav--title button') ||
            el.getAttribute('role') === 'gridcell';
          expect(isTrapped).to.equal(true);
        });
      });
    });
  });

  describe('i18n', () => {
    const START_DAY = 1;
    const END_DAY = 10;

    const s = new Date();
    const e = new Date();
    const ltrSeparator = DATE_FORMAT_RANGE_SEPARATOR;
    const rtlSeparator = `${UNICODE_BIDI.rtl}${DATE_FORMAT_RANGE_SEPARATOR}${UNICODE_BIDI.pop}`;

    s.setDate(START_DAY);
    e.setDate(END_DAY);

    beforeEach(() => {
      cy.visit(`/iframe.html?id=${DATEPICKER_ID}--default&args=floatingLabel:false`);
      cy.get('post-date-picker[data-hydrated]', { timeout: 30000 }).as('date-picker');
      cy.get('@date-picker').find('input').as('input');
      cy.get('@date-picker').shadow().find('button[aria-haspopup="true"]').as('toggle');
      cy.get('@date-picker').shadow().find('.datepicker-container').as('container');
    });

    it('should apply correct mask & date format based on the "locale" property', () => {
      cy.get('@date-picker').invoke('attr', 'locale', 'ar').wait(500);
      cy.get('@date-picker').invoke('attr', 'locale', 'de').wait(500);
      cy.get('@date-picker').shadow().find('[dir]').should('have.attr', 'dir', 'ltr');
      cy.get('@date-picker').invoke('attr', 'locale', 'ar').wait(500);
      cy.get('@date-picker').shadow().find('[dir]').should('have.attr', 'dir', 'rtl');
    });

    LOCALES_MAP.forEach(i18n => {
      function haveDisplayValue(expected: string) {
        return ($el: JQuery<HTMLElement>) => {
          const nativeValue = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            'value',
          )!.get!.call($el[0]);
          expect(nativeValue).to.equal(expected);
        };
      }

      describe(`Locales: ${i18n.locales.join(', ')}`, () => {
        it('should apply correct mask & date format based on the "locale" property', () => {
          const expectedStartDate = s.toLocaleDateString(i18n.locale, DATE_FORMAT_STRING_OPTIONS);
          const expectedEndDate = e.toLocaleDateString(i18n.locale, DATE_FORMAT_STRING_OPTIONS);
          const separator = i18n.dir === 'rtl' ? rtlSeparator : ltrSeparator;

          cy.get('@date-picker').invoke('attr', 'locale', i18n.locale);
          cy.get('@input').should(haveDisplayValue(i18n.mask));

          cy.get('@toggle').click().wait(200);
          cy.get('@container').find(`[data-date="${START_DAY}"]`).first().click();
          cy.get('@input').should(haveDisplayValue(expectedStartDate));

          cy.get('@date-picker').invoke('attr', 'range', true);
          cy.get('@toggle').click().wait(200);
          cy.get('@container').find(`[data-date="${END_DAY}"]`).first().click();

          cy.get('@input').should(
            haveDisplayValue(`${expectedStartDate}${separator}${expectedEndDate}`),
          );
        });
      });
    });
  });

  describe('inline', () => {
    beforeEach(() => {
      cy.getComponent('date-picker', DATEPICKER_ID, 'inline');
      cy.get('@date-picker').shadow().find('.datepicker-container').as('container');
    });

    it('should render', () => {
      cy.get('@date-picker').should('exist');
      cy.get('@container').should('exist');
    });
  });

  describe('inline range', () => {
    beforeEach(() => {
      cy.getComponent('date-picker', DATEPICKER_ID, 'inline-range');
    });

    it('should render', () => {
      cy.get('@date-picker').should('exist');
    });
  });

  describe('range', () => {
    beforeEach(() => {
      cy.getComponent('date-picker', DATEPICKER_ID, 'range');
    });

    it('should render', () => {
      cy.get('@date-picker').should('exist');
    });
  });
});
