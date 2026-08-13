import { debounce, Required, Type } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';

/**
 * @slot default - Slot for placing post-autocomplete-item components.
 */

@Component({
  tag: 'post-autocomplete',
  styleUrl: 'post-autocomplete.scss',
  shadow: true,
})
export class PostAutocomplete {
  private readonly debouncedHandleInput = debounce((event: Event) => {
    void this.handleInput(event);
  }, 250);
  private outputElement?: HTMLOutputElement;

  @Element() host: HTMLPostAutocompleteElement;

  /**
   * Minimum number of characters the user must type before filtering is triggered.
   * Useful when options are loaded asynchronously to avoid unnecessary requests on every keystroke.
   * The `postFilteringEvent` will only fire once the input length meets this threshold.
   */
  @Prop({ reflect: true }) readonly filterThreshold: number = 0;

  /** Show or hide the clear button */
  @Prop({ reflect: true }) readonly clearable: boolean = false;

  /** Optional idref to connect the autocomplete with the options dropdown if not nested */
  @Prop({ reflect: true }) readonly listbox?: string;

  /**
   * Announcement template for screen readers when the suggestion list updates.
   * Use {count} as placeholder for the number of available suggestions,
   * e.g. "{count} suggestions available"
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  readonly textAvailableSuggestions!: string;

  @State() inputValue: string = '';

  /**
   * Cancelable event emitted when the input value meets the `filterThreshold` and filtering should occur.
   * Call `event.preventDefault()` to suppress the built-in filtering and handle it yourself,
   * e.g. to fetch options asynchronously based on the query string in `event.detail`.
   */
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

    const inputLabel = this.inputElement.labels?.[0];
    if (inputLabel) {
      if (!inputLabel.id) inputLabel.id = crypto.randomUUID();
      this.listBoxElement.setAttribute('aria-labelledby', inputLabel.id);
    }

    // Because we're handling that and the browser would show a duplicate native autocomplete dropdown
    this.inputElement.autocomplete = 'off';
    this.attachInputListeners();
    this.attachListboxListeners();
  }

  componentDidLoad() {
    if (!this.inputElement || !this.listBoxElement) return;

    const selectedOption = this.listBoxElement.querySelector(
      'post-listbox-option[selected]',
    ) as HTMLPostListboxOptionElement | null;
    const attributeValue = this.inputElement.getAttribute('value');

    // Priority: form directive (programmatic) > selected attribute > value attribute
    // A programmatic value is detected when input.value differs from its HTML value attribute
    const isProgrammatic =
      this.inputElement.value && this.inputElement.value !== (attributeValue ?? '');

    let value: string;
    if (isProgrammatic) {
      value = this.inputElement.value;
    } else if (selectedOption) {
      value = selectedOption.value;
    } else if (attributeValue) {
      value = attributeValue;
    } else {
      return;
    }

    // Sync input and listbox selection
    this.inputElement.value = value;
    this.inputValue = value;
    this.listBoxElement
      .querySelectorAll('post-listbox-option')
      .forEach((option: HTMLPostListboxOptionElement) => {
        option.selected = option.value === value;
      });
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
      this.inputElement.addEventListener('focus', this.handleFocus);
    }
  }

  private readonly handleFocus = () => {
    if (this.filterThreshold !== 0) return;
    if (this.inputElement && this.inputElement.value.trim() !== '') return;
    this.postFilteringEvent.emit('');
  };

  private detachInputListeners() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('input', this.debouncedHandleInput);
      this.inputElement.removeEventListener('keydown', this.handleKeyDown);
      this.inputElement.removeEventListener('blur', this.handleOnBlur);
      this.inputElement.removeEventListener('click', this.showListBox);
      this.inputElement.removeEventListener('focus', this.handleFocus);
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

  private clearAnnouncement() {
    if (this.outputElement) this.outputElement.textContent = '';
  }

  private announceCount() {
    if (!this.outputElement || !this.listBoxElement) return;
    const count = this.listBoxElement.querySelectorAll('post-listbox-option:not([hidden])').length;
    this.outputElement.textContent = this.textAvailableSuggestions.replace(
      '{count}',
      String(count),
    );
  }

  private readonly handleOnBlur = () => {
    this.inputElement.value = this.inputValue;
    this.listBoxElement.filter('');
    this.hideListBox();
  };

  private readonly handleInput = async (event: Event) => {
    if (!this.listBoxElement) return;
    const value = (event.target as HTMLInputElement).value.trim();

    if (value.length < this.filterThreshold) {
      await this.listBoxElement.filter('');
      this.inputValue = '';
      this.clearAnnouncement();
      return;
    }

    // Allow for consuming parent to handle filtering (e.g. for async data) and prevent default filtering behavior
    const { defaultPrevented } = this.postFilteringEvent.emit(value);
    if (defaultPrevented) return;

    await this.listBoxElement.filter(value);
    this.showListBox();
    this.announceCount();
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
    this.inputElement.dispatchEvent(new globalThis.Event('input', { bubbles: true }));
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
    this.clearAnnouncement();
    this.listBoxElement.hide();
    this.inputElement.ariaExpanded = 'false';
    this.host.removeAttribute('open');
    this.inputElement.removeAttribute('aria-activedescendant');
  };

  private readonly showListBox = async () => {
    await this.listBoxElement.show();
    this.inputElement.ariaExpanded = 'true';
    this.host.setAttribute('open', '');
    this.announceCount();
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
          <button type="button" class="autocomplete-clear" onClick={this.clearInput}>
            <post-icon aria-hidden="true" name="closex"></post-icon>
          </button>
        )}
        <post-icon aria-hidden="true" class="autocomplete-icon" name="chevrondown"></post-icon>
        <output class="visually-hidden" ref={el => (this.outputElement = el)}></output>
      </Host>
    );
  }
}
