import { Component, Element, Prop, Watch } from '@stencil/core';
import { version } from 'typescript';
import { checkNonEmpty, checkType } from '@/utils';
import { getElementInRootNode } from '@/utils/get-element-in-root-node';

@Component({
  tag: 'post-collapsible-trigger',
  styleUrl: 'post-collapsible-trigger.scss',
  scoped: true,
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
    this.trigger = this.host.querySelector('button');

    if (!this.trigger) throw new Error('The post-collapsible-trigger must contain a button.');

    this.trigger.addEventListener('click', () => this.toggleCollapsible());
    this.setAriaAttributes();
  }

  private async toggleCollapsible() {
    const isOpen = await this.collapsible?.toggle();
    this.trigger.setAttribute('aria-expanded', `${isOpen}`);
  }

  private get collapsible(): HTMLPostCollapsibleElement | null {
    const ref = getElementInRootNode(this.for, this.host);

    if (ref && ref.localName === 'post-collapsible') {
      return ref as HTMLPostCollapsibleElement;
    }

    return null;
  }
}
