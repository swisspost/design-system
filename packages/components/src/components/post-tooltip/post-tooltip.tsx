import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '../../../package.json';
import isFocusable from 'ally.js/is/focusable';
import 'long-press-event';

/**
 * @slot default - Slot for the content of the tooltip.
 */

/**
 * Track how many instances remain on the page. Used for removing global event listeners
 */
let tooltipInstances = 0;
let hideTooltipTimeout: number = null;

/**
 * Global event listener to show tooltips. This is globalized so that triggers that are rendered
 * async will still work without the need to set listeners on the element itself
 * @param e Event
 * @returns
 */
const globalInterestHandler = async (e: PointerEvent | FocusEvent) => {
  const target = e.target as HTMLElement;
  if (!e?.target || !('getAttribute' in e.target)) return;
  const tooltipTarget = target.getAttribute('data-tooltip-target');
  if (!tooltipTarget || tooltipTarget === '') return;
  const tooltip = document.getElementById(tooltipTarget) as HTMLPostTooltipElement;
  tooltip?.show(target);
  if (hideTooltipTimeout) {
    window.clearTimeout(hideTooltipTimeout);
    hideTooltipTimeout = null;
  }
};

/**
 * Global event listener to hide tooltips. This is globalized so that triggers that are rendered
 * async will still work without the need to set listeners on the element itself
 * @param e Event
 * @returns
 */
const globalInterestLostHandler = (e: PointerEvent | FocusEvent) => {
  const target = e.target as HTMLElement;
  const tooltipTarget = target.getAttribute('data-tooltip-target');
  if (!tooltipTarget || tooltipTarget === '') return;
  const tooltip = document.getElementById(tooltipTarget) as HTMLPostTooltipElement;
  globalHideTooltip(tooltip);
};

const globalHideTooltip = (tooltip: HTMLPostTooltipElement | PostTooltip) => {
  hideTooltipTimeout = window.setTimeout(() => {
    tooltip.hide();
    hideTooltipTimeout = null;
  }, 42);
};

@Component({
  tag: 'post-tooltip',
  styleUrl: 'post-tooltip.scss',
  shadow: true,
})
export class PostTooltip {
  private popoverRef: HTMLPostPopovercontainerElement;

  @Element() host: HTMLPostTooltipElement;

  /**
   * Defines the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'top';

  /**
   * Wheter or not to display a little pointer arrow
   */
  @Prop() readonly arrow?: boolean = true;

  connectedCallback() {
    if (!this.host.id) {
      throw new Error(
        /*prettier-ignore*/
        'No id set: <post-tooltip> must have an id, linking it to it\'s target element using the data-tooltip-target attribute.',
      );
    }

    this.patchAccessibilityFeatures();
  }

  /**
   * Remove a bunch of event listeners if the tooltip gets removed from the DOM
   */
  disconnectedCallback() {
    tooltipInstances--;
    if (tooltipInstances <= 0) {
      // The last tooltip has been removed, stop listening for these kind of events
      document.removeEventListener('pointerover', globalInterestHandler);
      document.removeEventListener('pointerout', globalInterestLostHandler);
      document.removeEventListener('focusin', globalInterestHandler);
      document.removeEventListener('focusout', globalInterestLostHandler);
      document.removeEventListener('long-press', globalInterestHandler);
    }
  }

  componentWillLoad() {
    if (tooltipInstances === 0) {
      // This is the first tooltip on the page, add event listeners
      document.addEventListener('pointerover', globalInterestHandler);
      document.addEventListener('pointerout', globalInterestLostHandler);
      document.addEventListener('focusin', globalInterestHandler);
      document.addEventListener('focusout', globalInterestLostHandler);
      document.addEventListener('long-press', globalInterestHandler);
    }
    tooltipInstances++;
  }

  /**
   * Programmatically display the tooltip
   * @param target An element with [data-tooltip-target="id"] where the tooltip should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    this.popoverRef.show(target);
  }

  /**
   * Programmatically hide this tooltip
   */
  @Method()
  async hide() {
    this.popoverRef.hide();
  }

  /**
   * Toggle tooltip display
   * @param target An element with [data-tooltip-target="id"] where the tooltip should be shown
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    this.popoverRef.toggle(target, force);
  }

  /**
   * Patch tooltip accessibility feature for any given trigger element. Features include linking the
   * trigger with `aria-describedby` to the tooltip and ensuring the trigger is focusable.
   *
   * Call this function anytime you update the DOM with new trigger elements. This happens on route changes or when new data
   * arrives for your table or other UI components.
   * @param {Element} trigger The trigger to be patched
   */
  @Method()
  async patchAccessibilityFeatures() {
    const triggers = document.querySelectorAll('[data-tooltip-target]');

    // TODO: use mutation observer to identify new triggers on the page

    triggers.forEach(trigger => {
      // Patch missing aria-describedby attribute on the trigger without overriding existing values
      const describedBy = trigger.getAttribute('aria-describedby');
      const id = trigger.getAttribute('data-tooltip-target');
      if (!describedBy?.includes(id)) {
        const newDescribedBy = describedBy ? `${describedBy} ${id}` : id;
        trigger.setAttribute('aria-describedby', newDescribedBy);
      }

      if (!isFocusable(trigger)) {
        trigger.setAttribute('tabindex', '0');
      }
    });
  }

  private handleInterest() {
    if (hideTooltipTimeout) {
      window.clearTimeout(hideTooltipTimeout);
      hideTooltipTimeout = null;
    }
  }

  private handleInterestLost() {
    globalHideTooltip(this);
  }

  render() {
    return (
      <Host
        data-version={version}
        role="tooltip"
        onPointerOver={this.handleInterest}
        onPointerOut={this.handleInterestLost}
        onFocusIn={this.handleInterest}
        onFocusOut={this.handleInterestLost}
      >
        <post-popovercontainer
          arrow={this.arrow}
          placement={this.placement}
          ref={(el: HTMLPostPopovercontainerElement) => (this.popoverRef = el)}
        >
          <slot></slot>
        </post-popovercontainer>
      </Host>
    );
  }
}
