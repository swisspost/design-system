import {
  Build,
  Component,
  Element,
  h,
  Host,
  Prop,
  Method,
  State,
  EventEmitter,
  Event,
  Watch,
} from '@stencil/core';
import AirDatepicker, {
  AirDatepickerOptions,
  AirDatepickerViews,
  AirDatepickerViewsSingle,
} from 'air-datepicker';
import { airDatepickerLocales } from './air-locales';
import IMask, { InputMask } from 'imask';
import {
  checkEmptyOrDate,
  checkRequiredAndType,
  checkIsoDate,
  checkEmptyOrOneOf,
  LOCALES,
  LANGUAGE_CODES_RTL,
  UNICODE_BIDI,
  FALLBACK_LANGUAGE_CODE,
} from '@/utils';

const TEXT_DIRECTION_MARKERS = `${UNICODE_BIDI.ltr}${UNICODE_BIDI.rtl}${UNICODE_BIDI.pop}`;
const TEXT_DIRECTION_MARKERS_REGEX = new RegExp(`[${TEXT_DIRECTION_MARKERS}]`, 'g');
const DATE_FORMAT_RANGE_SEPARATOR = ' - ';
const DATE_FORMAT_MAP = {
  y: '3333',
  m: '11',
  d: '22',
};
const DATE_FORMAT_KEYS = Object.keys(DATE_FORMAT_MAP);
const DATE_FORMAT_SEPARATOR_REGEX = new RegExp(
  `[^${DATE_FORMAT_KEYS.join('')}${TEXT_DIRECTION_MARKERS}]`,
  'g',
);
const DATE_FORMAT_STRING_OPTIONS = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
} as Intl.DateTimeFormatOptions;

export interface AirDatepickerCustomOptions extends AirDatepickerOptions<HTMLDivElement> {
  onShow?: (isAnimationComplete: boolean) => void;
  onRenderCell?: (data: {
    date: Date;
    cellType: AirDatepickerViewsSingle;
    datepicker: AirDatepicker<HTMLDivElement>;
  }) => void;
}

@Component({
  tag: 'post-date-picker',
  styleUrl: 'post-date-picker.scss',
  shadow: true,
})
export class PostDatePicker {
  @Element() host: HTMLPostDatePickerElement;

  /**
   * The date picker's selected locale (e.g. "it" or "it-CH").
   * <br>Note: The Date Picker popup may not support the configured language and fall back to English, the right locale is important anyway to get the correct date format and text direction!
   */
  @Prop() locale?: string = this.systemLocale;
  @Watch('locale')
  validateLocale() {
    checkEmptyOrOneOf(this, 'locale', LOCALES);
  }
  @Watch('locale')
  async updateDatePickerLocale() {
    const locale = await this.airLocale();
    this.dpInstance.update({ locale } as Partial<AirDatepickerCustomOptions>);
  }

  /**
   * The date picker's selected date. If in range mode, the selected start date.
   * Must be a valid date in ISO 8601 format (YYYY-MM-DD).
   */
  @Prop({ mutable: true }) selectedStartDate?: string;
  @Watch('selectedStartDate')
  validateSelectedStartDate() {
    checkEmptyOrDate(this, 'selectedStartDate');
    checkIsoDate(this, 'selectedStartDate');
  }

  /**
   * The date picker's selected end date (for range date picker only).
   * Must be a valid date in ISO 8601 format (YYYY-MM-DD).
   */
  @Prop({ mutable: true }) selectedEndDate?: string;
  @Watch('selectedEndDate')
  validateSelectedEndDate() {
    checkEmptyOrDate(this, 'selectedEndDate');
    checkIsoDate(this, 'selectedEndDate');
  }

  /**
   * Whether the date picker expects a range selection or a single date selection.
   *
   */
  @Prop() range?: boolean = false;

  /**
   * Minimun possible date to select. Must be a valid date in ISO 8601 format (YYYY-MM-DD).
   */
  @Prop() min?: string;
  @Watch('min')
  validateMin() {
    checkEmptyOrDate(this, 'min');
    checkIsoDate(this, 'min');
  }

  /**
   * Maximum possible date to select. Must be a valid date in ISO 8601 format (YYYY-MM-DD).
   */
  @Prop() max?: string;
  @Watch('max')
  validateMax() {
    checkEmptyOrDate(this, 'max');
    checkIsoDate(this, 'max');
  }

  /**
   * Used to extend the existing on render cell to disable dates.
   */
  @Prop() renderCellCallback?: AirDatepickerCustomOptions['onRenderCell'];

  /**
   * Whether the calendar is inline in the page (not showing in a popover when input clicked).
   */
  @Prop() inline = false;
  @Watch('inline')
  validateInline() {
    if (!this.inline && !this.dpInput) {
      console.error('A non-inline date picker should contain one input');
    }
  }

  /**
   * Label for "Next month" button.
   */
  @Prop({ reflect: true }) textNextMonth!: string;
  @Watch('textNextMonth')
  validateTextNextMonth() {
    checkRequiredAndType(this, 'textNextMonth', 'string');
  }

  /**
   * Label for "Next year" button.
   */
  @Prop({ reflect: true }) textNextYear!: string;
  @Watch('textNextYear')
  validateTextNextYear() {
    checkRequiredAndType(this, 'textNextYear', 'string');
  }

  /**
   * Label for "Next decade" button.
   */
  @Prop({ reflect: true }) textNextDecade!: string;
  @Watch('textNextDecade')
  validateTextNextDecade() {
    checkRequiredAndType(this, 'textNextDecade', 'string');
  }

  /**
   * Label for "Previous month" button.
   */
  @Prop({ reflect: true }) textPreviousMonth!: string;
  @Watch('textPreviousMonth')
  validateTextPreviousMonth() {
    checkRequiredAndType(this, 'textPreviousMonth', 'string');
  }

  /**
   * Label for "Previous year" button.
   */
  @Prop({ reflect: true }) textPreviousYear!: string;
  @Watch('textPreviousYear')
  validateTextPreviousYear() {
    checkRequiredAndType(this, 'textPreviousYear', 'string');
  }

  /**
   * Label for "Previous decade" button.
   */
  @Prop({ reflect: true }) textPreviousDecade!: string;
  @Watch('textPreviousDecade')
  validateTextPreviousDecade() {
    checkRequiredAndType(this, 'textPreviousDecade', 'string');
  }

  /**
   * Label for the "Switch to year view" title button.
   */
  @Prop({ reflect: true }) textSwitchYear!: string;
  @Watch('textSwitchYear')
  validateTextSwitchYear() {
    checkRequiredAndType(this, 'textSwitchYear', 'string');
  }

  /**
   * Label for the toggle button that opens the calendar.
   * It is only needed when the calendar is connected to the input.
   */
  @Prop() textToggleCalendar?: string;
  @Watch('textToggleCalendar')
  validateTextToggleCalendar() {
    if (!this.inline) {
      checkRequiredAndType(this, 'textToggleCalendar', 'string');
    }
  }

  @State() inputDisabled = false;
  @State() today = new Date();
  @State() startDate = new Date();
  // @State() locale: string = Build.isBrowser ? document.documentElement.lang : 'en';

  /**
   * An event emitted when a date or a range of dates have been selected.
   */
  @Event() postUpdateDates: EventEmitter<string | string[]>;

  /**
   * Displays the popover calendar, focusing the first calendar item.
   */
  @Method()
  async show() {
    if (this.popoverRef) {
      await this.popoverRef.show(this.dpInput);
      this.enhanceAccessibility();
      this.host.shadowRoot.removeEventListener('keydown', this.handleTab, true); // remove before adding
      this.host.shadowRoot.addEventListener('keydown', this.handleTab, true);
    } else {
      console.error('show: popoverRef is null or undefined');
    }
  }

  /**
   * Hides the popover calendar.
   */
  @Method()
  async hide() {
    if (this.popoverRef) {
      await this.popoverRef.hide();
    } else {
      console.error('hide: popoverRef is null or undefined');
    }
  }

  private static readonly FLYOUT_OFFSET: number = 4;

  private currentViewMonth: number;
  private currentViewYear: number;
  private currentViewType: AirDatepickerViews = 'days';

  private popoverRef: HTMLPostPopovercontainerElement;
  private dpInput: HTMLInputElement;
  private dpInstance: AirDatepicker<HTMLDivElement>;
  private dpContainer: HTMLDivElement;

  private inputMask: InputMask;

  private gridObserver: MutationObserver;
  private navObserver: MutationObserver;
  private inputObserver: MutationObserver;

  /**
   * Get the system locale (e.g.`en`, etc.) from the closest parent with a `lang` attribute,
   * or fallback to a default language code if not found or in server environment.
   */
  private get systemLocale() {
    if (Build.isServer) return FALLBACK_LANGUAGE_CODE;
    return this.host.closest('[lang]')?.getAttribute('lang') ?? FALLBACK_LANGUAGE_CODE;
  }

  /**
   * Get the locale code to use for the date picker, ensuring it is valid and applying fallback if necessary.
   * @info Use `this.localeCode` or `this.languageCode`, instead of `this.locale` when you need to get the
   * locale for the date picker, to ensure you get a valid locale code with fallback applied.
   * `this.locale` can still be used when you want to get the exact value of the `locale` prop without fallback or validation.
   */
  private get localeCode() {
    const locale = this.locale || FALLBACK_LANGUAGE_CODE;
    const localeRegex = new RegExp(`^${locale}`, 'i');
    const localeIsValid = LOCALES.some(lc => localeRegex.test(lc));
    return localeIsValid ? locale : FALLBACK_LANGUAGE_CODE;
  }

  private get languageCode() {
    return this.localeCode.split('-')[0];
  }

  /**
   * Get the date format string for the current locale, by formatting a sample date and replacing the date parts
   * with format keys (y, m, d). For example, it will return "dd.mm.yyyy" for "de-CH" locale and "mm/dd/yyyy" for "en-US" locale.
   */
  get dateFormat() {
    const localeDate = new Date(Object.values(DATE_FORMAT_MAP).join('-'));
    // get the locale date format e.g. `22.11.3333` for `de-CH` or `11/22/3333` for `en-US`
    let localeDateString = localeDate.toLocaleDateString(
      this.localeCode,
      DATE_FORMAT_STRING_OPTIONS,
    );

    // replace the date parts (3333, 11, 22) with the corresponding format keys (y, m, d)
    for (const [key, value] of Object.entries(DATE_FORMAT_MAP)) {
      localeDateString = localeDateString.replace(value, key);
    }

    return localeDateString;
  }

  /**
   * Determine the text direction (ltr or rtl) based on the language code, to apply the correct styles and layout to the date picker.
   * Use `new Locale(this.localeCode).getTextInfo().direction` as soon as it becomes baseline:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo
   */
  private get textDirection() {
    return LANGUAGE_CODES_RTL.includes(this.languageCode) ? 'rtl' : 'ltr';
  }

  private get dateFormatRangeSeparator() {
    return this.textDirection === 'rtl'
      ? `${UNICODE_BIDI.rtl}${DATE_FORMAT_RANGE_SEPARATOR}${UNICODE_BIDI.pop}`
      : DATE_FORMAT_RANGE_SEPARATOR;
  }

  /**
   * Dynamically load the appropriate locale module for the date picker.
   * @returns The locale module for the Air date picker.
   */
  private async airLocale() {
    let localeName = FALLBACK_LANGUAGE_CODE;

    if (airDatepickerLocales[this.languageCode]) {
      localeName = this.languageCode;
    } else {
      console.warn(
        `Post Date Picker: Locale module "${this.localeCode}" not found! Falling back to "${FALLBACK_LANGUAGE_CODE}".`,
      );
    }

    const module = await airDatepickerLocales[localeName]?.();
    return module.default;
  }

  /**
   * Convert a date object to a localized date string and vice versa.
   * @param date A localtime date object.
   * @returns A localized date string, depending on the given `localeCode` and the given `options`.
   */
  private dateToString(date: Date) {
    return date.toLocaleDateString(this.localeCode, DATE_FORMAT_STRING_OPTIONS);
  }

  /**
   * Convert a localized date string to a date object. The date string should be in the same format as the date picker's `dateFormat`, which depends on the given `localeCode`.
   * @param str A localized date string.
   * @returns A localtime date object.
   */
  private stringToDate(str: string) {
    // WARNING: using the TEXT_DIRECTION_MARKERS_REGEX is mandatory here,
    // because `str` or `this.dateFormat` can possibly contain unicode bidi characters!
    const dateSeparator = this.dateFormat.match(DATE_FORMAT_SEPARATOR_REGEX)[0];
    const dateParts: string[] = str.replace(TEXT_DIRECTION_MARKERS_REGEX, '').split(dateSeparator);
    const formatParts: string[] = this.dateFormat
      .replace(TEXT_DIRECTION_MARKERS_REGEX, '')
      .split(dateSeparator);

    const { y, m, d } = DATE_FORMAT_KEYS.reduce(
      (parts, key) => ({
        ...parts,
        [key]: dateParts[formatParts.indexOf(key)],
      }),
      {} as Record<string, string>,
    );

    return this.isoToDate([y, m, d].join('-'));
  }

  /**
   * Convert a date object to an ISO 8601 formatted date string (YYYY-MM-DD) and vice versa.
   * @param date A localtime date object.
   * @returns An iso formatted, localtime date string.
   */
  private dateToIso(date: Date): string {
    // The swedish locale (`sv`) happens to format the date in the exact ISO format (YYYY-MM-DD),
    // so we can use it as a shortcut instead of manually constructing the string from the date parts.
    return date.toLocaleDateString('sv', DATE_FORMAT_STRING_OPTIONS);
  }

  /**
   * Convert an ISO 8601 formatted date string (YYYY-MM-DD) to a localtime date object.
   * @param iso An iso formatted, localtime date string.
   * @returns A localtime date object.
   */
  private isoToDate(iso: string): Date | null {
    return new Date(`${iso}T00:00`);
  }

  private setupInputObserver() {
    if (typeof MutationObserver === 'undefined') return;
    if (!this.dpInput) return;

    if (this.inputObserver) {
      this.inputObserver.disconnect();
    }

    this.inputObserver = new MutationObserver(() => {
      this.syncDatePickerState();
    });

    this.inputObserver.observe(this.dpInput, {
      attributes: true,
      attributeFilter: ['disabled'],
    });
  }

  /**
   * Get all the active cells of the calendar
   */
  private getCells(): HTMLElement[] {
    if (!this.dpContainer) return [];

    let selector = '';
    switch (this.currentViewType) {
      case 'days':
        selector = '.air-datepicker-cell.-day-';
        break;
      case 'months':
        selector = '.air-datepicker-cell.-month-';
        break;
      case 'years':
        selector = '.air-datepicker-cell.-year-';
        break;
    }

    return Array.from(this.dpContainer.querySelectorAll(selector));
  }

  private setActiveCell(date: Date, focusOnDate: boolean = true) {
    const cells = this.getCells();
    if (!cells.length) return;

    let target: HTMLElement | undefined;

    // If selected date is visible
    if (this.currentViewType === 'days') {
      target = cells.find(
        cell =>
          Number(cell.dataset.date) === date.getDate() &&
          Number(cell.dataset.month) === date.getMonth() &&
          Number(cell.dataset.year) === date.getFullYear(),
      );

      if (!target) {
        const firstOfMonth = new Date(this.currentViewYear, this.currentViewMonth, 1);
        target = cells.find(
          cell =>
            Number(cell.dataset.date) === 1 &&
            Number(cell.dataset.month) === firstOfMonth.getMonth() &&
            Number(cell.dataset.year) === firstOfMonth.getFullYear() &&
            !cell.classList.contains('-other-month-'),
        );
      }
    } else if (this.currentViewType === 'months') {
      target = cells.find(
        cell =>
          Number(cell.dataset.month) === date.getMonth() &&
          Number(cell.dataset.year) === date.getFullYear(),
      );

      if (!target) {
        target = cells.find(cell => !cell.classList.contains('-other-year-'));
      }
    } else {
      target = cells.find(cell => Number(cell.dataset.year) === date.getFullYear());
      if (!target) {
        target = cells.find(cell => !cell.classList.contains('-other-decade-'));
      }
    }

    // fallback
    if (!target) {
      target = cells[cells.length - 1];
    }

    // Make only the target focusable
    cells.forEach(c => (c.tabIndex = -1));
    target.tabIndex = 0;

    if (focusOnDate) {
      target.focus();
    }

    // Update start date to match the active cell
    this.startDate = new Date(
      Number(target.dataset.year),
      Number(target.dataset.month),
      Number(target.dataset.date),
    );
  }

  /**
   * Move title before the previous button in the DOM
   */
  private reorderNavigation() {
    const nav = this.dpContainer?.querySelector('.air-datepicker-nav');
    if (!nav) return;

    const prev = this.host.shadowRoot.querySelector('[data-action="prev"]');
    const title = this.host.shadowRoot.querySelector('.air-datepicker-nav--title');
    if (prev && title) {
      nav.insertBefore(title, prev);
    }
  }

  private get prevBtn() {
    return this.host.shadowRoot.querySelector<HTMLButtonElement>('[data-action="prev"] button');
  }

  private get nextBtn() {
    return this.host.shadowRoot.querySelector<HTMLButtonElement>('[data-action="next"] button');
  }

  private get titleBtn() {
    return this.host.shadowRoot.querySelector<HTMLButtonElement>(
      '.air-datepicker-nav--title button',
    );
  }

  private skipOnSelectCount = 0;
  private skipFocusOnNextRender = false;

  private handleInputBlur = () => {
    if (this.range) {
      const dates = this.inputMask.value.split(this.dateFormatRangeSeparator);
      const start = this.stringToDate(dates[0]);
      const end = this.stringToDate(dates[1]);

      const startValid = this.isValidDate(start);
      const endValid = this.isValidDate(end);

      if (startValid && endValid) {
        // Check if user entered dates in wrong order
        const reversed = start > end;
        this.skipOnSelectCount = reversed ? 0 : 2; // don't skip if reversed
        this.dpInstance.selectDate([start, end]);
        this.dpInstance.setViewDate(start);
        this.postUpdateDates.emit([this.dateToIso(start), this.dateToIso(end)]);
      } else if (startValid && !endValid) {
        this.dpInstance.clear();
        this.dpInstance.selectDate(start);
        this.dpInstance.setViewDate(start);
      } else {
        this.resetSelection();
      }
    } else {
      const date = this.stringToDate(this.inputMask.value);

      if (this.isValidDate(date)) {
        this.skipOnSelectCount = 1;
        this.dpInstance.selectDate(date);
        this.dpInstance.setViewDate(date);
        this.postUpdateDates.emit(this.dateToIso(date));
      } else {
        this.resetSelection();
      }
    }
  };

  private handlePrevNextClick = () => {
    this.skipFocusOnNextRender = true;
  };

  /**
   * Update previous and next button labels based on the current calendar view
   */
  private updateNavigationButtonLabels() {
    if (this.currentViewType === 'months') {
      this.prevBtn?.setAttribute('aria-label', this.textPreviousYear);
      this.nextBtn?.setAttribute('aria-label', this.textNextYear);
    } else if (this.currentViewType === 'years') {
      this.prevBtn?.setAttribute('aria-label', this.textPreviousDecade);
      this.nextBtn?.setAttribute('aria-label', this.textNextDecade);
    } else {
      this.prevBtn?.setAttribute('aria-label', this.textPreviousMonth);
      this.nextBtn?.setAttribute('aria-label', this.textNextMonth);
    }
  }

  /**
   * Loop through the date picker when not in inline mode
   */
  private handleTab = (e: KeyboardEvent) => {
    if (this.inline || (e.key !== 'Tab' && e.key !== 'Escape')) return;

    // Focus on the input when escaping the calendar
    if (e.key === 'Escape') {
      this.dpInput.focus();
    }

    const active = this.host.shadowRoot.activeElement as HTMLElement;

    if (active === this.titleBtn && e.shiftKey) {
      e.preventDefault();
      const activeCell = this.getCells().find(c => c.tabIndex === 0);
      if (activeCell) {
        activeCell.focus();
      }
    }

    if (active?.getAttribute('role') === 'gridcell' && !e.shiftKey) {
      e.preventDefault();

      if (this.currentViewType === 'years') {
        this.prevBtn.focus();
      } else {
        this.titleBtn.focus();
      }
    }
  };

  /**
   * Handle keyboard/arrow navigation within the grid
   */
  private handleGridKeydown = (e: KeyboardEvent) => {
    const key = e.key;
    const current = this.startDate;
    if (!current) return;

    // If user clicks ENTER or Space, trigger click on the cell
    if (key === 'Enter' || key === ' ') {
      e.preventDefault();

      const activeCell = this.getCells().find(c => c.tabIndex === 0);
      if (activeCell) {
        activeCell.click();
      }
      return;
    }

    const newDate = new Date(current);

    const move = {
      ArrowLeft: {
        days: () => newDate.setDate(current.getDate() - 1),
        months: () => newDate.setMonth(current.getMonth() - 1),
        years: () => newDate.setFullYear(current.getFullYear() - 1),
      },
      ArrowRight: {
        days: () => newDate.setDate(current.getDate() + 1),
        months: () => newDate.setMonth(current.getMonth() + 1),
        years: () => newDate.setFullYear(current.getFullYear() + 1),
      },
      // Move up on line
      ArrowUp: {
        days: () => newDate.setDate(current.getDate() - 7),
        months: () => newDate.setMonth(current.getMonth() - 4),
        years: () => newDate.setFullYear(current.getFullYear() - 4),
      },
      // Move down one line
      ArrowDown: {
        days: () => newDate.setDate(current.getDate() + 7),
        months: () => newDate.setMonth(current.getMonth() + 4),
        years: () => newDate.setFullYear(current.getFullYear() + 4),
      },
      // Go to the first element
      Home: {
        days: () => newDate.setDate(1),
        months: () => newDate.setMonth(0),
        years: () => newDate.setFullYear(current.getFullYear() - (current.getFullYear() % 10)),
      },
      // Go to the last element
      End: {
        days: () => newDate.setMonth(current.getMonth() + 1, 0),
        months: () => newDate.setMonth(11),
        years: () => newDate.setFullYear(current.getFullYear() - (current.getFullYear() % 10) + 9),
      },
      // Go to the previous month/year/decade
      PageUp: {
        days: () => newDate.setMonth(current.getMonth() - 1),
        months: () => newDate.setFullYear(current.getFullYear() - 1),
        years: () => newDate.setFullYear(current.getFullYear() - 10),
      },
      // Go to the next month/year/decade
      PageDown: {
        days: () => newDate.setMonth(current.getMonth() + 1),
        months: () => newDate.setFullYear(current.getFullYear() + 1),
        years: () => newDate.setFullYear(current.getFullYear() + 10),
      },
    };

    if (!move[key] || !move[key][this.currentViewType]) return;

    e.preventDefault();
    move[key][this.currentViewType]();

    // If month has changed, update view date
    const monthChanged =
      current.getMonth() !== newDate.getMonth() || current.getFullYear() !== newDate.getFullYear();

    if (monthChanged) {
      this.skipFocusOnNextRender = false;
      this.dpInstance.setViewDate(newDate);

      requestAnimationFrame(() => {
        this.setActiveCell(newDate, true);
      });
    } else {
      this.setActiveCell(newDate, true);
    }
  };

  private enhanceAccessibility(focusOnDate: boolean = true) {
    let body = this.dpContainer.querySelector('.air-datepicker-body--cells');

    if (this.currentViewType === 'months') {
      body = this.dpContainer.querySelector('.air-datepicker-body--cells.-months-');
    } else if (this.currentViewType === 'years') {
      body = this.dpContainer.querySelector('.air-datepicker-body--cells.-years-');
    }
    if (!body) return;

    body.setAttribute('role', 'grid');

    this.getCells().forEach(c => {
      c.setAttribute('aria-selected', c.classList.contains('-selected-') ? 'true' : 'false');
      if (c.classList.contains('-current-')) {
        c.setAttribute('aria-current', 'date');
      }
    });

    body.removeEventListener('keydown', this.handleGridKeydown);
    body.addEventListener('keydown', this.handleGridKeydown);

    this.setActiveCell(
      this.isoToDate(this.selectedStartDate) ? this.isoToDate(this.selectedStartDate) : this.today,
      focusOnDate,
    );
  }

  /**
   * Set up the masks on the inputs to reflect the date pickers
   */
  private setUpMask() {
    // WARNING: using the DATE_FORMAT_SEPARATOR_REGEX is mandatory here,
    // because `this.dateFormat` can possibly contain unicode bidi characters!
    const maskPattern = this.dateFormat.replace(DATE_FORMAT_SEPARATOR_REGEX, m => `{${m}}\``);

    const baseMaskOptions = {
      mask: Date,
      pattern: maskPattern,
      format: this.dateToString.bind(this),
      parse: this.stringToDate.bind(this),
      blocks: {
        y: {
          mask: IMask.MaskedRange,
          from: 1000,
          to: 3000,
          placeholderChar: Object.keys(DATE_FORMAT_MAP)[0],
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          placeholderChar: Object.keys(DATE_FORMAT_MAP)[1],
        },
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          placeholderChar: Object.keys(DATE_FORMAT_MAP)[2],
        },
      },
      min: this.min ? new Date(`${this.min}T00:00`) : null,
      max: this.max ? new Date(`${this.max}T00:00`) : null,
    };

    const singleMaskOptions = {
      ...baseMaskOptions,
      lazy: false,
      overwrite: true,
    };

    const rangeMaskOptions = {
      mask: `from${this.dateFormatRangeSeparator}to`,
      blocks: {
        from: { ...baseMaskOptions },
        to: { ...baseMaskOptions },
      },
      lazy: false,
      overwrite: true,
    };

    this.inputMask = IMask(this.dpInput, this.range ? rangeMaskOptions : singleMaskOptions);
  }

  private async configDatePicker() {
    const locale = await this.airLocale();

    if (!this.inline) {
      this.dpInput = this.host.querySelector('input');
      this.setUpMask();
    }

    this.dpContainer = this.host.shadowRoot.querySelector('.datepicker-container');

    if (this.dpContainer) {
      const options: AirDatepickerCustomOptions = {
        navTitles: {
          days: `<button aria-label="${this.textSwitchYear}"><strong>MMMM yyyy</strong><post-icon name="chevrondown"></post-icon></button>`,
          months: `<button aria-label="${this.textSwitchYear}"><strong>yyyy</strong><post-icon name="chevrondown"></post-icon></button>`,
        },
        prevHtml: '<button><post-icon name="chevronleft" ></post-icon></button>',
        nextHtml: '<button><post-icon name="chevronright" ></post-icon></button>',
        range: this.range,
        inline: true,
        autoClose: true,
        showOtherYears: true,
        selectOtherYears: true,
        showOtherMonths: false,
        moveToOtherMonthsOnSelect: true,
        firstDay: 1,
        startDate: this.startDate,
        minDate: this.min,
        maxDate: this.max,
        locale: locale,
        dateFormat: locale.dateFormat,
        view: 'days',
        onChangeView: view => {
          this.currentViewType = view;
          requestAnimationFrame(() => {
            this.enhanceAccessibility();
          });
        },
        onChangeViewDate: ({ month, year }) => {
          this.currentViewYear = year;
          this.currentViewMonth = month;
          this.updateNavigationButtonLabels();
        },
        onSelect: ({ date }) => {
          if (!date || (Array.isArray(date) && date.length === 0)) return;

          this.getCells().forEach(c => {
            c.setAttribute('aria-selected', c.classList.contains('-selected-') ? 'true' : 'false');
          });

          // If selected date is added dynamically after user has typed it in the input
          if (this.skipOnSelectCount > 0) {
            this.skipOnSelectCount--;
            return;
          }

          // update props
          if (Array.isArray(date) && date.length === 2) {
            this.selectedStartDate = this.dateToIso(date[0]);
            this.selectedEndDate = this.dateToIso(date[1]);
          } else if (!Array.isArray(date)) {
            this.selectedStartDate = this.dateToIso(date);
            this.selectedEndDate = undefined;
          }

          this.postUpdateDates.emit(
            Array.isArray(date) ? date.map(d => this.dateToIso(d)) : this.dateToIso(date),
          );

          // Assign value to the input, close the popover and focus on the input
          if (this.dpInput) {
            if (Array.isArray(date)) {
              const dates = date.map(d => this.dateToString(d));
              this.inputMask.value = dates.join(DATE_FORMAT_RANGE_SEPARATOR);
              this.updateInputValue();
            } else if (date) {
              // If there is a date, set it to the input. No date = same date as before
              this.inputMask.value = this.dateToString(date);
              this.updateInputValue();
            }

            // If range & only one date has been selected, user should stay in the DP
            if (this.range && Array.isArray(date) && date.length === 1) {
              return;
            }

            this.popoverRef?.hide();
          }
        },
        onShow: () => {
          this.enhanceAccessibility();
        },
        onRenderCell: data => {
          const internal = this.internalOnRenderCell(data);
          const custom = this.renderCellCallback?.(data);

          return this.mergeRenderCellResults(internal, custom);
        },
      };

      this.dpInstance = new AirDatepicker(this.dpContainer, options);
      this.reorderNavigation();

      this.prevBtn?.addEventListener('click', this.handlePrevNextClick);
      this.nextBtn?.addEventListener('click', this.handlePrevNextClick);

      this.handleSelectedDates();
    }
  }

  private updateInputValue() {
    this.inputMask.updateValue();
    // Emit the native input and change events
    this.dpInput.dispatchEvent(new InputEvent('input', { bubbles: true }));
    this.dpInput.dispatchEvent(new InputEvent('change', { bubbles: true }));
  }

  private handleSelectedDates() {
    if (this.range) {
      if (
        (this.selectedStartDate && !this.selectedEndDate) ||
        (!this.selectedStartDate && this.selectedEndDate)
      ) {
        console.error(
          'The range date picker expects either no selected dates or both of them defined.',
        );
      } else if (this.selectedStartDate && this.selectedEndDate) {
        this.dpInstance.selectDate([
          this.isoToDate(this.selectedStartDate),
          this.isoToDate(this.selectedEndDate),
        ]);
      }
    } else {
      if (this.selectedStartDate && this.isoToDate(this.selectedStartDate)) {
        this.dpInstance.selectDate(this.isoToDate(this.selectedStartDate));
      }
    }
  }

  private attachTitleBtnListener() {
    requestAnimationFrame(() => {
      if (!this.titleBtn) return;

      this.titleBtn.onclick = null; // remove inline handler AirDatepicker sets
      this.titleBtn.removeEventListener('click', this.forceTitleClickToYear);
      this.titleBtn.addEventListener('click', this.forceTitleClickToYear, { capture: true });
    });
  }

  // Skip the month view and go directly to year selection
  private forceTitleClickToYear = () => {
    if (this.dpInstance) {
      this.dpInstance.setCurrentView('years');
    }
  };

  /**
   * Add role and aria-label to each grid cell
   */
  private internalOnRenderCell({ date, cellType }) {
    if (cellType === 'day') {
      return {
        attrs: {
          'role': 'gridcell',
          'aria-label': date.toLocaleDateString(this.localeCode, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
      };
    } else if (cellType === 'month') {
      return {
        attrs: {
          'role': 'gridcell',
          'aria-label': date.toLocaleDateString(this.localeCode, {
            year: 'numeric',
            month: 'long',
          }),
        },
      };
    } else if (cellType === 'year') {
      return {
        attrs: {
          'role': 'gridcell',
          'aria-label': date.toLocaleDateString(this.localeCode, {
            year: 'numeric',
          }),
        },
      };
    }
  }

  /**
   * Merge the internal render cell (adding of role + aria-label attributes) and the user's render cell (disabling dates, etc.)
   * @param base Internal render cell
   * @param custom User render cell
   * @returns Merged render cell
   */
  private mergeRenderCellResults(base, custom) {
    if (!base) return custom;
    if (!custom) return base;

    return {
      ...base,
      ...custom,
      attrs: {
        ...(base.attrs ?? {}),
        ...(custom.attrs ?? {}),
      },
      classes: [base.classes, custom.classes].filter(Boolean).join(' '),
      disabled: base.disabled || custom.disabled,
    };
  }

  private setupNavObserver() {
    if (typeof MutationObserver === 'undefined') return;
    const nav = this.dpContainer.querySelector('.air-datepicker-nav');
    if (!nav) return;

    if (this.navObserver) {
      this.navObserver.disconnect();
    }

    this.updateNavigationButtonLabels();
    this.attachTitleBtnListener();

    this.navObserver = new MutationObserver(() => {
      this.updateNavigationButtonLabels();
      this.attachTitleBtnListener();
    });

    this.navObserver.observe(nav, {
      childList: true,
      subtree: true,
    });
  }

  private setupGridObserver() {
    if (typeof MutationObserver === 'undefined') return;

    const grid = this.dpContainer.querySelector('.air-datepicker-body--cells');
    if (!grid) return;

    if (this.gridObserver) {
      this.gridObserver.disconnect();
    }

    this.gridObserver = new MutationObserver(mutations => {
      const changed = mutations.some(m => m.type === 'childList');
      if (!changed) return;

      // Wait for AirDatepicker to finish rendering frame
      requestAnimationFrame(() => {
        this.enhanceAccessibility(!this.skipFocusOnNextRender);
        this.skipFocusOnNextRender = false;
      });
    });

    this.gridObserver.observe(grid, {
      childList: true,
      subtree: false,
    });
  }

  private addInputListener() {
    this.dpInput.addEventListener('blur', this.handleInputBlur);
  }

  private resetSelection() {
    this.skipOnSelectCount = 0;
    this.dpInstance.clear();
    this.dpInstance.setViewDate(this.today);
    this.selectedStartDate = undefined;
    this.selectedEndDate = undefined;
  }

  private isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  private syncDatePickerState() {
    this.inputDisabled = this.dpInput.disabled;
  }

  async componentDidLoad() {
    await this.configDatePicker();
    this.setupGridObserver();
    this.setupNavObserver();
    this.setupInputObserver();

    this.validateLocale();
    this.validateSelectedStartDate();
    this.validateSelectedEndDate();
    this.validateMin();
    this.validateMax();
    this.validateTextToggleCalendar();
    this.validateTextNextDecade();
    this.validateTextNextMonth();
    this.validateTextNextYear();
    this.validateTextPreviousDecade();
    this.validateTextPreviousMonth();
    this.validateTextPreviousYear();
    this.validateTextSwitchYear();
    this.validateInline();

    if (this.inline) {
      requestAnimationFrame(() => this.enhanceAccessibility(false));
    } else {
      this.addInputListener();

      requestAnimationFrame(() => {
        this.syncDatePickerState();
      });
    }
  }

  disconnectedCallback() {
    this.host.shadowRoot?.removeEventListener('keydown', this.handleTab, true);
    this.titleBtn?.removeEventListener('click', this.forceTitleClickToYear);

    const body = this.dpContainer?.querySelector('.air-datepicker-body--cells');
    body?.removeEventListener('keydown', this.handleGridKeydown);

    this.prevBtn?.removeEventListener('click', this.handlePrevNextClick);
    this.nextBtn?.removeEventListener('click', this.handlePrevNextClick);
    this.dpInput?.removeEventListener('blur', this.handleInputBlur);

    this.gridObserver?.disconnect();
    this.navObserver?.disconnect();
    this.inputObserver?.disconnect();

    if (this.dpInstance) {
      this.dpInstance.destroy();
      this.dpInstance = null;
    }
  }

  render() {
    return (
      <Host>
        {this.inline && <div class="datepicker-container"></div>}
        {!this.inline && (
          <div dir={this.textDirection}>
            <div
              class={{
                'calendar-input': !this.range,
                'calendar-input-range': this.range,
                'disabled': this.inputDisabled,
              }}
            >
              <slot></slot>
              <button
                onClick={() => this.show()}
                aria-haspopup="true"
                aria-label={this.textToggleCalendar}
                disabled={this.inputDisabled}
              >
                <post-icon name="calendar"></post-icon>
              </button>
            </div>
            <post-popovercontainer
              placement="bottom-end"
              offset={PostDatePicker.FLYOUT_OFFSET}
              ref={e => (this.popoverRef = e)}
            >
              <div class="datepicker-container"></div>
            </post-popovercontainer>
          </div>
        )}
      </Host>
    );
  }
}
