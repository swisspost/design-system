import { PLACEMENT_TYPES } from '@/types';
import { getDeepFocusableChildren, OneOf, Required, Type } from '@/utils';
import { Placement } from '@floating-ui/dom';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Method, Prop, State } from '@stencil/core';

/**
 * @slot default - Slot for placing content inside the popover.
 */

@Component({
  tag: 'post-popover',
  styleUrl: 'post-popover.scss',
  shadow: true,
})
export class PostPopover {
  private popoverRef: HTMLPostPopovercontainerElement;
  private resizeObserver: ResizeObserver;

  @Element() host: HTMLPostPopoverElement;

  @State() private edgeGap?: number;

  /**
   * Defines the position of the popover relative to its trigger.
   * Popovers are automatically flipped to the opposite side if there is not enough available space and are shifted towards the viewport if they would overlap edge boundaries.
   * For supported values and behavior details, see the [Floating UI placement documentation](https://floating-ui.com/docs/computePosition#placement).
   */
  @Prop()
  @OneOf(PLACEMENT_TYPES)
  readonly placement?: Placement = 'top';

  /**
   * Define the text of the close button for assistive technology
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  readonly textClose!: string;
  /**
   * Show a little indicator arrow
   */
  // eslint-disable-next-line @stencil-community/ban-default-true
  @Prop() readonly arrow?: boolean = true;

  /**
   * Programmatically display the popover,
   * `target` is the HTML element the menu is anchored to.
   */
  @Method()
  async show(target: HTMLElement) {
    await this.popoverRef.show(target);
    this.focusFirstEl();
  }

  /**
   * Programmatically hide this popover
   */
  @Method()
  async hide() {
    this.popoverRef.hide();
  }

  /**
   * Toggle popover display,
   * `target` is the HTML element the menu is anchored to.
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    const isOpen = await this.popoverRef.toggle(target, force);
    if (isOpen) this.focusFirstEl();
  }

  componentDidLoad() {
    this.updateEdgeGap();
    this.resizeObserver = new ResizeObserver(() => this.updateEdgeGap());
    this.resizeObserver.observe(document.documentElement);
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  // Dynamically update edge gap based on the post-closebutton icon's width
  private updateEdgeGap() {
    const rawValue = getComputedStyle(this.host).getPropertyValue('--post-close-small-size').trim();
    if (!rawValue) return;

    const num = Number.parseFloat(rawValue);
    if (Number.isNaN(num)) return;
    this.edgeGap = num / 2;
  }

  private focusFirstEl() {
    const focusableChildren = getDeepFocusableChildren(this.host);

    // Find first focusable element
    const firstFocusable = focusableChildren[0];

    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer
          arrow={this.arrow}
          placement={this.placement}
          edgeGap={this.edgeGap}
          ref={e => (this.popoverRef = e)}
        >
          <div class="popover-container">
            <div class="popover-content">
              <slot></slot>
            </div>
            <post-closebutton onClick={() => this.hide()}>{this.textClose}</post-closebutton>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
