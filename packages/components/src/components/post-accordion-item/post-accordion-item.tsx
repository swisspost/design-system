import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { HEADING_LEVELS, HeadingLevel } from '@/types';
import { checkEmptyOrOneOf } from '@/utils';
import { nanoid } from 'nanoid';

/**
 * @part button - The pseudo-element, used to override styles on the components internal header `button` element.
 * @part body - The pseudo-element, used to override styles on the components internal `body` element.
 * @slot logo - Slot for the placing a logo before the header.
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

  @State() slottedLogo: HTMLElement;

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

  componentWillLoad() {
    this.id = this.host.id || `p${nanoid(6)}`;
  }

  componentDidLoad() {
    this.validateHeadingLevel();
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

  private onSlotLogoChange() {
    this.slottedLogo = this.host.querySelector('img[slot="logo"]');
  }

  componentWillRender() {
    this.slottedLogo = this.host.querySelector('img[slot="logo"]');
  }

  render() {
    const headingLevel = this.host.closest('post-accordion')?.getAttribute('heading-level');
    const HeadingTag = `h${headingLevel ?? this.headingLevel ?? 2}`;

    return (
      <Host id={this.id} data-version={version}>
        <div part="accordion-item" class="accordion-item">
          <post-collapsible-trigger for={`${this.id}--collapse`}>
            <HeadingTag class="accordion-header" id={`${this.id}--header`}>
              <button
                type="button"
                class={`accordion-button${this.collapsed ? ' collapsed' : ''}`}
                part="button"
              >
                <span
                  class={{
                    'logo-container': true,
                    'has-image': !!this.slottedLogo,
                  }}
                >
                  <slot name="logo" onSlotchange={this.onSlotLogoChange.bind(this)}></slot>
                </span>
                <slot name="header" />
                <post-icon name="2051"></post-icon>
              </button>
            </HeadingTag>
          </post-collapsible-trigger>

          <post-collapsible
            id={`${this.id}--collapse`}
            collapsed={this.collapsed}
            ref={el => (this.collapsible = el)}
          >
            <div class="accordion-body" part="body">
              <slot />
            </div>
          </post-collapsible>
        </div>
      </Host>
    );
  }
}
