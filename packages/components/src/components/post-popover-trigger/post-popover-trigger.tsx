import { Component, h, Host, Prop, Watch, Element } from '@stencil/core';
import { version } from '@root/package.json';
import isFocusable from 'ally.js/is/focusable';
import { checkRequiredAndType } from '@/utils';

@Component({
  tag: 'post-popover-trigger',
  styleUrl: 'post-popover-trigger.scss',
  shadow: true,
})
export class PostPopover {
  @Element() host: HTMLPostPopoverTriggerElement;

  /**
   * Reference to the element inside the host that will act as the trigger.
   */
  private popoverTrigger: HTMLElement;

  /**
   * ID of the menu element that this trigger is linked to. Used to open and close the popover.
   */
  @Prop({ reflect: true }) for!: string;

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   * @param forValue - The new value of the `for` property.
   */
  @Watch('for')
  validateControlFor() {
    checkRequiredAndType(this, 'for', 'string');
  }

  private handleSlotChange() {
    // this.cleanupTrigger();
    this.setupPopoverTrigger();
  }

  private setupPopoverTrigger() {
    this.popoverTrigger = this.host.querySelector('*');

    // check if its not focusable and add aria role and tabindex
    if (!isFocusable(this.popoverTrigger)) {
      this.popoverTrigger.setAttribute('tabindex', '0');
      this.popoverTrigger.setAttribute('role', 'button');
    } else {
      console.log('its already focusable');
    }

    // set aria attributes
    this.popoverTrigger.setAttribute('ariahaspopup', 'true');
    this.popoverTrigger.setAttribute('ariaexpanded', 'false');
    this.popoverTrigger.setAttribute('ariacontrols', this.for);
  }

  render() {
    return (
      <Host data-version={version}>
        <slot onSlotchange={() => this.handleSlotChange()}></slot>
      </Host>
    );
  }
}
