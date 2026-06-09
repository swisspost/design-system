import { Component, h, Host, Element, Prop } from '@stencil/core';
import { version } from '@root/package.json';
import { EventFrom, getRoot, Required, Type } from '@/utils';

/**
 * @slot default - Slot for the `<button>` that toggles the navigation.
 */
@Component({
  tag: 'post-sidenavigation-trigger',
  styleUrl: 'post-sidenavigation-trigger.scss',
  shadow: true,
})
export class PostSidenavigationTrigger {
  @Element() host: HTMLPostSidenavigationTriggerElement;

  private trigger?: HTMLButtonElement;
  private root: Document | ShadowRoot;
  private readonly observer = new MutationObserver(() => this.setTrigger());

  /**
   * Link the trigger to a `post-sidenavigation` with this id.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  for!: string;

  constructor() {
    this.toggleSidenavigation = this.toggleSidenavigation.bind(this);
    this.handlePostToggle = this.handlePostToggle.bind(this);
  }

  connectedCallback() {
    this.root = getRoot(this.host);
    this.root.addEventListener('postToggle', this.handlePostToggle);
    this.observer.observe(this.host, { childList: true, subtree: true });
  }

  componentDidLoad() {
    this.setTrigger();
    if (!this.trigger) console.warn('The post-sidenavigation-trigger must contain a button.');
  }

  disconnectedCallback() {
    this.observer.disconnect();
    this.root.removeEventListener('postToggle', this.handlePostToggle);
    this.trigger?.removeEventListener('click', this.toggleSidenavigation);
  }

  /**
   * Retrieve the post-sidenavigation controlled by the trigger.
   */
  private get sideNavigation(): HTMLPostSidenavigationElement | null {
    const ref = this.root.getElementById(this.for);

    if (ref && ref.localName === 'post-sidenavigation') {
      return ref as HTMLPostSidenavigationElement;
    }

    return null;
  }

  /**
   * Find the button, attach the click listener and the initial ARIA attributes.
   */
  private setTrigger() {
    const trigger = this.host.querySelector('button');
    if (!trigger || trigger === this.trigger) return;

    if (this.trigger) {
      this.trigger.removeEventListener('click', this.toggleSidenavigation);
    }

    this.trigger = trigger;
    this.trigger.addEventListener('click', this.toggleSidenavigation);
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
  @EventFrom('post-sidenavigation', { ignoreNestedComponents: false })
  private handlePostToggle(e: CustomEvent) {
    this.trigger?.setAttribute('aria-expanded', `${e.detail}`);
  }

  private async toggleSidenavigation() {
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
