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

  // this gets the interactive elements only when needed,
  // so we do not have to care about DOM changes not listen to it with a MutationObserver
  private get interactiveElements(): HTMLElement[] {
    return Array.from(this.host.querySelectorAll(INTERACTIVE_ELEMENTS_SELECTOR));
  }

  private dispatchClick({ target, ctrlKey, shiftKey, altKey, metaKey }: MouseEvent) {
    const interactiveElements = this.interactiveElements;

    if (interactiveElements.length <= 0) return;

    let dispatchEvent;

    if (target instanceof HTMLLabelElement) {
      // do NOT dispatch event, if label is associated with an input element inside the host
      // as the label will trigger a click on the associated element automatically
      dispatchEvent = this.host.querySelector(`#${target.htmlFor}`) === null;
    } else {
      // do NOT dispatch event, if interactive element has been clicked directly
      // this becomes super important when it comes to form controls (e.g. checkbox, radio)
      dispatchEvent = !interactiveElements.some(el => el === target);
    }

    if (dispatchEvent) {
      interactiveElements[0].dispatchEvent(
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
