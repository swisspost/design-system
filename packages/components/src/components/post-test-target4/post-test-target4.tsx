import { Component, h, Host, Element, AttachInternals } from '@stencil/core';
import { version } from '@root/package.json';

declare global {
  interface ElementInternals {
    ariaLabelledByElements: Element;
    ariaDescribedByElements: Element[];
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

  componentDidLoad() {
    const slotElement = this.host.shadowRoot?.querySelector('slot[name="label-slot"]');
    if (slotElement instanceof HTMLSlotElement) {
      const assignedElements = slotElement.assignedElements();
      const labelElement = assignedElements[0];
      if (labelElement) {
        this.internals.ariaLabelledByElements = labelElement;
      }
    }
  }
  render() {
    return (
      <Host data-version={version} role="textbox" tabindex="0">
        <slot name="label-slot"></slot>
        <div class="border">I am not a real input, just a div with border...</div>
      </Host>
    );
  }
}
