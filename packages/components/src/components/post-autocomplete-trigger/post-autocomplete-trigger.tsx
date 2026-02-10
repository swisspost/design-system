import { Component, Host, h, Prop, Element, Method } from '@stencil/core';
import { getRoot } from '@/utils';

@Component({
  tag: 'post-autocomplete-trigger',
  shadow: true,
})
export class PostAutocompleteTrigger {
  @Element() host: HTMLPostAutocompleteTriggerElement;

  /**
   * ID of the dropdown element that this trigger is linked to.
   */
  @Prop({ reflect: true }) for!: string;

  private focusableChild: HTMLElement;

  componentDidLoad() {
    this.focusableChild = this.host.querySelector('button, input');
    if (this.focusableChild) {
      this.focusableChild.setAttribute('aria-controls', this.for);
      this.focusableChild.setAttribute('aria-expanded', 'false');
      this.focusableChild.addEventListener('click', this.openDropdown.bind(this));
    }
  }

  /**
   * Returns the dropdown linked to the trigger.
   */
  @Method()
  async getDropdown() {
    const root = getRoot(this.focusableChild);
    return root.getElementById(this.for) as HTMLPostAutocompleteDropdownElement;
  }

  private async openDropdown() {
    const dropdown = await this.getDropdown();
    if (dropdown) dropdown.toggle(this.focusableChild);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
