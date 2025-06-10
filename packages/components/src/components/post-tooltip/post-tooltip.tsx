import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '@root/package.json';
import { PostPopovercontainerCustomEvent } from '@/components';
import { checkType } from '@/utils';

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
  /**
   * Whether or not to display a little pointer arrow
   */
  @Prop() readonly arrow?: boolean = false;
  /**
   * Choose a tooltip animation
   */
  @Prop() readonly animation?: 'pop-in';
  /**
   * Indicates the open state of the tooltip
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch('open')
  validateOpen() {
    checkType(
      this,
      'open',
      'boolean',
      'The "open" property of the post-tooltip must be a boolean.',
    );
  }

  connectedCallback() {
    this.validateOpen();
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
    this.popoverRef.show(target);
  }

  /**
   * Programmatically hide this tooltip.
   */
  @Method()
  async hide() {
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
  }

  /**
   * Set the open state based on the toggle event.
   * @param e Popovercontainer toggle event
   */
  private handleToggle(e: PostPopovercontainerCustomEvent<boolean>) {
    this.open = e.detail;
  }

  render() {
    const popoverClass = `${this.arrow ? 'has-arrow' : ''}`;
    return (
      <Host data-version={version} role="tooltip">
        <post-popovercontainer
          safeSpace="trapezoid"
          class={popoverClass}
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
