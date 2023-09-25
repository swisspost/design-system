import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  inline,
  offset,
  Placement,
  shift,
} from '@floating-ui/dom';
import isFocusable from 'ally.js/esm/is/focusable';

// Polyfill for popovers, can be removed when https://caniuse.com/?search=popover is green
import '@oddbird/popover-polyfill';

// Patch for long press on touch devices
import 'long-press-event';

import { version } from '../../../package.json';

const SIDE_MAP = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

interface PopoverElement {
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: (force?: boolean) => boolean;
}

@Component({
  tag: 'post-tooltip',
  styleUrl: 'post-tooltip.scss',
  shadow: true,
})
export class PostTooltip {
  @Element() host: HTMLPostTooltipElement;

  /**
   * Define the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'top';

  /**
   * Internally used to track changes to the class attribute on the host element
   */
  @Prop() readonly class: string;

  private tooltipRef: HTMLDivElement & PopoverElement;
  private arrowRef: HTMLElement;
  private clearAutoUpdate: () => void;
  private localShowTooltip: (e: Event) => Promise<void>;
  private localHideTooltip: () => Promise<void>;
  private localToggleTooltip: () => Promise<void>;
  private eventTarget: Element;

  constructor() {
    // Create local versions of event handlers for de-registration
    // https://stackoverflow.com/questions/33859113/javascript-removeeventlistener-not-working-inside-a-class
    this.localShowTooltip = e => this.showTooltip(e.target as HTMLElement);
    this.localHideTooltip = this.hideTooltip.bind(this);
    this.localToggleTooltip = this.toggleTooltip.bind(this);
  }

  private get triggers() {
    return document.querySelectorAll(`[data-tooltip-target="${this.host.id}"]`);
  }

  componentWillLoad() {
    // Append tooltip host to the end of the body to get around overflow: hidden restrictions
    // for browsers that don't support popover yet
    document.body.appendChild(this.host);
  }

  connectedCallback() {
    if (!this.host.id) {
      throw new Error(
        'No id set: <post-tooltip> must have an id, linking it to it\'s target element using the data-tooltip-target attribute.',
      );
    }

    if (!this.triggers) {
      throw new Error(
        `No trigger found for <post-tooltip id="${this.host.id}">, please add the 'data-tooltip-target="${this.host.id}" attribute to the trigger element.`,
      );
    }

    // Patch popovertargetaction="interest" until it's implemented
    // https://github.com/openui/open-ui/issues/767#issuecomment-1654177227
    this.triggers.forEach(trigger => this.patchPopoverTargetActionInterest(trigger));
  }

  private patchPopoverTargetActionInterest(trigger: Element) {
    trigger.addEventListener('mouseenter', this.localShowTooltip);
    trigger.addEventListener('mouseleave', this.localHideTooltip);
    trigger.addEventListener('focus', this.localShowTooltip);
    trigger.addEventListener('blur', this.localHideTooltip);
    trigger.addEventListener('long-press', this.localShowTooltip);

    // Patch missing aria-describedby attribute on the trigger without overriding existing values
    const describedBy = trigger.getAttribute('aria-describedby');
    if (!describedBy?.includes(this.host.id)) {
      const newDescribedBy = describedBy ? `${describedBy} ${this.host.id}` : this.host.id;
      trigger.setAttribute('aria-describedby', newDescribedBy);
    }

    // Patch missing focus ability on the trigger element
    if (!isFocusable(trigger)) {
      trigger.setAttribute('tabindex', '0');
    }
  }

  /**
   * Remove a bunch of event listeners if the tooltip gets removed from the DOM
   */
  disconnectedCallback() {
    this.triggers.forEach(trigger => {
      trigger.removeEventListener('mouseenter', this.localShowTooltip);
      trigger.removeEventListener('mouseleave', this.localHideTooltip);
      trigger.removeEventListener('focus', this.localShowTooltip);
      trigger.removeEventListener('blur', this.localHideTooltip);
      trigger.removeEventListener('long-press', this.localShowTooltip);
    });
    if (this.tooltipRef)
      this.tooltipRef.removeEventListener('beforetoggle', this.localToggleTooltip);
    if (typeof this.clearAutoUpdate === 'function') this.clearAutoUpdate();
  }

  componentDidLoad() {
    // Has the benefit of rendering the tooltip without the popover attribute which
    // causes the tooltip to show up on the page if it's not linked to a target. This makes
    // the error obvious.
    if (!this.host.id || !this.triggers) return false;

    this.tooltipRef.setAttribute('popover', '');
    this.tooltipRef.addEventListener('beforetoggle', this.handleToggle.bind(this));
  }

  /**
   * Programmatically display the tooltip
   * @param target An element with [data-tooltip-target="id"] where the tooltip should be shown
   */
  @Method()
  async showTooltip(target: HTMLElement) {
    this.eventTarget = target;
    this.tooltipRef.showPopover();
  }

  /**
   * Programmatically hide this tooltip
   */
  @Method()
  async hideTooltip() {
    this.eventTarget = null;
    this.tooltipRef.hidePopover();
  }

  /**
   * Toggle tooltip display
   * @param target An element with [data-tooltip-target="id"] where the tooltip should be shown
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggleTooltip(target: HTMLElement, force?: boolean) {
    this.eventTarget = target;
    this.tooltipRef.togglePopover(force);
  }

  /**
   * Start or stop auto updates based on tooltip events.
   * Tooltips can be closed or opened with other methods than class members,
   * therefore listening to the toggle event is safer for cleaning up.
   * @param e ToggleEvent
   */
  private handleToggle(e: ToggleEvent) {
    const isOpen = e.newState === 'open';
    if (isOpen) {
      this.startAutoupdates();
    } else {
      if (typeof this.clearAutoUpdate === 'function') this.clearAutoUpdate();
    }
  }

  /**
   * Start listening for DOM updates, scroll events etc. that have
   * an influence on tooltip positioning
   */
  private startAutoupdates() {
    this.clearAutoUpdate = autoUpdate(
      this.eventTarget,
      this.tooltipRef,
      this.positionTooltip.bind(this),
    );
  }

  // Tooltip and arrow positioning with floating-ui
  // Docs: https://floating-ui.com/docs/computePosition
  private async positionTooltip() {
    const {
      x,
      y,
      middlewareData,
      placement: currentPlacement,
    } = await computePosition(this.eventTarget, this.tooltipRef, {
      placement: this.placement || 'top',
      middleware: [
        flip(),
        inline(),
        shift({ padding: 8 }),
        offset(12), // 4px outside of element to account for focus outline + ~arrow size
        arrow({ element: this.arrowRef, padding: 8 }),
      ],
    });

    // Tooltip
    this.tooltipRef.style.left = `${x}px`;
    this.tooltipRef.style.top = `${y}px`;

    // Arrow
    // Tutorial: https://codesandbox.io/s/mystifying-kare-ee3hmh?file=/src/index.js
    const side = currentPlacement.split('-')[0];
    const { x: arrowX, y: arrowY } = middlewareData.arrow;
    const staticSide = SIDE_MAP[side];

    Object.assign(this.arrowRef.style, {
      top: arrowY ? `${arrowY}px` : '',
      left: arrowX ? `${arrowX}px` : '',
      [staticSide]: `${-this.arrowRef.offsetWidth / 2}px`,
    });
  }

  render() {
    return (
      <Host data-version={version}>
        <div
          role="tooltip"
          tabindex="-1"
          ref={(el: HTMLDivElement & PopoverElement) => (this.tooltipRef = el)}
        >
          <span
            class="arrow"
            ref={el => {
              this.arrowRef = el;
            }}
          ></span>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
