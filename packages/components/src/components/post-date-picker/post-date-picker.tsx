import {
  getNativeValue,
  NativeInputMaskElement,
} from '@/components/post-date-picker/native-mask-element';
import {
  BUDDHIST_CALENDAR_LOCALES,
  DateValue,
  FALLBACK_LANGUAGE_CODE,
  getLocaleTextDirection,
  IsoDate,
  isValidLocale,
  Required,
  Type,
  UNICODE_BIDI,
} from '@/utils';
import { version } from '@root/package.json';
import { Build, Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import AirDatepicker, { AirDatepickerOptions, AirDatepickerViews } from 'air-datepicker';
import type { InputMask } from 'imask';
import IMask from 'imask';
import { mergeRenderCellResults, renderCellAccessibility } from './accessibility-utils';
import { airDatepickerLocales } from './air-locales';
import {
  DATE_FORMAT_MAP,
  DATE_FORMAT_RANGE_SEPARATOR,
  DATE_FORMAT_SEPARATOR_REGEX,
} from './constants';
import {
  dateToIso,
  dateToString,
  getDateFormat,
  isoToDate,
  isValidDate,
  padIsoDate,
  stringToDate,
} from './date-utils';

@Component({
  tag: 'post-date-picker',
  styleUrl: 'post-date-picker.scss',
  shadow: true,
})
export class PostDatePicker {
  @Element() host: HTMLPostDatePickerElement;

  /**
   * The date pickers locale (e.g. "it", "it-CH", etc.), which specifies the date format and language.
   * <post-banner type="info" data-size="sm"><span>If not set, it defaults to either the closest ancestor with a `lang` attribute (e.g. \<html lang="de"\>), or falls back to English.</span></post-banner>
   */
  @Prop() locale?: string = this.systemLocale;
  @Watch('locale')
  validateLocale() {
    if (!isValidLocale(this.locale)) {
      console.error(
        'The prop `locale` of the `post-date-picker` component must be a valid localeCode (e.g. `en`, `en-GB`, etc.), based on <a href="https://www.rfc-editor.org/info/bcp47">BCP 47 (RFC 5646)</a> standard.',
      );
    }
  }
  @Watch('locale')
  async updateLocale() {
    const locale = await this.airLocale();
    this.dpInstance?.update({
      locale: locale,
      dateFormat: locale.dateFormat,
      firstDay: locale.firstDay,
    });

    this.updateMask();
  }

  /**
   * Whether the date picker expects a range selection or a single date selection.
   *
   */
  @Prop() range?: boolean = false;
  @Watch('range')
  updateRange() {
    this.dpInstance?.update({ range: this.range });
    this.updateMask();

    if (this.range && this.dpInstance?.selectedDates.length > 0) {
      const startDate = this.dpInstance.selectedDates[0];
      this.dpInstance.clear();
      this.dpInstance.selectDate(startDate);
    } else {
      this.syncInputToDp();
    }
  }

  /**
   * Minimum possible date to select. Must be a valid date in ISO 8601 format (YYYY-MM-DD).
   */
  @Prop()
  @DateValue()
  @IsoDate()
  min?: string;
  @Watch('min')
  updateMin() {
    this.dpInstance?.update({ minDate: this.min ? isoToDate(this.min)! : false });
  }

  /**
   * Maximum possible date to select. Must be a valid date in ISO 8601 format (YYYY-MM-DD).
   */
  @Prop()
  @DateValue()
  @IsoDate()
  max?: string;
  @Watch('max')
  updateMax() {
    this.dpInstance?.update({ maxDate: this.max ? isoToDate(this.max)! : false });
  }

  /**
   * A callback to customize individual calendar cells, e.g. to disable specific dates or add CSS classes.
   */
  @Prop() cellConfig?: (
    date: Date,
    cellType: 'day' | 'month' | 'year',
  ) => { disabled?: boolean; classes?: string } | void;

  /**
   * Whether the calendar is inline in the page (not showing in a popover when input clicked).
   */
  @Prop() inline = false;
  @Watch('inline')
  validateInline() {
    if (!this.dpInput) {
      console.error('The date picker must contain one input element');
    }
  }

  /**
   * Label for "Next month" button.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textNextMonth!: string;

  /**
   * Label for "Next year" button.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textNextYear!: string;

  /**
   * Label for "Next decade" button.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textNextDecade!: string;

  /**
   * Label for "Previous month" button.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textPreviousMonth!: string;

  /**
   * Label for "Previous year" button.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textPreviousYear!: string;

  /**
   * Label for "Previous decade" button.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textPreviousDecade!: string;

  /**
   * Label for the "Switch to year view" title button.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textSwitchYear!: string;

  /**
   * Label for the toggle button that opens the calendar.
   * It is only needed when the calendar is not inline.
   */
  @Prop()
  @Required({ when: 'inline', truthy: false })
  @Type('string')
  textToggleCalendar?: string;

  @State() inputDisabled = false;
  @State() today = new Date();
  @State() startDate = new Date();

  /**
   * Displays the popover calendar, focusing the first calendar item.
   */
  @Method()
  async show() {
    if (this.popoverRef) {
      this.dpInstance?.setCurrentView('days');
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

  // Cells per row for each view
  private static readonly COLUMNS_BY_VIEW: Record<AirDatepickerViews, number> = {
    days: 7,
    months: 4,
    years: 4,
  };

  private currentViewMonth: number;
  private currentViewYear: number;
  private currentViewType: AirDatepickerViews = 'days';

  private popoverRef: HTMLPostPopovercontainerElement;
  private dpInput: HTMLInputElement;
  private dpTrigger: HTMLButtonElement;
  private dpInstance: AirDatepicker<HTMLDivElement>;
  private dpContainer: HTMLDivElement;

  private inputMask: InputMask;
  private maskElement: NativeInputMaskElement;
  private _isInternalUpdate = false;
  private _lastInputValue: string | null = null;

  private gridObserver: MutationObserver;
  private navObserver: MutationObserver;
  private inputObserver: MutationObserver;

  /**
   * Get the system locale (e.g.`en`, etc.) from the closest parent with a `lang` attribute,
   * or fallback to a default language code if not found or in server environment.
   */
  private get systemLocale() {
    if (Build.isServer) return FALLBACK_LANGUAGE_CODE;
    const closestLang = this.host.closest('[lang]')?.getAttribute('lang');
    return closestLang ?? navigator.language ?? FALLBACK_LANGUAGE_CODE;
  }

  /**
   * Get the locale code to use for the date picker, ensuring it is valid and applying fallback if necessary.
   * @info Use `this.localeCode` or `this.languageCode`, instead of `this.locale` when you need to get the
   * locale for the date picker, to ensure you get a valid locale code with fallback applied.
   * `this.locale` can still be used when you want to get the exact value of the `locale` prop without fallback or validation.
   */
  private get localeCode() {
    const locale = this.locale ?? FALLBACK_LANGUAGE_CODE;
    return isValidLocale(locale) ? locale : FALLBACK_LANGUAGE_CODE;
  }

  private get languageCode() {
    return this.localeCode.split('-')[0];
  }

  /**
   * Get the date format string for the current locale, by formatting a sample date and replacing the date parts
   * with format keys (y, m, d). For example, it will return "dd.mm.yyyy" for "de-CH" locale and "mm/dd/yyyy" for "en-US" locale.
   */
  get dateFormat() {
    return getDateFormat(this.localeCode, this.isBuddhistCalendar);
  }

  /**
   * Determine the text direction (ltr or rtl) based on the language code, to apply the correct styles and layout to the date picker.
   * Use `new Locale(this.localeCode).getTextInfo().direction` as soon as it becomes baseline:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTextInfo
   */
  private get textDirection() {
    return getLocaleTextDirection(this.localeCode);
  }

  private get dateFormatRangeSeparator() {
    return this.textDirection === 'rtl'
      ? `${UNICODE_BIDI.rtl}${DATE_FORMAT_RANGE_SEPARATOR}${UNICODE_BIDI.pop}`
      : DATE_FORMAT_RANGE_SEPARATOR;
  }

  private get isBuddhistCalendar() {
    return BUDDHIST_CALENDAR_LOCALES.includes(this.localeCode);
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
   * Convert a date object to a localized date string, bound to the current locale.
   */
  private dateToString(date: Date) {
    return dateToString(date, this.localeCode);
  }

  /**
   * Convert a localized date string to a date object, bound to the current locale and format.
   */
  private stringToDate(localeDateString: string) {
    return stringToDate(localeDateString, this.dateFormat, this.isBuddhistCalendar);
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

    return Array.from(this.dpContainer.querySelectorAll<HTMLElement>(selector));
  }

  private setActiveCell(date: Date, focusOnDate: boolean = true) {
    const cells = this.getCells();
    if (cells.length === 0) return;

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
      target = cells.at(-1);
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
      const parts = this.inputMask.value.split(this.dateFormatRangeSeparator);
      const start = this.stringToDate(parts[0]);
      const end = this.stringToDate(parts[1]);

      const startValid = isValidDate(start);
      const endValid = isValidDate(end);

      if (startValid && endValid) {
        // Check if user entered dates in wrong order
        const reversed = start > end;
        this.skipOnSelectCount = reversed ? 0 : 2; // don't skip if reversed
        this.dpInstance.selectDate([start, end]);
        this.dpInstance.setViewDate(start);
      } else if (startValid && !endValid) {
        this.dpInstance.clear();
        this.dpInstance.selectDate(start);
        this.dpInstance.setViewDate(start);
      } else {
        this.resetSelection();
      }
    } else {
      const date = this.stringToDate(this.inputMask.value);

      if (isValidDate(date)) {
        this.skipOnSelectCount = 1;
        this.dpInstance.selectDate(date);
        this.dpInstance.setViewDate(date);
      } else {
        this.resetSelection();
      }
    }

    this.emitInputEvents();
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

  // ARIA requires role="grid" to own role="row", and role="row" to own role="gridcell"
  // AirDatepicker renders cells flat, so we wrap them in row divs to satisfy that
  private wrapCellsInRows(body: Element) {
    this.gridObserver?.disconnect();

    body.querySelectorAll(':scope > [role="row"]').forEach(row => {
      while (row.firstChild) body.insertBefore(row.firstChild, row);
      row.remove();
    });

    const cells = Array.from(body.children).filter(el =>
      el.classList.contains('air-datepicker-cell'),
    );
    const columns = PostDatePicker.COLUMNS_BY_VIEW[this.currentViewType];

    for (let i = 0; i < cells.length; i += columns) {
      const row = document.createElement('div');
      row.setAttribute('role', 'row');
      row.classList.add('a11y-row');
      body.insertBefore(row, cells[i]);
      for (let j = i; j < i + columns && j < cells.length; j++) {
        row.appendChild(cells[j]);
      }
    }

    this.gridObserver.observe(body, { childList: true, subtree: false });
  }

  private enhanceAccessibility(focusOnDate: boolean = true) {
    let body = this.dpContainer.querySelector('.air-datepicker-body--cells');

    if (this.currentViewType === 'months') {
      body = this.dpContainer.querySelector('.air-datepicker-body--cells.-months-');
    } else if (this.currentViewType === 'years') {
      body = this.dpContainer.querySelector('.air-datepicker-body--cells.-years-');
    }
    if (!body) return;

    body.setAttribute('role', 'grid');
    this.wrapCellsInRows(body);

    this.getCells().forEach(c => {
      c.setAttribute('aria-selected', c.classList.contains('-selected-') ? 'true' : 'false');
      if (c.classList.contains('-current-')) {
        c.setAttribute('aria-current', 'date');
      }
    });

    body.removeEventListener('keydown', this.handleGridKeydown);
    body.addEventListener('keydown', this.handleGridKeydown);

    const dates = this.getIsoDates();
    const selectedDate = dates[0] ? isoToDate(dates[0]) : null;
    this.setActiveCell(selectedDate || this.today, focusOnDate);
  }

  /**
   * Set up the masks on the inputs to reflect the date pickers
   */
  private setUpMask() {
    // WARNING: using the DATE_FORMAT_SEPARATOR_REGEX is mandatory here,
    // because `this.dateFormat` can possibly contain unicode bidi characters!
    const maskPattern = this.dateFormat.replace(DATE_FORMAT_SEPARATOR_REGEX, m => `${m}\``);

    const baseMaskOptions = {
      mask: Date,
      pattern: maskPattern,
      format: this.dateToString.bind(this),
      parse: this.stringToDate.bind(this),
      blocks: {
        y: {
          mask: IMask.MaskedRange,
          from: 1000,
          to: 9999,
          maxLength: 4,
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
      min: this.min ? new Date(`${padIsoDate(this.min)}T00:00`) : null,
      max: this.max ? new Date(`${padIsoDate(this.max)}T00:00`) : null,
      autofix: true,
      eager: true,
    };

    const singleMaskOptions = {
      ...baseMaskOptions,
      lazy: false,
      overwrite: true,
    };

    const rangeMaskOptions = {
      mask: `from\`${this.dateFormatRangeSeparator}to`,
      blocks: {
        from: { ...baseMaskOptions },
        to: { ...baseMaskOptions },
      },
      lazy: false,
      overwrite: true,
    };

    this.maskElement = new NativeInputMaskElement(this.dpInput);
    this.inputMask = IMask(this.maskElement, this.range ? rangeMaskOptions : singleMaskOptions);
  }

  private updateMask() {
    if (!this.inline) {
      this.inputMask.destroy();
      this.setUpMask();
      this.setupValueOverride();

      if (this.dpInstance.selectedDates.length > 0) {
        this.inputMask.value = this.formatDatesForMask(this.dpInstance.selectedDates);
      }
    }
  }

  // Override input.value so external consumers get ISO strings
  // while iMask continues to work with locale-formatted display text via NativeInputMaskElement
  private setupValueOverride() {
    if (!this.dpInput) return;

    Object.defineProperty(this.dpInput, 'value', {
      get: this.getInputIsoValue.bind(this),
      set: this.setInputIsoValue.bind(this),
      configurable: true,
      enumerable: true,
    });
  }

  private getIsoDates(): string[] {
    const nativeVal = getNativeValue(this.dpInput);
    const DIGITS_PER_DATE = 8; // dd(2) + mm(2) + yyyy(4)

    if (!this.range) {
      const digits = nativeVal?.replaceAll(/\D/g, '') ?? '';
      if (digits.length < DIGITS_PER_DATE) return [];

      const date = this.stringToDate(nativeVal);
      return date && isValidDate(date) ? [dateToIso(date)] : [];
    }

    const parts = nativeVal?.split(this.dateFormatRangeSeparator) ?? [];
    const startDigits = parts[0]?.replaceAll(/\D/g, '') ?? '';
    const endDigits = parts[1]?.replaceAll(/\D/g, '') ?? '';

    const start = startDigits.length >= DIGITS_PER_DATE ? this.stringToDate(parts[0]) : null;
    const end = endDigits.length >= DIGITS_PER_DATE ? this.stringToDate(parts[1]) : null;

    const result: string[] = [];
    if (start && isValidDate(start)) result.push(dateToIso(start));
    if (end && isValidDate(end)) result.push(dateToIso(end));
    return result;
  }

  private getInputIsoValue(): string | string[] {
    const dates = this.getIsoDates();
    if (!this.range) {
      return dates[0] ?? '';
    }
    return dates;
  }

  private serializeIsoValue(): string {
    return JSON.stringify(this.getIsoDates());
  }

  private setInputIsoValue(val: string | string[]) {
    if (this._isInternalUpdate) return;
    this._isInternalUpdate = true;

    try {
      let isoValues: string[];
      if (Array.isArray(val)) {
        isoValues = val;
      } else {
        isoValues = val ? val.split(',').map(s => s.trim()) : [];
      }

      const dates = isoValues
        .filter(Boolean)
        .map(iso => isoToDate(iso))
        .filter(d => d && isValidDate(d)) as Date[];

      if (dates.length === 0) {
        this.inputMask.value = '';
        this.dpInstance?.clear();
        return;
      }

      this.inputMask.value = this.formatDatesForMask(dates);

      this.dpInstance?.clear();
      this.dpInstance?.selectDate(this.range ? dates : dates[0]);
      this.dpInstance?.setViewDate(dates[0]);
    } finally {
      this._isInternalUpdate = false;
    }
  }

  private async configDatePicker() {
    const locale = await this.airLocale();

    this.dpInput = this.host.querySelector('input');

    if (!this.dpInput) {
      console.error('The post-date-picker component requires a slotted <input> element.');
      return;
    }

    if (this.inline) {
      this.dpInput.type = 'hidden';
    } else {
      this.dpInput.type = 'text';
      this.dpInput.inputMode = 'numeric';
    }

    // Capture and clear initial value before mask setup, since iMask would
    // interpret an ISO string as locale-formatted text and garble it
    const initialValue = this.dpInput.value;
    this.dpInput.value = '';

    this.setUpMask();
    this.setupValueOverride();

    if (initialValue) {
      this.setInputIsoValue(initialValue);
    }

    this.dpContainer = this.host.shadowRoot.querySelector('.datepicker-container');

    if (this.dpContainer) {
      const options: AirDatepickerOptions<HTMLDivElement> = {
        navTitles: {
          days: `<button><strong>MMMM yyyy</strong><span class="visually-hidden">, ${this.textSwitchYear}</span><post-icon name="chevrondown"></post-icon></button>`,
          months: `<button><strong>yyyy</strong><span class="visually-hidden">, ${this.textSwitchYear}</span><post-icon name="chevrondown"></post-icon></button>`,
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
        startDate: this.startDate,
        minDate: this.min ? isoToDate(this.min)! : undefined,
        maxDate: this.max ? isoToDate(this.max)! : undefined,
        locale: locale,
        dateFormat: locale.dateFormat,
        firstDay: locale.firstDay,
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
          // Handle deselection (clicking the same date again)
          if (!date || (Array.isArray(date) && date.length === 0)) {
            if (this._isInternalUpdate) return;
            this.inputMask.value = '';
            this.emitInputEvents();
            return;
          }

          this.getCells().forEach(c => {
            c.setAttribute('aria-selected', c.classList.contains('-selected-') ? 'true' : 'false');
          });

          // If selected date is added dynamically after user has typed it in the input
          if (this.skipOnSelectCount > 0) {
            this.skipOnSelectCount--;
            return;
          }

          // If this selection was triggered by the value setter, don't re-emit
          if (this._isInternalUpdate) return;

          const dates = Array.isArray(date) ? date : [date];
          const isPartialRange = this.range && dates.length === 1;

          // Update the input mask value and emit events
          this.inputMask.value = this.formatDatesForMask(dates);
          this.emitInputEvents();

          // If range & only one date has been selected, user should stay in the DP
          if (isPartialRange) {
            return;
          }

          if (!this.inline) {
            this.popoverRef?.hide();
            requestAnimationFrame(() => this.dpTrigger.focus());
          }
        },
        onShow: () => {
          this.enhanceAccessibility();
        },
        onRenderCell: data => {
          const internal = renderCellAccessibility(data, this.localeCode);
          const custom = this.cellConfig?.(data.date, data.cellType);

          return mergeRenderCellResults(internal, custom);
        },
      };

      this.dpInstance = new AirDatepicker(this.dpContainer, options);
      this.reorderNavigation();

      this.prevBtn?.addEventListener('click', this.handlePrevNextClick);
      this.nextBtn?.addEventListener('click', this.handlePrevNextClick);

      this.syncInputToDp();
    }
  }

  private emitInputEvents() {
    this.inputMask.updateValue();

    const currentValue = this.serializeIsoValue();
    if (currentValue === this._lastInputValue) {
      return;
    }
    this._lastInputValue = currentValue;

    this.maskElement.allowEvents = true;
    this.dpInput.dispatchEvent(new InputEvent('input', { bubbles: true }));
    this.dpInput.dispatchEvent(new InputEvent('change', { bubbles: true }));
    this.maskElement.allowEvents = false;
  }

  // Suppress native input events fired while typing when the ISO value hasn't actually changed
  private handleInputEvent = (e: Event) => {
    if (this.maskElement.allowEvents) return;

    const currentValue = this.serializeIsoValue();
    if (currentValue === this._lastInputValue) {
      e.stopImmediatePropagation();
      return;
    }
    this._lastInputValue = currentValue;
  };

  private formatDatesForMask(dates: Date[]): string {
    if (dates.length === 0) return '';
    if (this.range) {
      return dates.map(d => this.dateToString(d)).join(this.dateFormatRangeSeparator);
    }
    return this.dateToString(dates[0]);
  }

  private syncInputToDp() {
    const isoDates = this.getIsoDates();
    if (isoDates.length === 0) return;

    const dates = isoDates.map(iso => isoToDate(iso)).filter(d => d && isValidDate(d)) as Date[];

    if (dates.length > 0) {
      this.dpInstance.selectDate(this.range ? dates : dates[0]);
      this.dpInstance.setViewDate(dates[0]);
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
    this._lastInputValue = this.serializeIsoValue();
    if (!this.inline) {
      this.dpInput.addEventListener('blur', this.handleInputBlur);
    }
    this.dpInput.addEventListener('input', this.handleInputEvent);
  }

  private resetSelection() {
    this.skipOnSelectCount = 0;
    this.dpInstance.clear();
    this.dpInstance.setViewDate(this.today);
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
    this.validateInline();

    this.addInputListener();
    this.syncDatePickerState();

    if (this.inline) {
      requestAnimationFrame(() => this.enhanceAccessibility(false));
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
    this.dpInput?.removeEventListener('input', this.handleInputEvent);

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
      <Host data-version={version}>
        {this.inline && (
          <div dir={this.textDirection}>
            <slot></slot>
            <div class="datepicker-container"></div>
          </div>
        )}
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
                ref={e => (this.dpTrigger = e)}
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
