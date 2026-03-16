import { Component, Element, Event, EventEmitter, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';

// Module-level ID counter for generating unique option IDs.
// Matches existing codebase pattern (see post-card-control.tsx).
let optionIds = 0;

@Component({
  tag: 'post-option',
  styleUrl: 'post-option.scss',
})
export class PostOption {
  @Element() host: HTMLElement;

  /**
   * The value of this option. Used as the selection value when the option is chosen.
   */
  @Prop() readonly value!: string;

  @Watch('value')
  validateValue() {
    checkRequiredAndType(this, 'value', 'string');
  }

  /**
   * Whether this option is currently selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * Whether this option is disabled and cannot be selected.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false;

  /**
   * Emitted when the option is clicked or activated. Detail: `{ value: string }`.
   */
  @Event() postOptionSelected: EventEmitter<{ value: string }>;

  connectedCallback() {
    this.host.setAttribute('data-version', version);
    this.host.setAttribute('role', 'option');

    if (!this.host.id) {
      this.host.id = `post-option-${optionIds++}`;
    }

    this.host.addEventListener('click', this.handleClick);
  }

  componentDidLoad() {
    this.validateValue();
    this.updateAria();
  }

  disconnectedCallback() {
    this.host.removeEventListener('click', this.handleClick);
  }

  @Watch('selected')
  @Watch('disabled')
  updateAria() {
    this.host.setAttribute('aria-selected', String(this.selected));
    this.host.setAttribute('aria-disabled', String(this.disabled));
  }

  private readonly handleClick = () => {
    if (this.disabled) return;
    this.postOptionSelected.emit({ value: this.value });
  };
}
