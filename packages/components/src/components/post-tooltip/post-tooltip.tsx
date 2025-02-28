import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '@root/package.json';
import { PostPopovercontainerCustomEvent } from '@/components';
import { checkEmptyOrType, checkType } from '@/utils';

const OPEN_DELAY = 650; // matches HTML title delay	

/**
 * @slot default - Slot for the content of the tooltip.
 */
@Component({
  tag: 'post-tooltip',
  styleUrl: 'post-tooltip.scss',
  shadow: true
})
export class PostTooltip {
  private popoverRef: HTMLPostPopovercontainerElement;
  private tooltipTimeout: number | null = null;

  @Element() host: HTMLPostTooltipElement;

  /**
   * Defines the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'top';

  /**
   * Whether or not to display a little pointer arrow
   */
  @Prop() readonly arrow?: boolean = false;

  /**
   * Choose a tooltip animation
   */
  @Prop() readonly animation?: 'pop-in' | null = 'pop-in';

  /**
   * Indicates the open state of the tooltip
   */
  @Prop({ reflect: true, mutable: true }) open = false;
  
  /**
   * If `true`, the tooltip is displayed a few milliseconds after it is triggered
   */
  @Prop() readonly delayed: boolean = false;

  @Watch('delayed')
  validateDelayed() {
    checkEmptyOrType(this, 'delayed', 'boolean');
  }

  @Watch('open')
  validateOpen() {
    checkType(this, 'open', 'boolean', 'The "open" property of the post-tooltip must be a boolean.');
  }

  connectedCallback() {
    this.validateDelayed();
    this.validateOpen();
  }

  componentDidLoad() {
    if (!this.host.id) {
      console.error(
        /*prettier-ignore*/
        'No id set: <post-tooltip> must have an id, linking it to it\'s target element with a <post-tooltip-trigger> element.'
      );
    }
  }

  /**
   * Programmatically display the tooltip.
   * If delayed is true, waits OPEN_DELAY milliseconds before showing.
   * @param target An element where the tooltip should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    if (this.delayed) {
      this.tooltipTimeout = window.setTimeout(() => {
        this.popoverRef.show(target);
        this.tooltipTimeout = null;
      }, OPEN_DELAY);
    } else {
      this.popoverRef.show(target);
    }
  }

  /**
   * Programmatically hide this tooltip.
   * Clears any pending delay timeout.
   */
  @Method()
  async hide() {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = null;
    }
    this.popoverRef.hide();
  }

  /**
   * Toggle tooltip display.
   * Clears any pending delay timeout before toggling.
   * @param target An element where the tooltip should be shown
   * @param [force] Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = null;
    }
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
