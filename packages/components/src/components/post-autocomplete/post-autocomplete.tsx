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

  /** Number of characters to type before filtering methods are called */
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

  /** Whether the listbox is currently expanded */
  private expanded: boolean = false;

  /** The value of the last run query */
  private lastQuery: string = '';

  /** The value of the selected listbox option */
  @State() selectedValue: string | null = null;

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

  disconnectedCallback() {
    this.detachInputListeners();
    this.detachListboxListeners();
  }

  private attachInputListeners() {
    if (this.inputElement) {
      this.inputElement.addEventListener('input', this.debouncedHandleInput);
      this.inputElement.addEventListener('keydown', this.handleKeyDown);
      this.inputElement.addEventListener('blur', this.handleBlur);
      this.inputElement.addEventListener('click', this.handleClick);
    }
  }

  private detachInputListeners() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('input', this.debouncedHandleInput);
      this.inputElement.removeEventListener('keydown', this.handleKeyDown);
      this.inputElement.removeEventListener('blur', this.handleBlur);
      this.inputElement.removeEventListener('click', this.handleClick);
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

  private async showListBox() {
    await this.listBoxElement.show();
    this.expanded = true;
    this.inputElement.ariaExpanded = 'true';
    this.host.setAttribute('open', '');
    this.announceCount();
  }

  private async hideListBox() {
    this.clearAnnouncement();
    this.expanded = false;
    this.host.removeAttribute('open');
    this.inputElement.ariaExpanded = 'false';
    this.inputElement.removeAttribute('aria-activedescendant');
    await this.listBoxElement.hide();
  }

  private updateSelectedValue(value: string | null) {
    this.selectedValue = value;
    this.inputElement.value = this.selectedValue ?? '';
  }

  /** Restores the input to the value of the selected option. */
  private restoreSelectedValue() {
    this.inputElement.value = this.selectedValue ?? '';
  }

  /** Runs a query, filtering the listbox options and reflecting the outcome. */
  private async runQuery(query: string, alwaysExpand: boolean = false) {
    // Prevent running the same query twice.
    if (this.lastQuery !== (this.lastQuery = query)) {
      await this.filterListBox(query);
    }

    // Always update the count if the listbox is expanded.
    if (this.expanded) this.announceCount();
    // Automatically show the listbox if the query is non-empty.
    else if (alwaysExpand || query) await this.showListBox();
  }

  /** Filters the listbox options based on the query, delegating to the consuming parent when possible. */
  private async filterListBox(query: string) {
    // Allow for consuming parent to handle filtering (e.g. for async data) and prevent default filtering behavior.
    if (this.postFilteringEvent.emit(query).defaultPrevented) return;

    await this.listBoxElement?.filter(query);
  }

  private readonly handleClick = async () => {
    await this.runQuery('', true);
  };

  private readonly handleBlur = () => {
    this.restoreSelectedValue();
    this.hideListBox();
  };

  private readonly handleInput = async (event: Event) => {
    if (!this.listBoxElement) return;
    const value = (event.target as HTMLInputElement).value.trim();
    await this.runQuery(value.length >= this.filterThreshold ? value : '');
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
    this.updateSelectedValue(value);
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

  private readonly handleClear = () => {
    if (this.inputElement) {
      this.updateSelectedValue(null);
      this.listBoxElement.clearSelection();
      this.hideListBox();
    }
  };

  render() {
    return (
      <Host data-version={version}>
        <slot />
        {this.clearable && this.selectedValue !== null && (
          <button type="button" class="autocomplete-clear" onClick={this.handleClear}>
            <post-icon aria-hidden="true" name="closex"></post-icon>
          </button>
        )}
        <post-icon aria-hidden="true" class="autocomplete-icon" name="chevronDown"></post-icon>
        <output class="visually-hidden" ref={el => (this.outputElement = el)}></output>
      </Host>
    );
  }
}
