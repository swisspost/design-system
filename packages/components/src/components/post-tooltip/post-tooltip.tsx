import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import isFocusable from 'ally.js/esm/is/focusable';

// Patch for long press on touch devices
import 'long-press-event';

import { version } from '../../../package.json';
@Component({
  tag: 'post-tooltip',
  styleUrl: 'post-tooltip.scss',
  shadow: true,
})
export class PostTooltip {
  private popoverRef: HTMLPostPopovercontainerElement;
  private readonly localShowTooltip: (e: Event) => Promise<void>;
  private readonly localHideTooltip: () => Promise<void>;

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
  @Prop() readonly arrow?: boolean = false;

  constructor() {
    // Create local versions of event handlers for de-registration
    // https://stackoverflow.com/questions/33859113/javascript-removeeventlistener-not-working-inside-a-class
    this.localShowTooltip = e => this.show(e.target as HTMLElement);
    this.localHideTooltip = this.hide.bind(this);
  }

  connectedCallback() {
    if (!this.host.id) {
      throw new Error(
        /*prettier-ignore*/
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
  }

  componentWillLoad() {
    // Append tooltip host to the end of the body to get around overflow: hidden restrictions
    // for browsers that don't support popover yet
    document.body.appendChild(this.host);
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

  private get triggers() {
    return document.querySelectorAll(`[data-tooltip-target="${this.host.id}"]`);
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

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer
          role="tooltip"
          tabindex="-1"
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
