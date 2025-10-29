import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { HEADING_LEVELS, HeadingLevel } from '@/types';
import { checkEmptyOrOneOf, EventFrom } from '@/utils';
import { nanoid } from 'nanoid';

/**
 * @part button - The element that toggles the accordion item (header button).
 * @part body - The container element that holds the accordion item's content.
 * @slot logo - Slot for placing a logo in the accordion item’s header, before the content.
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
  validateHeadingLevel() {
    checkEmptyOrOneOf(this, 'headingLevel', HEADING_LEVELS);
  }

  componentWillLoad() {
    this.id = this.host.id || `p${nanoid(6)}`;
  }

  componentDidLoad() {
    this.validateHeadingLevel();
  }

  // Capture to make sure the "collapsed" property is updated before the event is consumed
  @Listen('postToggle', { capture: true })
  @EventFrom('post-accordion-item')
  onCollapseToggle(event: CustomEvent<boolean>): void {
    this.collapsed = !event.detail;
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
                <post-icon name="chevrondown"></post-icon>
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
