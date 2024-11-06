import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { HEADING_LEVELS, HeadingLevel } from '@/types';
import { checkEmptyOrOneOf } from '@/utils';

/**
 * @slot header - Slot for placing custom content within the accordion item's header.
 * @slot default - Slot for placing content within the accordion item's body.
 */

@Component({
  tag: 'post-accordion-item',
  styleUrl: 'post-accordion-item.scss',
  shadow: true,
})
export class PostAccordionItem {
  private collapsible: HTMLPostCollapsibleElement;

  @Element() host: HTMLPostAccordionItemElement;

  @State() id: string;

  /**
   * If `true`, the element is collapsed otherwise it is displayed.
   */
  @Prop({ mutable: true }) collapsed?: boolean = false;

  /**
   * Defines the hierarchical level of the accordion item header within the headings structure.
   * @deprecated set the `heading-level` property on the parent `post-accordion` instead.
   */
  @Prop() readonly headingLevel?: HeadingLevel;

  @Watch('headingLevel')
  validateHeadingLevel(newValue = this.headingLevel) {
    checkEmptyOrOneOf(
      newValue,
      HEADING_LEVELS,
      'The `heading-level` property of the `post-accordion-item` must be a number between 1 and 6.',
    );
  }

  componentDidLoad() {
    this.validateHeadingLevel();
  }

  componentWillLoad() {
    this.id = this.host.id || `a${crypto.randomUUID()}`;
  }

  // capture to make sure the "collapsed" property is updated before the event is consumed
  @Listen('postToggle', { capture: true })
  onCollapseToggle(event: CustomEvent<boolean>): void {
    if (
      event.target === this.host &&
      (event.target as HTMLElement).localName === 'post-accordion-item'
    ) {
      this.collapsed = !event.detail;
    }
  }

  /**
   * Triggers the collapse programmatically.
   */
  @Method()
  async toggle(force?: boolean): Promise<boolean> {
    return this.collapsible.toggle(force);
  }

  render() {
    const HeadingTag = `h${this.headingLevel ?? 2}`;

    return (
      <Host id={this.id} data-version={version}>
        <div part="accordion-item" class="accordion-item">
          <post-collapsible-trigger for={`${this.id}--collapse`}>
            <HeadingTag class="accordion-header" id={`${this.id}--header`}>
              <button type="button" class={`accordion-button${this.collapsed ? ' collapsed' : ''}`}>
                <slot name="header" />
              </button>
            </HeadingTag>
          </post-collapsible-trigger>

          <post-collapsible
            id={`${this.id}--collapse`}
            collapsed={this.collapsed}
            ref={el => (this.collapsible = el)}
          >
            <div class="accordion-body">
              <slot />
            </div>
          </post-collapsible>
        </div>
      </Host>
    );
  }
}
