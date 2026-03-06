import { Component, h, Host, Prop, Element, Listen, State } from '@stencil/core';
import { version } from '@root/package.json';
import { debounce } from '@/utils';

/**
 * @slot default - Slot for placing post-autocomplete-item components.
 */

@Component({
  tag: 'post-autocomplete',
  styleUrl: 'post-autocomplete.scss',
  shadow: true,
})
export class PostAutocomplete {
  private inputElement: HTMLInputElement;
  private listBoxElement: HTMLPostListboxElement;
  private isDetachedListbox: boolean = false;
  private readonly onOptionSelected = (event: Event) =>
    this.handleOptionSelected(event as CustomEvent<string>);
  private readonly onOptionActive = (event: Event) =>
    this.handleOptionActive(event as CustomEvent<string | null>);
  private readonly onClearClick = () => this.clearInput();
  private readonly debouncedHandleInput = debounce((event: Event) => this.handleInput(event), 250);
  @Element() host: HTMLPostAutocompleteElement;

  /** Number of characters to type before filtering methods are called */
  @Prop() readonly filterThreshold: number = 0;

  /** Show or hide the clear button */
  @Prop() readonly clearable: boolean = false;

  /** Optional idref to connect the autocomplete with the options dropdown if not nested */
  @Prop() readonly options?: string;

  @State() inputValue: string = '';

  componentWillLoad() {
    this.inputElement = this.host.querySelector('input');
    if (!this.inputElement) return;
    this.inputElement.role = 'combobox';
    this.inputElement.ariaAutoComplete = 'list';

    if (this.options) {
      this.listBoxElement = document.getElementById(this.options) as HTMLPostListboxElement;
    } else {
      this.listBoxElement = this.host.querySelector('post-listbox');
    }
    if (!this.listBoxElement) return;

    this.isDetachedListbox = !this.host.contains(this.listBoxElement);

    if (!this.listBoxElement.id) this.listBoxElement.id = crypto.randomUUID();
    this.inputElement.setAttribute('aria-controls', this.listBoxElement.id);
    this.inputElement.setAttribute('aria-expanded', 'false');
    this.inputElement.addEventListener('input', this.debouncedHandleInput);
    this.inputElement.addEventListener('keydown', this.handleKeyDown);
    this.inputElement.addEventListener('blur', this.handleOnBlur);
    this.inputElement.addEventListener('focus', this.handleOnFocus);
    this.inputElement.style.cursor = 'pointer';
    this.attachListboxListeners();
  }

  disconnectedCallback() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('input', this.debouncedHandleInput);
      this.inputElement.removeEventListener('keydown', this.handleKeyDown);
      this.inputElement.removeEventListener('blur', this.handleOnBlur);
      this.inputElement.removeEventListener('focus', this.handleOnFocus);
    }
    this.detachListboxListeners();
  }

  private attachListboxListeners() {
    if (this.listBoxElement && this.isDetachedListbox) {
      this.listBoxElement.addEventListener('postOptionSelected', this.onOptionSelected);
      this.listBoxElement.addEventListener('postOptionActive', this.onOptionActive);
    }
  }

  private detachListboxListeners() {
    if (this.listBoxElement && this.isDetachedListbox) {
      this.listBoxElement.removeEventListener('postOptionSelected', this.onOptionSelected);
      this.listBoxElement.removeEventListener('postOptionActive', this.onOptionActive);
    }
  }

  private readonly handleOnBlur = () => {
    if (this.inputElement) {
      this.inputElement.style.cursor = 'pointer';
    }
    // Delay so mousedown on an option fires before the listbox closes
    setTimeout(() => {
      this.inputElement.value = this.inputValue;
      this.listBoxElement.resetFilter();
      this.hideListBox();
    }, 150);
  };

  private readonly handleOnFocus = () => {
    if (this.inputElement) {
      this.inputElement.style.cursor = 'text';
    }
  };

  private readonly handleInput = (event: Event) => {
    if (!this.listBoxElement) return;
    const { value } = event.target as HTMLInputElement;
    const query = value.trim();
    if (query && query.length >= this.filterThreshold) {
      this.listBoxElement.filter(query);
      this.showListBox();
      return;
    }
    if (!query) {
      this.inputValue = '';

      // Hide the listbox if the input is empty, allow space key to open listbox
      if (this.inputElement.value === '') {
        this.hideListBox();
      }
    }
    this.listBoxElement.resetFilter();
  };

  private readonly handleKeyDown = (event: KeyboardEvent) => {
    const { key, altKey } = event;
    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        this.showListBox();
        if (!altKey) {
          this.listBoxElement.navigate('down');
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.listBoxElement.navigate('up');
        break;
      case 'Enter':
        if (this.listBoxElement.hidden) return;
        event.preventDefault();
        this.listBoxElement.selectActive();
        this.hideListBox();
        break;
      case 'Escape':
        this.hideListBox();
        break;
      case 'Tab':
        this.listBoxElement.selectActive();
        this.hideListBox();
        break;
      case 'Home':
        event.preventDefault();
        this.listBoxElement.navigate('first');
        break;
      case 'End':
        event.preventDefault();
        this.listBoxElement.navigate('last');
        break;
      case ' ':
        if (this.inputElement.value === '') {
          event.preventDefault();
          this.showListBox();
        }
        break;
    }
  };

  @Listen('postOptionSelected')
  handleOptionSelected(e: CustomEvent<string>) {
    const value = e.detail;
    this.inputElement.value = value;
    this.inputValue = value;
    this.hideListBox();
  }

  @Listen('postOptionActive')
  handleOptionActive(e: CustomEvent<string | null>) {
    const value = e.detail;
    if (value) {
      this.inputElement.setAttribute('aria-activedescendant', value);
    } else {
      this.inputElement.removeAttribute('aria-activedescendant');
    }
  }

  private hideListBox() {
    this.listBoxElement.close();
    this.inputElement.ariaExpanded = 'false';
    this.host.removeAttribute('open');
    this.inputElement.removeAttribute('aria-activedescendant');
  }

  private showListBox() {
    this.listBoxElement.open();
    this.inputElement.ariaExpanded = 'true';
    this.host.setAttribute('open', '');
  }

  private clearInput() {
    if (this.inputElement) {
      this.inputElement.value = '';
      this.inputValue = '';
      this.listBoxElement.resetFilter();
      this.hideListBox();
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <slot />
        {this.clearable && this.inputValue && (
          <button type="button" class="autocomplete-clear" onClick={this.onClearClick}>
            <post-icon name="closex"></post-icon>
          </button>
        )}
        <post-icon aria-hidden="true" class="autocomplete-icon" name="chevronDown"></post-icon>
      </Host>
    );
  }
}
