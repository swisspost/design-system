import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  State,
} from '@stencil/core';
import { version } from '@root/package.json';

let listboxIdCounter = 0;

/**
 * @slot - Default slot for `<post-listbox-option>` elements.
 * @slot blank-slate - Content shown when no options match the current filter (e.g. an image or message).
 */

@Component({
  tag: 'post-listbox',
  styleUrl: 'post-listbox.scss',
  shadow: true,
})
export class PostListbox {
  private popoverRef: HTMLPostPopovercontainerElement;
  private listboxId: string;

  @Element() host: HTMLPostListboxElement;

  /**
   * Whether the listbox popover is currently open.
   */
  @State() isOpen: boolean = false;

  /**
   * The current number of visible (not filtered out) options.
   */
  @State() visibleCount: number = 0;

  /**
   * The live announcement text for screen readers.
   */
  @State() liveText: string = '';

  /**
   * Whether the blank-slate slot should be displayed.
   */
  @State() showBlankSlate: boolean = false;

  /**
   * Fires when the listbox visibility changes.
   */
  @Event({ bubbles: true, composed: true }) postListboxToggle: EventEmitter<{ isOpen: boolean }>;

  connectedCallback() {
    this.listboxId = this.host.id || `post-listbox-${listboxIdCounter++}`;
    if (!this.host.id) {
      this.host.id = this.listboxId;
    }
    this.host.setAttribute('data-version', version);
  }

  componentDidLoad() {
    this.host.setAttribute('role', 'listbox');
    this.updateVisibleCount();
  }

  /**
   * Listen for option selection events bubbling up from child options.
   */
  @Listen('postOptionSelected')
  handleOptionSelected(event: CustomEvent<{ value: string; text: string }>) {
    // Deselect all other options
    const options = this.getAllOptions();
    for (const option of options) {
      (option as any).selected = false;
      (option as any).active = false;
    }

    // The event target is the selected option
    const selectedOption = event.target as any;
    selectedOption.selected = true;

    // Close the listbox after selection
    this.hide();
  }

  /**
   * Filters the list of options using default text matching.
   * An empty string resets the filter to its original state.
   * @param query - The search query to filter options by.
   */
  @Method()
  async filter(query: string): Promise<void> {
    const options = this.getAllOptions();
    const normalizedQuery = query.toLowerCase().trim();

    for (const option of options) {
      if (!normalizedQuery) {
        option.style.display = '';
      } else {
        const text = (option.textContent || '').trim().toLowerCase();
        option.style.display = text.includes(normalizedQuery) ? '' : 'none';
      }
    }

    this.updateVisibleCount();
  }

  /**
   * Shows the listbox popover, positioning it relative to the given target element.
   * @param target - The element to anchor the popover to (typically the input field).
   */
  @Method()
  async show(target: HTMLElement): Promise<void> {
    if (this.popoverRef) {
      await this.popoverRef.show(target);
    }
  }

  /**
   * Hides the listbox popover.
   */
  @Method()
  async hide(): Promise<void> {
    if (this.popoverRef && this.isOpen) {
      await this.popoverRef.hide();
    }
  }

  /**
   * Returns all post-listbox-option children.
   */
  @Method()
  async getOptions(): Promise<HTMLPostListboxOptionElement[]> {
    return this.getAllOptions();
  }

  /**
   * Returns only the visible (non-hidden) options.
   */
  @Method()
  async getVisibleOptions(): Promise<HTMLPostListboxOptionElement[]> {
    return this.getAllOptions().filter(opt => opt.style.display !== 'none');
  }

  /**
   * Synchronous helper to get all options (for internal use without await).
   */
  private getAllOptions(): HTMLPostListboxOptionElement[] {
    return Array.from(this.host.querySelectorAll('post-listbox-option'));
  }

  private updateVisibleCount() {
    const count = this.getAllOptions().filter(opt => opt.style.display !== 'none').length;
    this.visibleCount = count;
    this.showBlankSlate = count === 0;

    if (count === 0) {
      this.liveText = 'No results available.';
    } else if (count === 1) {
      this.liveText = '1 result available.';
    } else {
      this.liveText = `${count} results available.`;
    }
  }

  private handlePopoverToggle = (event: CustomEvent<{ isOpen: boolean }>) => {
    this.isOpen = event.detail.isOpen;
    this.postListboxToggle.emit({ isOpen: this.isOpen });
  };

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer
          ref={el => (this.popoverRef = el)}
          placement="bottom-start"
          onPostToggle={this.handlePopoverToggle}
        >
          <div class="listbox-content" role="presentation">
            <slot></slot>
            <div class={{ 'blank-slate': true, 'blank-slate--visible': this.showBlankSlate }}>
              <slot name="blank-slate"></slot>
            </div>
          </div>
        </post-popovercontainer>
        <div
          class="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {this.liveText}
        </div>
      </Host>
    );
  }
}
