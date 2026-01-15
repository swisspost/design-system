import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { PLACEMENT_TYPES } from '@/types';
import { version } from '@root/package.json';
import { checkRequiredAndType, checkEmptyOrOneOf, getDeepFocusableChildren } from '@/utils';

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

  @Element() host: HTMLPostPopoverElement;

  /**
   * Defines the position of the popover relative to its trigger.
   * Popovers are automatically flipped to the opposite side if there is not enough available space and are shifted towards the viewport if they would overlap edge boundaries.
   * For supported values and behavior details, see the [Floating UI placement documentation](https://floating-ui.com/docs/computePosition#placement).
   */
  @Prop() readonly placement?: Placement = 'top';

  @Watch('placement')
  validatePlacement() {
    checkEmptyOrOneOf(this, 'placement', PLACEMENT_TYPES);
  }

  /**
   * Define the text of the close button for assistive technology
   */
  @Prop({ reflect: true }) readonly textClose!: string;

  @Watch('textClose')
  validateTextClose() {
    checkRequiredAndType(this, 'textClose', 'string');
  }
  /**
   * Show a little indicator arrow
   */
  // eslint-disable-next-line @stencil-community/ban-default-true
  @Prop() readonly arrow?: boolean = true;

  componentDidLoad() {
    this.validatePlacement();
    this.validateTextClose();
  }

  /**
   * Programmatically display the popover
   * @param target A focusable element inside the <post-popover-trigger> component that controls the popover
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
   * Toggle popover display
   * @param target A focusable element inside the <post-popover-trigger> component that controls the popover
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    const isOpen = await this.popoverRef.toggle(target, force);
    if (isOpen) this.focusFirstEl();
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
