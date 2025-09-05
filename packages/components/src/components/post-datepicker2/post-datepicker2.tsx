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

interface AirDatepickerCustomOptions extends AirDatepickerOptions<HTMLDivElement> {
  onShow?: (isAnimationComplete: boolean) => void;
}

@Component({
  tag: 'post-datepicker2',
  styleUrl: 'post-datepicker2.scss',
  shadow: true,
})
export class PostDatepicker2 {
  @Element() host: HTMLPostDatepicker2Element;

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

  /**Locale prop to set translations */
  @Prop() locale: string = 'en';

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

  @EventFrom('post-popovercontainer')
  private readonly handlePostToggle = (event: CustomEvent<boolean>) => {
      this.isVisible = event.detail;
      this.toggleCalendar.emit(this.isVisible);
    };

  private popoverRef: HTMLPostPopovercontainerElement;
  private datepickerEl: HTMLInputElement;
  private datepickerInstance: AirDatepicker<HTMLDivElement>;
  private datepickerContainerEl: HTMLDivElement;

  private configDatepicker() {
    const slot = this.host.shadowRoot.querySelector('slot');
    const assignedNodes = slot && (slot as HTMLSlotElement).assignedElements();
    this.datepickerEl = assignedNodes?.find(el => el.tagName === 'INPUT') as HTMLInputElement;
    this.datepickerContainerEl = this.host.shadowRoot.querySelector('.datepicker-container');
    if (this.datepickerEl && this.datepickerContainerEl) {
      const options: AirDatepickerCustomOptions = {
        navTitles: {
          days: '<strong>MMMM yyyy</strong>',
          months: '<strong>yyyy</strong>',
        },
        range: true,
        inline: true,
        autoClose: true,
        showOtherMonths: false,
        locale: localesMap[this.locale] || localesMap.en,
        dateFormat: (localesMap[this.locale] || localesMap.en).dateFormat,
        view: 'days',
        onSelect: ({ formattedDate }) => {
          this.datepickerEl.value = Array.isArray(formattedDate)
            ? formattedDate.join(' - ')
            : formattedDate;
          this.popoverRef?.hide();
        },
      };

      this.datepickerInstance = new AirDatepicker(
        this.datepickerContainerEl,
        options as AirDatepickerOptions<HTMLDivElement>,
      );

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

  async componentDidLoad() {
    this.configDatepicker();
    if (this.popoverRef) {
      this.popoverRef.addEventListener('postToggle', this.handlePostToggle);
    }
  }

  disconnectedCallback() {
    if (this.datepickerInstance) {
      this.datepickerInstance.destroy();
      this.datepickerInstance = null;
    }
    this.popoverRef?.removeEventListener('postToggle', this.handlePostToggle);
  }

  render() {
    return (
      <Host>
        <div class="calendar" onClick={e => this.show(e.currentTarget as HTMLElement)}>
          <slot></slot>
          <post-popovercontainer
            placement="bottom"
            ref={e => (this.popoverRef = e)}
            manualClose={false}
          >
            <div class="datepicker-container"></div>
          </post-popovercontainer>
        </div>
      </Host>
    );
  }
}
