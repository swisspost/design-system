import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { PLACEMENT_TYPES } from '@/types';
import { version } from '@root/package.json';
import { IS_BROWSER, getAttributeObserver, checkRequiredAndType, checkEmptyOrOneOf } from '@/utils';

/**
 * @slot default - Slot for placing content inside the popover.
 */

let popoverInstances = 0;
const popoverTargetAttribute = 'data-popover-target';

const globalToggleHandler = (e: PointerEvent | KeyboardEvent) => {
  let currentElement = e.target as HTMLElement;

  // Traverse up the DOM tree to find if any parent has the popover target attribute
  while (currentElement && !currentElement.getAttribute(popoverTargetAttribute)) {
    if (currentElement === document.body || !currentElement.parentElement) break;
    currentElement = currentElement.parentElement;
  }

  const popoverTarget = currentElement?.getAttribute(popoverTargetAttribute);
  if (!popoverTarget || ('key' in e && e.key !== 'Enter')) return;
  const popover = document.getElementById(popoverTarget) as HTMLPostPopoverElement;
  popover?.toggle(currentElement);
};

@Component({
  tag: 'post-popover',
  styleUrl: 'post-popover.scss',
  shadow: true,
})
export class PostPopover {
  private popoverRef: HTMLPostPopovercontainerElement;
  private readonly localBeforeToggleHandler: () => void;
  // Initialize a mutation observer for patching accessibility features
  private readonly triggerObserver = IS_BROWSER
    ? getAttributeObserver(popoverTargetAttribute, this.patchAccessibilityFeatures)
    : null;

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

  constructor() {
    this.localBeforeToggleHandler = this.beforeToggleHandler.bind(this);
  }

  connectedCallback() {
    // Set up accessibility patcher and event listeners for the first component
    if (popoverInstances === 0) {
      window.addEventListener('pointerup', globalToggleHandler);
      window.addEventListener('keydown', globalToggleHandler);
      this.triggerObserver?.observe(document.body, {
        subtree: true,
        childList: true,
        attributeFilter: [popoverTargetAttribute],
      });
    }

    popoverInstances++;

    this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  }

  componentDidLoad() {
    this.validatePlacement();
    this.validateCloseButtonCaption();
    this.popoverRef.addEventListener('beforetoggle', this.localBeforeToggleHandler);
  }

  disconnectedCallback() {
    popoverInstances--;

    // Remove listeners and observer after the last popover has been destructed
    if (popoverInstances === 0) {
      window.removeEventListener('click', globalToggleHandler);
      window.removeEventListener('keydown', globalToggleHandler);
      this.triggerObserver?.disconnect();
    }

    this.popoverRef.removeEventListener('beforetoggle', this.localBeforeToggleHandler);
    this.triggers.forEach(trigger => trigger.removeAttribute('aria-expanded'));
  }

  /**
   * Programmatically display the popover
   * @param target An element with [data-popover-target="id"] where the popover should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    this.popoverRef.show(target);
    console.log(this.popoverRef);
    target.setAttribute('aria-expanded', 'true');
  }

  /**
   * Programmatically hide this popover
   */
  @Method()
  async hide() {
    this.popoverRef.hide();
    this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  }

  /**
   * Toggle popover display
   * @param target An element with [data-popover-target="id"] where the popover should be anchored to
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    const newState = await this.popoverRef.toggle(target, force);
    this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
    target.setAttribute('aria-expanded', `${newState}`);
  }

  private get triggers() {
    return document.querySelectorAll(`[${popoverTargetAttribute}="${this.host.id}"]`);
  }

  private beforeToggleHandler() {
    this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  }

  private patchAccessibilityFeatures(trigger: HTMLElement) {
    const force = trigger.hasAttribute(popoverTargetAttribute);
    trigger.setAttribute('aria-expanded', force ? 'false' : null);
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
            <post-closebutton onClick={() => this.hide()}>
              {this.closeButtonCaption}
            </post-closebutton>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
