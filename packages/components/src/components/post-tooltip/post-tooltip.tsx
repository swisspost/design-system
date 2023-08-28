import { Component, h, Element, Prop, Host } from '@stencil/core';
import { version } from '../../../package.json';
import '@oddbird/popover-polyfill';
import 'long-press-event';

import {
  computePosition,
  Placement,
  flip,
  shift,
  autoUpdate,
  offset,
  arrow,
} from '@floating-ui/dom';

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

  componentWillLoad() {
    let clearAutoupdate: () => void;
    this.trigger = document.querySelector(`[data-tooltip-target="${this.host.id}"]`);

    // Patch popovertargetaction="interest" until it's implemented
    // https://github.com/openui/open-ui/issues/767#issuecomment-1654177227
    ['mouseenter', 'focus', 'long-press'].forEach(e =>
      this.trigger.addEventListener(e, () => {
        clearAutoupdate = autoUpdate(this.trigger, this.host, this.positionTooltip.bind(this), {
          ancestorScroll: false,
        });
        this.host.showPopover();
      }),
    );
    ['mouseleave', 'blur'].forEach(e =>
      this.trigger.addEventListener(e, () => {
        clearAutoupdate();
        this.host.hidePopover();
      }),
    );
  }

  // Tooltip and arrow positioning with floating-ui
  // Docs: https://floating-ui.com/docs/computePosition
  // Tutorial: https://codesandbox.io/s/mystifying-kare-ee3hmh?file=/src/index.js
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
        shift({ padding: 5 }),
        offset(13),
        arrow({ element: this.arrowRef, padding: 10 }),
      ],
    });
    this.host.style.left = `${x}px`;
    this.host.style.top = `${y}px`;

    const side = currentPlacement.split('-')[0];
    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[side];

    const { x: arrowX, y: arrowY } = middlewareData.arrow;
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
          <slot />
        </p>
      </Host>
    );
  }
}
