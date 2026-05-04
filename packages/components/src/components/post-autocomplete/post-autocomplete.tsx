import { Component, h, Host, Prop, Element, State, Event, EventEmitter } from '@stencil/core';
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
  private readonly debouncedHandleInput = debounce((event: Event) => this.handleInput(event), 250);
  @Element() host: HTMLPostAutocompleteElement;

  /** Number of characters to type before filtering methods are called */
  @Prop({ reflect: true }) readonly filterThreshold: number = 0;

  /** Show or hide the clear button */
  @Prop({ reflect: true }) readonly clearable: boolean = false;

  /** Optional idref to connect the autocomplete with the options dropdown if not nested */
  @Prop({ reflect: true }) readonly listbox?: string;

  @State() inputValue: string = '';

  /** Cancelable event emitted when the input value is to be filtered */
  @Event({ cancelable: true }) postFilteringEvent: EventEmitter<string>;

  private get inputElement() {
    return this.host.querySelector('input');
  }

  private get listBoxElement() {
    if (this.listbox) {
      return document.getElementById(this.listbox) as HTMLPostListboxElement;
    } else {
      return this.host.querySelector('post-listbox');
    }
  }

  componentWillLoad() {
    if (!this.inputElement) return;
    this.inputElement.role = 'combobox';
    this.inputElement.ariaAutoComplete = 'list';

    if (!this.listBoxElement) return;

    if (!this.listBoxElement.id) this.listBoxElement.id = crypto.randomUUID();
    this.inputElement.setAttribute('aria-controls', this.listBoxElement.id);
    this.inputElement.setAttribute('aria-expanded', 'false');
    // Because we're handling that and the browser would show a duplicate native autocomplete dropdown
    this.inputElement.autocomplete = 'off';
    this.attachInputListeners();
    this.attachListboxListeners();
  }

  disconnectedCallback() {
    this.detachInputListeners();
    this.detachListboxListeners();
  }

  private attachInputListeners() {
    if (this.inputElement) {
      this.inputElement.addEventListener('input', this.debouncedHandleInput);
      this.inputElement.addEventListener('keydown', this.handleKeyDown);
      this.inputElement.addEventListener('blur', this.handleOnBlur);
      this.inputElement.addEventListener('click', this.showListBox);
    }
  }

  private detachInputListeners() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('input', this.debouncedHandleInput);
      this.inputElement.removeEventListener('keydown', this.handleKeyDown);
      this.inputElement.removeEventListener('blur', this.handleOnBlur);
      this.inputElement.removeEventListener('click', this.showListBox);
    }
  }

  private attachListboxListeners() {
    if (this.listBoxElement) {
      this.listBoxElement.addEventListener('postOptionSelected', this.handleOptionSelected);
      this.listBoxElement.addEventListener('postOptionActive', this.handleOptionActive);
    }
  }

  private detachListboxListeners() {
    if (this.listBoxElement) {
      this.listBoxElement.removeEventListener('postOptionSelected', this.handleOptionSelected);
      this.listBoxElement.removeEventListener('postOptionActive', this.handleOptionActive);
    }
  }

  private readonly handleOnBlur = () => {
    this.inputElement.value = this.inputValue;
    this.listBoxElement.filter('');
    this.hideListBox();
  };

  private readonly handleInput = (event: Event) => {
    if (!this.listBoxElement) return;
    const value = (event.target as HTMLInputElement).value.trim();
    const query = value.length >= this.filterThreshold ? value : '';
    // Allow for consuming parent to handle filtering (e.g. for async data) and prevent default filtering behavior
    const { defaultPrevented } = this.postFilteringEvent.emit(
      query && query.length >= this.filterThreshold ? query : '',
    );
    if (defaultPrevented) return;

    this.listBoxElement.filter(query);

    if (query) {
      this.showListBox();
    } else {
      this.inputValue = '';
    }
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
    }
  };

  private readonly handleOptionSelected = (e: CustomEvent<string>) => {
    const value = e.detail;
    this.inputElement.value = value;
    this.inputValue = value;
    this.hideListBox();
  };

  private readonly handleOptionActive = (e: CustomEvent<string | null>) => {
    const value = e.detail;
    if (value) {
      this.inputElement.setAttribute('aria-activedescendant', value);
    } else {
      this.inputElement.removeAttribute('aria-activedescendant');
    }
  };

  private readonly hideListBox = () => {
    this.listBoxElement.hide();
    this.inputElement.ariaExpanded = 'false';
    this.host.removeAttribute('open');
    this.inputElement.removeAttribute('aria-activedescendant');
  };

  private readonly showListBox = () => {
    this.listBoxElement.show();
    this.inputElement.ariaExpanded = 'true';
    this.host.setAttribute('open', '');
  };

  private readonly clearInput = () => {
    if (this.inputElement) {
      this.inputElement.value = '';
      this.inputValue = '';
      this.listBoxElement.clearSelection();
      this.hideListBox();
    }
  };

  render() {
    return (
      <Host data-version={version}>
        <slot />
        {this.clearable && this.inputValue && (
          <button type="button" class=" autocomplete-clear" onClick={this.clearInput}>
            <post-icon aria-hidden="true" name="closex"></post-icon>
          </button>
        )}
        <post-icon aria-hidden="true" class="autocomplete-icon" name="chevronDown"></post-icon>
      </Host>
    );
  }
}
