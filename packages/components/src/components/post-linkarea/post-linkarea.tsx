import { Component, Element, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

const INTERACTIVE_ELEMENTS = [
  'a',
  'label[for]',
  'input[type="checkbox"]',
  'input[type="radio"]',
].join(',');
const INTERACTIVE_ELEMENTS_SELECTOR = `:where(${INTERACTIVE_ELEMENTS})`;

@Component({
  tag: 'post-linkarea',
  styleUrl: 'post-linkarea.scss',
  shadow: true,
})
export class PostLinkarea {
  @Element() host: HTMLPostLinkareaElement;

  private get interactiveElement(): HTMLElement {
    return this.host.querySelector(INTERACTIVE_ELEMENTS_SELECTOR);
  }

  private isDisabledElement(element: Element): boolean {
    // check if the element is an interactive, deactivatable element (button, fieldset, optgroup, option, select, textarea, input) and is disabled

    const isDeactivatableElement = [
      HTMLButtonElement,
      HTMLFieldSetElement,
      HTMLOptGroupElement,
      HTMLOptionElement,
      HTMLSelectElement,
      HTMLTextAreaElement,
      HTMLInputElement,
    ].some(instance => element instanceof instance);
    const isDisabled = (element as HTMLInputElement).disabled;
    const isFieldsetDisabled = element.closest('fieldset')?.hasAttribute('disabled');

    return isDeactivatableElement && (isDisabled || isFieldsetDisabled);
  }

  private dispatchClick({ target, ctrlKey, shiftKey, altKey, metaKey }: MouseEvent) {
    const interactiveElement = (target as HTMLElement).closest(INTERACTIVE_ELEMENTS_SELECTOR);
    let dispatchEvent: boolean;

    if (!this.interactiveElement) {
      // do NOT dispatch event, if there is no interactive element inside the host,
      // as there is no element to dispatch the event to
      dispatchEvent = false;
    } else if (this.isDisabledElement(this.interactiveElement)) {
      // do NOT dispatch event, if the interactive element is disabled,
      // as disabled elements do not trigger events
      // in this case, it's not important if the interactive element has been clicked directly or not, as the event will not be dispatched in either case
      dispatchEvent = false;
    } else if (interactiveElement instanceof HTMLLabelElement) {
      // do NOT dispatch event, if the label (or a descendant) is associated with an input element inside the host,
      // as the label will trigger a click on the associated input element anyway
      dispatchEvent = this.host.querySelector(`#${interactiveElement.htmlFor}`) === null;
    } else {
      // do NOT dispatch event, if the interactive element (or a descendant) has been clicked directly,
      // as the event will be dispatched by the interactive element itself
      dispatchEvent = !interactiveElement;
    }

    if (dispatchEvent) {
      this.interactiveElement.dispatchEvent(
        new MouseEvent('click', { ctrlKey, shiftKey, altKey, metaKey }),
      );
    }
  }

  render() {
    return (
      <Host data-version={version} onClick={(e: MouseEvent) => this.dispatchClick(e)}>
        <slot></slot>
      </Host>
    );
  }
}
