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
const globalInterestHandler = (e: PointerEvent | FocusEvent) => {
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

/**
 * Start the hiding process through a timeout to give other interest events a chance to
 * intervene and cancel the hide event.
 * @param {HTMLPostTooltipElement} tooltip
 */
const globalHideTooltip = (tooltip: HTMLPostTooltipElement | PostTooltip) => {
  hideTooltipTimeout = window.setTimeout(() => {
    tooltip.hide();
    hideTooltipTimeout = null;
  }, 42);
};

/**
 * Patch some accessibility features that are hard to remember or understand
 * @param {HTMLElement} trigger
 */
const patchAccessibilityFeatures = (trigger: HTMLElement) => {
  const describedBy = trigger.getAttribute('aria-describedby');
  const id = trigger.getAttribute('data-tooltip-target');

  // Add tooltip to aria-describedby
  if (!describedBy?.includes(id)) {
    const newDescribedBy = describedBy ? `${describedBy} ${id}` : id;
    trigger.setAttribute('aria-describedby', newDescribedBy);
  }

  // Make element focusable
  if (!isFocusable(trigger)) {
    trigger.setAttribute('tabindex', '0');
  }
};

/**
 * Handle attribute changes and childList changes from the observer
 * @param {MutationRecord[]} mutationList
 */
const triggerObserverHandler: MutationCallback = mutationList => {
  mutationList.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-tooltip-target') {
      patchAccessibilityFeatures(mutation.target as HTMLElement);
    }

    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          (node as HTMLElement).hasAttribute('data-tooltip-target')
        ) {
          patchAccessibilityFeatures(node as HTMLElement);
        }
      });
    }
  });
};

// Initialize a mutation observer for patching accessibility features
const triggerObserver = new MutationObserver(triggerObserverHandler);

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
  }

  /**
   * Add interest event listeners, but only once, and start
   * the accessibility patcher
   */
  componentWillLoad() {
    if (tooltipInstances === 0) {
      // This is the first tooltip on the page, add event listeners
      document.addEventListener('pointerover', globalInterestHandler);
      document.addEventListener('pointerout', globalInterestLostHandler);
      document.addEventListener('focusin', globalInterestHandler);
      document.addEventListener('focusout', globalInterestLostHandler);
      document.addEventListener('long-press', globalInterestHandler);

      // Initially run the accessibility patcher on all triggers
      document.querySelectorAll('[data-tooltip-target]').forEach(patchAccessibilityFeatures);

      // Start watching for future triggers
      triggerObserver.observe(document.body, {
        subtree: true,
        childList: true,
        attributeFilter: ['data-tooltip-target'],
      });
    }
    tooltipInstances++;
  }

  /**
   * Remove a bunch of event listeners if the tooltip gets removed from the DOM
   * and disconnect the accessibility patcher
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
      triggerObserver.disconnect();
    }
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
   * Pointer or focus is on the tooltip, stop the tooltip from disappearing
   */
  private handleInterest() {
    if (hideTooltipTimeout) {
      window.clearTimeout(hideTooltipTimeout);
      hideTooltipTimeout = null;
    }
  }

  /**
   * Pointer or focus left the tooltip, initiate the hiding process
   */
  private handleInterestLost() {
    globalHideTooltip(this);
  }

  render() {
    const popoverClass = `${this.arrow ? ' has-arrow' : ''}`;
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
          class={popoverClass}
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
