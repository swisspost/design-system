import {
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

import { localesMap } from './locales';
import { checkEmptyOrType, checkRequiredAndType } from '@/utils';

export interface AirDatepickerCustomOptions extends AirDatepickerOptions<HTMLDivElement> {
  onShow?: (isAnimationComplete: boolean) => void;
  onRenderCell?: (data: {
    date: Date;
    cellType: AirDatepickerViewsSingle;
    datepicker: AirDatepicker<HTMLDivElement>;
  }) => void;
}

@Component({
  tag: 'post-datepicker',
  styleUrl: 'post-datepicker.scss',
  shadow: true,
})
export class PostDatepicker {
  @Element() host: HTMLPostDatepickerElement;

  @State() today = new Date();

  /**
   * Selected date
   * If range datepicker: Selected start date
   */
  @Prop() selectedStartDate?: string;
  @Watch('selectedStartDate')
  validateSelectedStartDate() {
    checkEmptyOrType(this, 'selectedStartDate', 'string');
  }

  /**
   * Selected end date for range datepicker only
   */
  @Prop() selectedEndDate?: string;
  @Watch('selectedEndDate')
  validateSelectedEndDate() {
    checkEmptyOrType(this, 'selectedEndDate', 'string');
  }

  /**
   * Whether the datepicker expects a range selection or a single date selection
   */
  @Prop() range?: boolean = false;
  @Watch('range')
  validateRange() {
    if (!this.inline) {
      if (this.range && (!this.dpInputs || this.dpInputs.length !== 2)) {
        console.error('A range datepicker should contain two inputs');
      } else if (!this.range && (!this.dpInputs || this.dpInputs.length !== 1)) {
        console.error('A non-range datepicker should contain one input');
      }
    }
  }

  /**
   * Minimun possible date to select
   */
  @Prop() min?: string;

  /**
   * Maximum possible date to select
   */
  @Prop() max?: string;

  /**
   * Used to extend the existing on render cell to disable dates
   */
  @Prop() renderCellCallback?: AirDatepickerCustomOptions['onRenderCell'];

  /**
   * Whether the calendar is inline in the page (not showing in a popover when input clicked)
   */
  @Prop() inline = false;

  /**
   * Label for "Next month" button
   */
  @Prop({ reflect: true }) textNextMonth!: string;
  @Watch('textNextMonth')
  validateTextNextMonth() {
    checkRequiredAndType(this, 'textNextMonth', 'string');
  }

  /**
   * Label for "Next year" button
   */
  @Prop({ reflect: true }) textNextYear!: string;
  @Watch('textNextYear')
  validateTextNextYear() {
    checkRequiredAndType(this, 'textNextYear', 'string');
  }

  /**
   * Label for "Next decade" button
   */
  @Prop({ reflect: true }) textNextDecade!: string;
  @Watch('textNextDecade')
  validateTextNextDecade() {
    checkRequiredAndType(this, 'textNextDecade', 'string');
  }

  /**
   * Label for "Previous month" button
   */
  @Prop({ reflect: true }) textPreviousMonth!: string;
  @Watch('textPreviousMonth')
  validateTextPreviousMonth() {
    checkRequiredAndType(this, 'textPreviousMonth', 'string');
  }

  /**
   * Label for "Previous year" button
   */
  @Prop({ reflect: true }) textPreviousYear!: string;
  @Watch('textPreviousYear')
  validateTextPreviousYear() {
    checkRequiredAndType(this, 'textPreviousYear', 'string');
  }

  /**
   * Label for "Previous decade" button
   */
  @Prop({ reflect: true }) textPreviousDecade!: string;
  @Watch('textPreviousDecade')
  validateTextPreviousDecade() {
    checkRequiredAndType(this, 'textPreviousDecade', 'string');
  }

  /**
   * Label for the "Switch to year view" title button
   */
  @Prop({ reflect: true }) textSwitchYear!: string;
  @Watch('textSwitchYear')
  validateTextSwitchYear() {
    checkRequiredAndType(this, 'textSwitchYear', 'string');
  }

  /**
   * Label for the toggle button that opens the calendar
   * Only needed when calendar is connected to input
   */
  @Prop() textToggleCalendar?: string;
  @Watch('textToggleCalendar')
  validateTextToggleCalendar() {
    if (!this.inline) {
      checkRequiredAndType(this, 'textToggleCalendar', 'string');
    }
  }

  @State() startDate = new Date();
  @State() locale: string = document.documentElement.lang;

  /**
   * An event emitted when a date or a range of dates have been selected
   */
  @Event() postUpdateDates: EventEmitter<Date | Date[]>;

  /**
   * Displays the popover calendar, focusing the first calendar item
   * @param target - The HTML element relative to which the popover calendar should be displayed
   */
  @Method()
  async show(target: HTMLElement) {
    if (this.popoverRef) {
      await this.popoverRef.show(target);
      this.enhanceAccessibility();
      this.host.shadowRoot.addEventListener('keydown', this.handleTab, true);
    } else {
      console.error('show: popoverRef is null or undefined');
    }
  }

  /**
   * Hides the popover calendar
   */
  @Method()
  async hide() {
    if (this.popoverRef) {
      await this.popoverRef.hide();
    } else {
      console.error('hide: popoverRef is null or undefined');
    }
  }

  private currentViewMonth: number;
  private currentViewYear: number;
  private currentViewType: AirDatepickerViews = 'days';

  private popoverRef: HTMLPostPopovercontainerElement;
  private dpInputs: HTMLInputElement[];
  private dpInstance: AirDatepicker<HTMLDivElement>;
  private dpContainer: HTMLDivElement;

  private gridObserver: MutationObserver;
  private navObserver: MutationObserver;

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

    // Update start date to <match the active cell
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
   * Loop through the datepicker when not in inline mode
   */
  private handleTab = (e: KeyboardEvent) => {
    if (this.inline || (e.key !== 'Tab' && e.key !== 'Escape')) return;

    // Focus on the input when escaping the calendar
    if (e.key === 'Escape') {
      this.dpInputs[0].focus();
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
      this.selectedStartDate ? new Date(this.selectedStartDate) : this.startDate,
      focusOnDate,
    );
  }

  /**
   * Set the same min and max value to the datepicker input(s)
   */
  private setMinAndMaxToInputs() {
    this.dpInputs?.forEach(input => {
      if (this.min) {
        input.min = this.formatAsDateInputValue(new Date(this.min));
      }

      if (this.max) {
        input.max = this.formatAsDateInputValue(new Date(this.max));
      }
    });
  }

  private configDatepicker() {
    const slot = this.host.shadowRoot.querySelector<HTMLSlotElement>('slot');
    const assignedNodes = slot && slot.assignedElements();
    const locale = localesMap[this.locale] || localesMap.en;
    this.dpInputs = assignedNodes?.filter(el => el.tagName === 'INPUT') as HTMLInputElement[];
    this.setMinAndMaxToInputs();

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
        dateFormat: (localesMap[this.locale] || localesMap.en).dateFormat,
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
          this.getCells().forEach(c => {
            c.setAttribute('aria-selected', c.classList.contains('-selected-') ? 'true' : 'false');
          });

          this.postUpdateDates.emit(date);

          // If selected date is added dynamically after user has typed it in the input
          if (this.skipOnSelectCount > 0) {
            this.skipOnSelectCount--;
            return;
          }

          // Assign value to the input, close the popover and focus on the input
          if (this.dpInputs) {
            if (Array.isArray(date)) {
              date.forEach((d, i) => (this.dpInputs[i].value = this.formatAsDateInputValue(d)));
            } else if (date) {
              // If there is a date, set it to the input. No date = same date as before
              this.dpInputs[0].value = this.formatAsDateInputValue(date);
            }

            // If range & only one date has been selected, user should stay in the DP
            if (this.range && Array.isArray(date) && date.length === 1) {
              return;
            }

            this.popoverRef?.hide();
            requestAnimationFrame(() => this.dpInputs[0].focus());
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

      this.prevBtn?.addEventListener('click', () => {
        this.skipFocusOnNextRender = true;
      });

      this.nextBtn?.addEventListener('click', () => {
        this.skipFocusOnNextRender = true;
      });

      if (this.range) {
        if (
          (this.selectedStartDate && !this.selectedEndDate) ||
          (!this.selectedStartDate && this.selectedEndDate)
        ) {
          console.error(
            'The range datepicker expects either no selected dates or both of them defined.',
          );
        } else if (this.selectedStartDate && this.selectedEndDate) {
          this.dpInstance.selectDate([this.selectedStartDate, this.selectedEndDate]);
        }
      } else {
        if (this.selectedStartDate) {
          this.dpInstance.selectDate(this.selectedStartDate);
        }
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

  private formatAsDateInputValue(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Add role and aria-label to each grid cell
   */
  private internalOnRenderCell({ date, cellType }) {
    if (cellType === 'day') {
      return {
        attrs: {
          'role': 'gridcell',
          'aria-label': date.toLocaleDateString(this.locale, {
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
          'aria-label': date.toLocaleDateString(this.locale, {
            year: 'numeric',
            month: 'long',
          }),
        },
      };
    } else if (cellType === 'year') {
      return {
        attrs: {
          'role': 'gridcell',
          'aria-label': date.toLocaleDateString(this.locale, {
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

  private addInputListeners() {
    this.dpInputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (this.range) {
          const start = this.dpInputs[0].value;
          const end = this.dpInputs[1].value;

          if (start && end) {
            // Because selectDate is called twice if there are two dates
            this.skipOnSelectCount = 2;

            // Select the dates in the datepicker
            this.selectedStartDate = start;
            this.selectedEndDate = end;
            this.dpInstance.selectDate([new Date(start), new Date(end)]);
          }
        } else {
          if (input.value) {
            this.skipOnSelectCount = 1;
            this.selectedStartDate = input.value;

            // Select the date in the datepicker
            this.dpInstance.selectDate(new Date(input.value));
          }
        }
      });
    });
  }

  async componentDidLoad() {
    this.configDatepicker();
    this.setupGridObserver();
    this.setupNavObserver();
    this.validateSelectedStartDate();
    this.validateSelectedEndDate();
    this.validateTextToggleCalendar();
    this.validateTextNextDecade();
    this.validateTextNextMonth();
    this.validateTextNextYear();
    this.validateTextPreviousDecade();
    this.validateTextPreviousMonth();
    this.validateTextPreviousYear();
    this.validateTextSwitchYear();
    this.validateRange();

    if (this.inline) {
      requestAnimationFrame(() => this.enhanceAccessibility(false));
    } else {
      this.addInputListeners();
    }
  }

  disconnectedCallback() {
    this.host.shadowRoot.removeEventListener('keydown', this.handleTab);
    this.titleBtn?.removeEventListener('click', this.forceTitleClickToYear);

    if (this.gridObserver) {
      this.gridObserver.disconnect();
    }

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
          <div>
            <div class={this.range ? 'calendar-input-range' : 'calendar-input'}>
              <slot></slot>
              <button
                onClick={e => this.show(e.currentTarget as HTMLElement)}
                aria-haspopup="true"
                aria-label={this.textToggleCalendar}
              >
                <post-icon name="calendar"></post-icon>
              </button>
            </div>
            <post-popovercontainer placement="bottom" ref={e => (this.popoverRef = e)}>
              <div class="datepicker-container"></div>
            </post-popovercontainer>
          </div>
        )}
      </Host>
    );
  }
}
