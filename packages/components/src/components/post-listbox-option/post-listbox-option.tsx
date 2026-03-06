import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-listbox-option',
  styleUrl: 'post-listbox-option.scss',
  shadow: true,
})
export class PostListboxOption {
  private readonly id = crypto.randomUUID();
  /** A value string, similar to <option value="val1">Value 1</option> */
  @Prop({ reflect: true }) readonly value!: string;

  /** Represents option is selected . */
  @Prop() readonly selected: boolean = false;

  /** Represents option is highlighted . */
  @Prop() readonly highlighted: boolean = false;

  /** Fires when this option was selected. Bubbles up. */
  @Event() postOptionSelected: EventEmitter<string>;

  render() {
    return (
      <Host
        data-version={version}
        role="option"
        aria-selected={this.selected}
        data-active={this.highlighted ? 'true' : null}
        onClick={() => this.postOptionSelected.emit(this.value)}
        id={`post-listbox-option-${this.id}`}
      >
        <slot>{this.value}</slot>
        {this.selected && <post-icon name="checkmark"></post-icon>}
      </Host>
    );
  }
}
