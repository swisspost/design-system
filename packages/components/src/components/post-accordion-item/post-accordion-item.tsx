import { EventFrom, nanoid } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Listen, Method, Prop, State } from '@stencil/core';

/**
 * @part post-accordion-button - The element that toggles the accordion item (header button).
 * @part post-accordion-body - The element that holds the accordion item's content.
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

  @State() slottedLogo: HTMLElement;

  /**
   * If `true`, the element is collapsed otherwise it is displayed.
   */
  @Prop({ mutable: true, reflect: true }) collapsed?: boolean = false;

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
    const collapsibleId = `c${nanoid(6)}`;

    const headingLevel = this.host.closest('post-accordion')?.getAttribute('heading-level');
    const HeadingTag = `h${headingLevel ?? 2}`;

    return (
      <Host data-version={version}>
        <post-collapsible-trigger for={collapsibleId}>
          <HeadingTag class="accordion-header">
            <button
              type="button"
              class={`accordion-button${this.collapsed ? ' collapsed' : ''}`}
              part="post-accordion-button"
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
              <post-icon name="chevronup"></post-icon>
            </button>
          </HeadingTag>
        </post-collapsible-trigger>

        <post-collapsible
          id={collapsibleId}
          collapsed={this.collapsed}
          ref={el => (this.collapsible = el)}
        >
          <div class="accordion-body" part="post-accordion-body">
            <slot />
          </div>
        </post-collapsible>
      </Host>
    );
  }
}
