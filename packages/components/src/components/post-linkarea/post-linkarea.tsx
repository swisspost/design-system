import { version } from '@root/package.json';
import { Component, Element, h, Host } from '@stencil/core';

const INTERACTIVE_ELEMENT_SELECTOR = [
  'a',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  'fieldset',
  'optgroup',
  'option',
].join(',');

const LINKAREA_TARGET_SELECTOR = [
  'a',
  'label[for]',
  'input[type="checkbox"]',
  'input[type="radio"]',
].join(',');

function isDisabled(element: HTMLElement): boolean {
  return 'disabled' in element && Boolean(element.disabled);
}

@Component({
  tag: 'post-linkarea',
  styleUrl: 'post-linkarea.scss',
  shadow: true,
})
export class PostLinkarea {
  @Element() host: HTMLPostLinkareaElement;

  private getDirectTarget(event: Event): HTMLElement | null {
    for (const element of event.composedPath()) {
      if (element instanceof HTMLSlotElement) break;
      if (element === this.host) break;

      if (element instanceof HTMLElement && element.matches(INTERACTIVE_ELEMENT_SELECTOR)) {
        return element;
      }
    }

    return null;
  }

  private getDelegateTarget(): HTMLElement | null {
    return this.host.querySelector(LINKAREA_TARGET_SELECTOR);
  }

  private dispatchClick(event: MouseEvent) {
    // If a non-disabled interactive element was clicked directly, let the browser handle it
    const directTarget = this.getDirectTarget(event);
    if (directTarget && !isDisabled(directTarget)) return;

    // No delegate target or delegate target is disabled — nothing to forward
    const delegateTarget = this.getDelegateTarget();
    if (!delegateTarget || isDisabled(delegateTarget)) return;

    const { ctrlKey, shiftKey, altKey, metaKey, button } = event;
    delegateTarget.dispatchEvent(
      new MouseEvent('click', { cancelable: true, ctrlKey, shiftKey, altKey, metaKey, button }),
    );
  }

  render() {
    return (
      <Host data-version={version} onClick={(e: MouseEvent) => this.dispatchClick(e)}>
        <slot></slot>
      </Host>
    );
  }
}
