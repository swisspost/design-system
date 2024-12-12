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
   * The listbox title element
   */
  private labelEl: HTMLElement;

  /**
   * The ID of the currently active listbox item
   */
  @State() activeDescendantId: string | null = null;

  /**
   * The selected listbox item id in case of single-select list or an array of ids in case of multiselect
   */

  @State() selectedItems: string[] = [];

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

  /**
   * A string to be highlighted to indicate a search term
   */
  @Prop() readonly searchTerm?: string;

  private checkLabel() {
    if (!this.labelEl.textContent?.trim()) {
      throw new Error(
        'Please provide a label to the listbox component. Label is mandatory for accessibility purposes.',
      );
    }
  }

  // Initialize any pre-selected items
  private initializeSelectedItems = () => {
    const preselectedItems = this.host.querySelectorAll('[slot="post-listbox-item"][selected]');
    this.selectedItems = Array.from(preselectedItems).map(item => item.id);
  };

  // Set focus to the activeDescendant
  private setActiveDescendant(item: HTMLElement) {
    this.activeDescendantId = item.id;
    item.scrollIntoView({ block: 'nearest' });
    item.focus();
  }

  private handleFocus = () => {
    const activeDescendant = this.activeDescendantId
      ? this.host.querySelector(`#${this.activeDescendantId}`)
      : null;

    const listboxItems = Array.from(
      this.host.querySelectorAll<HTMLElement>('[slot="post-listbox-item"]'),
    );

    // Sort selected items by their order in the list
    const sortedSelectedItems = this.selectedItems
      .map(itemId => {
        return listboxItems.find(item => item.id === itemId);
      })
      .filter(Boolean) as HTMLElement[];

    // Sort the found elements by their position in the list
    sortedSelectedItems.sort((a, b) => {
      return listboxItems.indexOf(a) - listboxItems.indexOf(b);
    });

    // If there's an active descendant focus on that, otherwise, focus the first item
    if (activeDescendant) {
      if (!this.multiselect) {
        this.setActiveDescendant(activeDescendant as HTMLElement);
      } else {
        this.setActiveDescendant(sortedSelectedItems[0] as HTMLElement);
      }
    } else if (listboxItems) {
      this.setActiveDescendant(listboxItems[0] as HTMLElement);
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
      case ' ':
        // If multiselect, handle item select with Space
        if (this.multiselect) {
          this.handleItemSelect(listboxItems[currentIndex].id);
          e.preventDefault();
        }
        return;
      default:
        return;
    }
    e.preventDefault();
    this.setActiveDescendant(listboxItems[nextIndex]);
    if (!this.multiselect) {
      {
        // If simple select, allow default selection behavior
        this.handleItemSelect(listboxItems[nextIndex].id);
      }
    }
  };

  private handleItemClick = (e: MouseEvent) => {
    // Find the closest post-listbox-item
    const clickedItem = (e.target as HTMLElement).closest('[role="option"]') as HTMLElement;
    if (clickedItem) {
      this.setActiveDescendant(clickedItem);
      this.handleItemSelect(clickedItem.id);
    }
  };

  private handleItemSelect = (item: string) => {
    const option = this.host.querySelector(`#${item}`); // Assuming item is the id of the option
    if (this.multiselect) {
      // Multi-select logic: Toggle selection of item
      if (this.selectedItems.includes(item)) {
        // Remove the item if it is already selected
        this.selectedItems = this.selectedItems.filter(selected => selected !== item);
        if (option) {
          option.removeAttribute('selected');
        }
      } else {
        // Add the item to the selected list
        this.selectedItems = [...this.selectedItems, item];
        if (option) {
          option.setAttribute('selected', 'selected');
        }
      }
    } else {
      // Single-select logic
      if (this.selectedItems[0] !== item) {
        this.selectedItems = [item]; // Clear previous selection and select the new one
        // Remove 'selected' attribute from all options
        const allOptions = this.host.querySelectorAll('[role="option"]');
        allOptions.forEach(opt => {
          if (opt.hasAttribute('selected')) {
            opt.removeAttribute('selected'); // Remove selected from all options
          }
        });

        // Add 'selected' to the clicked option
        if (option) {
          option.setAttribute('selected', 'selected');
        }
      }
    }
  };

  private highlightSearch() {
    const listboxItems = Array.from(
      this.host.querySelectorAll<HTMLElement>('[slot="post-listbox-item"]'),
    );
    listboxItems.forEach(item => {
      const text = item.textContent;
      const regex = new RegExp(`(${this.searchTerm})`, 'gi');
      item.innerHTML = text.replace(regex, '<mark>$1</mark>');
    });
  }

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
    this.initializeSelectedItems();
    if (this.searchTerm) {
      this.highlightSearch();
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
