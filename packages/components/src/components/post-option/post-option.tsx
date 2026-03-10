import { Component, Element, Event, EventEmitter, Host, h, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';

let optionId = 0;

/**
 * @slot default - The option label content
 */
@Component({
  tag: 'post-option',
  styleUrl: 'post-option.scss',
})
export class PostOption {
  private internalId = `post-option-${optionId++}`;

  @Element() host: HTMLPostOptionElement;

  /**
   * The value of the option. This is what gets submitted when the option is selected.
   */
  @Prop({ reflect: true }) value!: string;

  /**
   * If `true`, the option is disabled and cannot be selected.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * If `true`, the option is currently selected.
   * This is managed by the parent listbox/autocomplete.
   */
  @Prop({ reflect: true }) selected = false;

  /**
   * Emitted when the option is clicked or selected via keyboard.
   */
  @Event() postOptionSelect: EventEmitter<string>;

  @Watch('value')
  validateValue() {
    checkRequiredAndType(this, 'value', 'string');
  }

  connectedCallback() {
    this.host.setAttribute('data-version', version);
    this.validateValue();
    this.setupAttributes();
  }

  private setupAttributes() {
    // Set ARIA attributes for accessibility
    this.host.setAttribute('role', 'option');
    this.host.setAttribute('id', this.host.id || this.internalId);
    this.updateAriaSelected();
    this.updateAriaDisabled();
  }

  @Watch('selected')
  updateAriaSelected() {
    this.host.setAttribute('aria-selected', String(this.selected));
  }

  @Watch('disabled')
  updateAriaDisabled() {
    this.host.setAttribute('aria-disabled', String(this.disabled));
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.postOptionSelect.emit(this.value);
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.postOptionSelect.emit(this.value);
    }
  };

  render() {
    return (
      <Host onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
        <slot></slot>
      </Host>
    );
  }
}
