import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { PLACEMENT_TYPES } from '@/types';
import { version } from '@root/package.json';
import { checkEmptyOrOneOf, EventFrom } from '@/utils';

let listboxIds = 0;

/**
 * @slot default - Slot for `<post-option>` elements.
 * @slot blank-slate - Content to display when no options are available or all are filtered out.
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
   * Defines the position of the listbox relative to its trigger.
   */
  @Prop() readonly placement?: Placement = 'bottom';

  @Watch('placement')
  validatePlacement() {
    checkEmptyOrOneOf(this, 'placement', PLACEMENT_TYPES);
  }

  /**
   * Whether the listbox is currently open.
   */
  @State() isOpen = false;

  /**
   * Whether there are any visible options.
   */
  @State() hasVisibleOptions = true;

  /**
   * Fires when the listbox is shown.
   */
  @Event() postListboxShow: EventEmitter<void>;

  /**
   * Fires when the listbox is hidden.
   */
  @Event() postListboxHide: EventEmitter<void>;

  connectedCallback() {
    this.listboxId = this.host.id || `post-listbox-${listboxIds++}`;
    if (!this.host.id) {
      this.host.id = this.listboxId;
    }

    this.host.setAttribute('role', 'listbox');
    this.host.setAttribute('data-version', version);
  }

  componentDidLoad() {
    this.validatePlacement();
  }

  /**
   * Shows the listbox, positioning it relative to the target element.
   * @param target - The element to position the listbox relative to.
   */
  @Method()
  async show(target: HTMLElement): Promise<void> {
    if (this.popoverRef) {
      await this.popoverRef.show(target);
    }
  }

  /**
   * Hides the listbox.
   */
  @Method()
  async hide(): Promise<void> {
    if (this.popoverRef) {
      await this.popoverRef.hide();
    }
  }

  /**
   * Toggles the listbox visibility.
   * @param target - The element to position the listbox relative to.
   */
  @Method()
  async toggle(target: HTMLElement): Promise<void> {
    if (this.popoverRef) {
      await this.popoverRef.toggle(target);
    }
  }

  /**
   * Filters the options based on a query string (case-insensitive substring match).
   * An empty string resets the filter.
   * @param query - The search query to filter options by.
   */
  @Method()
  async filter(query: string): Promise<void> {
    const options = this.getOptionsInternal();
    const normalizedQuery = query.toLowerCase().trim();

    let visibleCount = 0;

    options.forEach(option => {
      const text = option.textContent?.toLowerCase().trim() ?? '';
      const matches = normalizedQuery === '' || text.includes(normalizedQuery);

      if (matches) {
        option.removeAttribute('hidden');
        visibleCount++;
      } else {
        option.setAttribute('hidden', '');
      }
    });

    this.hasVisibleOptions = visibleCount > 0;
  }

  /**
   * Returns all post-option elements in this listbox.
   */
  @Method()
  async getOptions(): Promise<HTMLPostOptionElement[]> {
    return this.getOptionsInternal();
  }

  /**
   * Returns all visible (non-hidden) post-option elements.
   */
  @Method()
  async getVisibleOptions(): Promise<HTMLPostOptionElement[]> {
    return this.getOptionsInternal().filter(opt => !opt.hasAttribute('hidden'));
  }

  /**
   * Clears all selections in the listbox.
   */
  @Method()
  async clearSelection(): Promise<void> {
    this.getOptionsInternal().forEach(opt => {
      opt.selected = false;
    });
  }

  /**
   * Sets the active (highlighted) option by id.
   * @param id - The id of the option to highlight, or null to clear.
   */
  @Method()
  async setActiveOption(id: string | null): Promise<void> {
    this.getOptionsInternal().forEach(opt => {
      opt.active = opt.id === id;
    });
  }

  private getOptionsInternal(): HTMLPostOptionElement[] {
    return Array.from(this.host.querySelectorAll('post-option'));
  }

  @EventFrom('post-popovercontainer')
  private handlePostBeforeToggle(event: CustomEvent<{ willOpen: boolean }>) {
    this.isOpen = event.detail.willOpen;
    if (this.isOpen) {
      this.postListboxShow.emit();
    } else {
      this.postListboxHide.emit();
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer
          onPostBeforeToggle={this.handlePostBeforeToggle.bind(this)}
          placement={this.placement}
          ref={e => (this.popoverRef = e)}
        >
          <div class="listbox-content" role="presentation">
            <slot></slot>
            {!this.hasVisibleOptions && (
              <div class="blank-slate">
                <slot name="blank-slate">
                  <span>No options available</span>
                </slot>
              </div>
            )}
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
