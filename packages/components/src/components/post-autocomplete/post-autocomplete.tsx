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
  Watch,
} from '@stencil/core';
import { version } from '@root/package.json';
import { getRoot, debounce, checkRequiredAndType } from '@/utils';

/**
 * Interface for the post-listbox element's public API.
 * Uses a local interface to avoid circular type dependency during build.
 */
interface PostListboxApi extends HTMLElement {
  filter(query: string): Promise<number>;
  resetFilter(): Promise<void>;
  getVisibleOptions(): Promise<HTMLElement[]>;
  updateVisibility(): Promise<void>;
  show(target: HTMLElement): Promise<void>;
  hide(): Promise<void>;
}

/**
 * @slot default - Slot for `<label>`, `<input>`, and optional hint text. The component discovers the slotted `<input>` for ARIA wiring and event handling.
 */
@Component({
  tag: 'post-autocomplete',
  styleUrl: 'post-autocomplete.scss',
  shadow: true,
})
export class PostAutocomplete {
  private root: Document | ShadowRoot;
  private inputEl: HTMLInputElement | null = null;
  private listboxEl: PostListboxApi | null = null;
  private debouncedFilter: (...args: unknown[]) => void;
  private blurTimeout: ReturnType<typeof setTimeout>;

  private readonly KEYCODES = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    HOME: 'Home',
    END: 'End',
  };

  @Element() host: HTMLElement;

  /**
   * ID reference pointing to the associated `post-listbox` element.
   */
  @Prop({ reflect: true }) readonly options!: string;

  @Watch('options')
  validateOptions() {
    checkRequiredAndType(this, 'options', 'string');
  }

  /**
   * Minimum number of characters before filtering begins.
   */
  @Prop() readonly filterThreshold: number = 1;

  /**
   * Whether the input shows a clear button when it has a value.
   */
  @Prop() readonly clearable: boolean = false;

  /**
   * Debounce delay in milliseconds for input filtering.
   */
  @Prop() readonly debounceTimeout: number = 300;

  @Watch('debounceTimeout')
  onDebounceTimeoutChange() {
    this.setupDebounce();
  }

  /**
   * Whether the dropdown is currently open.
   */
  @State() expanded = false;

  /**
   * ID of the currently highlighted `post-option`.
   */
  @State() activeDescendant: string | null = null;

  /**
   * Value of the currently selected option.
   */
  @State() selectedValue: string | null = null;

  /**
   * Display text of the currently selected option.
   */
  @State() selectedLabel: string | null = null;

  /**
   * Index of the highlighted option in the visible options list.
   */
  @State() activeIndex: number = -1;

  /**
   * Whether the input has a value (for clearable button visibility).
   */
  @State() hasInputValue = false;

  /**
   * Cancellable event fired before filtering. If `event.preventDefault()` is called,
   * internal filtering is skipped and the consumer handles filtering externally.
   */
  @Event() postFilterRequest: EventEmitter<{ query: string }>;

  /**
   * Fired when the selected value changes.
   */
  @Event() postChange: EventEmitter<{ value: string | null }>;

  /**
   * Fired on every input keystroke (after debounce).
   */
  @Event() postInput: EventEmitter<{ value: string }>;

  connectedCallback() {
    this.root = getRoot(this.host);
  }

  componentDidLoad() {
    this.validateOptions();
    this.resolveListbox();
    this.discoverInput();
    this.setupDebounce();
  }

  disconnectedCallback() {
    if (this.inputEl) {
      this.inputEl.removeEventListener('input', this.handleInput);
      this.inputEl.removeEventListener('keydown', this.handleKeyDown);
      this.inputEl.removeEventListener('focus', this.handleFocus);
      this.inputEl.removeEventListener('blur', this.handleBlur);
    }
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  }

  /**
   * Clears input, clears selection, resets filter, closes dropdown.
   */
  @Method()
  async reset(): Promise<void> {
    if (this.inputEl) {
      this.inputEl.value = '';
    }
    this.selectedValue = null;
    this.selectedLabel = null;
    this.hasInputValue = false;
    this.activeIndex = -1;
    this.activeDescendant = null;

    if (this.listboxEl) {
      await this.listboxEl.resetFilter();
    }
    await this.closeDropdown();

    this.postChange.emit({ value: null });
  }

  @Listen('postOptionSelected', { target: 'body' })
  async handleOptionSelected(event: CustomEvent<{ value: string }>) {
    const target = event.target as HTMLElement;
    if (!target || target.localName !== 'post-option') return;

    // Only handle events from our own listbox
    if (!this.listboxEl || !this.listboxEl.contains(target)) return;

    // Deselect ALL options (including hidden/filtered ones), then select the target
    if (this.listboxEl) {
      const allOptions = this.listboxEl.querySelectorAll('post-option');
      for (const opt of Array.from(allOptions)) {
        (opt as any).selected = false;
        opt.removeAttribute('data-active');
      }
    }
    (target as any).selected = true;

    this.selectedValue = event.detail.value;
    this.selectedLabel = target.textContent?.trim() ?? '';

    if (this.inputEl) {
      this.inputEl.value = this.selectedLabel;
      this.hasInputValue = true;
    }

    this.activeDescendant = target.id;
    this.updateInputAria();

    await this.closeDropdown();
    if (this.listboxEl) {
      await this.listboxEl.resetFilter();
    }

    this.postChange.emit({ value: this.selectedValue });
  }

  private discoverInput() {
    const slot = this.host.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return;

    const assignedElements = slot.assignedElements({ flatten: true });
    this.inputEl = assignedElements.find(
      el => el instanceof HTMLInputElement,
    ) as HTMLInputElement ?? null;

    // Also look inside slotted elements (e.g., input inside a div)
    if (!this.inputEl) {
      for (const el of assignedElements) {
        const input = el.querySelector?.('input');
        if (input) {
          this.inputEl = input;
          break;
        }
      }
    }

    if (!this.inputEl) {
      console.warn('post-autocomplete: No <input> found in the default slot.');
      return;
    }

    // Set ARIA attributes on the slotted input
    this.inputEl.setAttribute('role', 'combobox');
    this.inputEl.setAttribute('aria-autocomplete', 'list');
    this.inputEl.setAttribute('aria-expanded', 'false');
    this.inputEl.setAttribute('aria-haspopup', 'listbox');
    this.inputEl.setAttribute('autocomplete', 'off');

    // Set aria-controls after listbox is resolved
    if (this.listboxEl) {
      this.inputEl.setAttribute('aria-controls', this.listboxEl.id || this.options);
    }

    // Attach event listeners
    this.inputEl.addEventListener('input', this.handleInput);
    this.inputEl.addEventListener('keydown', this.handleKeyDown);
    this.inputEl.addEventListener('focus', this.handleFocus);
    this.inputEl.addEventListener('blur', this.handleBlur);
  }

  private resolveListbox() {
    this.listboxEl = this.root?.getElementById(this.options) as PostListboxApi | null;

    if (!this.listboxEl) {
      console.warn(`post-autocomplete: No post-listbox found with ID "${this.options}".`);
      return;
    }

    // Set aria-controls now that we have the listbox
    if (this.inputEl) {
      this.inputEl.setAttribute('aria-controls', this.listboxEl.id || this.options);
    }
  }

  private setupDebounce() {
    this.debouncedFilter = debounce(async (value: string) => {
      if (value.length < this.filterThreshold) {
        await this.closeDropdown();
        if (this.listboxEl) {
          await this.listboxEl.resetFilter();
        }
        return;
      }

      const filterEvent = this.postFilterRequest.emit({ query: value });

      if (!(filterEvent as unknown as Event).defaultPrevented) {
        // Internal filtering
        if (this.listboxEl) {
          await this.listboxEl.filter(value);
        }
      }

      // Open dropdown regardless (consumer may have filtered externally)
      await this.openDropdown();

      // Reset active index
      this.activeIndex = -1;
      this.activeDescendant = null;
      this.updateInputAria();

      this.postInput.emit({ value });
    }, this.debounceTimeout);
  }

  private readonly handleInput = () => {
    if (!this.inputEl) return;
    const value = this.inputEl.value;
    this.hasInputValue = value.length > 0;
    this.debouncedFilter(value);
  };

  private readonly handleFocus = () => {
    // Cancel any pending blur timeout so blur handler doesn't fire while user is focused
    if (this.blurTimeout) {
      clearTimeout(this.blurTimeout);
    }
  };

  private readonly handleBlur = () => {
    // Delay to allow click events on options to fire first
    this.blurTimeout = setTimeout(() => {
      this.closeDropdown();

      if (!this.selectedValue && this.inputEl?.value) {
        // No selection — clear input
        this.inputEl.value = '';
        this.hasInputValue = false;
      } else if (this.selectedValue && this.inputEl?.value !== this.selectedLabel) {
        // Selection exists but text was modified — restore
        if (this.inputEl && this.selectedLabel) {
          this.inputEl.value = this.selectedLabel;
        }
      }
    }, 150);
  };

  private readonly handleKeyDown = async (e: KeyboardEvent) => {
    if (!this.listboxEl) return;

    try {
      switch (e.key) {
        case this.KEYCODES.DOWN: {
          e.preventDefault();
          if (!this.expanded || e.altKey) {
            await this.openDropdown();
            await this.highlightOption(0);
          } else {
            await this.highlightOption(this.activeIndex + 1);
          }
          break;
        }

        case this.KEYCODES.UP: {
          e.preventDefault();
          if (this.expanded) {
            await this.highlightOption(this.activeIndex - 1);
          }
          break;
        }

        case this.KEYCODES.HOME: {
          if (this.expanded) {
            e.preventDefault();
            await this.highlightOption(0);
          }
          break;
        }

        case this.KEYCODES.END: {
          if (this.expanded) {
            e.preventDefault();
            const options = await this.listboxEl.getVisibleOptions();
            await this.highlightOption(options.length - 1);
          }
          break;
        }

        case this.KEYCODES.ENTER: {
          if (this.expanded && this.activeIndex >= 0) {
            e.preventDefault();
            const options = await this.listboxEl.getVisibleOptions();
            const activeOption = options[this.activeIndex];
            if (activeOption && activeOption.getAttribute('aria-disabled') !== 'true') {
              activeOption.click();
            }
          }
          break;
        }

        case this.KEYCODES.ESCAPE: {
          if (this.expanded) {
            e.preventDefault();
            await this.closeDropdown();
            if (this.listboxEl) {
              await this.listboxEl.resetFilter();
            }
            // Restore input
            if (this.selectedLabel && this.inputEl) {
              this.inputEl.value = this.selectedLabel;
            } else if (this.inputEl) {
              this.inputEl.value = '';
              this.hasInputValue = false;
            }
          }
          break;
        }

        case this.KEYCODES.TAB: {
          if (this.expanded) {
            await this.closeDropdown();
            if (this.listboxEl) {
              await this.listboxEl.resetFilter();
            }
          }
          // Don't prevent default — let focus move naturally
          break;
        }

        default:
          // Let all other keys through to the input
          break;
      }
    } catch (error) {
      console.warn('post-autocomplete: Error handling keyboard event:', error);
    }
  };

  private async highlightOption(index: number) {
    if (!this.listboxEl) return;

    const options = await this.listboxEl.getVisibleOptions();
    if (options.length === 0) return;

    // Clear previous highlight
    for (const opt of options) {
      opt.removeAttribute('data-active');
    }

    // Wrap around
    if (index < 0) {
      index = options.length - 1;
    } else if (index >= options.length) {
      index = 0;
    }

    this.activeIndex = index;
    const activeOption = options[index];
    if (activeOption) {
      activeOption.setAttribute('data-active', 'true');
      this.activeDescendant = activeOption.id;
      this.updateInputAria();

      // Scroll into view if needed
      activeOption.scrollIntoView?.({ block: 'nearest' });
    }
  }

  private async openDropdown() {
    if (this.expanded || !this.listboxEl) return;

    const anchor = this.inputEl ?? this.host;
    await this.listboxEl.show(anchor);
    this.expanded = true;

    if (this.inputEl) {
      this.inputEl.setAttribute('aria-expanded', 'true');
    }
  }

  private async closeDropdown() {
    if (!this.expanded || !this.listboxEl) return;

    await this.listboxEl.hide();
    this.expanded = false;
    this.activeIndex = -1;
    this.activeDescendant = null;

    if (this.inputEl) {
      this.inputEl.setAttribute('aria-expanded', 'false');
      this.inputEl.removeAttribute('aria-activedescendant');
    }

    // Clear active highlights
    if (this.listboxEl) {
      const options = await this.listboxEl.getVisibleOptions();
      for (const opt of options) {
        opt.removeAttribute('data-active');
      }
    }
  }

  private updateInputAria() {
    if (!this.inputEl) return;

    if (this.activeDescendant) {
      this.inputEl.setAttribute('aria-activedescendant', this.activeDescendant);
    } else {
      this.inputEl.removeAttribute('aria-activedescendant');
    }
  }

  private positionClearButton() {
    if (!this.inputEl) return;

    const wrapper = this.host.shadowRoot?.querySelector('.autocomplete-wrapper') as HTMLElement;
    const button = this.host.shadowRoot?.querySelector('.clear-button') as HTMLElement;
    if (!wrapper || !button) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const inputRect = this.inputEl.getBoundingClientRect();

    // Calculate the input's vertical center relative to the wrapper
    const inputCenterY = inputRect.top - wrapperRect.top + inputRect.height / 2;
    button.style.top = `${inputCenterY}px`;
    button.style.transform = 'translateY(-50%)';
  }

  private readonly handleClear = async () => {
    await this.reset();
    this.inputEl?.focus();
  };

  componentDidRender() {
    if (this.clearable && this.hasInputValue) {
      this.positionClearButton();
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <div class="autocomplete-wrapper">
          <slot></slot>
          {this.clearable && this.hasInputValue && (
            <button
              type="button"
              class="clear-button"
              aria-label="Clear selection"
              onClick={this.handleClear}
            >
              <post-icon name="closex" aria-hidden="true"></post-icon>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
