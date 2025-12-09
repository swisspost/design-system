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
} from '@stencil/core';
import AirDatepicker, { AirDatepickerOptions, AirDatepickerViews } from 'air-datepicker';

import { localesMap } from './locales';
import { getDeepFocusableChildren } from '@/utils';

interface AirDatepickerCustomOptions extends AirDatepickerOptions<HTMLDivElement> {
  onShow?: (isAnimationComplete: boolean) => void;
}

@Component({
  tag: 'post-datepicker',
  styleUrl: 'post-datepicker.scss',
  shadow: true,
})
export class PostDatepicker {
  @Element() host: HTMLPostDatepickerElement;

  /**
   * Selected date (or selected date range)
   */
  @Prop() selectedDate?: Date | Date[];

  /**
   * Whether the datepicker expects a range selection or a single date selection
   */
  @Prop() range?: boolean = false;

  /**
   * Minimun possible date to select
   */
  @Prop() minDate?: Date | string | number;

  /**
   * Maximum possible date to select
   */
  @Prop() maxDate?: Date | string | number;

  /**
   * List of disabled dates
   * Should be in a string, comma separated
   */
  @Prop() disableDates?: string;

  @State() locale: string = document.documentElement.lang;

  /**
   * Whether the calendar is inline in the page (not showing in a popover when input clicked)
   */
  @Prop() inline = false;

  /**
   * The predefined start date of the calendar
   * Default is today
   */
  @Prop() startDate?: Date = new Date();

  /**
   * An event emitted when a date or a range of dates have been selected
   */
  @Event() postUpdateDates: EventEmitter<Date | Date[]>;

  /**
   * Displays the popover calendar, focusing the first calendar item.
   *
   * @param target - The HTML element relative to which the popover calendar should be displayed.
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
  private datepickerInput: HTMLInputElement;
  private datepickerInstance: AirDatepicker<HTMLDivElement>;
  private datepickerContainerEl: HTMLDivElement;

  private gridObserver: MutationObserver;

  private getCells(): HTMLElement[] {
    if (!this.datepickerContainerEl) return [];

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

    return Array.from(this.datepickerContainerEl.querySelectorAll(selector));
  }

  private setActiveCell(date: Date, focusOnDate: boolean = true) {
    const cells = this.getCells();
    if (!cells.length) return;

    let target: HTMLElement | undefined;

    // If selected date is visible
    if (focusOnDate) {
      if (this.currentViewType === 'days') {
        target = cells.find(
          cell =>
            Number(cell.dataset.date) === date.getDate() &&
            Number(cell.dataset.month) === date.getMonth() &&
            Number(cell.dataset.year) === date.getFullYear(),
        );
      } else if (this.currentViewType === 'months') {
        target = cells.find(
          cell =>
            Number(cell.dataset.month) === date.getMonth() &&
            Number(cell.dataset.year) === date.getFullYear(),
        );
      } else {
        target = cells.find(cell => Number(cell.dataset.year) === date.getFullYear());
      }
    } else {
      if (this.currentViewType === 'days') {
        // If not, should focus the first day of the month
        const firstOfMonth = new Date(this.currentViewYear, this.currentViewMonth, 1);

        target = cells.find(
          cell =>
            Number(cell.dataset.date) === 1 &&
            Number(cell.dataset.month) === firstOfMonth.getMonth() &&
            Number(cell.dataset.year) === firstOfMonth.getFullYear() &&
            !cell.classList.contains('-other-month-'),
        );
      } else if (this.currentViewType === 'months') {
        target = cells.find(cell => !cell.classList.contains('-other-year-'));
      } else {
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

  //todolea: listener is still there when exiting the DP
  /**
   * Correct the tab flow loop
   * 1) Title -> 2) Previous button -> 3) Next button -> 4) Grid active element
   * If datepicker is inline, remove the loop
   */
  private handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const active = this.host.shadowRoot.activeElement as HTMLElement;

    const title = this.host.shadowRoot.querySelector(
      '.datepicker-container .air-datepicker-nav--title button',
    ) as HTMLElement;
    const prev = this.host.shadowRoot.querySelector(
      '.datepicker-container [data-action="prev"] button',
    ) as HTMLElement;
    const next = this.host.shadowRoot.querySelector(
      '.datepicker-container [data-action="next"] button',
    ) as HTMLElement;

    if (active === next && e.shiftKey) {
      e.preventDefault();
      prev.focus();
      return;
    }

    if (active === prev) {
      e.preventDefault();
      if (e.shiftKey) {
        // No title in year view
        if (this.currentViewType === 'years') {
          if (this.inline) {
            this.exitDatepicker(active, false);
          } else {
            const activeCell = this.getCells().find(cell => cell.tabIndex === 0);
            if (activeCell) {
              activeCell.focus();
            }
          }
        } else {
          title.focus();
        }
      } else {
        next.focus();
      }
    }

    if (active === title) {
      e.preventDefault();
      if (e.shiftKey) {
        if (this.inline) {
          this.exitDatepicker(active, false);
        } else {
          const activeCell = this.getCells().find(cell => cell.tabIndex === 0);
          if (activeCell) {
            activeCell.focus();
          }
        }
      } else {
        prev.focus();
      }
    }

    if (active?.getAttribute('role') === 'gridcell' && !this.inline && !e.shiftKey) {
      e.preventDefault();
      if (this.currentViewType === 'years') {
        prev.focus();
      } else {
        title.focus();
      }
    }
  };

  // Inline mode: Exit the datepicker by focusing to the next/previous focusable element
  private exitDatepicker(activeElement: HTMLElement, next = true) {
    const focusables = getDeepFocusableChildren(document.body);
    const hostIndex = focusables.indexOf(activeElement);

    if (hostIndex > 0) {
      const previous = focusables[hostIndex + (next ? 1 : -1)];
      previous.focus();
    }
  }

  private handleGridKeydown = (e: KeyboardEvent) => {
    const key = e.key;
    const current = this.startDate;
    if (!current) return;

    // If user clicks ENTER, trigger click on the cell
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
      PageUp: {
        days: () => newDate.setMonth(current.getMonth() - 1),
        months: () => newDate.setFullYear(current.getFullYear() - 1),
        years: () => newDate.setFullYear(current.getFullYear() - 10),
      },
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
      this.datepickerInstance.setViewDate(newDate);

      requestAnimationFrame(() => {
        this.setActiveCell(newDate, true);
      });
    } else {
      this.setActiveCell(newDate, true);
    }
  };

  private skipFocusOnNextRender = false;

  private enhanceAccessibility(focusOnDate: boolean = true) {
    let body = this.datepickerContainerEl.querySelector('.air-datepicker-body--cells');

    if (this.currentViewType === 'months') {
      body = this.datepickerContainerEl.querySelector('.air-datepicker-body--cells.-months-');
    } else if (this.currentViewType === 'years') {
      body = this.datepickerContainerEl.querySelector('.air-datepicker-body--cells.-years-');
    }
    if (!body) return;

    body.setAttribute('role', 'grid');

    this.updateAriaSelected();

    body.removeEventListener('keydown', this.handleGridKeydown);
    body.addEventListener('keydown', this.handleGridKeydown);

    this.setActiveCell(this.startDate, focusOnDate);
  }

  // Update the cells aria-selected value
  private updateAriaSelected() {
    this.getCells().forEach(cell => {
      cell.setAttribute('aria-selected', cell.classList.contains('-selected-') ? 'true' : 'false');
    });
  }

  private configDatepicker() {
    const slot = this.host.shadowRoot.querySelector('slot');
    const assignedNodes = slot && (slot as HTMLSlotElement).assignedElements();
    const locale = localesMap[this.locale] || localesMap.en;
    this.datepickerInput = assignedNodes?.find(el => el.tagName === 'INPUT') as HTMLInputElement;
    this.datepickerContainerEl = this.host.shadowRoot.querySelector('.datepicker-container');
    console.log('should disable: ', this.disableDates);

    if (this.datepickerContainerEl) {
      const options: AirDatepickerCustomOptions = {
        navTitles: {
          days: '<button><div class="month-nav"><div><strong>MMMM yyyy</strong></div><div><post-icon size="small" name="2052"></div></post-icon></div><div class="no-hover"></div></button>',
          months:
            '<button><strong>yyyy</strong><post-icon size="small" name="2052"></post-icon></button>',
        },
        prevHtml: '<button><post-icon size="small" name="2049" ></post-icon></button>',
        nextHtml: '<button><post-icon size="small" name="2050" ></post-icon></button>',
        range: this.range,
        inline: true,
        autoClose: true,
        showOtherYears: true,
        selectOtherYears: true,
        showOtherMonths: false,
        moveToOtherMonthsOnSelect: true,
        startDate: this.startDate,
        minDate: this.minDate,
        maxDate: this.maxDate,
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
        },
        onSelect: ({ date, formattedDate }) => {
          this.updateAriaSelected();
          this.postUpdateDates.emit(date);
          // Assign value to the input, close the popover and focus on the input
          if (this.datepickerInput) {
            if (Array.isArray(formattedDate)) {
              this.datepickerInput.value =
                formattedDate.length === 1 ? `${formattedDate} -` : formattedDate.join(' - ');
            } else {
              this.datepickerInput.value = formattedDate;
            }

            // If range & only one date has been selected, user should stay in the DP
            if (this.range && Array.isArray(date) && date.length === 1) {
              return;
            }

            this.popoverRef?.hide();
            requestAnimationFrame(() => this.datepickerInput.focus());
          }
        },
        onShow: () => {
          this.enhanceAccessibility();
        },
        onRenderCell: ({ date, cellType }) => {
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
        },
      };

      this.datepickerInstance = new AirDatepicker(
        this.datepickerContainerEl,
        options as AirDatepickerOptions<HTMLDivElement>,
      );

      const prevButton = this.datepickerContainerEl.querySelector(
        '.air-datepicker-nav--action[data-action="prev"]',
      );
      const nextButton = this.datepickerContainerEl.querySelector(
        '.air-datepicker-nav--action[data-action="next"]',
      );

      if (prevButton) {
        prevButton.addEventListener('click', () => {
          this.skipFocusOnNextRender = true;
        });
      }

      if (nextButton) {
        nextButton.addEventListener('click', () => {
          this.skipFocusOnNextRender = true;
        });
      }

      if (this.disableDates) {
        const disableDatesArray = this.disableDates.split(',');
        this.datepickerInstance.disableDate(disableDatesArray);
      }

      if (this.selectedDate) {
        this.datepickerInstance.selectDate(this.selectedDate);
      }

      // Override the title click to go to year view directly (skip month view)
      const navTitle = this.datepickerContainerEl.querySelector('.air-datepicker-nav--title');
      if (navTitle) {
        navTitle.addEventListener('click', () => {
          if (this.datepickerInstance) {
            this.datepickerInstance.setCurrentView('years');
          }
        });
      }
    }
  }

  private setupGridObserver() {
    const grid = this.datepickerContainerEl.querySelector('.air-datepicker-body--cells');
    if (!grid) return;

    // If reinitializing, disconnect previous observer
    if (this.gridObserver) {
      this.gridObserver.disconnect();
    }

    this.gridObserver = new MutationObserver(mutations => {
      const changed = mutations.some(m => m.type === 'childList');
      if (!changed) return;

      // Wait for AirDatepicker to finish rendering this frame
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

  // Listen to click on the button within the slot to open the datepicker
  private attachTriggerListener() {
    const slotEl = this.host.shadowRoot.querySelector('slot');
    if (!slotEl) return;

    const assigned = (slotEl as HTMLSlotElement).assignedElements({ flatten: true });
    const trigger = assigned.find(el => el.tagName === 'BUTTON');

    if (!trigger) return;

    trigger.addEventListener('click', ev => {
      ev.stopPropagation();
      this.show(trigger as HTMLElement);
    });
  }

  async componentDidLoad() {
    this.configDatepicker();
    this.setupGridObserver();
    if (!this.inline && this.popoverRef) {
      this.attachTriggerListener();
    } else {
      this.host.shadowRoot.addEventListener('keydown', this.handleTab);
      requestAnimationFrame(() => this.enhanceAccessibility());
    }
  }

  disconnectedCallback() {
    this.host.shadowRoot.removeEventListener('keydown', this.handleTab);

    if (this.gridObserver) {
      this.gridObserver.disconnect();
    }

    if (this.datepickerInstance) {
      this.datepickerInstance.destroy();
      this.datepickerInstance = null;
    }
  }

  render() {
    return (
      <Host>
        <div class="calendar">
          <slot></slot>
          {this.inline && <div class="datepicker-container"></div>}
          {!this.inline && (
            <post-popovercontainer
              placement="bottom"
              ref={e => (this.popoverRef = e)}
              manualClose={false}
            >
              <div class="datepicker-container"></div>
            </post-popovercontainer>
          )}
        </div>
      </Host>
    );
  }
}
