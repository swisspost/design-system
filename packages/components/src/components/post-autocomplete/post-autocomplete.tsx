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
  private readonly onOptionSelected = (event: Event) =>
    this.handleOptionSelected(event as CustomEvent<string>);
  private readonly onOptionActive = (event: Event) =>
    this.handleOptionActive(event as CustomEvent<string | null>);
  private readonly onClearClick = () => this.clearInput();
  private readonly debouncedHandleInput = debounce((event: Event) => this.handleInput(event), 250);
  @Element() host: HTMLPostAutocompleteElement;

  /** Number of characters to type before filtering methods are called */
  @Prop({ reflect: true }) readonly filterThreshold: number = 0;

  /** Show or hide the clear button */
  @Prop({ reflect: true }) readonly clearable: boolean = false;

  /** Optional idref to connect the autocomplete with the options dropdown if not nested */
  @Prop({ reflect: true }) readonly options?: string;

  @State() inputValue: string = '';

  @Event({ cancelable: true }) filteringEvent: EventEmitter<string>;

  private get inputElement() {
    return this.host.querySelector('input');
  }

  private get listBoxElement() {
    if (this.options) {
      return document.getElementById(this.options) as HTMLPostListboxElement;
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
    }
  }

  private detachInputListeners() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('input', this.debouncedHandleInput);
      this.inputElement.removeEventListener('keydown', this.handleKeyDown);
      this.inputElement.removeEventListener('blur', this.handleOnBlur);
    }
  }

  private attachListboxListeners() {
    if (this.listBoxElement) {
      this.listBoxElement.addEventListener('postOptionSelected', this.onOptionSelected);
      this.listBoxElement.addEventListener('postOptionActive', this.onOptionActive);
    }
  }

  private detachListboxListeners() {
    if (this.listBoxElement) {
      this.listBoxElement.removeEventListener('postOptionSelected', this.onOptionSelected);
      this.listBoxElement.removeEventListener('postOptionActive', this.onOptionActive);
    }
  }

  private readonly handleOnBlur = () => {
    this.inputElement.value = this.inputValue;
    this.listBoxElement.resetFilter();
    this.hideListBox();
  };

  private readonly handleInput = (event: Event) => {
    if (!this.listBoxElement) return;
    const { value } = event.target as HTMLInputElement;
    const query = value.trim();
    if (query && query.length >= this.filterThreshold) {
      const { defaultPrevented } = this.filteringEvent.emit(query);
      if (!defaultPrevented) {
        this.listBoxElement.filter(query);
      }
      this.showListBox();
      return;
    }
    if (!query) {
      this.inputValue = '';
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
    }
  };

  private handleOptionSelected(e: CustomEvent<string>) {
    const value = e.detail;
    this.inputElement.value = value;
    this.inputValue = value;
    this.hideListBox();
  }

  private handleOptionActive(e: CustomEvent<string | null>) {
    const value = e.detail;
    if (value) {
      this.inputElement.setAttribute('aria-activedescendant', value);
    } else {
      this.inputElement.removeAttribute('aria-activedescendant');
    }
  }

  private hideListBox() {
    this.listBoxElement.hide();
    this.inputElement.ariaExpanded = 'false';
    this.host.removeAttribute('open');
    this.inputElement.removeAttribute('aria-activedescendant');
  }

  private showListBox() {
    this.listBoxElement.show();
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
            <post-icon aria-hidden="true" name="closex"></post-icon>
          </button>
        )}
        <post-icon aria-hidden="true" class="autocomplete-icon" name="chevronDown"></post-icon>
      </Host>
    );
  }
}
