import { Component, Element, Method, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkNonEmpty, checkType, debounce, getRoot } from '@/utils';
import { PostCollapsibleCustomEvent } from '@/components';
import { eventGuard } from '@/utils/event-guard';

@Component({
  tag: 'post-collapsible-trigger',
})
export class PostCollapsibleTrigger {
  private trigger?: HTMLButtonElement;
  private observer = new MutationObserver(() => this.setTrigger());
  private root?: Document | ShadowRoot;

  @Element() host: HTMLPostCollapsibleTriggerElement;

  /**
   * Link the trigger to a post-collapsible with this id
   */
  @Prop() for: string;

  /**
   * Set the "aria-controls" and "aria-expanded" attributes on the trigger to match the state of the controlled post-collapsible
   */
  @Watch('for')
  setAriaAttributes() {
    checkNonEmpty(this.for, 'The post-collapsible-trigger "for" prop is required.');
    checkType(this.for, 'string', 'The post-collapsible-trigger "for" prop should be a id.');

    void this.update();
  }

  /**
   * Initiate a mutation observer that updates the trigger whenever necessary
   */
  connectedCallback() {
    this.observer.observe(this.host, { childList: true, subtree: true });
  }

  /**
   * Attach a "postToggle" event listener to the root node
   * to update the trigger's "aria-expanded" attribute whenever the controlled post-collapsible is toggled
   */
  componentWillLoad() {
    this.root = getRoot(this.host);
  
    this.root.addEventListener('postToggle', (e: PostCollapsibleCustomEvent<boolean>) => {
      eventGuard(
        e,
        () => {
          if (!this.trigger || !e.target.isEqualNode(this.collapsible)) return;
          this.trigger.setAttribute('aria-expanded', `${e.detail}`);
        },
        { targetLocalName: 'post-collapsible' }
      );
    });
  }  

  /**
   * Add the "data-version" to the host element and set the trigger
   */
  componentDidLoad() {
    this.host.setAttribute('data-version', version);
    this.setTrigger();

    if (!this.trigger) console.warn('The post-collapsible-trigger must contain a button.');
  }

  /**
   * Disconnect the mutation observer
   */
  disconnectedCallback() {
    this.observer.disconnect();
  }

  /**
   * Update the "aria-controls" and "aria-expanded" attributes on the trigger button
   */
  @Method()
  async update() {
    this.debouncedUpdate();
  }

  private debouncedUpdate = debounce(() => {
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
  });

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
    this.setAriaAttributes();
  }
}
