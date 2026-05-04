import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-listbox-option',
  styleUrl: 'post-listbox-option.scss',
  shadow: true,
})
export class PostListboxOption {
  private readonly optionId = crypto.randomUUID();
  /** A value string, similar to <option value="Value 1">Value 1 description</option> */
  @Prop({ reflect: true }) readonly value!: string;

  /** Represents option is selected . */
  @Prop({ reflect: true }) readonly selected: boolean = false;

  /** Represents option is highlighted . */
  @Prop({ reflect: true }) readonly highlighted: boolean = false;

  /** Fires when this option was selected. Bubbles up. */
  @Event() postOptionSelected: EventEmitter<string>;

  render() {
    return (
      <Host
        data-version={version}
        role="option"
        aria-selected={`${this.selected}`}
        data-active={this.highlighted ? 'true' : null}
        /* Prevent focus change from triggering onblur event in post-autocomplete */
        onPointerDown={(e: PointerEvent) => e.preventDefault()}
        onClick={() => this.postOptionSelected.emit(this.value)}
        id={`post-listbox-option-${this.optionId}`}
      >
        <span class="option-content">
          {this.value}
          <span class="option-description">
            <slot></slot>
          </span>
        </span>
        {this.selected && <post-icon aria-hidden="true" name="checkmark"></post-icon>}
      </Host>
    );
  }
}
