import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { version } from '@root/package.json';

let optionIdCounter = 0;

/**
 * @slot - Default slot for the option text content.
 */

@Component({
  tag: 'post-listbox-option',
  styleUrl: 'post-listbox-option.scss',
  shadow: true,
})
export class PostListboxOption {
  private optionId: string;

  @Element() host: HTMLPostListboxOptionElement;

  /**
   * A value string, similar to `<option value="val1">Value 1</option>`.
   */
  @Prop({ reflect: true }) readonly value: string;

  /**
   * Represents an initially selected option.
   */
  @Prop({ reflect: true, mutable: true }) selected: boolean = false;

  /**
   * Whether this option is currently the active descendant (visually highlighted).
   * Managed by the parent listbox or autocomplete.
   */
  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /**
   * Fires when this option is selected. Bubbles up to the listbox and autocomplete.
   */
  @Event({ bubbles: true, composed: true }) postOptionSelected: EventEmitter<{
    value: string;
    text: string;
  }>;

  connectedCallback() {
    this.optionId = `post-listbox-option-${optionIdCounter++}`;
    this.host.setAttribute('data-version', version);
    this.host.setAttribute('role', 'option');
    this.host.id = this.host.id || this.optionId;
  }

  /**
   * Selects this option and emits the postOptionSelected event.
   */
  @Method()
  async select(): Promise<void> {
    this.selected = true;
    const text = this.host.textContent?.trim() || '';
    this.postOptionSelected.emit({
      value: this.value ?? text,
      text,
    });
  }

  private handleClick = () => {
    this.select();
  };

  render() {
    return (
      <Host
        data-version={version}
        onClick={this.handleClick}
        aria-selected={String(this.active)}
      >
        <slot></slot>
      </Host>
    );
  }
}
