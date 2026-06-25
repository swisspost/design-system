import { Component, h, Host, Element, Prop, Method } from '@stencil/core';
import { version } from '@root/package.json';
import { EventFrom, getRoot, Required, Type } from '@/utils';

/**
 * @slot default - Slot for the `<button>` that toggles the navigation.
 */
@Component({
  tag: 'post-side-navigation-trigger',
  styleUrl: 'post-side-navigation-trigger.scss',
  shadow: true,
})
export class PostSideNavigationTrigger {
  @Element() host: HTMLPostSideNavigationTriggerElement;

  @Prop({ reflect: true })
  @Required()
  @Type('string')
  for!: string;

  private trigger?: HTMLButtonElement;
  private root: Document | ShadowRoot;
  private readonly observer = new MutationObserver(() => this.setTrigger());

  constructor() {
    this.toggleSideNavigation = this.toggleSideNavigation.bind(this);
    this.handlePostToggle = this.handlePostToggle.bind(this);
  }

  connectedCallback() {
    this.root = getRoot(this.host);
    this.root.addEventListener('postToggle', this.handlePostToggle);
    this.observer.observe(this.host, { childList: true, subtree: true });
  }

  componentDidLoad() {
    this.setTrigger();
    if (!this.trigger) console.warn('The post-side-navigation-trigger must contain a button.');
  }

  disconnectedCallback() {
    this.observer.disconnect();
    this.root.removeEventListener('postToggle', this.handlePostToggle);
    this.trigger?.removeEventListener('click', this.toggleSideNavigation);
  }

  /**
   * Retrieve the post-side-navigation controlled by the trigger.
   */
  private get sideNavigation(): HTMLPostSideNavigationElement | null {
    const ref = this.root.getElementById(this.for);

    if (ref && ref.localName === 'post-side-navigation') {
      return ref as HTMLPostSideNavigationElement;
    }

    return null;
  }

  /**
   * Find the button, attach the click listener and the initial ARIA attributes.
   */
  private setTrigger() {
    const trigger = this.host.querySelector('button');
    if (!trigger || (this.trigger && trigger.isEqualNode(this.trigger))) return;

    if (this.trigger) {
      this.trigger.removeEventListener('click', this.toggleSideNavigation);
    }

    this.trigger = trigger;
    this.trigger.addEventListener('click', this.toggleSideNavigation);
    this.updateAriaAttributes();
  }

  private updateAriaAttributes() {
    if (!this.trigger) return;

    const ariaControls = this.trigger.getAttribute('aria-controls');
    if (!ariaControls?.includes(this.for)) {
      const newAriaControls = ariaControls ? `${ariaControls} ${this.for}` : this.for;
      this.trigger.setAttribute('aria-controls', newAriaControls);
    }

    this.trigger.setAttribute('aria-expanded', 'false');
  }

  /**
   * Keep the trigger's `aria-expanded` in sync with the navigation state.
   */
  @EventFrom('post-side-navigation', { ignoreNestedComponents: false })
  private handlePostToggle(e: CustomEvent) {
    this.trigger?.setAttribute('aria-expanded', `${e.detail}`);
  }

  /**
   * Manually update the trigger's ARIA attributes.
   */
  @Method()
  async update(): Promise<void> {
    this.updateAriaAttributes();
  }

  private async toggleSideNavigation() {
    await this.sideNavigation?.toggle();
  }

  render() {
    return (
      <Host data-version={version}>
        <slot />
      </Host>
    );
  }
}