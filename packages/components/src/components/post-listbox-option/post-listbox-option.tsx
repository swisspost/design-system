import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
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
   * Managed by the parent listbox.
   */
  @State() active: boolean = false;

  /**
   * Whether this option is hidden by filtering.
   * Managed by the parent listbox.
   */
  @State() hidden: boolean = false;

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
  }

  componentWillLoad() {
    // Set up role and id through the host element
    this.host.setAttribute('role', 'option');
    this.host.id = this.host.id || this.optionId;
  }

  /**
   * Returns the text content of the option.
   */
  public getTextContent(): string {
    return this.host.textContent?.trim() || '';
  }

  /**
   * Returns the unique id of this option element.
   */
  public getOptionId(): string {
    return this.host.id;
  }

  /**
   * Sets the active (highlighted) state.
   */
  public setActive(isActive: boolean): void {
    this.active = isActive;
    this.host.setAttribute('aria-selected', String(isActive));
  }

  /**
   * Sets the hidden (filtered out) state.
   */
  public setHidden(isHidden: boolean): void {
    this.hidden = isHidden;
    this.host.style.display = isHidden ? 'none' : '';
  }

  /**
   * Selects this option and emits the selection event.
   */
  public select(): void {
    this.selected = true;
    this.postOptionSelected.emit({
      value: this.value ?? this.getTextContent(),
      text: this.getTextContent(),
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
        class={{
          'active': this.active,
          'selected': this.selected,
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}
