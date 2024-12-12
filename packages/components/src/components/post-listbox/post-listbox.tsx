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
  @Element() host: HTMLPostListboxElement;

  /**
   * The unique label of the list that is also referenced in the labelledby
   */
  @State() labelId: string;

  /**
   * The ID of the currently active listbox item
   */
  @State() activeDescendantId: string | null = null;

  /**
   * The listbox title element
   */
  private labelEl: HTMLElement;

  /**
   * If `true`, the listbox title will be hidden. Otherwise, it will be displayed
   */
  @Prop() readonly labelHidden: boolean = false;

  /**
   * The description of the listbox
   */
  @Prop() readonly listboxDescription?: string;

  /**
   * If `true`, the listbox is multiselectable
   */
  @Prop() readonly multiselect: boolean = false;

  @State() selectedItems: string[] = [];

  private handleFocus = () => {
    const activeDescendant = this.activeDescendantId
      ? this.host.querySelector(`#${this.activeDescendantId}`)
      : null;
    const firstItem = this.host.querySelector('[role="option"]');

    // If there's an active descendant, focus it; otherwise, focus the first item
    if (activeDescendant) {
      this.setActiveDescendant(activeDescendant as HTMLElement);
    } else if (firstItem) {
      this.setActiveDescendant(firstItem as HTMLElement);
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const listboxItems = Array.from(
      this.host.querySelectorAll<HTMLElement>('[slot="post-listbox-item"]'),
    );

    if (!listboxItems.length) return;

    const currentIndex = listboxItems.findIndex(item => item.id === this.activeDescendantId);
    let nextIndex = currentIndex;

    switch (e.key) {
      case 'ArrowUp':
        nextIndex = currentIndex > 0 ? currentIndex - 1 : listboxItems.length - 1;
        break;
      case 'ArrowDown':
        nextIndex = currentIndex < listboxItems.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = listboxItems.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    this.setActiveDescendant(listboxItems[nextIndex]);
  };

  private setActiveDescendant(item: HTMLElement) {
    this.activeDescendantId = item.id;
    item.scrollIntoView({ block: 'nearest' });
    item.focus();
  }

  private checkLabel() {
    if (!this.labelEl.textContent?.trim()) {
      throw new Error(
        'Please provide a label to the listbox component. Label is mandatory for accessibility purposes.',
      );
    }
  }

  private handleItemClick = (e: MouseEvent) => {
    // Find the closest post-listbox-item
    const clickedItem = (e.target as HTMLElement).closest('[role="option"]') as HTMLElement;
    if (clickedItem) {
      this.setActiveDescendant(clickedItem);
      console.log(clickedItem.id);
      this.handleItemSelect(clickedItem.id);
    }
  };

  private handleItemSelect = (item: string) => {
    if (this.multiselect) {
      // If multiselect is enabled, add item
      this.selectedItems = [...this.selectedItems, item];
    } else {
      // If multiselect not enabled, replace the item
      this.selectedItems = [item];
    }
    console.log(this.selectedItems);
  };

  componentWillLoad() {
    // Generate a random id for the listbox
    this.labelId = `listbox-${crypto.randomUUID()}`;

    // Ensure each listbox item has a unique id
    const listboxItems = Array.from(
      this.host.querySelectorAll<HTMLElement>('[slot="post-listbox-item"]'),
    );
    listboxItems.forEach((item, index) => {
      if (!item.id) {
        item.id = `listbox-item-${this.labelId}-${index}`;
      }
    });

    // Set the first item as the default active descendant
    if (!this.activeDescendantId && listboxItems.length > 0) {
      this.setActiveDescendant(listboxItems[0]);
    }
  }

  componentDidLoad() {
    this.checkLabel();
  }

  connectedCallback() {
    this.host.addEventListener('keydown', this.handleKeyDown);
    this.host.addEventListener('click', this.handleItemClick);
  }

  disconnectedCallback() {
    this.host.removeEventListener('keydown', this.handleKeyDown);
    this.host.removeEventListener('click', this.handleItemClick);
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
          aria-activedescendant={this.activeDescendantId || undefined}
          onFocus={this.handleFocus}
        >
          <slot name="post-listbox-item"></slot>
        </div>
      </Host>
    );
  }
}
