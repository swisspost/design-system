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
import { version } from '@root/package.json';
import { checkEmptyOrType, getRoot } from '@/utils';

let autocompleteIds = 0;

/**
 * @slot default - Slot for the input field, label, hints, validation messages, and optionally a nested `<post-listbox>`.
 */
@Component({
  tag: 'post-autocomplete',
  styleUrl: 'post-autocomplete.scss',
  shadow: true,
})
export class PostAutocomplete {
  private autocompleteId: string;
  private inputElement: HTMLInputElement | null = null;
  private listboxElement: HTMLPostListboxElement | null = null;
  private statusElement: HTMLSpanElement | null = null;
  private activeOptionId: string | null = null;
  private selectedValue: { value: string; text: string; id: string } | null = null;
  private root?: Document | ShadowRoot | null;

  private readonly KEYCODES = {
    SPACE: ' ',
    ENTER: 'Enter',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    TAB: 'Tab',
    HOME: 'Home',
    END: 'End',
    ESCAPE: 'Escape',
    ALT: 'Alt',
  };

  @Element() host: HTMLPostAutocompleteElement;

  /**
   * Number of characters to type before filter events are fired.
   */
  @Prop() readonly filterThreshold?: number = 0;

  @Watch('filterThreshold')
  validateFilterThreshold() {
    checkEmptyOrType(this, 'filterThreshold', 'number');
  }

  /**
   * Whether to show a clear button.
   */
  @Prop() readonly clearable?: boolean = false;

  /**
   * Optional idref to connect to an external `<post-listbox>` when not nested.
   */
  @Prop() readonly options?: string;

  @Watch('options')
  validateOptions() {
    checkEmptyOrType(this, 'options', 'string');
  }

  /**
   * Whether the listbox is currently open.
   */
  @State() isOpen = false;

  /**
   * Current number of visible options.
   */
  @State() visibleOptionsCount = 0;

  /**
   * Cancellable event fired when the input value changes and meets the filter threshold.
   * Call `event.preventDefault()` to handle filtering yourself.
   */
  @Event() postFilterRequest: EventEmitter<string>;

  /**
   * Event fired when an option is selected.
   */
  @Event() postSelect: EventEmitter<{ value: string; text: string }>;

  /**
   * Event fired when the autocomplete is cleared.
   */
  @Event() postClear: EventEmitter<void>;

  connectedCallback() {
    this.autocompleteId = `post-autocomplete-${autocompleteIds++}`;
    this.root = getRoot(this.host);
    this.host.setAttribute('data-version', version);
  }

  componentDidLoad() {
    this.validateFilterThreshold();
    this.validateOptions();
    this.setupComponents();
  }

  disconnectedCallback() {
    this.cleanupEventListeners();
    this.removeStatusElement();
  }

  /**
   * Programmatically opens the listbox.
   */
  @Method()
  async open(): Promise<void> {
    if (this.listboxElement && this.inputElement) {
      await this.listboxElement.show(this.inputElement);
    }
  }

  /**
   * Programmatically closes the listbox.
   */
  @Method()
  async close(): Promise<void> {
    if (this.listboxElement) {
      await this.listboxElement.hide();
    }
  }

  /**
   * Clears the current selection and input value.
   */
  @Method()
  async clear(): Promise<void> {
    this.clearInternal();
  }

  private setupComponents() {
    // Find the slotted input
    this.inputElement = this.host.querySelector('input');
    if (!this.inputElement) {
      console.warn('post-autocomplete: No input element found in slot');
      return;
    }

    // Find the listbox - either nested or external
    this.listboxElement = this.findListbox();
    if (!this.listboxElement) {
      console.warn('post-autocomplete: No post-listbox element found');
      return;
    }

    this.setupAriaAttributes();
    this.setupEventListeners();
    this.createStatusElement();
    this.updateVisibleOptionsCount();
  }

  private findListbox(): HTMLPostListboxElement | null {
    // First check for nested listbox
    const nestedListbox = this.host.querySelector('post-listbox');
    if (nestedListbox) {
      return nestedListbox;
    }

    // Otherwise, look for external listbox by idref
    if (this.options && this.root) {
      return this.root.querySelector(`#${this.options}`) as HTMLPostListboxElement;
    }

    return null;
  }

  private setupAriaAttributes() {
    if (!this.inputElement || !this.listboxElement) return;

    // Set up combobox ARIA attributes on the input
    this.inputElement.setAttribute('role', 'combobox');
    this.inputElement.setAttribute('aria-autocomplete', 'list');
    this.inputElement.setAttribute('aria-expanded', 'false');
    this.inputElement.setAttribute('aria-owns', this.listboxElement.id);
    this.inputElement.setAttribute('aria-haspopup', 'listbox');
  }

  private setupEventListeners() {
    if (!this.inputElement) return;

    this.inputElement.addEventListener('input', this.handleInput);
    this.inputElement.addEventListener('keydown', this.handleKeyDown);
    this.inputElement.addEventListener('focus', this.handleFocus);
    this.inputElement.addEventListener('blur', this.handleBlur);

    // Listen for option selection from the listbox
    this.host.addEventListener('postOptionSelected', this.handleOptionSelected);

    // Listen for listbox show/hide events
    if (this.listboxElement) {
      this.listboxElement.addEventListener('postListboxShow', this.handleListboxShow);
      this.listboxElement.addEventListener('postListboxHide', this.handleListboxHide);
    }
  }

  private cleanupEventListeners() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('input', this.handleInput);
      this.inputElement.removeEventListener('keydown', this.handleKeyDown);
      this.inputElement.removeEventListener('focus', this.handleFocus);
      this.inputElement.removeEventListener('blur', this.handleBlur);
    }

    this.host.removeEventListener('postOptionSelected', this.handleOptionSelected);

    if (this.listboxElement) {
      this.listboxElement.removeEventListener('postListboxShow', this.handleListboxShow);
      this.listboxElement.removeEventListener('postListboxHide', this.handleListboxHide);
    }
  }

  private createStatusElement() {
    if (!this.inputElement) return;

    // Create a hidden live region for screen reader announcements
    this.statusElement = document.createElement('span');
    this.statusElement.id = `${this.autocompleteId}-status`;
    this.statusElement.className = 'visually-hidden';
    this.statusElement.setAttribute('aria-live', 'polite');
    this.statusElement.setAttribute('aria-atomic', 'true');
    this.statusElement.setAttribute('role', 'status');

    // Insert after the input in light DOM
    this.inputElement.parentNode?.insertBefore(
      this.statusElement,
      this.inputElement.nextSibling,
    );

    // Update aria-describedby on input to include the status
    const existingDescribedBy = this.inputElement.getAttribute('aria-describedby') || '';
    const newDescribedBy = existingDescribedBy
      ? `${existingDescribedBy} ${this.statusElement.id}`
      : this.statusElement.id;
    this.inputElement.setAttribute('aria-describedby', newDescribedBy);
  }

  private removeStatusElement() {
    if (this.statusElement && this.statusElement.parentNode) {
      // Remove from aria-describedby
      if (this.inputElement) {
        const describedBy = this.inputElement.getAttribute('aria-describedby') || '';
        const updated = describedBy
          .split(' ')
          .filter(id => id !== this.statusElement?.id)
          .join(' ');
        if (updated) {
          this.inputElement.setAttribute('aria-describedby', updated);
        } else {
          this.inputElement.removeAttribute('aria-describedby');
        }
      }

      this.statusElement.parentNode.removeChild(this.statusElement);
      this.statusElement = null;
    }
  }

  private updateStatusAnnouncement() {
    if (this.statusElement) {
      const count = this.visibleOptionsCount;
      if (count === 0) {
        this.statusElement.textContent = 'No options available';
      } else if (count === 1) {
        this.statusElement.textContent = '1 option available';
      } else {
        this.statusElement.textContent = `${count} options available`;
      }
    }
  }

  private async updateVisibleOptionsCount() {
    if (!this.listboxElement) return;

    const visibleOptions = await this.listboxElement.getVisibleOptions();
    this.visibleOptionsCount = visibleOptions.length;
  }

  private readonly handleInput = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    // Don't process input if the input is disabled
    if (input.disabled) return;

    // Check if we meet the filter threshold
    if (value.length >= (this.filterThreshold ?? 0)) {
      const event = this.postFilterRequest.emit(value);

      // If not cancelled, use default filtering
      if (!event.defaultPrevented) {
        await this.listboxElement?.filter(value);
      }

      await this.updateVisibleOptionsCount();
      this.updateStatusAnnouncement();

      // Open the listbox when typing
      if (!this.isOpen && this.inputElement) {
        await this.listboxElement?.show(this.inputElement);
      }
    } else if (value.length === 0) {
      // Reset filter when input is cleared
      await this.listboxElement?.filter('');
      await this.updateVisibleOptionsCount();
      this.updateStatusAnnouncement();
    }
  };

  private readonly handleKeyDown = async (e: KeyboardEvent) => {
    // Don't process keyboard events if the input is disabled
    if (this.inputElement?.disabled) return;

    const { key } = e;

    switch (key) {
      case this.KEYCODES.DOWN:
        e.preventDefault();
        if (e.altKey) {
          // Alt+Down: open listbox
          if (!this.isOpen && this.inputElement) {
            await this.listboxElement?.show(this.inputElement);
          }
        } else {
          // Down: open if closed, otherwise move to next option
          if (!this.isOpen && this.inputElement) {
            await this.listboxElement?.show(this.inputElement);
          }
          await this.moveActiveOption(1);
        }
        break;

      case this.KEYCODES.UP:
        e.preventDefault();
        if (this.isOpen) {
          await this.moveActiveOption(-1);
        }
        break;

      case this.KEYCODES.ENTER:
        if (this.isOpen && this.activeOptionId) {
          e.preventDefault();
          await this.selectActiveOption();
        }
        break;

      case this.KEYCODES.ESCAPE:
        if (this.isOpen) {
          e.preventDefault();
          await this.listboxElement?.hide();
        }
        break;

      case this.KEYCODES.TAB:
        // Accept current selection and close
        if (this.isOpen) {
          if (this.activeOptionId) {
            await this.selectActiveOption();
          }
          await this.listboxElement?.hide();
        }
        break;

      case this.KEYCODES.HOME:
        if (this.isOpen) {
          e.preventDefault();
          await this.moveToFirstOption();
        }
        break;

      case this.KEYCODES.END:
        if (this.isOpen) {
          e.preventDefault();
          await this.moveToLastOption();
        }
        break;

      case this.KEYCODES.SPACE:
        // Open listbox on space (but allow normal space character in input)
        if (!this.isOpen && this.inputElement) {
          await this.listboxElement?.show(this.inputElement);
        }
        break;
    }
  };

  private readonly handleFocus = () => {
    // Optionally open on focus - currently not doing this by default
  };

  private readonly handleBlur = async () => {
    // Delay to allow click on options to register
    await new Promise(resolve => setTimeout(resolve, 150));

    if (this.isOpen) {
      await this.listboxElement?.hide();
    }

    // Validation behavior: clear or restore
    if (this.inputElement) {
      if (this.selectedValue) {
        // Restore to selected value
        this.inputElement.value = this.selectedValue.text;
      } else {
        // Clear input if nothing selected
        this.inputElement.value = '';
      }
    }
  };

  private readonly handleOptionSelected = async (e: CustomEvent<{ value: string; text: string; id: string }>) => {
    e.stopPropagation();

    const { value, text, id } = e.detail;

    // Update selection
    this.selectedValue = { value, text, id };

    // Update input value
    if (this.inputElement) {
      this.inputElement.value = text;
    }

    // Update selected state in listbox
    if (this.listboxElement) {
      await this.listboxElement.clearSelection();
      const options = await this.listboxElement.getOptions();
      const selectedOption = options.find(opt => opt.id === id);
      if (selectedOption) {
        selectedOption.selected = true;
      }
    }

    // Close the listbox
    await this.listboxElement?.hide();

    // Emit selection event
    this.postSelect.emit({ value, text });

    // Return focus to input
    this.inputElement?.focus();
  };

  private readonly handleListboxShow = () => {
    this.isOpen = true;
    this.inputElement?.setAttribute('aria-expanded', 'true');
    this.updateStatusAnnouncement();
  };

  private readonly handleListboxHide = () => {
    this.isOpen = false;
    this.activeOptionId = null;
    this.inputElement?.setAttribute('aria-expanded', 'false');
    this.inputElement?.removeAttribute('aria-activedescendant');
    this.listboxElement?.setActiveOption(null);
  };

  private async moveActiveOption(direction: number) {
    if (!this.listboxElement) return;

    const visibleOptions = await this.listboxElement.getVisibleOptions();
    if (visibleOptions.length === 0) return;

    let currentIndex = -1;
    if (this.activeOptionId) {
      currentIndex = visibleOptions.findIndex(opt => opt.id === this.activeOptionId);
    }

    // Calculate new index with wrapping
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = visibleOptions.length - 1;
    } else if (newIndex >= visibleOptions.length) {
      newIndex = 0;
    }

    const newOption = visibleOptions[newIndex];
    if (newOption) {
      this.activeOptionId = newOption.id;
      await this.listboxElement.setActiveOption(newOption.id);
      this.inputElement?.setAttribute('aria-activedescendant', newOption.id);
    }
  }

  private async moveToFirstOption() {
    if (!this.listboxElement) return;

    const visibleOptions = await this.listboxElement.getVisibleOptions();
    if (visibleOptions.length > 0) {
      const firstOption = visibleOptions[0];
      this.activeOptionId = firstOption.id;
      await this.listboxElement.setActiveOption(firstOption.id);
      this.inputElement?.setAttribute('aria-activedescendant', firstOption.id);
    }
  }

  private async moveToLastOption() {
    if (!this.listboxElement) return;

    const visibleOptions = await this.listboxElement.getVisibleOptions();
    if (visibleOptions.length > 0) {
      const lastOption = visibleOptions[visibleOptions.length - 1];
      this.activeOptionId = lastOption.id;
      await this.listboxElement.setActiveOption(lastOption.id);
      this.inputElement?.setAttribute('aria-activedescendant', lastOption.id);
    }
  }

  private async selectActiveOption() {
    if (!this.listboxElement || !this.activeOptionId) return;

    const options = await this.listboxElement.getOptions();
    const activeOption = options.find(opt => opt.id === this.activeOptionId);

    if (activeOption) {
      // Simulate selection by clicking the option
      activeOption.click();
    }
  }

  private clearInternal() {
    if (this.inputElement) {
      this.inputElement.value = '';
    }

    this.selectedValue = null;
    this.activeOptionId = null;
    this.listboxElement?.clearSelection();
    this.listboxElement?.filter('');
    this.listboxElement?.hide();

    this.postClear.emit();
    this.inputElement?.focus();
  }

  private readonly handleClearClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.clearInternal();
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
              aria-label="Clear selection"
              onClick={this.handleClearClick}
            >
              <post-icon name="closex" aria-hidden="true"></post-icon>
            </button>
          )}
        </div>
      </Host>
    );
  }
}
