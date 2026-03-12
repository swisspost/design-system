import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch } from '@stencil/core';
import { checkEmptyOrType } from '@/utils';
import { version } from '@root/package.json';

let optionIds = 0;

/**
 * @class PostOption - A selectable option for use within a post-listbox.
 *
 * @slot default - The content/label of the option.
 */
@Component({
  tag: 'post-option',
  styleUrl: 'post-option.scss',
  shadow: true,
})
export class PostOption {
  private optionId = `post-option-${optionIds++}`;

  @Element() host: HTMLElement;

  /**
   * The value associated with this option. If not provided, the text content of the option will be used.
   */
  @Prop({ reflect: true }) value?: string;

  /**
   * Whether this option is currently selected.
   */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /**
   * Whether this option is disabled and cannot be selected.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Emitted when the option is selected via click or keyboard interaction.
   * The event bubbles up to allow the listbox to handle selection.
   */
  @Event() postOptionSelected: EventEmitter<{ value: string; label: string }>;

  @Watch('value')
  validateValue() {
    checkEmptyOrType(this, 'value', 'string');
  }

  /**
   * Gets the display label of this option (text content).
   */
  private getLabel(): string {
    return this.host.textContent?.trim() || '';
  }

  /**
   * Gets the value of this option, falling back to the label if no value prop is set.
   */
  private getValue(): string {
    return this.value ?? this.getLabel();
  }

  private handleClick = (e: MouseEvent) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.postOptionSelected.emit({
      value: this.getValue(),
      label: this.getLabel(),
    });
  };

  componentDidLoad() {
    this.validateValue();
  }

  render() {
    return (
      <Host
        data-version={version}
        id={this.optionId}
        role="option"
        aria-selected={this.selected ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : null}
        tabindex="-1"
        onClick={this.handleClick}
      >
        <div
          class={{
            option: true,
            'is-selected': this.selected,
            'is-disabled': this.disabled,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
