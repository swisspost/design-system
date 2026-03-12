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

/**
 * Interface representing the properties of a post-option element.
 * Used for type safety when accessing option properties.
 */
interface PostOptionElement extends HTMLElement {
  value: string;
  disabled: boolean;
  selected: boolean;
}

let autocompleteId = 0;

/**
 * An autocomplete component that provides suggestions as the user types.
 * It wraps a native input element (slotted) and displays matching options in a dropdown.
 *
 * @slot default - The input element to use for the autocomplete. Should be a native `<input>` element.
 * @slot options - The post-option elements to display as suggestions.
 */
@Component({
  tag: 'post-autocomplete',
  styleUrl: 'post-autocomplete.scss',
  shadow: true,
})
export class PostAutocomplete {
  private internalId = `post-autocomplete-${autocompleteId++}`;
  private popoverRef: HTMLPostPopovercontainerElement;
  private inputElement: HTMLInputElement | null = null;
  private liveRegion: HTMLElement | null = null;

  private readonly KEYCODES = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    HOME: 'Home',
    END: 'End',
  };

  @Element() host: HTMLPostAutocompleteElement;

  /**
   * The current value of the autocomplete input.
   */
  @Prop({ mutable: true, reflect: true }) value = '';

  /**
   * A descriptive label for assistive technologies.
   */
  @Prop() label?: string;

  /**
   * Defines the position of the dropdown relative to the input.
   */
  @Prop() readonly placement?: Placement = 'bottom-start';

  /**
   * The minimum number of characters required before showing suggestions.
   */
  @Prop() minChars = 1;

  /**
   * If `true`, automatically highlights the first matching option.
   */
  @Prop() autoHighlight = false;

  /**
   * If `true`, the dropdown is currently open.
   */
  @State() isOpen = false;

  /**
   * Index of the currently highlighted option.
   */
  @State() highlightedIndex = -1;

  /**
   * The filtered options to display based on current input.
   */
  @State() visibleOptions: PostOptionElement[] = [];

  /**
   * Emitted when an option is selected.
   */
  @Event() postSelect: EventEmitter<{ value: string; label: string }>;

  /**
   * Emitted when the input value changes.
   */
  @Event() postInput: EventEmitter<string>;

  /**
   * Emitted when the dropdown opens.
   */
  @Event() postOpen: EventEmitter<void>;

  /**
   * Emitted when the dropdown closes.
   */
  @Event() postClose: EventEmitter<void>;

  @Watch('placement')
  validatePlacement() {
    checkEmptyOrOneOf(this, 'placement', PLACEMENT_TYPES);
  }

  connectedCallback() {
    this.host.setAttribute('data-version', version);
    this.createLiveRegion();
  }

  componentDidLoad() {
    this.validatePlacement();
    this.setupInput();
    this.setupAriaAttributes();
  }

  disconnectedCallback() {
    this.cleanupInput();
    this.removeLiveRegion();
  }

  private createLiveRegion() {
    // Create a light DOM live region for screen reader announcements
    // This needs to be in light DOM for aria-describedby to work across shadow boundaries
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('role', 'status');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.setAttribute('aria-atomic', 'true');
    this.liveRegion.className = 'sr-only visually-hidden';
    this.liveRegion.id = `${this.internalId}-live`;
    this.liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    this.host.appendChild(this.liveRegion);
  }

  private removeLiveRegion() {
    if (this.liveRegion && this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
    }
    this.liveRegion = null;
  }

  private announceToScreenReader(message: string) {
    if (this.liveRegion) {
      this.liveRegion.textContent = message;
    }
  }

  private setupInput() {
    // Find the slotted input element
    const slot = this.host.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return;

    const assigned = slot.assignedElements({ flatten: true });
    this.inputElement = assigned.find(
      (el): el is HTMLInputElement => el.tagName.toLowerCase() === 'input'
    ) || null;

    if (this.inputElement) {
      this.inputElement.addEventListener('input', this.handleInput);
      this.inputElement.addEventListener('keydown', this.handleKeyDown);
      this.inputElement.addEventListener('focus', this.handleFocus);
      this.inputElement.addEventListener('blur', this.handleBlur);
      
      // Set initial value
      if (this.value) {
        this.inputElement.value = this.value;
      }
    }
  }

  private cleanupInput() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('input', this.handleInput);
      this.inputElement.removeEventListener('keydown', this.handleKeyDown);
      this.inputElement.removeEventListener('focus', this.handleFocus);
      this.inputElement.removeEventListener('blur', this.handleBlur);
    }
  }

  private setupAriaAttributes() {
    const listboxId = `${this.internalId}-listbox`;
    
    if (this.inputElement) {
      this.inputElement.setAttribute('role', 'combobox');
      this.inputElement.setAttribute('aria-autocomplete', 'list');
      this.inputElement.setAttribute('aria-expanded', 'false');
      this.inputElement.setAttribute('aria-owns', listboxId);
      this.inputElement.setAttribute('aria-haspopup', 'listbox');
      
      if (this.label) {
        this.inputElement.setAttribute('aria-label', this.label);
      }
      
      if (this.liveRegion) {
        this.inputElement.setAttribute('aria-describedby', this.liveRegion.id);
      }
    }
  }

  private updateAriaExpanded() {
    if (this.inputElement) {
      this.inputElement.setAttribute('aria-expanded', String(this.isOpen));
    }
  }

  private updateAriaActiveDescendant() {
    if (!this.inputElement) return;
    
    if (this.highlightedIndex >= 0 && this.visibleOptions[this.highlightedIndex]) {
      const activeOption = this.visibleOptions[this.highlightedIndex];
      this.inputElement.setAttribute('aria-activedescendant', activeOption.id);
    } else {
      this.inputElement.removeAttribute('aria-activedescendant');
    }
  }

  /**
   * Opens the autocomplete dropdown.
   */
  @Method()
  async open(): Promise<void> {
    if (this.isOpen || !this.inputElement) return;
    
    this.updateVisibleOptions();
    
    if (this.visibleOptions.length === 0) return;
    
    if (this.popoverRef) {
      await this.popoverRef.show(this.inputElement);
    }
  }

  /**
   * Closes the autocomplete dropdown.
   */
  @Method()
  async close(): Promise<void> {
    if (!this.isOpen) return;
    
    if (this.popoverRef) {
      await this.popoverRef.hide();
    }
  }

  /**
   * Toggles the autocomplete dropdown.
   */
  @Method()
  async toggle(): Promise<void> {
    if (this.isOpen) {
      await this.close();
    } else {
      await this.open();
    }
  }

  /**
   * Sets the value programmatically.
   */
  @Method()
  async setValue(value: string): Promise<void> {
    this.value = value;
    if (this.inputElement) {
      this.inputElement.value = value;
    }
  }

  /**
   * Clears the current value.
   */
  @Method()
  async clear(): Promise<void> {
    await this.setValue('');
    this.postInput.emit('');
  }

  private getAllOptions(): PostOptionElement[] {
    const optionsSlot = this.host.shadowRoot?.querySelector('slot[name="options"]') as HTMLSlotElement;
    if (!optionsSlot) return [];

    const assigned = optionsSlot.assignedElements({ flatten: true });
    
    // Handle both direct post-option children and post-listbox wrapper
    const options: PostOptionElement[] = [];
    
    for (const el of assigned) {
      if (el.tagName.toLowerCase() === 'post-option') {
        options.push(el as PostOptionElement);
      } else if (el.tagName.toLowerCase() === 'post-listbox') {
        // Get options from inside the listbox
        const listboxOptions = el.querySelectorAll('post-option');
        options.push(...Array.from(listboxOptions) as PostOptionElement[]);
      }
    }
    
    return options;
  }

  private updateVisibleOptions() {
    const allOptions = this.getAllOptions();
    const query = this.value.toLowerCase().trim();
    
    if (query.length < this.minChars) {
      this.visibleOptions = [];
      return;
    }
    
    // Filter options based on query
    // Check both the value and the text content
    this.visibleOptions = allOptions.filter(option => {
      if (option.disabled) return false;
      
      const optionValue = option.value?.toLowerCase() || '';
      const optionText = option.textContent?.toLowerCase() || '';
      
      return optionValue.includes(query) || optionText.includes(query);
    });
    
    // Update visibility of options in the DOM
    allOptions.forEach(option => {
      const isVisible = this.visibleOptions.includes(option);
      option.style.display = isVisible ? '' : 'none';
    });
    
    // Announce results to screen reader
    const count = this.visibleOptions.length;
    if (count === 0) {
      this.announceToScreenReader('No suggestions available');
    } else if (count === 1) {
      this.announceToScreenReader('1 suggestion available');
    } else {
      this.announceToScreenReader(`${count} suggestions available`);
    }
    
    // Auto-highlight first option if enabled
    if (this.autoHighlight && this.visibleOptions.length > 0) {
      this.highlightedIndex = 0;
      this.updateHighlight();
    } else {
      this.highlightedIndex = -1;
    }
  }

  private updateHighlight() {
    // Clear previous highlight
    const allOptions = this.getAllOptions();
    allOptions.forEach(opt => opt.removeAttribute('data-highlighted'));
    
    // Set new highlight
    if (this.highlightedIndex >= 0 && this.visibleOptions[this.highlightedIndex]) {
      const highlighted = this.visibleOptions[this.highlightedIndex];
      highlighted.setAttribute('data-highlighted', 'true');
      
      // Scroll into view if needed
      highlighted.scrollIntoView?.({ block: 'nearest' });
    }
    
    this.updateAriaActiveDescendant();
  }

  private selectOption(option: PostOptionElement) {
    const value = option.value;
    const label = option.textContent?.trim() || value;
    
    this.value = label;
    
    if (this.inputElement) {
      this.inputElement.value = label;
    }
    
    this.postSelect.emit({ value, label });
    this.close();
    
    // Announce selection
    this.announceToScreenReader(`${label} selected`);
  }

  private readonly handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.postInput.emit(this.value);
    
    if (this.value.length >= this.minChars) {
      this.updateVisibleOptions();
      if (this.visibleOptions.length > 0 && !this.isOpen) {
        this.open();
      } else if (this.visibleOptions.length === 0 && this.isOpen) {
        this.close();
      }
    } else {
      this.close();
    }
  };

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case this.KEYCODES.DOWN:
        event.preventDefault();
        if (!this.isOpen) {
          this.open();
        } else {
          this.highlightNext();
        }
        break;

      case this.KEYCODES.UP:
        event.preventDefault();
        if (this.isOpen) {
          this.highlightPrevious();
        }
        break;

      case this.KEYCODES.ENTER:
        if (this.isOpen && this.highlightedIndex >= 0 && this.visibleOptions[this.highlightedIndex]) {
          event.preventDefault();
          this.selectOption(this.visibleOptions[this.highlightedIndex]);
        }
        break;

      case this.KEYCODES.ESCAPE:
        if (this.isOpen) {
          event.preventDefault();
          this.close();
          this.inputElement?.focus();
        }
        break;

      case this.KEYCODES.TAB:
        if (this.isOpen) {
          this.close();
        }
        break;

      case this.KEYCODES.HOME:
        if (this.isOpen && this.visibleOptions.length > 0) {
          event.preventDefault();
          this.highlightedIndex = 0;
          this.updateHighlight();
        }
        break;

      case this.KEYCODES.END:
        if (this.isOpen && this.visibleOptions.length > 0) {
          event.preventDefault();
          this.highlightedIndex = this.visibleOptions.length - 1;
          this.updateHighlight();
        }
        break;
    }
  };

  private highlightNext() {
    if (this.visibleOptions.length === 0) return;
    
    this.highlightedIndex = (this.highlightedIndex + 1) % this.visibleOptions.length;
    this.updateHighlight();
  }

  private highlightPrevious() {
    if (this.visibleOptions.length === 0) return;
    
    this.highlightedIndex = this.highlightedIndex <= 0 
      ? this.visibleOptions.length - 1 
      : this.highlightedIndex - 1;
    this.updateHighlight();
  }

  private readonly handleFocus = () => {
    // Could auto-open on focus if desired
  };

  private readonly handleBlur = (event: FocusEvent) => {
    // Check if focus moved to an option
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (relatedTarget?.closest('post-autocomplete') === this.host) {
      return;
    }
    
    // Delay close to allow click events to fire
    setTimeout(() => {
      if (!this.host.contains(document.activeElement)) {
        this.close();
      }
    }, 150);
  };

  @EventFrom('post-popovercontainer')
  private handlePostBeforeToggle(event: CustomEvent<{ willOpen: boolean }>) {
    this.isOpen = event.detail.willOpen;
    this.updateAriaExpanded();
    
    if (this.isOpen) {
      this.postOpen.emit();
      if (this.autoHighlight && this.visibleOptions.length > 0) {
        this.highlightedIndex = 0;
        this.updateHighlight();
      }
    } else {
      this.postClose.emit();
      this.highlightedIndex = -1;
      this.updateAriaActiveDescendant();
    }
  }

  @EventFrom('post-option', { allowDescendants: true })
  private handleOptionSelect(event: CustomEvent<string>) {
    const option = this.visibleOptions.find(opt => opt.value === event.detail);
    if (option) {
      this.selectOption(option);
    }
  }

  render() {
    const listboxId = `${this.internalId}-listbox`;

    return (
      <Host>
        <div class="autocomplete-input-wrapper">
          <slot></slot>
        </div>
        
        <post-popovercontainer
          placement={this.placement}
          ref={el => (this.popoverRef = el)}
          onPostBeforeToggle={this.handlePostBeforeToggle.bind(this)}
        >
          <div 
            class="autocomplete-dropdown"
            id={listboxId}
            role="listbox"
            aria-label={this.label || 'Suggestions'}
          >
            <slot name="options"></slot>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
