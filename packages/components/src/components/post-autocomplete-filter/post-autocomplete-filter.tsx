import { Component, Host, h, Element, Method } from '@stencil/core';

@Component({
  tag: 'post-autocomplete-filter',
  styleUrl: 'post-autocomplete-filter.scss',
  shadow: true,
})
export class PostAutocompleteFilter {
  @Element() host: HTMLPostAutocompleteFilterElement;

  private slottedInput: HTMLInputElement;

  componentDidLoad() {
    this.slottedInput = this.host.querySelector('input');
    if (this.slottedInput) {
      this.slottedInput.addEventListener('input', this.filterResults.bind(this));
    }
  }

  /**
   * Clears the content of the filter.
   */
  @Method()
  async clear() {
    this.slottedInput.value = '';
    await this.filterResults();
  }

  private async filterResults() {
    let dropdown = this.host.closest('post-autocomplete-dropdown');

    if (!dropdown) {
      const trigger = this.host.closest('post-autocomplete-trigger');
      dropdown = await trigger.getDropdown();
    }

    dropdown?.filter(this.slottedInput.value);
  }
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
