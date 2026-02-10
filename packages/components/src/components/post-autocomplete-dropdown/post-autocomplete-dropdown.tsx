import { Component, Element, Host, h, Method } from '@stencil/core';

@Component({
  tag: 'post-autocomplete-dropdown',
  styleUrl: 'post-autocomplete-dropdown.scss',
  shadow: true,
})
export class PostAutocompleteDropdown {
  @Element() host: HTMLPostAutocompleteDropdownElement;

  private popoverRef: HTMLPostPopovercontainerElement;
  private options: NodeListOf<HTMLElement>;

  componentDidLoad() {
    this.options = this.host.querySelectorAll<HTMLElement>('li');
  }

  /**
   * Toggles the dropdown visibility based on its current state.
   */
  @Method()
  async toggle(target: HTMLElement) {
    if (this.popoverRef) {
      await this.popoverRef.toggle(target);
    }
  }

  /**
   * Filters options in the dropdown according to a provided search term.
   */
  @Method()
  async filter(term: string) {
    this.options.forEach(opt => {
      const doesMatch = opt.textContent.toLowerCase().includes(term.toLowerCase());
      if (doesMatch) {
        opt.style.removeProperty('display');
      } else {
        opt.style.setProperty('display', 'none');
      }
    });
  }

  private focusFilter() {
    const input = this.host.querySelector<HTMLInputElement>('post-autocomplete-filter input');
    if (input) input.focus();
  }

  private clearFilter() {
    const filter = this.host.querySelector('post-autocomplete-filter');
    if (filter) filter.clear();
  }

  render() {
    return (
      <Host>
        <post-popovercontainer
          onPostShow={this.focusFilter.bind(this)}
          onPostHide={this.clearFilter.bind(this)}
          ref={e => (this.popoverRef = e)}
          placement="bottom-start"
        >
          <div class="content">
            <slot name="filter"></slot>
            <slot></slot>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
