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
  private popoverRef!: HTMLPostPopovercontainerElement;

  @Element() host!: HTMLPostPopoverElement;

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
@Method()
async show(target: HTMLElement) {
  await this.popoverRef.show(target);
  this.updateEdgeGap();
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

  private readonly breakpointChange = () => {
    requestAnimationFrame(() => this.updateEdgeGap());
  };

  connectedCallback() {
    globalThis.addEventListener('postBreakpoint:device', this.breakpointChange);
  }

  componentDidLoad() {
    requestAnimationFrame(() => this.updateEdgeGap());
  }

  disconnectedCallback() {
    globalThis.removeEventListener('postBreakpoint:device', this.breakpointChange);
  }

  // Use rendered close button size to define edge gap
  private updateEdgeGap() {
    const closeButton = this.host.shadowRoot?.querySelector(
      'post-closebutton',
    ) as HTMLElement | null;
    if (!closeButton) return;

    const width = closeButton.getBoundingClientRect().width;
    if (!width || Number.isNaN(width)) return;

    this.edgeGap = width / 2;
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
          ref={e => {
            if (e) this.popoverRef = e;
          }}
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
