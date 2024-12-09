import { Component, Element, Prop, Host, State, h } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot for placing the title
 * @slot post-listbox-item - Slot for placing the listbox items
 */

@Component({
  tag: 'post-listbox',
  styleUrl: 'post-listbox.scss',
  shadow: false,
})
export class PostListbox {
  @Element() host: HTMLPostListboxElement;

  /**
   * The unique title of the list that is also referenced in the labelledby
   */
  @State() titleId: string;

  /**
   * The state of the dropdown functionality
   */
  @State() isOpen: boolean = false;

  private toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  private lastFocusedElement: HTMLElement | null = null;
  /**
   * If `true`, the list title will be hidden. Otherwise, it will be displayed.`
   */
  @Prop() readonly titleHidden: boolean = false;

  private titleEl: HTMLElement;

  componentWillLoad() {
    /**
     * Get the id set on the host element or use a random id by default
     */
    this.titleId = `list-${crypto.randomUUID()}`;
  }

  componentDidLoad() {
    this.checkTitle();
    this.handleFocus();
  }

  private handleFocus() {
    this.lastFocusedElement = document.activeElement as HTMLElement;

    const listboxItems = document.querySelectorAll('post-listbox-item');
    console.log(listboxItems);
    // if (menuItems.length > 0) {
    //   (menuItems[0] as HTMLElement).focus();
    // }
  }

  private checkTitle() {
    if (!this.titleEl.textContent.trim()) {
      throw new Error(
        'Please provide a title to the listbox component. Title is mandatory for accessibility purposes.',
      );
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <div
          ref={el => (this.titleEl = el)}
          id={this.titleId}
          class={`listbox-title${this.titleHidden ? ' visually-hidden' : ''}`}
        >
          <slot></slot>
        </div>
        <div
          role="listbox"
          aria-labelledby={this.titleId}
          aria-orientation="vertical"
          class={`listbox-container${this.isOpen ? ' open' : ''}`}
          onClick={() => this.toggleDropdown()}
          tabindex="0"
        >
          <slot name="post-listbox-item"></slot>
        </div>
      </Host>
    );
  }
}
