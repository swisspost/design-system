import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { version } from '@root/package.json';
import { IS_BROWSER } from '@/utils';

// Polyfill for popovers, can be removed when https://caniuse.com/?search=popover is green
import { apply, isSupported } from '@oddbird/popover-polyfill/fn';

let listboxIds = 0;

/**
 * @class PostListbox - A listbox container for post-option elements.
 *
 * @slot default - The post-option elements to display in the listbox.
 */
@Component({
  tag: 'post-listbox',
  styleUrl: 'post-listbox.scss',
  shadow: true,
})
export class PostListbox {
  private generatedId = `post-listbox-${listboxIds++}`;

  @Element() host: HTMLElement;

  /**
   * Gets the effective ID for the listbox (user-provided or generated).
   */
  private get listboxId(): string {
    return this.host?.getAttribute('id') || this.generatedId;
  }

  /**
   * The currently active option ID (for aria-activedescendant).
   */
  @State() activeOptionId: string | null = null;

  /**
   * Tracks which options are currently visible (not filtered out).
   */
  @State() visibleOptions: HTMLPostOptionElement[] = [];

  /**
   * Whether the listbox allows multiple selections.
   */
  @Prop({ reflect: true }) multiple = false;

  /**
   * Emitted when an option is selected within the listbox.
   */
  @Event() postListboxChange: EventEmitter<{ value: string; label: string }>;

  /**
   * Emitted when the visible options change (e.g., after filtering).
   */
  @Event() postListboxFilterComplete: EventEmitter<{ count: number }>;

  @Listen('postOptionSelected')
  handleOptionSelected(event: CustomEvent<{ value: string; label: string }>) {
    const detail = event.detail;

    // Update selection state on options
    if (!this.multiple) {
      this.getOptions().forEach(option => {
        option.selected = false;
      });
    }

    const selectedOption = event.target as HTMLPostOptionElement;
    selectedOption.selected = !selectedOption.selected || !this.multiple;

    // Re-emit as listbox change event
    this.postListboxChange.emit(detail);
  }

  /**
   * Gets all post-option elements within this listbox.
   */
  private getOptions(): HTMLPostOptionElement[] {
    return Array.from(this.host.querySelectorAll('post-option'));
  }

  /**
   * Gets all visible (non-filtered) post-option elements.
   */
  private getVisibleOptions(): HTMLPostOptionElement[] {
    return this.getOptions().filter(option => !option.hidden);
  }

  /**
   * Gets all enabled visible options.
   */
  private getEnabledOptions(): HTMLPostOptionElement[] {
    return this.getVisibleOptions().filter(option => !option.disabled);
  }

  /**
   * Filters options based on a query string.
   * Options whose text content does not include the query (case-insensitive) are hidden.
   *
   * @param query - The search query to filter by.
   * @returns The number of visible options after filtering.
   */
  @Method()
  async filter(query: string): Promise<number> {
    const normalizedQuery = query.toLowerCase().trim();
    const options = this.getOptions();

    options.forEach(option => {
      const label = option.textContent?.toLowerCase().trim() || '';
      const matches = normalizedQuery === '' || label.includes(normalizedQuery);
      option.hidden = !matches;
    });

    this.visibleOptions = this.getVisibleOptions();
    const count = this.visibleOptions.length;

    this.postListboxFilterComplete.emit({ count });

    return count;
  }

  /**
   * Clears any active filtering, showing all options.
   */
  @Method()
  async clearFilter(): Promise<void> {
    this.getOptions().forEach(option => {
      option.hidden = false;
    });
    this.visibleOptions = this.getOptions();
    this.postListboxFilterComplete.emit({ count: this.visibleOptions.length });
  }

  /**
   * Sets the active option by ID (for keyboard navigation).
   *
   * @param optionId - The ID of the option to make active.
   */
  @Method()
  async setActiveOption(optionId: string | null): Promise<void> {
    // Remove active state from all options
    this.getOptions().forEach(option => {
      option.removeAttribute('data-active');
    });

    this.activeOptionId = optionId;

    if (optionId) {
      const activeOption = this.host.querySelector(`#${optionId}`) as HTMLPostOptionElement;
      if (activeOption) {
        activeOption.setAttribute('data-active', 'true');
        activeOption.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  /**
   * Gets the currently active option element.
   */
  @Method()
  async getActiveOption(): Promise<HTMLPostOptionElement | null> {
    if (!this.activeOptionId) return null;
    return this.host.querySelector(`#${this.activeOptionId}`) as HTMLPostOptionElement;
  }

  /**
   * Moves the active option to the next enabled option.
   * Wraps around to the first option if at the end.
   *
   * @returns The ID of the newly active option.
   */
  @Method()
  async activateNextOption(): Promise<string | null> {
    const enabledOptions = this.getEnabledOptions();
    if (enabledOptions.length === 0) return null;

    const currentIndex = this.activeOptionId
      ? enabledOptions.findIndex(opt => opt.id === this.activeOptionId)
      : -1;

    const nextIndex = currentIndex < enabledOptions.length - 1 ? currentIndex + 1 : 0;
    const nextOption = enabledOptions[nextIndex];

    await this.setActiveOption(nextOption.id);
    return nextOption.id;
  }

  /**
   * Moves the active option to the previous enabled option.
   * Wraps around to the last option if at the beginning.
   *
   * @returns The ID of the newly active option.
   */
  @Method()
  async activatePreviousOption(): Promise<string | null> {
    const enabledOptions = this.getEnabledOptions();
    if (enabledOptions.length === 0) return null;

    const currentIndex = this.activeOptionId
      ? enabledOptions.findIndex(opt => opt.id === this.activeOptionId)
      : enabledOptions.length;

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : enabledOptions.length - 1;
    const prevOption = enabledOptions[prevIndex];

    await this.setActiveOption(prevOption.id);
    return prevOption.id;
  }

  /**
   * Activates the first enabled option.
   *
   * @returns The ID of the first option.
   */
  @Method()
  async activateFirstOption(): Promise<string | null> {
    const enabledOptions = this.getEnabledOptions();
    if (enabledOptions.length === 0) return null;

    const firstOption = enabledOptions[0];
    await this.setActiveOption(firstOption.id);
    return firstOption.id;
  }

  /**
   * Activates the last enabled option.
   *
   * @returns The ID of the last option.
   */
  @Method()
  async activateLastOption(): Promise<string | null> {
    const enabledOptions = this.getEnabledOptions();
    if (enabledOptions.length === 0) return null;

    const lastOption = enabledOptions[enabledOptions.length - 1];
    await this.setActiveOption(lastOption.id);
    return lastOption.id;
  }

  /**
   * Selects the currently active option.
   */
  @Method()
  async selectActiveOption(): Promise<void> {
    if (!this.activeOptionId) return;

    const activeOption = await this.getActiveOption();
    if (activeOption && !activeOption.disabled) {
      activeOption.click();
    }
  }

  /**
   * Gets the currently selected option(s).
   */
  @Method()
  async getSelectedOptions(): Promise<HTMLPostOptionElement[]> {
    return this.getOptions().filter(option => option.selected);
  }

  /**
   * Shows the listbox as a popover.
   */
  @Method()
  async show(): Promise<void> {
    (this.host as any).showPopover();
  }

  /**
   * Hides the listbox popover.
   */
  @Method()
  async hide(): Promise<void> {
    (this.host as any).hidePopover();
  }

  connectedCallback() {
    // Apply popover polyfill if needed
    if (IS_BROWSER && !isSupported()) {
      apply();
    }
    this.visibleOptions = this.getOptions();
  }

  render() {
    return (
      <Host
        data-version={version}
        id={this.listboxId}
        role="listbox"
        aria-multiselectable={this.multiple ? 'true' : null}
        popover="manual"
      >
        <div class="listbox">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
