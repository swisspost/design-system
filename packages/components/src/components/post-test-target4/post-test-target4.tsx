import { Component, h, Host, Element, AttachInternals } from '@stencil/core';
import { version } from '@root/package.json';

declare global {
  interface ElementInternals {
    ariaLabelledByElements: Element;
  }
}

@Component({
  tag: 'post-test-target4',
  styleUrl: 'post-test-target4.scss',
  shadow: true,
  formAssociated: true,
})
export class PostTestTarget4 {
  @Element() host: HTMLPostTestTarget4Element;

  @AttachInternals() internals!: ElementInternals;

  /**
   * Handles input events from the internal native input.
   * Updates the component's state and sets the form value
   * using ElementInternals.
   * @param event The input event
   */

  componentDidLoad() {
    // Get a reference to the slot element
    const slotElement = this.host.shadowRoot?.querySelector('slot[name="label-slot"]');

    if (slotElement instanceof HTMLSlotElement) {
      // Get the elements assigned to the slot
      const assignedElements = slotElement.assignedElements();

      // Assuming the first assigned element is the label
      const labelElement = assignedElements[0];

      if (labelElement) {
        this.internals.ariaLabelledByElements = labelElement;
      }
    }
  }
  render() {
    return (
      <Host data-version={version}>
        <slot name="label-slot"></slot>
        <input></input>
      </Host>
    );
  }
}
