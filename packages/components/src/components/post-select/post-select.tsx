import { version } from '@root/package.json';
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from '@stencil/core';

interface SelectOptionElement extends HTMLElement {
  value: string;
  icon?: string;
  selected: boolean;
  disabled: boolean;
}

/**
 * @slot - Options to display in the select.
 */
@Component({
  tag: 'post-select',
  styleUrl: 'post-select.scss',
  shadow: true,
})
export class PostSelect {
  @Element() host: HTMLPostSelectElement;

  private select?: HTMLSelectElement;
  private observer?: MutationObserver;

  @State() private optionsVersion = 0;

  /** The selected option value. */
  @Prop({ reflect: true, mutable: true }) value?: string;

  /** Text displayed when no option is selected. */
  @Prop() readonly placeholder: string = 'Select an option';

  /** Disables the select. */
  @Prop({ reflect: true }) readonly disabled: boolean = false;

  /** Accessible name for the select. Prefer an associated visible label where possible. */
  @Prop({ attribute: 'aria-label' }) readonly accessibleLabel?: string;

  /** ID of the visible label that names the select. */
  @Prop({ attribute: 'aria-labelledby' }) readonly ariaLabelledby?: string;

  /** Emitted when the selected value changes. */
  @Event() postChange: EventEmitter<string>;

  private get options(): SelectOptionElement[] {
    return Array.from(this.host.querySelectorAll<SelectOptionElement>('post-select-option'));
  }

  componentDidLoad() {
    this.observer = new MutationObserver(() => this.optionsVersion++);
    this.observer.observe(this.host, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['value', 'icon', 'disabled', 'hidden'],
      characterData: true,
    });
    this.syncValue();
  }

  disconnectedCallback() {
    this.observer?.disconnect();
  }

  componentDidRender() {
    this.syncValue();
  }

  @Watch('value')
  valueChanged() {
    this.syncValue();
  }

  private syncValue() {
    if (this.select) this.select.value = this.value ?? '';
    this.options.forEach(option => {
      option.selected = option.value === this.value;
    });
  }

  private handleChange = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;
    if (this.value !== value) {
      this.value = value;
      this.postChange.emit(value);
    }
  };

  private populateOption(element: HTMLOptionElement, source: SelectOptionElement) {
    // Clone author-provided markup so the native option keeps its text fallback in older browsers.
    if (source.childNodes.length > 0) {
      element.replaceChildren(...Array.from(source.childNodes, node => node.cloneNode(true)));
    } else {
      const label = document.createElement('span');
      label.textContent = source.value;
      if (source.icon) {
        const icon = document.createElement('post-icon');
        icon.setAttribute('name', source.icon);
        icon.setAttribute('aria-hidden', 'true');
        element.replaceChildren(icon, label);
      } else {
        element.replaceChildren(label);
      }
    }
  }

  render() {
    void this.optionsVersion;

    return (
      <Host data-version={version}>
        <select
          part="post-select-trigger"
          aria-label={this.accessibleLabel}
          aria-labelledby={this.ariaLabelledby}
          disabled={this.disabled}
          ref={element => (this.select = element)}
          onChange={this.handleChange}
        >
          <button type="button" aria-hidden="true" tabIndex={-1}>
            {h('selectedcontent', null)}
          </button>
          <option value="" disabled hidden>
            {this.placeholder}
          </option>
          {this.options.map(option => (
            <option
              value={option.value}
              disabled={option.disabled}
              hidden={Boolean(option.hidden)}
              ref={element => element && this.populateOption(element, option)}
            ></option>
          ))}
        </select>
      </Host>
    );
  }
}
