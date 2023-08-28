import { Component, h, Element, Prop, Host } from '@stencil/core';
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
@Component({
  tag: 'post-tooltip',
  styleUrl: 'post-tooltip.scss',
  shadow: true,
})
export class PostTooltip {
  @Element() host: HTMLPostTooltipElement & { showPopover: () => void; hidePopover: () => void };
  @Prop() placement?: Placement;
  @Prop() class: string;

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
  }

  showTooltip() {
    this.clearAutoupdate = autoUpdate(this.trigger, this.host, this.positionTooltip.bind(this), {
      ancestorScroll: false,
    });
    this.host.showPopover();
  }

  hideTooltip() {
    this.clearAutoupdate();
    this.host.hidePopover();
  }

  // Tooltip and arrow positioning with floating-ui
  // Docs: https://floating-ui.com/docs/computePosition
  private async positionTooltip() {
    const {
      x,
      y,
      middlewareData,
      placement: currentPlacement,
    } = await computePosition(this.trigger, this.host, {
      placement: this.placement || 'top',
      middleware: [
        flip(),
        inline(),
        shift({ padding: 8 }),
        offset(13), // 4px outside of element to account for focus outline + ~arrow size
        arrow({ element: this.arrowRef, padding: 8 }),
      ],
    });

    // Tooltip
    this.host.style.left = `${x}px`;
    this.host.style.top = `${y}px`;

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
      <Host popover role="tooltip" data-version={version}>
        <span
          class="arrow"
          ref={el => {
            this.arrowRef = el;
          }}
        ></span>
        <p>
          <slot>Enter a short message here</slot>
        </p>
      </Host>
    );
  }
}
