import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '../../../package.json';
import { getAttributeObserver } from '../../utils/attribute-observer';

/**
 * @slot default - Slot for placing content inside the popover.
 */

let popoverInstances = 0;
const popoverTargetAttribute = 'data-popover-target';

const globalToggleHandler = (e: PointerEvent | KeyboardEvent) => {
  const target = e.target as HTMLElement;
  if (!target || !('getAttribute' in target)) return;
  const popoverTarget = target.getAttribute(popoverTargetAttribute);
  if (!popoverTarget || popoverTarget === '') return;
  if ('key' in e && e.key !== 'Enter') return;
  // TODO: Check for enter key
  const popover = document.getElementById(popoverTarget) as HTMLPostPopoverElement;
  popover?.toggle(target);
};

// Initialize a mutation observer for patching accessibility features
const triggerObserver = getAttributeObserver(popoverTargetAttribute, trigger => {
  const force = trigger.hasAttribute(popoverTargetAttribute);
  trigger.setAttribute('aria-expanded', force ? 'false' : null);
});

@Component({
  tag: 'post-popover',
  styleUrl: 'post-popover.scss',
  shadow: true,
})
export class PostPopover {
  private popoverRef: HTMLPostPopovercontainerElement;

  @Element() host: HTMLPostPopoverElement;

  /**
   * Defines the placement of the popover according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Popoverss are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'top';

  /**
   * Define the caption of the close button for assistive technology
   */
  @Prop() readonly closeButtonCaption!: string;
  /**
   * Show a little indicator arrow
   */
  // eslint-disable-next-line @stencil-community/ban-default-true
  @Prop() readonly arrow?: boolean = true;

  connectedCallback() {
    // Set up accessibility patcher and event listeners for the first component
    if (popoverInstances === 0) {
      window.addEventListener('pointerup', globalToggleHandler);
      window.addEventListener('keydown', globalToggleHandler);
      triggerObserver.observe(document.body, {
        subtree: true,
        childList: true,
        attributeFilter: [popoverTargetAttribute],
      });
    }

    popoverInstances++;
  }

  disconnectedCallback() {
    popoverInstances--;

    // Remove listeners and observer after the last popover has been destructed
    if (popoverInstances === 0) {
      window.removeEventListener('click', globalToggleHandler);
      window.removeEventListener('keydown', globalToggleHandler);
      triggerObserver.disconnect();
    }
  }

  /**
   * Programmatically display the popover
   * @param target An element with [data-popover-target="id"] where the popover should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    this.popoverRef.show(target);
    target.setAttribute('aria-expanded', 'true');
  }

  /**
   * Programmatically hide this popover
   */
  @Method()
  async hide() {
    this.popoverRef.hide();
    this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  }

  /**
   * Toggle popover display
   * @param target An element with [data-popover-target="id"] where the popover should be anchored to
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    const newState = await this.popoverRef.toggle(target, force);
    this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
    target.setAttribute('aria-expanded', `${newState}`);
  }

  private get triggers() {
    return document.querySelectorAll(`[${popoverTargetAttribute}="${this.host.id}"]`);
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer
          arrow={this.arrow}
          placement={this.placement}
          ref={e => (this.popoverRef = e)}
        >
          <div class="popover-container">
            <div class="popover-content">
              <slot></slot>
            </div>
            <button class="btn-close" onClick={() => this.hide()}>
              <span class="visually-hidden">{this.closeButtonCaption}</span>
            </button>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
