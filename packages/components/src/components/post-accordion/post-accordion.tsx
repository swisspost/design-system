import { Component, Element, h, Host, Listen, Method, Prop } from '@stencil/core';
import { version } from '../../../package.json';

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
   * If `true`, multiple `post-accordion-item` can be open at the same time.
   */
  @Prop() readonly multiple: boolean = false;

  componentWillLoad() {
    this.registerAccordionItems();
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

  @Listen('postToggle')
  collapseToggleHandler(event: CustomEvent<boolean>) {
    if ((event.target as HTMLElement).nodeName === 'post-accordion-item') {
      event.stopPropagation();

      const toggledItem = event.target as HTMLPostAccordionItemElement;
      const isClosing = this.expandedItems.has(toggledItem);

      if (isClosing) {
        this.expandedItems.delete(toggledItem);
      } else {
        this.expandedItems.add(toggledItem);
      }

      if (this.multiple || isClosing) return;

      // close other open accordion items to have only one opened at a time
      Array.from(this.expandedItems.values())
        .filter(item => item !== toggledItem)
        .forEach(item => {
          item.toggle(false);
        });
    }
  }

  /**
   * Expands all `post-accordion-item`.
   *
   * If `close-others` is `true` and all items are closed, it will open the first one.
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
