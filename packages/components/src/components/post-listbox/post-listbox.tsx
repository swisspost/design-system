import { Component, Element, h, Host, Listen, Method, Event, EventEmitter } from '@stencil/core';
import { version } from '@root/package.json';
import { EventFrom } from '@/utils';

@Component({
  tag: 'post-listbox',
  styleUrl: 'post-listbox.scss',
  shadow: true,
})
export class PostListbox {
  private highlightedIndex: number = -1;
  private visibleOptions: HTMLPostListboxOptionElement[] = [];
  private readonly diacriticPattern = /[\u0300-\u036F]/u;
  private popoverContainer?: HTMLPostPopovercontainerElement;
  @Element() host: HTMLPostListboxElement;

  /**
   *  Emitted option id for the active option
   */
  @Event() postOptionActive: EventEmitter<string | null>;

  private get options() {
    return Array.from(this.host.querySelectorAll('post-listbox-option'));
  }

  private get inputElement(): HTMLInputElement | null {
    let autocomplete = this.host.closest('post-autocomplete');
    if (!autocomplete) {
      autocomplete = document.querySelector(`post-autocomplete[listbox="${this.host.id}"]`);
    }
    return autocomplete?.querySelector('input');
  }

  componentWillLoad() {
    this.registerOptions();
  }

  private readonly registerOptions = () => {
    this.visibleOptions = this.options;
  };

  private readonly updateSelection = (value?: string) => {
    this.options.forEach(option => {
      option.selected = option.value === value;
      option.highlighted = false;
    });
    this.highlightedIndex = -1;
    this.filter('');
  };

  private readonly clearActive = () => {
    this.highlightedIndex = -1;
    this.postOptionActive.emit(null);
  };

  /** Opens the listbox */
  @Method()
  async show() {
    const input = this.inputElement;
    if (input) {
      this.popoverContainer?.show(input);
      this.host.role = 'listbox';
    }
  }

  /** Closes the listbox */
  @Method()
  async hide() {
    this.host.removeAttribute('role');
    this.popoverContainer?.hide();
  }

  /** Uses the internal default filtering mode to filter the list of options.
   * An empty string resets the filter to it's original state. */
  @Method()
  async filter(query: string) {
    const normalizedQuery = this.normalizeText(query);
    if (normalizedQuery) {
      this.visibleOptions = this.options.filter(option => {
        const normalizedText = this.normalizeText(option.textContent);
        const normalizedValue = this.normalizeText(option.value);
        const isVisible =
          normalizedValue.includes(normalizedQuery) || normalizedText.includes(normalizedQuery);
        option.hidden = !isVisible;
        return isVisible;
      });
    } else {
      this.resetFilter();
    }
    this.clearActive();
  }

  private readonly normalizeText = (text: string) => {
    return text.trim().normalize('NFD').replace(this.diacriticPattern, '').toLocaleLowerCase();
  };

  private readonly resetFilter = () => {
    this.visibleOptions = this.options;
    this.options.forEach(option => {
      option.hidden = false;
      option.highlighted = false;
    });
  };

  /** Clears the currently selected option */
  @Method()
  async clearSelection() {
    this.updateSelection();
  }

  /** Navigates the listbox options in the specified direction and scrolls the active option into view.*/
  @Method()
  async navigate(direction: 'up' | 'down' | 'first' | 'last') {
    if (this.visibleOptions.length === 0) return;
    if (this.highlightedIndex >= 0) {
      this.visibleOptions[this.highlightedIndex].highlighted = false;
    }
    switch (direction) {
      case 'first':
        this.highlightedIndex = 0;
        break;
      case 'last':
        this.highlightedIndex = this.visibleOptions.length - 1;
        break;
      case 'up':
        this.highlightedIndex =
          (this.highlightedIndex - 1 + this.visibleOptions.length) % this.visibleOptions.length;
        break;
      case 'down':
        this.highlightedIndex = (this.highlightedIndex + 1) % this.visibleOptions.length;
        break;
    }
    const activeOption = this.visibleOptions[this.highlightedIndex];
    activeOption.scrollIntoView({ behavior: 'smooth', block: 'end' });
    activeOption.highlighted = true;
    this.postOptionActive.emit(activeOption.id);
  }

  /**
   * Selects the currently highlighted option in the listbox and scrolls it into view.
   */
  @Method()
  async selectActive() {
    if (this.highlightedIndex >= 0) {
      const activeOption = this.visibleOptions[this.highlightedIndex];
      this.updateSelection(activeOption.value);
      this.host.dispatchEvent(
        new CustomEvent('postOptionSelected', { bubbles: true, detail: activeOption.value }),
      );
    }
  }

  @Listen('postOptionSelected')
  @EventFrom('post-listbox-option')
  optionClicked(event: CustomEvent<string>) {
    this.updateSelection(event.detail);
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer placement="bottom-start" ref={el => (this.popoverContainer = el)}>
          {this.visibleOptions.length === 0 ? <slot name="blank-slate" /> : <slot />}
        </post-popovercontainer>
      </Host>
    );
  }
}
