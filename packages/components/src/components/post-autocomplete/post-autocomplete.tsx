import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { version } from '@root/package.json';
import { checkEmptyOrType } from '@/utils';

/**
 * @slot - Default slot for the input field, label, form hints, validation messages,
 * and an optionally nested `<post-listbox>`. All content should be direct children.
 */

@Component({
  tag: 'post-autocomplete',
  styleUrl: 'post-autocomplete.scss',
  shadow: true,
})
export class PostAutocomplete {
  private inputEl: HTMLInputElement | null = null;
  private listboxEl: HTMLPostListboxElement | null = null;
  private selectedText: string | null = null;
  private activeIndex: number = -1;
  private isSelecting: boolean = false;

  @Element() host: HTMLPostAutocompleteElement;

  /**
   * Number of characters to type before `postFilterRequest` events are fired.
   */
  @Prop({ reflect: true, attribute: 'filter-threshold' }) readonly filterThreshold: number = 0;

  /**
   * Show or hide the clear button.
   */
  @Prop({ reflect: true }) readonly clearable: boolean = false;

  /**
   * Optional idref to connect the autocomplete with an external `<post-listbox>`.
   * If not provided, the component looks for a nested `<post-listbox>`.
   */
  @Prop({ reflect: true }) readonly options?: string;

  /**
   * Whether the listbox is currently expanded.
   */
  @State() isExpanded: boolean = false;

  /**
   * The id of the currently active descendant option.
   */
  @State() activeDescendantId: string = '';

  /**
   * A cancellable event emitted when the input value length meets the filter threshold.
   * If `event.preventDefault()` is called, the default filtering on the listbox is skipped,
   * allowing the user to handle filtering externally (e.g., via an API call).
   */
  @Event({ bubbles: true, composed: true, cancelable: true })
  postFilterRequest: EventEmitter<string>;

  @Watch('filterThreshold')
  validateFilterThreshold() {
    checkEmptyOrType(this, 'filterThreshold', 'number');
  }

  connectedCallback() {
    this.host.setAttribute('data-version', version);
    // Prevent input blur when clicking options inside the component
    this.host.addEventListener('mousedown', this.handleMouseDown);
  }

  componentDidLoad() {
    this.validateFilterThreshold();
    this.discoverElements();
    this.setupInput();
  }

  disconnectedCallback() {
    this.teardownInput();
    this.host.removeEventListener('mousedown', this.handleMouseDown);
    if (this.listboxEl && this.options) {
      this.listboxEl.removeEventListener('mousedown', this.handleMouseDown);
    }
  }

  /**
   * Find the input and listbox elements from the slotted content.
   */
  private discoverElements() {
    // Find the input within slotted content
    this.inputEl = this.host.querySelector('input');

    // Find listbox: either nested or referenced by id
    if (this.options) {
      const root = this.host.getRootNode() as Document | ShadowRoot;
      this.listboxEl = root.getElementById(this.options) as HTMLPostListboxElement;
      // For detached listbox, also prevent blur when clicking its options
      if (this.listboxEl) {
        this.listboxEl.addEventListener('mousedown', this.handleMouseDown);
      }
    } else {
      this.listboxEl = this.host.querySelector('post-listbox');
    }
  }

  private setupInput() {
    if (!this.inputEl) return;

    // Set ARIA attributes on the slotted input
    this.inputEl.setAttribute('role', 'combobox');
    this.inputEl.setAttribute('aria-autocomplete', 'list');
    this.inputEl.setAttribute('aria-expanded', 'false');
    this.inputEl.setAttribute('autocomplete', 'off');

    if (this.listboxEl) {
      this.inputEl.setAttribute('aria-controls', this.listboxEl.id);
    }

    // Attach event listeners
    this.inputEl.addEventListener('input', this.handleInput);
    this.inputEl.addEventListener('keydown', this.handleKeyDown);
    this.inputEl.addEventListener('focus', this.handleFocus);
    this.inputEl.addEventListener('blur', this.handleBlur);
  }

  private teardownInput() {
    if (!this.inputEl) return;

    this.inputEl.removeEventListener('input', this.handleInput);
    this.inputEl.removeEventListener('keydown', this.handleKeyDown);
    this.inputEl.removeEventListener('focus', this.handleFocus);
    this.inputEl.removeEventListener('blur', this.handleBlur);
  }

  /**
   * Prevent the input from losing focus when clicking on listbox options.
   */
  private handleMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('post-listbox-option') || target.closest('post-listbox')) {
      e.preventDefault();
    }
  };

  /**
   * Get all options from the associated listbox via direct DOM query.
   */
  private getOptions(): HTMLPostListboxOptionElement[] {
    if (!this.listboxEl) return [];
    return Array.from(this.listboxEl.querySelectorAll('post-listbox-option'));
  }

  /**
   * Get only visible (non-hidden) options.
   */
  private getVisibleOptions(): HTMLPostListboxOptionElement[] {
    return this.getOptions().filter(opt => opt.style.display !== 'none');
  }

  /**
   * Listen for option selection events from the listbox.
   */
  @Listen('postOptionSelected')
  handleOptionSelected(event: CustomEvent<{ value: string; text: string }>) {
    this.isSelecting = true;
    this.selectedText = event.detail.text;

    if (this.inputEl) {
      this.inputEl.value = this.selectedText;
    }

    this.closeListbox();
    this.inputEl?.focus();

    // Reset the flag after the current event cycle
    requestAnimationFrame(() => {
      this.isSelecting = false;
    });
  }

  /**
   * Listen for listbox toggle events to sync expanded state.
   */
  @Listen('postListboxToggle')
  handleListboxToggle(event: CustomEvent<{ isOpen: boolean }>) {
    this.isExpanded = event.detail.isOpen;

    if (this.inputEl) {
      this.inputEl.setAttribute('aria-expanded', String(this.isExpanded));
    }

    if (!this.isExpanded) {
      this.clearActiveDescendant();
    }
  }

  private handleInput = () => {
    // Skip processing during programmatic selection
    if (this.isSelecting || !this.inputEl) return;

    const value = this.inputEl.value;

    // Don't clear selectedText here — on blur the input will restore
    // to the last selected value if the user didn't pick a new option.
    this.clearActiveDescendant();

    if (value.length >= this.filterThreshold) {
      // Emit the cancellable filter request event
      const filterEvent = this.postFilterRequest.emit(value);

      // If default was not prevented, apply default filtering
      if (!filterEvent.defaultPrevented && this.listboxEl) {
        this.listboxEl.filter(value);
      }

      this.openListbox();
    } else {
      // Reset filter
      if (this.listboxEl) {
        this.listboxEl.filter('');
      }
      this.closeListbox();
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (e.altKey) {
          this.openListbox();
        } else if (!this.isExpanded) {
          this.openListbox();
        } else {
          this.moveActiveDescendant(1);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!this.isExpanded) {
          this.openListbox();
        } else {
          this.moveActiveDescendant(-1);
        }
        break;

      case 'Enter':
        if (this.isExpanded && this.activeIndex >= 0) {
          e.preventDefault();
          this.selectActiveOption();
        }
        break;

      case 'Escape':
        if (this.isExpanded) {
          e.preventDefault();
          this.closeListbox();
          this.inputEl?.focus();
        }
        break;

      case 'Tab':
        if (this.isExpanded) {
          if (this.activeIndex >= 0) {
            this.selectActiveOption();
          }
          this.closeListbox();
        }
        break;

      case 'Home':
        if (this.isExpanded) {
          e.preventDefault();
          this.setActiveDescendant(0);
        }
        break;

      case 'End':
        if (this.isExpanded) {
          e.preventDefault();
          const visibleOptions = this.getVisibleOptions();
          this.setActiveDescendant(visibleOptions.length - 1);
        }
        break;

      case ' ':
        if (!this.isExpanded) {
          this.openListbox();
        }
        break;

      default:
        break;
    }
  };

  private handleFocus = () => {
    this.discoverElements();
  };

  private handleBlur = () => {
    // Use a small delay so any pending selection can complete
    setTimeout(() => {
      if (this.selectedText) {
        // Restore input to the last selected value
        if (this.inputEl) {
          this.inputEl.value = this.selectedText;
        }
        // Reset filter so all options are visible next time
        if (this.listboxEl) {
          this.listboxEl.filter('');
        }
      } else {
        if (this.inputEl) {
          this.inputEl.value = '';
        }
      }
      this.closeListbox();
    }, 150);
  };

  private async openListbox() {
    if (this.isExpanded || !this.listboxEl || !this.inputEl) return;
    await this.listboxEl.show(this.inputEl);
  }

  private async closeListbox() {
    if (!this.isExpanded || !this.listboxEl) return;
    await this.listboxEl.hide();
  }

  private clearActiveDescendant() {
    this.activeIndex = -1;
    this.activeDescendantId = '';
    this.inputEl?.removeAttribute('aria-activedescendant');

    // Clear active state on all options
    for (const opt of this.getOptions()) {
      (opt as any).active = false;
    }
  }

  private moveActiveDescendant(direction: number) {
    const visibleOptions = this.getVisibleOptions();
    if (visibleOptions.length === 0) return;

    // Clear previous active
    if (this.activeIndex >= 0 && this.activeIndex < visibleOptions.length) {
      (visibleOptions[this.activeIndex] as any).active = false;
    }

    // Calculate new index with wrapping
    if (this.activeIndex < 0) {
      this.activeIndex = direction > 0 ? 0 : visibleOptions.length - 1;
    } else {
      this.activeIndex =
        (this.activeIndex + direction + visibleOptions.length) % visibleOptions.length;
    }

    this.setActiveDescendant(this.activeIndex);
  }

  private setActiveDescendant(index: number) {
    const visibleOptions = this.getVisibleOptions();
    if (index < 0 || index >= visibleOptions.length) return;

    // Clear all active states
    for (const opt of visibleOptions) {
      (opt as any).active = false;
    }

    this.activeIndex = index;
    const option = visibleOptions[index];
    (option as any).active = true;

    this.activeDescendantId = option.id;

    if (this.inputEl) {
      this.inputEl.setAttribute('aria-activedescendant', option.id);
    }

    // Scroll the active option into view
    option.scrollIntoView?.({ block: 'nearest' });
  }

  private selectActiveOption() {
    if (this.activeIndex < 0) return;

    const visibleOptions = this.getVisibleOptions();
    if (this.activeIndex < visibleOptions.length) {
      (visibleOptions[this.activeIndex] as any).select();
    }
  }

  private handleClear = () => {
    if (this.inputEl) {
      this.inputEl.value = '';
      this.inputEl.focus();
    }
    this.selectedText = null;
    this.activeIndex = -1;
    this.closeListbox();

    if (this.listboxEl) {
      this.listboxEl.filter('');
    }
  };

  render() {
    return (
      <Host data-version={version}>
        <div class="autocomplete-wrapper">
          <slot></slot>
          {this.clearable && (
            <button
              type="button"
              class="clear-button"
              aria-label="Clear input"
              onClick={this.handleClear}
              tabindex={-1}
            >
              <post-icon name="closex" aria-hidden="true"></post-icon>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
