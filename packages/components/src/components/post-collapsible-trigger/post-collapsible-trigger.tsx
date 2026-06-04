import { EventFrom, getRoot, Type } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Method, Prop } from '@stencil/core';

@Component({
  tag: 'post-collapsible-trigger',
  shadow: true,
})
export class PostCollapsibleTrigger {
  private trigger?: HTMLButtonElement;
  private readonly observer = new MutationObserver(() => this.setTrigger());
  private root?: Document | ShadowRoot;

  @Element() host: HTMLPostCollapsibleTriggerElement;

  /**
   * Link the trigger to a post-collapsible by its ID.
   * If omitted, a post-collapsible nested directly inside this element is used instead.
   */
  @Prop({ reflect: true })
  @Type('string')
  for?: string;

  constructor() {
    this.handlePostToggle = this.handlePostToggle.bind(this);
  }

  /**
   * Initiate a mutation observer that updates the trigger whenever necessary
   */
  connectedCallback() {
    this.root = getRoot(this.host);
    this.root.addEventListener('postToggle', this.handlePostToggle);
    this.observer.observe(this.host, { childList: true, subtree: true });
  }

  componentDidLoad() {
    this.setTrigger();
    if (!this.trigger) console.warn('The post-collapsible-trigger must contain a button.');
    if (!this.collapsible) {
      const target = this.for ? `with id "${this.for}"` : 'nested inside <post-collapsible-trigger>';
      console.warn(`No post-collapsible found ${target}. Either nest a post-collapsible inside the trigger or set the "for" attribute to the id of the collapsible.`);
    }
  }

  disconnectedCallback() {
    this.observer.disconnect();
    this.root?.removeEventListener('postToggle', this.handlePostToggle);
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
    const collapsible = this.collapsible;
    if (!this.trigger || !collapsible) return;

    // a nested collapsible may have no id, but aria-controls needs one to reference
    collapsible.id ||= `collapsible-${crypto.randomUUID()}`;

    const collapsibleId = collapsible.id;

    // add the controlled collapsible's id to the aria-controls list
    const ariaControls = this.trigger.getAttribute('aria-controls');
    const tokens = ariaControls ? ariaControls.split(/\s+/) : [];

    if (!tokens.includes(collapsibleId)) {
      tokens.push(collapsibleId);
      this.trigger.setAttribute('aria-controls', tokens.join(' '));
    }

    // set aria-expanded to `true` if expanded, `false` if collapsed (collapsed defaults to false)
    this.trigger.setAttribute('aria-expanded', `${!collapsible.collapsed}`);
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
    // prefer a nested post-collapsible, fall back to an id reference via `for`
    const ref =
      this.host.querySelector('post-collapsible') ??
      (this.for ? this.root?.getElementById(this.for) ?? null : null);

    if (ref && ref.localName === 'post-collapsible') {
      return ref as HTMLPostCollapsibleElement;
    }

    return null;
  }

  /**
   * Find the trigger button and attach its click handler and ARIA attributes.
   */
  private setTrigger() {
    // skip buttons that belong to a nested collapsible's content
    const trigger = Array.from(this.host.querySelectorAll('button')).find(button => {
      const collapsible = button.closest('post-collapsible');
      const isInsidePanel = !!collapsible && this.host.contains(collapsible);
      return !isInsidePanel;
    });

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
