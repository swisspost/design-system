import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { PLACEMENT_TYPES } from '@/types';
import { version } from '@root/package.json';
import { checkRequiredAndType, checkEmptyOrOneOf, getFocusableChildren } from '@/utils';

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
   * Define the caption of the close button for assistive technology
   */
  @Prop() readonly closeButtonCaption!: string;

  @Watch('closeButtonCaption')
  validateCloseButtonCaption() {
    checkRequiredAndType(this, 'closeButtonCaption', 'string');
  }
  /**
   * Show a little indicator arrow
   */
  // eslint-disable-next-line @stencil-community/ban-default-true
  @Prop() readonly arrow?: boolean = true;

  componentDidLoad() {
    this.validatePlacement();
    this.validateCloseButtonCaption();
  }

  /**
   * Programmatically display the popover
   * @param target A focusable element inside the <post-popover-trigger> component that controls the popover
   */
  @Method()
  async show(target: HTMLElement) {
    this.popoverRef.show(target);
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
    await this.popoverRef.toggle(target, force);

    const focusableChildren = getFocusableChildren(this.host);

    // find first focusable element
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
            <button class="btn-close" onClick={() => this.hide()}>
              <span class="visually-hidden">{this.closeButtonCaption}</span>
            </button>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
