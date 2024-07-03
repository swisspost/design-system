import { Component, Element, Prop, Listen, Watch } from '@stencil/core';
import { version } from 'typescript';
import { isFocusable } from '@/utils/is-focusable';
import { checkNonEmpty, checkType } from '@/utils';

@Component({
  tag: 'post-collapsible-trigger',
})
export class PostCollapsibleTrigger {
  private trigger: HTMLElement | undefined;

  @Element() host: HTMLPostCollapsibleTriggerElement;

  /**
   * Link the trigger to a collapsible with this id
   */
  @Prop() for: string;

  @Watch('for')
  setAriaAttributes() {
    checkNonEmpty(this.for, 'The post-collapsible-trigger "for" prop is required.');
    checkType(this.for, 'string', 'The post-collapsible-trigger "for" prop should be a id.');

    // Add collapsible id to aria-controls
    if (this.trigger) {
      this.trigger.setAttribute('aria-controls', this.for);

      const isOpen = !this.collapsible?.collapsed;
      if (isOpen !== undefined) this.trigger.setAttribute('aria-expanded', `${isOpen}`);
    }
  }

  componentWillLoad() {
    this.host.setAttribute('data-version', version);

    const firstChild = this.host.children[0];
    if (firstChild && firstChild.nodeType === Node.ELEMENT_NODE) {
      this.trigger = firstChild as HTMLElement;
    } else {
      this.trigger = this.host;
    }

    // Ensure trigger is focusable
    if (!isFocusable(this.trigger)) {
      this.trigger.setAttribute('tabindex', '0');
    }

    // Ensure trigger has correct role
    if (this.trigger.localName !== 'button') {
      this.trigger.setAttribute('role', 'button');
    }

    this.setAriaAttributes();
  }

  @Listen('pointerdown')
  handlePointerDown(e: Event) {
    if (e.target === this.trigger) void this.toggleCollapsible();
  }

  // see example from Stencil docs: https://stenciljs.com/docs/events#keyboard-events
  // eslint-disable-next-line @stencil-community/prefer-vdom-listener
  @Listen('keydown')
  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') this.handlePointerDown(e);
  }

  private async toggleCollapsible() {
    const isOpen = await this.collapsible?.toggle();
    this.trigger.setAttribute('aria-expanded', `${isOpen}`);
  }

  private get collapsible(): HTMLPostCollapsibleElement | null {
    const ref = document.getElementById(this.for);
    if (ref && ref.localName === 'post-collapsible') {
      return ref as HTMLPostCollapsibleElement;
    }

    return null;
  }
}
