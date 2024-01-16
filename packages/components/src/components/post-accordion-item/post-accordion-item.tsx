import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { version } from '../../../package.json';
import { checkEmptyOrOneOf } from '../../utils';
import { HEADING_LEVELS, HeadingLevel } from './heading-levels';

@Component({
  tag: 'post-accordion-item',
  styleUrl: 'post-accordion-item.scss',
  shadow: true,
})
export class PostAccordionItem {
  private collapsible: HTMLPostCollapsibleElement;

  @Element() host: HTMLPostAccordionItemElement;

  @State() id: string;
  @State() isOpen: boolean;

  /**
   * If `true`, the element is initially collapsed otherwise it is displayed.
   */
  @Prop() readonly collapsed?: boolean = false;

  /**
   * Defines the hierarchical level of the accordion item header within the headings structure.
   */
  @Prop() readonly headingLevel?: HeadingLevel = 2;

  @Watch('headingLevel')
  validateHeadingLevel(newValue = this.headingLevel) {
    checkEmptyOrOneOf(
      newValue,
      HEADING_LEVELS,
      'The `headingLevel` property of the `post-accordion-item` must be a number between 1 and 6.',
    );
  }

  connectedCallback() {
    this.validateHeadingLevel();
  }

  componentWillLoad() {
    this.isOpen = !this.collapsed;
    this.id = this.host.id || `a${crypto.randomUUID()}`;
  }

  @Listen('collapseChange')
  onCollapseChange(event: CustomEvent<boolean>): void {
    this.isOpen = event.detail;
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
          <HeadingTag class="accordion-header" id={`${this.id}--header`}>
            <button
              aria-controls={`${this.id}--collapse`}
              aria-expanded={`${this.isOpen}`}
              class={`accordion-button${this.isOpen ? '' : ' collapsed'}`}
              onClick={() => this.toggle()}
              type="button"
            >
              <slot name="header" />
            </button>
          </HeadingTag>

          <post-collapsible collapsed={this.collapsed} ref={el => (this.collapsible = el)}>
            <div class="accordion-body">
              <slot />
            </div>
          </post-collapsible>
        </div>
      </Host>
    );
  }
}
