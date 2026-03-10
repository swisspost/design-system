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
import { EventFrom } from '@/utils';

/**
 * Interface representing the properties of a post-option element.
 * Used for type safety when accessing option properties.
 */
interface PostOptionElement extends HTMLElement {
  value: string;
  disabled: boolean;
  selected: boolean;
}

let listboxId = 0;

/**
 * @slot default - The post-option elements to display in the listbox
 */
@Component({
  tag: 'post-listbox',
  styleUrl: 'post-listbox.scss',
  shadow: true,
})
export class PostListbox {
  private internalId = `post-listbox-${listboxId++}`;

  @Element() host: HTMLElement;

  /**
   * The currently selected value.
   */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /**
   * A descriptive label for the listbox for assistive technologies.
   */
  @Prop() label?: string;

  /**
   * If `true`, multiple options can be selected.
   */
  @Prop() multiple = false;

  /**
   * The index of the currently active (focused) option for keyboard navigation.
   */
  @State() activeIndex = -1;

  /**
   * Emitted when the selected value changes.
   */
  @Event() postChange: EventEmitter<string | string[]>;

  /**
   * Emitted when an option receives focus via keyboard navigation.
   */
  @Event() postFocus: EventEmitter<{ value: string; index: number }>;

  private readonly KEYCODES = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    HOME: 'Home',
    END: 'End',
    ENTER: 'Enter',
    SPACE: ' ',
  };

  connectedCallback() {
    this.host.setAttribute('data-version', version);
    this.setupAttributes();
    this.host.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.host.removeEventListener('keydown', this.handleKeyDown);
  }

  componentDidLoad() {
    // Set initial active index if value is set
    if (this.value) {
      const options = this.getOptionsSync();
      const index = options.findIndex(opt => opt.value === this.value);
      if (index >= 0) {
        this.activeIndex = index;
        this.updateActiveDescendant();
      }
    }
  }

  private setupAttributes() {
    this.host.setAttribute('role', 'listbox');
    this.host.setAttribute('id', this.host.id || this.internalId);
    if (this.label) {
      this.host.setAttribute('aria-label', this.label);
    }
    if (this.multiple) {
      this.host.setAttribute('aria-multiselectable', 'true');
    }
  }

  @Watch('label')
  updateAriaLabel() {
    if (this.label) {
      this.host.setAttribute('aria-label', this.label);
    } else {
      this.host.removeAttribute('aria-label');
    }
  }

  @Watch('multiple')
  updateAriaMultiselectable() {
    if (this.multiple) {
      this.host.setAttribute('aria-multiselectable', 'true');
    } else {
      this.host.removeAttribute('aria-multiselectable');
    }
  }

  @Watch('activeIndex')
  updateActiveDescendant() {
    const options = this.getOptionsSync();
    if (this.activeIndex >= 0 && options[this.activeIndex]) {
      const activeOption = options[this.activeIndex];
      this.host.setAttribute('aria-activedescendant', activeOption.id);
    } else {
      this.host.removeAttribute('aria-activedescendant');
    }
  }

  /**
   * Returns all post-option elements in the listbox.
   */
  @Method()
  async getOptions(): Promise<PostOptionElement[]> {
    return this.getOptionsSync();
  }

  private getOptionsSync(): PostOptionElement[] {
    const slot = this.host.shadowRoot?.querySelector('slot');
    if (!slot) return [];

    const assignedElements = slot.assignedElements({ flatten: true });
    return assignedElements.filter(
      (el): el is PostOptionElement => el.tagName.toLowerCase() === 'post-option'
    );
  }

  /**
   * Sets the active (focused) option by index.
   */
  @Method()
  async setActiveIndex(index: number): Promise<void> {
    const options = this.getOptionsSync();
    if (index >= 0 && index < options.length && !options[index].disabled) {
      this.activeIndex = index;
      this.postFocus.emit({ value: options[index].value, index });
    }
  }

  /**
   * Selects an option by value.
   */
  @Method()
  async selectValue(value: string): Promise<void> {
    const options = this.getOptionsSync();
    const option = options.find(opt => opt.value === value);
    if (option && !option.disabled) {
      this.selectOption(option);
    }
  }

  /**
   * Clears the current selection.
   */
  @Method()
  async clearSelection(): Promise<void> {
    const options = this.getOptionsSync();
    options.forEach(opt => (opt.selected = false));
    this.value = undefined;
    this.postChange.emit(this.multiple ? [] : '');
  }

  /**
   * Focuses the first non-disabled option.
   */
  @Method()
  async focusFirst(): Promise<void> {
    const options = this.getOptionsSync();
    const firstEnabled = options.findIndex(opt => !opt.disabled);
    if (firstEnabled >= 0) {
      await this.setActiveIndex(firstEnabled);
    }
  }

  /**
   * Focuses the last non-disabled option.
   */
  @Method()
  async focusLast(): Promise<void> {
    const options = this.getOptionsSync();
    for (let i = options.length - 1; i >= 0; i--) {
      if (!options[i].disabled) {
        await this.setActiveIndex(i);
        break;
      }
    }
  }

  private selectOption(option: PostOptionElement) {
    if (option.disabled) return;

    const options = this.getOptionsSync();

    if (this.multiple) {
      option.selected = !option.selected;
      const selectedValues = options.filter(opt => opt.selected).map(opt => opt.value);
      this.value = selectedValues.join(',');
      this.postChange.emit(selectedValues);
    } else {
      // Deselect all others
      options.forEach(opt => (opt.selected = false));
      option.selected = true;
      this.value = option.value;
      this.postChange.emit(option.value);
    }
  }

  @EventFrom('post-option')
  private handleOptionSelect(event: CustomEvent<string>) {
    const options = this.getOptionsSync();
    const option = options.find(opt => opt.value === event.detail);
    if (option) {
      this.selectOption(option);
      // Update active index to selected option
      const index = options.indexOf(option);
      if (index >= 0) {
        this.activeIndex = index;
      }
    }
  }

  private readonly handleKeyDown = (e: KeyboardEvent) => {
    const options = this.getOptionsSync();
    if (!options.length) return;

    let newIndex = this.activeIndex;
    let handled = false;

    switch (e.key) {
      case this.KEYCODES.UP:
        e.preventDefault();
        handled = true;
        // Find previous non-disabled option
        for (let i = this.activeIndex - 1; i >= 0; i--) {
          if (!options[i].disabled) {
            newIndex = i;
            break;
          }
        }
        break;

      case this.KEYCODES.DOWN:
        e.preventDefault();
        handled = true;
        // Find next non-disabled option
        for (let i = this.activeIndex + 1; i < options.length; i++) {
          if (!options[i].disabled) {
            newIndex = i;
            break;
          }
        }
        break;

      case this.KEYCODES.HOME:
        e.preventDefault();
        handled = true;
        // Find first non-disabled option
        for (let i = 0; i < options.length; i++) {
          if (!options[i].disabled) {
            newIndex = i;
            break;
          }
        }
        break;

      case this.KEYCODES.END:
        e.preventDefault();
        handled = true;
        // Find last non-disabled option
        for (let i = options.length - 1; i >= 0; i--) {
          if (!options[i].disabled) {
            newIndex = i;
            break;
          }
        }
        break;

      case this.KEYCODES.ENTER:
      case this.KEYCODES.SPACE:
        e.preventDefault();
        handled = true;
        if (this.activeIndex >= 0 && options[this.activeIndex] && !options[this.activeIndex].disabled) {
          this.selectOption(options[this.activeIndex]);
        }
        break;
    }

    if (handled && newIndex !== this.activeIndex && newIndex >= 0) {
      this.setActiveIndex(newIndex);
    }
  };

  render() {
    return (
      <Host tabindex="0" onPostOptionSelect={this.handleOptionSelect.bind(this)}>
        <slot></slot>
      </Host>
    );
  }
}
