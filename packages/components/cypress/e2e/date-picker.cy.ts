import { isPopoverSupported } from './popovercontainer.cy';
import {
  DATE_FORMAT_RANGE_SEPARATOR,
  DATE_FORMAT_MAP,
  DATE_FORMAT_STRING_OPTIONS,
} from '../../src/components/post-date-picker/constants';
import { UNICODE_BIDI } from '../../src/utils/locales';

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

const LOCALES_MAP = [
  // Most common for Swiss Post projects
  { name: 'English (US)', locale: 'en', dir: 'ltr' },
  { name: 'German (CH)', locale: 'de-CH', dir: 'ltr' },
  { name: 'French (CH)', locale: 'fr-CH', dir: 'ltr' },
  { name: 'Italian (CH)', locale: 'it-CH', dir: 'ltr' },
  // Most common European localeCodes
  { name: 'Dutch (BE)', locale: 'nl-BE', dir: 'ltr' },
  { name: 'Bulgarian', locale: 'bg-BG', dir: 'ltr' },
  { name: 'Czech', locale: 'cs-CZ', dir: 'ltr' },
  { name: 'Croatian', locale: 'hr-HR', dir: 'ltr' },
  { name: 'Danish', locale: 'da-DK', dir: 'ltr' },
  { name: 'Dutch (NL)', locale: 'nl-NL', dir: 'ltr' },
  { name: 'English (GB)', locale: 'en-GB', dir: 'ltr' },
  { name: 'Finnish', locale: 'fi-FI', dir: 'ltr' },
  { name: 'French (FR)', locale: 'fr-FR', dir: 'ltr' },
  { name: 'German (AT)', locale: 'de-AT', dir: 'ltr' },
  { name: 'German (DE)', locale: 'de-DE', dir: 'ltr' },
  { name: 'Greek', locale: 'el-GR', dir: 'ltr' },
  { name: 'Hungarian', locale: 'hu-HU', dir: 'ltr' },
  { name: 'Italian (IT)', locale: 'it-IT', dir: 'ltr' },
  { name: 'Norwegian', locale: 'nb-NO', dir: 'ltr' },
  { name: 'Polish', locale: 'pl-PL', dir: 'ltr' },
  { name: 'Portuguese', locale: 'pt-PT', dir: 'ltr' },
  { name: 'Romanian', locale: 'ro-RO', dir: 'ltr' },
  { name: 'Slovak', locale: 'sk-SK', dir: 'ltr' },
  { name: 'Slovenian', locale: 'sl-SI', dir: 'ltr' },
  { name: 'Spanish (ES)', locale: 'es-ES', dir: 'ltr' },
  { name: 'Swedish', locale: 'sv-SE', dir: 'ltr' },
  { name: 'Turkish', locale: 'tr-TR', dir: 'ltr' },
  // Others
  { name: 'Arabic', locale: 'ar', dir: 'rtl' },
];

describe('date-picker', { includeShadowDom: true }, () => {
  describe('default', () => {
    const selector = isPopoverSupported() ? ':popover-open' : '.\\:popover-open';

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

    describe.only('l11n', () => {
      const START_DAY = 1;
      const END_DAY = 10;

      const s = new Date();
      const e = new Date();
      const ltrSeparator = DATE_FORMAT_RANGE_SEPARATOR;
      const rtlSeparator = `${UNICODE_BIDI.rtl}${DATE_FORMAT_RANGE_SEPARATOR}${UNICODE_BIDI.pop}`;

      s.setDate(START_DAY);
      e.setDate(END_DAY);

      function dateFormat(locale: string) {
        const localeDate = new Date(Object.values(DATE_FORMAT_MAP).join('-'));
        let localeDateString = localeDate.toLocaleDateString(locale, DATE_FORMAT_STRING_OPTIONS);

        for (const [key, value] of Object.entries(DATE_FORMAT_MAP)) {
          localeDateString = localeDateString.replace(value, key);
        }

        return localeDateString.replace('d', 'dd').replace('m', 'mm').replace('y', 'yyyy');
      }

      LOCALES_MAP.forEach(l11n => {
        describe(`Locale: ${l11n.locale} (${l11n.name})`, () => {
          it('should apply correct mask based on the "locale" property', () => {
            const expectedMask = dateFormat(l11n.locale);
            cy.get('@date-picker').invoke('attr', 'locale', l11n.locale);
            cy.get('@input').should('have.value', expectedMask);
          });

          it('should apply correct date format based on the "locale" property', () => {
            const expectedStartDate = s.toLocaleDateString(l11n.locale, DATE_FORMAT_STRING_OPTIONS);
            const expectedEndDate = e.toLocaleDateString(l11n.locale, DATE_FORMAT_STRING_OPTIONS);
            const separator = l11n.dir === 'rtl' ? rtlSeparator : ltrSeparator;

            cy.get('@date-picker').invoke('attr', 'locale', l11n.locale);
            cy.get('@date-picker').shadow().find('[dir]').should('have.attr', 'dir', l11n.dir);

            cy.get('@toggle').click().wait(200);
            cy.get('@container').find(`[data-date="${START_DAY}"]`).first().click().wait(200);
            cy.get('@input').should('have.value', expectedStartDate);

            cy.get('@date-picker').invoke('attr', 'range', true);
            cy.get('@toggle').click().wait(200);
            cy.get('@container').find(`[data-date="${END_DAY}"]`).first().click().wait(200);
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
