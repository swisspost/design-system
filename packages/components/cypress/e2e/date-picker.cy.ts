import { isPopoverSupported } from './helper/popovercontainer';
import {
  DATE_FORMAT_RANGE_SEPARATOR,
  DATE_FORMAT_STRING_OPTIONS,
} from '../../src/components/post-date-picker/constants';
import { UNICODE_BIDI } from '../../src/utils/locales';
import { LOCALES_MAP } from './helper/date-picker';

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

describe('date-picker', { includeShadowDom: true }, () => {
  describe('default', () => {
    const selector = isPopoverSupported() ? ':popover-open' : String.raw`.\:popover-open`;
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
          .find('.air-datepicker-nav--title button')
          .should('have.attr', 'aria-label', 'Switch to year view');

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
        cy.get(selector).should('not.exist');
        cy.get('@toggle').click().wait(500);
        cy.get(selector).should('exist');
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

      it('should apply correct mask & date format based on the "locale" property', () => {
        cy.get('@date-picker').invoke('attr', 'locale', 'ar');

        cy.get('@date-picker').invoke('attr', 'locale', 'de');
        cy.get('@date-picker').shadow().find('[dir]').should('have.attr', 'dir', 'ltr');
        cy.get('@date-picker').invoke('attr', 'locale', 'ar');
        cy.get('@date-picker').shadow().find('[dir]').should('have.attr', 'dir', 'rtl');
      });

      LOCALES_MAP.forEach(i18n => {
        describe(`Locales: ${i18n.locales.join(', ')}`, () => {
          it('should apply correct mask & date format based on the "locale" property', () => {
            const expectedStartDate = s.toLocaleDateString(i18n.locale, DATE_FORMAT_STRING_OPTIONS);
            const expectedEndDate = e.toLocaleDateString(i18n.locale, DATE_FORMAT_STRING_OPTIONS);
            const separator = i18n.dir === 'rtl' ? rtlSeparator : ltrSeparator;

            cy.get('@date-picker').invoke('attr', 'locale', i18n.locale);
            cy.get('@input').should('have.value', i18n.mask);

            cy.get('@toggle').click().wait(200);
            cy.get('@container').find(`[data-date="${START_DAY}"]`).first().click();
            cy.get('@input').should('have.value', expectedStartDate);

            cy.get('@date-picker').invoke('attr', 'range', true);
            cy.get('@toggle').click().wait(200);
            cy.get('@container').find(`[data-date="${END_DAY}"]`).first().click();
            cy.get('@input').should(
              'have.value',
              `${expectedStartDate}${separator}${expectedEndDate}`,
            );
          });
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
