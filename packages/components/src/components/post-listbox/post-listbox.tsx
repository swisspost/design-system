import {
  Component,
  Element,
  h,
  Host,
  Method,
  State,
} from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot for `post-option` elements.
 * @slot blank-slate - Content to display when no options match the current filter.
 */
@Component({
  tag: 'post-listbox',
  styleUrl: 'post-listbox.scss',
  shadow: true,
})
export class PostListbox {
  private popoverRef: HTMLPostPopovercontainerElement;

  @Element() host: HTMLElement;

  /**
   * Count of currently visible (non-filtered) options.
   */
  @State() visibleCount = 0;

  /**
   * Whether all options are filtered out.
   */
  @State() isEmpty = false;

  /**
   * The announcement text for the live region.
   */
  @State() announcement = '';

  /**
   * Filter child `post-option` elements by matching their text content
   * against the query string (case-insensitive substring match).
   * Returns the count of visible (matching) options.
   */
  @Method()
  async filter(query: string): Promise<number> {
    const options = this.getOptions();
    const lowerQuery = query.toLowerCase();
    let count = 0;

    for (const option of options) {
      const text = option.textContent?.toLowerCase() ?? '';
      const matches = text.includes(lowerQuery);
      if (matches) {
        option.removeAttribute('hidden');
        count++;
      } else {
        option.setAttribute('hidden', '');
      }
    }

    this.visibleCount = count;
    this.isEmpty = count === 0;
    this.announcement = count === 0
      ? 'No results available'
      : `${count} result${count !== 1 ? 's' : ''} available`;
    return count;
  }

  /**
   * Remove all filter state and make all options visible again.
   */
  @Method()
  async resetFilter(): Promise<void> {
    const options = this.getOptions();
    for (const option of options) {
      option.removeAttribute('hidden');
    }
    this.visibleCount = options.length;
    this.isEmpty = false;
    this.announcement = '';
  }

  /**
   * Returns an array of currently visible `post-option` elements.
   */
  @Method()
  async getVisibleOptions(): Promise<HTMLElement[]> {
    return this.getOptions().filter(o => !o.hasAttribute('hidden'));
  }

  /**
   * Sync the internal `visibleCount` and `isEmpty` state with the current
   * DOM visibility of options. Call this after performing custom/external
   * filtering to keep the blank-slate and live-region announcements correct.
   */
  @Method()
  async updateVisibility(): Promise<void> {
    const options = this.getOptions();
    const visible = options.filter(o => !o.hasAttribute('hidden'));
    this.visibleCount = visible.length;
    this.isEmpty = visible.length === 0;
    this.announcement = visible.length === 0
      ? 'No results available'
      : `${visible.length} result${visible.length !== 1 ? 's' : ''} available`;
  }

  /**
   * Show the dropdown popover.
   */
  @Method()
  async show(target: HTMLElement): Promise<void> {
    if (this.popoverRef) {
      await this.popoverRef.show(target);
    }
  }

  /**
   * Hide the dropdown popover.
   */
  @Method()
  async hide(): Promise<void> {
    if (this.popoverRef) {
      await this.popoverRef.hide();
    }
  }

  private getOptions(): HTMLElement[] {
    const slot = this.host.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return [];
    return (slot.assignedElements() as HTMLElement[]).filter(
      el => el.localName === 'post-option',
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer
          placement="bottom"
          ref={e => (this.popoverRef = e)}
        >
          <div role="listbox" class="listbox-content" aria-label="Options">
            <slot></slot>
            {this.isEmpty && (
              <div class="blank-slate">
                <slot name="blank-slate">No results found</slot>
              </div>
            )}
          </div>
        </post-popovercontainer>
        <div class="sr-only" aria-live="polite" aria-atomic="true">
          {this.announcement}
        </div>
      </Host>
    );
  }
}
