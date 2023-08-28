import { Component, h, Element, Prop, Host, Method } from '@stencil/core';
import { version } from '../../../package.json';
import {
  computePosition,
  Placement,
  flip,
  shift,
  autoUpdate,
  offset,
  inline,
  arrow,
} from '@floating-ui/dom';

// Polyfill for popovers, can be removed when https://caniuse.com/?search=popover is green
import '@oddbird/popover-polyfill';

// Patch for long press on touch devices
import 'long-press-event';

const sidemap = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

interface IPopoverElement {
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
  @Prop() placement?: Placement = 'top';

  /**
   * Internally used to track changes to the class attribute on the host element
   */
  @Prop() class: string;

  private tooltipRef: HTMLElement & IPopoverElement;
  private arrowRef: HTMLElement;
  private trigger: HTMLElement;
  private clearAutoupdate: () => void;

  componentWillLoad() {
    this.trigger = document.querySelector(`[data-tooltip-target="${this.host.id}"]`);

    // Patch popovertargetaction="interest" until it's implemented
    // https://github.com/openui/open-ui/issues/767#issuecomment-1654177227
    this.trigger.addEventListener('mouseenter', this.showTooltip.bind(this));
    this.trigger.addEventListener('mouseleave', this.hideTooltip.bind(this));
    this.trigger.addEventListener('focus', this.showTooltip.bind(this));
    this.trigger.addEventListener('blur', this.hideTooltip.bind(this));
    this.trigger.addEventListener('long-press', this.showTooltip.bind(this));

    // Patch missing aria-describedby attribute on the trigger
    const describedBy = this.trigger.getAttribute('aria-describedby') || '';
    if (!describedBy?.includes(this.host.id)) {
      this.trigger.setAttribute(
        'aria-describedby',
        [...describedBy.split(' '), this.host.id].join(' '),
      );
    }
  }

  componentDidRender() {
    // Can't figure out how to extend HTMLAttributes<HTMLParagraphElement> to support the popover attribute
    this.tooltipRef.setAttribute('popover', '');
  }

  /**
   * Show this tooltip
   */
  @Method()
  async showTooltip() {
    this.tooltipRef.showPopover();
    this.startAutoupdates();
  }

  /**
   * Hide this tooltip
   */
  @Method()
  async hideTooltip() {
    this.clearAutoupdate();
    this.tooltipRef.hidePopover();
  }

  /**
   * Toggle tooltip display
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggleTooltip(force?: boolean) {
    const openNow = this.tooltipRef.togglePopover(force);
    if (openNow) {
      this.startAutoupdates();
    } else {
      this.clearAutoupdate();
    }
  }

  private startAutoupdates() {
    this.clearAutoupdate = autoUpdate(
      this.trigger,
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
    } = await computePosition(this.trigger, this.tooltipRef, {
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
    const staticSide = sidemap[side];

    Object.assign(this.arrowRef.style, {
      top: arrowY ? `${arrowY}px` : '',
      left: arrowX ? `${arrowX}px` : '',
      [staticSide]: `${-this.arrowRef.offsetWidth / 2}px`,
    });
  }

  render() {
    return (
      <Host data-version={version}>
        <p
          role="tooltip"
          ref={(el: HTMLParagraphElement & IPopoverElement) => (this.tooltipRef = el)}
        >
          <span
            class="arrow"
            ref={el => {
              this.arrowRef = el;
            }}
          ></span>
          <slot>Hi there 👋</slot>
        </p>
      </Host>
    );
  }
}
