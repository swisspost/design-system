import { Component, Element, Listen, Prop, Watch } from '@stencil/core';
import { version } from 'typescript';
import { checkNonEmpty, checkType } from '@/utils';
import { PostCollapsibleCustomEvent } from '@/components';

@Component({
  tag: 'post-collapsible-trigger',
})
export class PostCollapsibleTrigger {
  private trigger?: HTMLElement;

  @Element() host: HTMLPostCollapsibleTriggerElement;

  /**
   * Link the trigger to a post-collapsible with this id
   */
  @Prop() for: string;

  @Watch('for')
  setAriaAttributes() {
    checkNonEmpty(this.for, 'The post-collapsible-trigger "for" prop is required.');
    checkType(this.for, 'string', 'The post-collapsible-trigger "for" prop should be a id.');

    if (!this.trigger) return;

    const controlledCollapsible = this.collapsible;
    if (controlledCollapsible) {
      this.trigger.setAttribute('aria-controls', this.for);
      this.trigger.setAttribute('aria-expanded', `${!controlledCollapsible.collapsed}`);
    } else {
      this.trigger.removeAttribute('aria-controls');
      this.trigger.removeAttribute('aria-expanded');
    }
  }

  componentDidLoad() {
    this.host.setAttribute('data-version', version);
    this.trigger = this.host.querySelector('button');

    if (!this.trigger) {
      console.error('The post-collapsible-trigger must contain a button.');
      return;
    }

    this.trigger.addEventListener('click', () => this.toggleCollapsible());
    this.setAriaAttributes();
  }

  /**
   * Update the "aria-expanded" attribute on the trigger anytime the controlled post-collapsible is toggled
   * @param e
   */
  @Listen('postToggle', { target: 'document' })
  setAriaExpanded(e: PostCollapsibleCustomEvent<boolean>) {
    if (!this.trigger || !e.target.isEqualNode(this.collapsible)) return;
    this.trigger.setAttribute('aria-expanded', `${e.detail}`);
  }

  private async toggleCollapsible() {
    await this.collapsible?.toggle();
  }

  private get collapsible(): HTMLPostCollapsibleElement | null {
    const ref = document.getElementById(this.for);
    if (ref && ref.localName === 'post-collapsible') {
      return ref as HTMLPostCollapsibleElement;
    }

    return null;
  }
}
