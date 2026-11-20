import { version } from '@root/package.json';
import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

/**
 * @slot - Optional custom content replacing the default text and icon presentation.
 */
@Component({
  tag: 'post-select-option',
  styleUrl: 'post-select-option.scss',
  shadow: true,
})
export class PostSelectOption {
  private readonly optionId = `post-select-option-${crypto.randomUUID()}`;

  /** Value associated with this option. Also used as its default label. */
  @Prop({ reflect: true }) readonly value!: string;

  /** Optional icon displayed before the option label. */
  @Prop() readonly icon?: string;

  /** Whether the option is selected. */
  @Prop({ reflect: true }) readonly selected: boolean = false;

  /** Whether the option is highlighted by keyboard navigation. */
  @Prop({ reflect: true }) readonly highlighted: boolean = false;

  /** Prevents this option from being selected. */
  @Prop({ reflect: true }) readonly disabled: boolean = false;

  /** Emitted when the option is selected. Bubbles to the parent select. */
  @Event() postOptionSelected: EventEmitter<string>;

  private handleClick = () => {
    if (!this.disabled) this.postOptionSelected.emit(this.value);
  };

  render() {
    return (
      <Host
        data-version={version}
        id={this.optionId}
        role="option"
        aria-selected={String(this.selected)}
        aria-disabled={this.disabled ? 'true' : null}
        data-active={this.highlighted ? 'true' : null}
        onPointerDown={(event: PointerEvent) => event.preventDefault()}
        onClick={this.handleClick}
      >
        <slot>
          {this.icon && <post-icon aria-hidden="true" name={this.icon}></post-icon>}
          <span>{this.value}</span>
        </slot>
        {this.selected && <post-icon aria-hidden="true" name="checkmark"></post-icon>}
      </Host>
    );
  }
}
