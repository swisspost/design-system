import {
  Component,
  Element,
  h,
  Host,
  Prop,
  Watch,
  Method,
  Event,
  EventEmitter,
  State,
} from '@stencil/core';
import AirDatepicker, { AirDatepickerOptions } from 'air-datepicker';

import { EventFrom } from '@/utils';
import { localesMap } from './locales';

/**
 * Questions:
 * Create datepicker from scratch instead?
 * Look for other libraries instead
 * Small hacks -> Elements are focusable so can be "travelled" with tabs but it would be more complex with keyboard
 * Library offers keyboard navigation but not with inline datepickers -> Use their implementation?
 */

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
   * Emits when the calendar is shown or hidden.
   * The event payload is a boolean: `true` when the calendar was opened, `false` when it was closed.
   **/
  @Event() toggleCalendar: EventEmitter<boolean>;

  /**
   * Holds the current visibility state of the calendar.
   * This state is internally managed to track whether the calendar is open (`true`) or closed (`false`),
   * and updates automatically when the calendar is toggled.
   */
  @State() isVisible: boolean = false;

  // todolea: handle range
  @State() selectedDate: Date;

  /**Locale prop to set translations */
  @Prop() locale: string = 'en';

  /**
   * Whether the calendar is inline in the page (not showing in a popover when input clicked)
   */
  @Prop() inline = false;

  /**
   * The predefined start date of the calendar
   * Default is today
   */
  @Prop() startDate?: Date = new Date();

  @Watch('locale')
  localeChangedHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.datepickerInstance.update({
        locale: localesMap[newValue] || localesMap.en,
        dateFormat: (localesMap[newValue] || localesMap.en).dateFormat,
      });
    }
  }

  /**
   * Displays the popover calendar, focusing the first calendar item.
   *
   * @param target - The HTML element relative to which the popover calendar should be displayed.
   */
  @Method()
  async show(target: HTMLElement) {
    if (this.popoverRef) {
      await this.popoverRef.show(target);
    } else {
      console.error('show: popoverRef is null or undefined');
    }
  }

  /**
   * Hides the popover calendar and restores focus to the previously focused element.
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

  @EventFrom('post-popovercontainer')
  private readonly handlePostToggle = (event: CustomEvent<boolean>) => {
    this.isVisible = event.detail;
    this.toggleCalendar.emit(this.isVisible);
  };

  private popoverRef: HTMLPostPopovercontainerElement;
  private datepickerEl: HTMLInputElement;
  private datepickerInstance: AirDatepicker<HTMLDivElement>;
  private datepickerContainerEl: HTMLDivElement;

  private gridObserver: MutationObserver;
  private getDayCells(): HTMLElement[] {
    return Array.from(this.datepickerContainerEl.querySelectorAll('.air-datepicker-cell.-day-'));
  }

  private setActiveDateCell(date: Date, focusOnDate: boolean = true) {
    const cells = this.getDayCells();
    if (!cells.length) return;

    let target: HTMLElement | undefined;

    // If selected date is visible
    if (focusOnDate) {
      // Keyboard / initial load: follow selectedDate
      target = cells.find(
        cell =>
          Number(cell.dataset.date) === date.getDate() &&
          Number(cell.dataset.month) === date.getMonth() &&
          Number(cell.dataset.year) === date.getFullYear(),
      );
    } else {
      // If not, should focus the first day of the month
      const firstOfMonth = new Date(this.currentViewYear, this.currentViewMonth, 1);

      target = cells.find(
        cell =>
          Number(cell.dataset.date) === 1 &&
          Number(cell.dataset.month) === firstOfMonth.getMonth() &&
          Number(cell.dataset.year) === firstOfMonth.getFullYear() &&
          !cell.classList.contains('-other-month-'),
      );
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

    // Update selectedDate to match the active cell
    this.selectedDate = new Date(
      Number(target.dataset.year),
      Number(target.dataset.month),
      Number(target.dataset.date),
    );
  }

  private handleGridKeydown = (e: KeyboardEvent) => {
    const key = e.key;
    const current = this.selectedDate;
    if (!current) return;

    const newDate = new Date(current);

    const move = {
      ArrowLeft: () => newDate.setDate(current.getDate() - 1),
      ArrowRight: () => newDate.setDate(current.getDate() + 1),
      ArrowUp: () => newDate.setDate(current.getDate() - 7),
      ArrowDown: () => newDate.setDate(current.getDate() + 7),
      Home: () => newDate.setDate(1),
      End: () => newDate.setMonth(current.getMonth() + 1, 0), // last day
      PageUp: () => newDate.setMonth(current.getMonth() - 1),
      PageDown: () => newDate.setMonth(current.getMonth() + 1),
    };

    if (!move[key]) return;

    e.preventDefault();
    move[key]();

    // If month has changed, update view date
    const monthChanged =
      current.getMonth() !== newDate.getMonth() || current.getFullYear() !== newDate.getFullYear();
    if (monthChanged) {
      this.skipFocusOnNextRender = false;
      this.datepickerInstance.setViewDate(newDate);

      requestAnimationFrame(() => {
        this.setActiveDateCell(newDate, true);
      });
    } else {
      this.setActiveDateCell(newDate, true);
    }
  };

  private skipFocusOnNextRender = false;

  private enhanceAccessibility(focusOnDate: boolean = true) {
    const body = this.datepickerContainerEl.querySelector('.air-datepicker-body--cells');
    if (!body) return;

    body.setAttribute('role', 'grid');

    this.getDayCells().forEach(cell => {
      cell.setAttribute('aria-selected', cell.classList.contains('-selected-') ? 'true' : 'false');
    });

    body.removeEventListener('keydown', this.handleGridKeydown);
    body.addEventListener('keydown', this.handleGridKeydown);

    this.setActiveDateCell(this.selectedDate, focusOnDate);
  }

  private configDatepicker() {
    const slot = this.host.shadowRoot.querySelector('slot');
    const assignedNodes = slot && (slot as HTMLSlotElement).assignedElements();
    const locale = localesMap[this.locale] || localesMap.en;
    this.datepickerEl = assignedNodes?.find(el => el.tagName === 'INPUT') as HTMLInputElement;
    this.datepickerContainerEl = this.host.shadowRoot.querySelector('.datepicker-container');
    if (!this.selectedDate) {
      this.selectedDate = this.startDate;
    }

    if (this.datepickerContainerEl) {
      const options: AirDatepickerCustomOptions = {
        navTitles: {
          days: '<button><div class="month-nav"><div><strong>MMMM yyyy</strong></div><div><post-icon size="small" name="2052"></div></post-icon></div><div class="no-hover"></div></button>',
          months:
            '<button><strong>yyyy</strong><post-icon size="small" name="2052"></post-icon></button>',
        },
        prevHtml: '<button><post-icon size="small" name="2049" ></post-icon></button>',
        nextHtml: '<button><post-icon size="small" name="2050" ></post-icon></button>',
        range: false,
        inline: true,
        autoClose: true,
        showOtherYears: true,
        selectOtherYears: true,
        showOtherMonths: false,
        moveToOtherMonthsOnSelect: true,
        startDate: this.startDate,
        locale: locale,
        dateFormat: (localesMap[this.locale] || localesMap.en).dateFormat,
        view: 'days',
        onChangeView(view) {
          console.log('on change view', view);
        },
        onChangeViewDate: ({ month, year }) => {
          this.currentViewYear = year;
          this.currentViewMonth = month;

          this.enhanceAccessibility(false);
        },
        onSelect: ({ date, formattedDate }) => {
          console.log('select', formattedDate, date);
          // todolea: If range, this would be two dates
          this.datepickerContainerEl
            .querySelectorAll('[aria-selected]')
            .forEach(el => el.setAttribute('aria-selected', 'false'));

          const selectedCell = this.datepickerContainerEl.querySelector('.-selected-');

          this.selectedDate = date instanceof Array ? date[0] : date;
          //this.enhanceAccessibility();
          if (selectedCell) {
            selectedCell.setAttribute('aria-selected', 'true');
          }

          const val = Array.isArray(formattedDate) ? formattedDate.join(' - ') : formattedDate;
          if (this.datepickerEl) {
            this.datepickerEl.value = val;
          } else {
            // Should emit value here
            console.log('inline selection of date: ', val);
          }
          //this.popoverRef?.hide();
        },
        onShow: () => {
          this.enhanceAccessibility();
        },
        onRenderCell: ({ date, cellType }) => {
          if (cellType === 'day') {
            return {
              attrs: {
                'role': 'gridcell',
                // todolea: this should use the "locale"
                'aria-label': date.toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
                'data-year': date.getFullYear(),
                'data-month': date.getMonth(),
                'data-date': date.getDate(),
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
          console.log('should skip focus');
          this.skipFocusOnNextRender = true;
        });
      }

      if (nextButton) {
        nextButton.addEventListener('click', () => {
          console.log('should skip focus');
          this.skipFocusOnNextRender = true;
        });
      }

      // Use timeout to ensure the datepicker's DOM has been created.
      // Attach the click listener directly to the title element.
      setTimeout(() => {
        const navTitle = this.datepickerContainerEl.querySelector('.air-datepicker-nav--title');
        if (navTitle) {
          navTitle.addEventListener('click', () => {
            if (this.datepickerInstance) {
              this.datepickerInstance.setCurrentView('years');
            }
          });
        }
      }, 0);
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

  async componentDidLoad() {
    this.configDatepicker();
    this.setupGridObserver();
    if (!this.inline && this.popoverRef) {
      // this.popoverRef.addEventListener('postToggle', this.handlePostToggle);
    }

    requestAnimationFrame(() => this.enhanceAccessibility());
  }

  disconnectedCallback() {
    //this.popoverRef?.removeEventListener('postToggle', this.handlePostToggle);
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
        <div class="calendar" onClick={e => this.show(e.currentTarget as HTMLElement)}>
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
