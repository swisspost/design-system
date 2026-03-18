import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Method,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';
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
  private readonly diacriticPattern = /[\u0300-\u036f]/u;
  @Element() host: HTMLPostListboxElement;
  @State() private isOpen: boolean = false;

  /**
   *  Emitted option id for the active option
   */
  @Event() postOptionActive: EventEmitter<string | null>;

  private get options() {
    return Array.from(this.host.querySelectorAll('post-listbox-option'));
  }

  componentWillLoad() {
    this.registerOptions();
  }

  private registerOptions() {
    this.visibleOptions = this.options;
  }

  private setSelectedByValue(value: string) {
    this.options.forEach(option => {
      const isSelected = option.value === value;
      option.selected = isSelected;
      option.highlighted = false;
    });
    this.highlightedIndex = -1;
    this.resetFilter();
  }

  private clearActive() {
    this.highlightedIndex = -1;
    this.postOptionActive.emit(null);
  }

  /** Opens the listbox */
  @Method()
  async show() {
    this.isOpen = true;
  }

  /** Closes the listbox */
  @Method()
  async hide() {
    this.isOpen = false;
  }

  /** Uses the internal default filtering mode to filter the list of options.
   * An empty string resets the filter to it's original state. */
  @Method()
  async filter(query: string) {
    const normalizedQuery = this.normalizeText(query);
    this.visibleOptions = this.options.filter(option => {
      const normalizedText = this.normalizeText(option.textContent);
      const normalizedValue = this.normalizeText(option.value);
      const isVisible =
        normalizedValue.includes(normalizedQuery) || normalizedText.includes(normalizedQuery);
      option.hidden = !isVisible;
      return isVisible;
    });
    this.clearActive();
  }

  private normalizeText(text: string) {
    return text.trim().normalize('NFD').replace(this.diacriticPattern, '').toLocaleLowerCase();
  }

  /** Resets the filter to show all options */
  @Method()
  async resetFilter() {
    this.visibleOptions = this.options;
    this.options.forEach(option => {
      option.hidden = false;
      option.highlighted = false;
    });
    this.clearActive();
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
      this.setSelectedByValue(activeOption.value);
      this.host.dispatchEvent(
        new CustomEvent('postOptionSelected', { bubbles: true, detail: activeOption.value }),
      );
    }
  }

  @Listen('postOptionSelected')
  @EventFrom('post-listbox-option')
  optionClicked(event: CustomEvent<string>) {
    this.setSelectedByValue(event.detail);
  }

  render() {
    return (
      <Host data-version={version} role="listbox" hidden={!this.isOpen}>
        {this.visibleOptions.length === 0 ? <slot name="blank-slate" /> : <slot />}
      </Host>
    );
  }
}
