import { Component, Element, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

const INTERACTIVE_ELEMENTS = ['a'].join(',');
const INTERACTIVE_ELEMENTS_SELECTOR = `:where(${INTERACTIVE_ELEMENTS})`;

type InteractiveElement = HTMLAnchorElement;

@Component({
  tag: 'post-linkarea',
  styleUrl: 'post-linkarea.scss',
})
export class PostLinkarea {
  @Element() host: HTMLPostLinkareaElement;

  private delegateClick() {
    // get any child with a data-link attribute and check that it is interactive
    const elementWithDataLink = this.host.querySelector('[data-link]');
    if (!this.isInteractive(elementWithDataLink)) {
      throw new Error(
        `The \`data-link\` attribute must be used on a interactive element inside the \`post-linkarea\` component. Possible elements are: ${INTERACTIVE_ELEMENTS}`,
      );
    }

    // if no element with a data-link attribute was found then try and find the first interactive element
    const interactiveElement: InteractiveElement = elementWithDataLink
      ? elementWithDataLink
      : this.host.querySelector(INTERACTIVE_ELEMENTS_SELECTOR);

    if (!interactiveElement) {
      throw new Error(
        `The \`post-linkarea\` component must contain an interactive element. Possible elements are: ${INTERACTIVE_ELEMENTS}`,
      );
    }

    // delegate the click to the interactive element
    interactiveElement.click();
  }

  private isInteractive(element: Element): element is InteractiveElement {
    return element && !element.matches(INTERACTIVE_ELEMENTS_SELECTOR);
  }

  render() {
    return (
      <Host data-version={version} onClick={() => this.delegateClick()} tabindex="0">
        <slot></slot>
      </Host>
    );
  }
}
