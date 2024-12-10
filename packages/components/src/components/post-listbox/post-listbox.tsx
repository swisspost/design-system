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
  private readonly KEYCODES = {
    SPACE: ' ',
    ENTER: 'Enter',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    HOME: 'Home',
    END: 'End',
  };

  @Element() host: HTMLPostListboxElement;

  /**
   * The unique title of the list that is also referenced in the labelledby
   */
  @State() titleId: string;

  @State() activeItemId: string | null = null;

  /**
   * The id of the last focused listbox item
   */
  // private lastFocusedElement: HTMLElement | null = null;

  /**
   * If `true`, the listbox title will be hidden. Otherwise, it will be displayed.
   */
  @Prop() readonly titleHidden: boolean = false;

  /**
   * The listbox title element
   */
  private titleEl: HTMLElement;

  private handleKeyDown = (e: KeyboardEvent) => {
    console.log(e);
    const listboxItems = Array.from(
      this.host.querySelectorAll<HTMLElement>('[slot="post-listbox-item"]'),
    );
    if (!listboxItems.length) return;

    const currentFocusedElement = document.activeElement as HTMLElement;
    let currentIndex = listboxItems.findIndex(el => el === currentFocusedElement);

    switch (e.key) {
      case this.KEYCODES.UP:
        e.preventDefault();
        currentIndex = (currentIndex - 1 + listboxItems.length) % listboxItems.length;

        break;
      case this.KEYCODES.DOWN:
        e.preventDefault();
        currentIndex = (currentIndex + 1) % listboxItems.length;
        break;
      case this.KEYCODES.HOME:
        e.preventDefault();
        currentIndex = 0;
        break;
      case this.KEYCODES.END:
        e.preventDefault();
        currentIndex = listboxItems.length - 1;
        break;
      case this.KEYCODES.SPACE:
      case this.KEYCODES.ENTER:
        this.activeItemId = listboxItems[currentIndex]?.id ?? null;

        console.log(listboxItems[currentIndex].id);

        return;
      default:
        return;
    }

    if (listboxItems[currentIndex]) {
      listboxItems[currentIndex].focus();
    }
  };

  private checkTitle() {
    if (!this.titleEl.textContent?.trim()) {
      throw new Error(
        'Please provide a title to the listbox component. Title is mandatory for accessibility purposes.',
      );
    }
  }

  componentWillLoad() {
    /**
     * Get the id set on the host element or use a random id by default
     */
    this.titleId = `list-${crypto.randomUUID()}`;
  }

  componentDidLoad() {
    this.checkTitle();
  }

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
          tabindex="0"
          aria-activedescendant={this.activeItemId}
        >
          <slot name="post-listbox-item"></slot>
        </div>
      </Host>
    );
  }
}
