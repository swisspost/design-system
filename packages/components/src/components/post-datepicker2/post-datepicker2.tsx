import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import AirDatepicker, { AirDatepickerOptions } from 'air-datepicker';

import { localesMap } from './locales';

interface AirDatepickerWithView extends AirDatepicker {
  setCurrentView: (view: string) => void;
}

interface AirDatepickerCustomOptions extends AirDatepickerOptions<HTMLInputElement> {
  onShow?: (isAnimationComplete: boolean) => void;
}

@Component({
  tag: 'post-datepicker2',
  styleUrl: 'post-datepicker2.scss',
  shadow: true,
})
export class PostDatepicker2 {
  @Element() host: HTMLPostDatepicker2Element;
  /**Locale prop to handle translations */
  @Prop() locale: string = 'en';

  private datepickerEl: HTMLInputElement;
  private datepickerInstance: AirDatepicker;

  async componentDidLoad() {
    const slot = this.host.shadowRoot.querySelector('slot');
    const assignedNodes = slot && (slot as HTMLSlotElement).assignedElements();
    this.datepickerEl = assignedNodes?.find(el => el.tagName === 'INPUT') as HTMLInputElement;

    if (this.datepickerEl) {
      const options: AirDatepickerCustomOptions = {
        autoClose: true,
        locale: localesMap[this.locale] || localesMap.en,
        dateFormat: (localesMap[this.locale] || localesMap.en).dateFormat,
        view: 'days',
        onSelect: ({ formattedDate }) => {
          this.datepickerEl.value = Array.isArray(formattedDate)
            ? formattedDate.join(' - ')
            : formattedDate;
        },
        onShow: () => {
          const navTitle = document.querySelector('.air-datepicker-nav--title');
          if (navTitle) {
            navTitle.addEventListener('click', () => {
              if (this.datepickerInstance) {
                (this.datepickerInstance as AirDatepickerWithView).setCurrentView('years');
              }
            });
          }
        },
      };

      this.datepickerInstance = new AirDatepicker(
        this.datepickerEl,
        options as AirDatepickerOptions<HTMLInputElement>,
      );
      this.loadAirDatepickerStyles();
    }
  }

  @Watch('locale')
  localeChangedHandler(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.datepickerInstance.update({
        locale: localesMap[newValue] || localesMap.en,
        dateFormat: (localesMap[newValue] || localesMap.en).dateFormat,
      });
    }
  }

  disconnectedCallback() {
    if (this.datepickerInstance) {
      this.datepickerInstance.destroy();
    }
  }

  private loadAirDatepickerStyles() {
    const id = 'air-datepicker-style';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/air-datepicker@3.6.0/air-datepicker.css';
      document.head.appendChild(link);
    }
  }

  render() {
    return (
      <Host>
        <div class="datepicker-container">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
