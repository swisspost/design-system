import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType, EventFrom, getRoot } from '@/utils';

@Component({
  tag: 'post-collapsible-trigger',
  shadow: true,
})
export class PostCollapsibleTrigger {
  private trigger?: HTMLButtonElement;
  private readonly observer = new MutationObserver(() => this.setTrigger());
  private root?: Document | ShadowRoot;
  private boundHandlePostToggle!: (e: CustomEvent) => void;

  @Element() host: HTMLPostCollapsibleTriggerElement;

  /**
   * Link the trigger to a post-collapsible with this id
   */
  @Prop({ reflect: true }) for!: string;

  /**
   * Set the "aria-controls" and "aria-expanded" attributes on the trigger to match the state of the controlled post-collapsible
   */
  @Watch('for')
  validateAriaAttributes() {
    checkRequiredAndType(this, 'for', 'string');
  }

  /**
   * Initiate a mutation observer that updates the trigger whenever necessary
   */
  connectedCallback() {
    this.root = getRoot(this.host);
    this.boundHandlePostToggle = (e: CustomEvent) => this.handlePostToggle(e);
    this.root.addEventListener('postToggle', this.boundHandlePostToggle);
    this.observer.observe(this.host, { childList: true, subtree: true });
  }

  componentDidLoad() {
    this.setTrigger();
    if (!this.trigger) console.warn('The post-collapsible-trigger must contain a button.');
    this.validateAriaAttributes();
  }

  disconnectedCallback() {
    this.observer.disconnect();
    this.root?.removeEventListener('postToggle', this.boundHandlePostToggle);
  }
  
  /**
   * Update the "aria-controls" and "aria-expanded" attributes on the trigger button
   */
  @Method()
  async update() {
    this.updateAriaAttributes();
  }

  /**
   * Private handler for the 'postToggle' event.
   * This updates the trigger's "aria-expanded" attribute based on the event detail.
   */
  @EventFrom('post-collapsible')
  private handlePostToggle(e: CustomEvent): void {
    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', `${e.detail}`);
    }
  }

  private updateAriaAttributes() {
    if (!this.trigger) return;

    // add the provided id to the aria-controls list
    const ariaControls = this.trigger.getAttribute('aria-controls');

    if (!ariaControls?.includes(this.for)) {
      const newAriaControls = ariaControls ? `${ariaControls} ${this.for}` : this.for;
      this.trigger.setAttribute('aria-controls', newAriaControls);
    }

    // set the aria-expanded to `false` if the controlled collapsible is collapsed or undefined, set it to `true` otherwise
    const isCollapsed = this.collapsible?.collapsed;
    const newAriaExpanded = isCollapsed !== undefined ? !isCollapsed : undefined;
    this.trigger.setAttribute('aria-expanded', `${newAriaExpanded}`);
  }

  /**
   * Toggle the post-collapsible controlled by the trigger
   */
  private async toggleCollapsible() {
    await this.collapsible?.toggle();
  }

  /**
   * Retrieve the post-collapsible controlled by the trigger
   */
  private get collapsible(): HTMLPostCollapsibleElement | null {
    const ref = this.root.getElementById(this.for);

    if (ref && ref.localName === 'post-collapsible') {
      return ref as HTMLPostCollapsibleElement;
    }

    return null;
  }

  /**
   * Find the button and add the proper event listener and ARIA attributes to it
   */
  private setTrigger() {
    const trigger = this.host.querySelector('button');
    if (!trigger || (this.trigger && trigger.isEqualNode(this.trigger))) return;

    this.trigger = trigger;

    this.trigger.addEventListener('click', () => this.toggleCollapsible());
    this.updateAriaAttributes();
  }

  render() {
    return (
      <Host data-version={version}>
        <slot></slot>
      </Host>
    );
  }
}
