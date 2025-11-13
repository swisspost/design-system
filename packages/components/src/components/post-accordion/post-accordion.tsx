import { Component, Element, h, Host, Listen, Method, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { HEADING_LEVELS, HeadingLevel } from '@/types';
import { checkRequiredAndOneOf, EventFrom } from '@/utils';

/**
 * @slot default - Slot for placing post-accordion-item components.
 */

@Component({
  tag: 'post-accordion',
  styleUrl: 'post-accordion.scss',
  shadow: true,
})
export class PostAccordion {
  private accordionItems: HTMLPostAccordionItemElement[];
  private expandedItems = new Set<HTMLPostAccordionItemElement>();

  @Element() host: HTMLPostAccordionElement;

  /**
   * Defines the hierarchical level of the `post-accordion-item` headers within the headings structure.
   */
  @Prop({ reflect: true }) readonly headingLevel!: HeadingLevel;

  @Watch('headingLevel')
  validateHeadingLevel() {
    checkRequiredAndOneOf(this, 'headingLevel', HEADING_LEVELS);
    this.accordionItems.forEach(item => {
      item.setAttribute('heading-level', String(this.headingLevel));
    });
  }

  /**
   * If `true`, multiple `post-accordion-item` can be open at the same time.
   */
  @Prop() readonly multiple: boolean = false;

  componentWillLoad() {
    this.registerAccordionItems();
  }

  componentDidLoad() {
    this.validateHeadingLevel();
  }

  @Listen('postToggle')
  @EventFrom('post-accordion-item')
  collapseToggleHandler(event: CustomEvent<boolean>) {
    const toggledAccordionItem = event.target as HTMLPostAccordionItemElement;
    const isClosing = this.expandedItems.has(toggledAccordionItem);

    if (isClosing) {
      this.expandedItems.delete(toggledAccordionItem);
    } else {
      this.expandedItems.add(toggledAccordionItem);
    }

    if (this.multiple || isClosing) return;

    // Close other open accordion items to ensure only one is open at a time
    Array.from(this.expandedItems.values())
      .filter(item => item !== toggledAccordionItem)
      .forEach(item => {
        item.toggle(false);
      });
  }

  /**
   * Toggles the `post-accordion-item` with the given id.
   */
  @Method()
  async toggle(id: string) {
    const itemToToggle = this.accordionItems.find(item => item.id === id);

    if (!itemToToggle) throw new Error(`No post-accordion-item found with id #${id}.`);

    await itemToToggle.toggle();
  }

  /**
   * Expands all `post-accordion-item`.
   *
   * If `multiple="true"` is not set and all items are closed, it will open the first one.
   * Otherwise, it will keep the opened one.
   */
  @Method()
  async expandAll() {
    if (this.multiple) {
      await Promise.all(this.accordionItems.map(item => item.toggle(true)));
    } else if (!this.expandedItems.size) {
      await this.accordionItems[0].toggle(true);
    }
  }

  /**
   * Collapses all `post-accordion-item`.
   */
  @Method()
  async collapseAll() {
    await Promise.all(this.accordionItems.map(item => item.toggle(false)));
  }

  private registerAccordionItems() {
    this.accordionItems = Array.from(this.host.querySelectorAll('post-accordion-item'));

    this.accordionItems
      .filter(item => {
        return !item.collapsed || this.expandedItems.has(item);
      })
      .forEach((item, index) => {
        if (!this.multiple && index !== 0) {
          item.setAttribute('collapsed', '');
          return;
        }

        this.expandedItems.add(item);
      });
  }

  render() {
    return (
      <Host data-version={version}>
        <div class="accordion">
          <slot onSlotchange={() => this.registerAccordionItems()} />
        </div>
      </Host>
    );
  }
}
