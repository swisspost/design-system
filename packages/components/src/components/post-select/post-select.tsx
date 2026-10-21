import { EventFrom } from '@/utils';
import { version } from '@root/package.json';
import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';

interface SelectOptionElement extends HTMLElement {
  value: string;
  icon?: string;
  selected: boolean;
  highlighted: boolean;
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

  private readonly listboxId = `post-select-listbox-${crypto.randomUUID()}`;
  private popoverContainer?: HTMLPostPopovercontainerElement;
  private activeIndex = -1;

  @State() private activeOptionId?: string;
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

  @State() private isOpen = false;

  private get options(): SelectOptionElement[] {
    return Array.from(this.host.querySelectorAll<SelectOptionElement>('post-select-option'));
  }

  componentDidLoad() {
    this.syncOptions();
  }

  @Watch('value')
  valueChanged() {
    this.syncOptions();
  }

  private syncOptions() {
    this.options.forEach(option => {
      option.selected = option.value === this.value;
    });
  }

  private async open() {
    if (this.disabled || this.isOpen) return;
    const trigger = this.host.shadowRoot.querySelector('button');
    await this.popoverContainer?.show(trigger);
    this.isOpen = true;
  }

  private async close() {
    if (!this.isOpen) return;
    this.activeIndex = -1;
    this.activeOptionId = undefined;
    this.isOpen = false;
    await this.popoverContainer?.hide();
  }

  private setActive(index: number) {
    const enabledOptions = this.options.filter(option => !option.disabled && !option.hidden);
    if (enabledOptions.length === 0) return;

    this.options.forEach(option => (option.highlighted = false));
    const option = enabledOptions[(index + enabledOptions.length) % enabledOptions.length];
    this.activeIndex = enabledOptions.indexOf(option);
    this.activeOptionId = option.id;
    option.highlighted = true;
    option.scrollIntoView({ block: 'nearest' });
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const enabledOptions = this.options.filter(option => !option.disabled && !option.hidden);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          void this.open();
          this.setActive(0);
        } else {
          this.setActive(this.activeIndex + 1);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          void this.open();
          this.setActive(enabledOptions.length - 1);
        } else {
          this.setActive(this.activeIndex - 1);
        }
        break;
      case 'Home':
        if (this.isOpen) {
          event.preventDefault();
          this.setActive(0);
        }
        break;
      case 'End':
        if (this.isOpen) {
          event.preventDefault();
          this.setActive(enabledOptions.length - 1);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isOpen) this.selectActive();
        else void this.open();
        break;
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          void this.close();
        }
        break;
      case 'Tab':
        void this.close();
        break;
    }
  };

  private selectActive() {
    const activeOption = this.options.find(option => option.highlighted && !option.disabled);
    if (activeOption) this.select(activeOption.value);
  }

  private select(value: string) {
    if (this.value !== value) {
      this.value = value;
      this.postChange.emit(value);
    }
    this.syncOptions();
    void this.close();
    this.host.shadowRoot.querySelector('button')?.focus();
  }

  private handlePopoverHide() {
    this.isOpen = false;
    this.activeIndex = -1;
    this.activeOptionId = undefined;
    this.options.forEach(option => (option.highlighted = false));
  }

  @Listen('postOptionSelected')
  @EventFrom('post-select-option')
  handleOptionSelected(event: CustomEvent<string>) {
    this.select(event.detail);
  }

  private handleSlotChange = () => {
    this.syncOptions();
    this.optionsVersion++;
  };

  render() {
    void this.optionsVersion;
    const selectedOption = this.options.find(option => option.value === this.value);

    return (
      <Host data-version={version}>
        <button
          type="button"
          part="post-select-trigger"
          role="combobox"
          aria-label={this.accessibleLabel}
          aria-labelledby={this.ariaLabelledby}
          aria-haspopup="listbox"
          aria-expanded={String(this.isOpen)}
          aria-controls={this.listboxId}
          aria-activedescendant={this.activeOptionId}
          disabled={this.disabled}
          onClick={() => (this.isOpen ? this.close() : this.open())}
          onKeyDown={this.handleKeyDown}
        >
          {selectedOption?.icon && (
            <post-icon aria-hidden="true" name={selectedOption.icon}></post-icon>
          )}
          <span class="selected-value">{selectedOption?.value ?? this.placeholder}</span>
          <post-icon aria-hidden="true" class="chevron" name="chevronDown"></post-icon>
        </button>
        <post-popovercontainer
          placement="bottom-start"
          ref={element => (this.popoverContainer = element)}
          onPostHide={() => this.handlePopoverHide()}
        >
          <div
            id={this.listboxId}
            role="listbox"
            aria-label={this.accessibleLabel}
            aria-labelledby={this.ariaLabelledby}
          >
            <slot onSlotchange={this.handleSlotChange}></slot>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
