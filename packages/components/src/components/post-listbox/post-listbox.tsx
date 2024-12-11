import { Component, Element, Prop, Host, State, h } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot for placing the label
 * @slot post-listbox-item - Slot for placing the listbox items
 */

@Component({
  tag: 'post-listbox',
  styleUrl: 'post-listbox.scss',
  shadow: false,
})
export class PostListbox {
  // private readonly KEYCODES = {
  //   SPACE: ' ',
  //   ENTER: 'Enter',
  //   UP: 'ArrowUp',
  //   DOWN: 'ArrowDown',
  //   HOME: 'Home',
  //   END: 'End',
  // };

  @Element() host: HTMLPostListboxElement;

  /**
   * The unique label of the list that is also referenced in the labelledby
   */
  @State() labelId: string;

  /**
   * The listbox title element
   */
  private labelEl: HTMLElement;

  /**
   * If `true`, the listbox title will be hidden. Otherwise, it will be displayed.
   */
  @Prop() readonly labelHidden: boolean = false;

  /**
   * The description of the listbox role
   */

  @Prop() readonly listboxDescription?: string;

  /**
   * If `true`, the listbox is multiselectable.
   */

  @Prop() readonly multiselect: boolean = false;

  private handleKeyDown = (e: KeyboardEvent) => {
    console.log(e);
    const listboxItems = Array.from(
      this.host.querySelectorAll<HTMLElement>('[slot="post-listbox-item"]'),
    );
    if (!listboxItems.length) return;
  };

  private checkLabel() {
    if (!this.labelEl.textContent?.trim()) {
      throw new Error(
        'Please provide a title to the listbox component. Title is mandatory for accessibility purposes.',
      );
    }
  }

  componentWillLoad() {
    /**
     * Get the id set on the host element or use a random id by default
     */
    this.labelId = `list-${crypto.randomUUID()}`;
  }

  componentDidLoad() {
    this.checkLabel();
  }

  componentDidRender() {}

  connectedCallback() {
    this.host.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.host.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <Host data-version={version}>
        <div
          role="label"
          ref={el => (this.labelEl = el)}
          id={this.labelId}
          class={`listbox-label${this.labelHidden ? ' visually-hidden' : ''}`}
        >
          <slot></slot>
        </div>
        <div
          role="listbox"
          tabindex="0"
          aria-labelledby={this.labelId}
          aria-orientation="vertical"
          aria-multiselectable={this.multiselect}
          aria-roledescription={this.listboxDescription}
          aria-activedescendant="id-ref"
        >
          <slot name="post-listbox-item"></slot>
        </div>
      </Host>
    );
  }
}
