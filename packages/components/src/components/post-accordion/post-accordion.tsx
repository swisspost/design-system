import { Component, Element, h, Host, Listen, Method, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { HEADING_LEVELS, HeadingLevel } from '@/types';
import { checkOneOf } from '@/utils';

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
  @Prop() readonly headingLevel?: HeadingLevel;

  @Watch('headingLevel')
  validateHeadingLevel(newValue = this.headingLevel) {
    if (!newValue) return;

    checkOneOf(
      newValue,
      HEADING_LEVELS,
      'The `heading-level` property of the `post-accordion` must be a number between 1 and 6.',
    );

    this.accordionItems.forEach(item => {
      item.setAttribute('heading-level', String(newValue));
    });
  }

  /**
   * If `true`, multiple `post-accordion-item` can be open at the same time.
   */
  @Prop() readonly multiple: boolean = false;

  componentWillLoad() {
    this.registerAccordionItems();
    this.validateHeadingLevel();
  }

  @Listen('postToggle')
  collapseToggleHandler(event: CustomEvent<boolean>) {
    const toggledItem = event.target as HTMLElement;
    const closestParentAccordion = toggledItem.closest('post-accordion');

    if (closestParentAccordion === this.host && toggledItem.localName === 'post-accordion-item') {
      const toggledAccordionItem = event.target as HTMLPostAccordionItemElement;
      const isClosing = this.expandedItems.has(toggledAccordionItem);

      if (isClosing) {
        this.expandedItems.delete(toggledAccordionItem);
      } else {
        this.expandedItems.add(toggledAccordionItem);
      }

      if (this.multiple || isClosing) return;

      // close other open accordion items to have only one opened at a time
      Array.from(this.expandedItems.values())
        .filter(item => item !== toggledAccordionItem)
        .forEach(item => {
          item.toggle(false);
        });
    }
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
