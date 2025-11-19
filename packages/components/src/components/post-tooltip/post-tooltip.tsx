import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '@root/package.json';
import { PostPopovercontainerCustomEvent } from '@/components';
import { checkEmptyOrOneOf } from '@/utils';
import { PLACEMENT_TYPES } from '@/types';

@Component({
  tag: 'post-tooltip',
  styleUrl: 'post-tooltip.scss',
  shadow: true,
})
export class PostTooltip {
  private popoverRef: HTMLPostPopovercontainerElement;

  @Element() host: HTMLPostTooltipElement;

  /**
   * Defines the position of the tooltip relative to its trigger.
   * Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted towards the viewport if they would overlap edge boundaries.
   * For supported values and behavior details, see the [Floating UI placement documentation](https://floating-ui.com/docs/computePosition#placement).
   */
  @Prop() readonly placement?: Placement = 'top';

  @Watch('placement')
  validatePlacement() {
    checkEmptyOrOneOf(this, 'placement', PLACEMENT_TYPES);
  }

  /**
   * Whether or not to display a little pointer arrow
   */
  @Prop() readonly arrow?: boolean = false;
  /**
   * Choose a tooltip animation
   */
  @Prop() readonly animation?: 'pop';
  /**
   * Indicates the open state of the tooltip
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  componentWillLoad() {
    this.validatePlacement();
  }

  componentDidLoad() {
    if (!this.host.id) {
      console.error(
        /*prettier-ignore*/
        'No id set: <post-tooltip> must have an id, linking it to it\'s target element with a <post-tooltip-trigger> element.',
      );
    }
  }

  /**
   * Programmatically display the tooltip.
   * @param target An element where the tooltip should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    if (this.open) return;
    console.log('tooltip: show');
    this.popoverRef.show(target);
  }

  /**
   * Programmatically hide this tooltip.
   */
  @Method()
  async hide() {
    console.log('tooltip: hide');
    this.popoverRef.hide();
  }

  /**
   * Toggle tooltip display.
   * @param target An element where the tooltip should be shown
   * @param [force] Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    this.popoverRef.toggle(target, force);
    console.log('tooltip: toggle');
  }

  /**
   * Set the open state based on the toggle event.
   * @param e Popovercontainer toggle event
   */
  private handleToggle(e: PostPopovercontainerCustomEvent<{ isOpen: boolean; first?: boolean }>) {
    this.open = e.detail.isOpen;
  }

  render() {
    const popoverClass = `${this.arrow ? 'has-arrow' : ''}`;
    return (
      <Host data-version={version}>
        <post-popovercontainer
          safeSpace="trapezoid"
          class={popoverClass}
          role="tooltip"
          arrow={this.arrow}
          animation={this.animation}
          placement={this.placement}
          onPostToggle={e => this.handleToggle(e)}
          ref={(el: HTMLPostPopovercontainerElement) => (this.popoverRef = el)}
        >
          <slot></slot>
        </post-popovercontainer>
      </Host>
    );
  }
}
