import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  Watch,
} from '@stencil/core';
import { checkEmptyOrType } from '@/utils';
import { version } from '@root/package.json';

let optionIds = 0;

/**
 * @slot default - The text content of the option.
 */
@Component({
  tag: 'post-option',
  styleUrl: 'post-option.scss',
})
export class PostOption {
  private optionId: string;

  @Element() host: HTMLPostOptionElement;

  /**
   * The value of the option, similar to `<option value="val1">`.
   */
  @Prop({ reflect: true }) readonly value?: string;

  /**
   * Whether this option is currently selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * Whether this option is currently active (highlighted via keyboard navigation).
   * This is managed by the parent listbox/autocomplete.
   */
  @Prop({ reflect: true, mutable: true }) active = false;

  /**
   * Fires when this option is selected (via click, Enter, or Space).
   */
  @Event() postOptionSelected: EventEmitter<{
    value: string;
    text: string;
    id: string;
  }>;

  @Watch('value')
  validateValue() {
    checkEmptyOrType(this, 'value', 'string');
  }

  /**
   * Sets the selected state of this option.
   * @param value - Whether the option should be selected.
   */
  @Method()
  async setSelected(value: boolean) {
    this.selected = value;
  }

  /**
   * Sets the active state of this option (keyboard navigation highlight).
   * @param value - Whether the option should be active.
   */
  @Method()
  async setActive(value: boolean) {
    this.active = value;
  }

  connectedCallback() {
    this.optionId = this.host.id || `post-option-${optionIds++}`;
    if (!this.host.id) {
      this.host.id = this.optionId;
    }

    this.host.setAttribute('role', 'option');
    this.host.setAttribute('data-version', version);
    this.host.addEventListener('click', this.handleClick);
    this.host.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.host.removeEventListener('click', this.handleClick);
    this.host.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidLoad() {
    this.validateValue();
  }

  componentWillRender() {
    this.host.setAttribute('aria-selected', String(this.selected));
  }

  private emitSelection() {
    this.postOptionSelected.emit({
      value: this.value ?? '',
      text: this.host.textContent?.trim() ?? '',
      id: this.optionId,
    });
  }

  private readonly handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    this.emitSelection();
  };

  private readonly handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      this.emitSelection();
    }
  };

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
