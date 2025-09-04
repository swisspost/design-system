import { Component, Element, h, Host, Method, Event, State, EventEmitter } from '@stencil/core';
import { version } from '@root/package.json';

import { EventFrom } from '@/utils';
import 'cally';

interface HTMLCalendarRangeElement extends HTMLElement {
  // Add any custom properties or methods you expect here
  // For example, a `value` property if it exposes selected date(s)
  value?: string;
}

@Component({
  tag: 'post-datepicker',
  styleUrl: 'post-datepicker.scss',
  shadow: true,
})
export class PostDatepicker {
  @Element() host: HTMLPostDatepickerElement;

  /**The input date range value
   **/
  @State() inputValue: string;

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

  private popoverRef: HTMLPostPopovercontainerElement;

  private calendarRef: HTMLCalendarRangeElement;

  private calendarMonthRef: HTMLCalendarRangeElement;

  private slottedInput: HTMLInputElement | null = null;

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

  private readonly handleCalendarChange = (event: CustomEvent) => {
    const target = event.target as HTMLCalendarRangeElement;
    console.log(target.value);
    console.log(this.slottedInput);
    if (this.slottedInput && target?.value) {
      console.log(this.slottedInput);
      this.slottedInput.value = target.value;
    }

    this.popoverRef?.hide();
  };

  @EventFrom('post-popovercontainer')
  private readonly handlePostToggle = (event: CustomEvent<boolean>) => {
    this.isVisible = event.detail;
    this.toggleCalendar.emit(this.isVisible);
  };

  disconnectedCallback() {
    this.popoverRef?.removeEventListener('postToggle', this.handlePostToggle);
  }

  componentDidLoad() {
    if (this.popoverRef) {
      this.popoverRef.addEventListener('postToggle', this.handlePostToggle);
    }

    // Get the slotted element inside <slot name="input">
    const slot = this.host.shadowRoot?.querySelector('slot[name="input"]') as HTMLSlotElement;
    if (slot) {
      const assignedElements = slot.assignedElements({ flatten: true });

      for (const el of assignedElements) {
        if (el instanceof HTMLInputElement) {
          this.slottedInput = el;
          console.log('Found direct slotted input:', this.slottedInput);
          break;
        }

        const nestedInput = el.querySelector('input');
        if (nestedInput) {
          this.slottedInput = nestedInput;
          console.log('Found nested slotted input:', this.slottedInput);
          break;
        }
      }
    }
    setTimeout(() => {
      if (this.calendarMonthRef && this.calendarMonthRef.shadowRoot) {
        const trElements = this.calendarMonthRef.shadowRoot.querySelectorAll('th');

        trElements.forEach(tr => {
          tr.style.backgroundColor = '#f0f0f0';
        });
      } else {
        console.warn('calendar-month shadowRoot is closed or unavailable');
      }
    }, 100);
  }

  render() {
    return (
      <Host data-version={version}>
        <div class="calendar" onClick={e => this.show(e.currentTarget as HTMLElement)}>
          <slot name="input"></slot>
        </div>
        <post-popovercontainer
          placement="bottom"
          ref={e => (this.popoverRef = e)}
          manualClose={true}
        >
          <calendar-range
            ref={el => {
              this.calendarRef = el;
              if (this.calendarRef) {
                this.calendarRef.addEventListener('change', this.handleCalendarChange);
              }
            }}
            locale="el"
            formatWeekday="short"
            months="1"
            part="datepicker"
          >
            <div slot="previous">
              <post-icon name="2110" aria-label="Previous"></post-icon>
            </div>
            <div slot="next">
              <post-icon name="2111" aria-label="Next"></post-icon>
            </div>
            <div slot="heading">
              <div class="form-floating">
                <select
                  id="bc251cd0-5173-463b-8729-586bb1bf1e1a--default"
                  class="form-select"
                  aria-describedby="form-hint-bc251cd0-5173-463b-8729-586bb1bf1e1a--default"
                >
                  <option value="value_1">Februar 2025</option>
                  <option value="value_2">March 2025</option>
                  <option value="value_3">Option 4</option>
                  <option value="value_4">Option 5</option>
                </select>
              </div>
            </div>
            <calendar-month
              ref={el => {
                this.calendarMonthRef = el;
              }}
            ></calendar-month>
          </calendar-range>
        </post-popovercontainer>
      </Host>
    );
  }
}
