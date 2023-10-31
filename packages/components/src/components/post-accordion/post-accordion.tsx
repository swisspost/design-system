import { Component, Element, h, Host, Listen, Method, Prop } from '@stencil/core';
import { version } from '../../../package.json';

@Component({
  tag: 'post-accordion',
  styleUrl: 'post-accordion.scss',
  shadow: true,
})
export class PostAccordion {
  private collapsibles: HTMLPostCollapsibleElement[];
  private expandedCollapsibles = new Set<HTMLPostCollapsibleElement>();

  @Element() host: HTMLPostAccordionElement;

  /**
   * If `true`, multiple `post-collapsible` can be open at the same time.
   */
  @Prop() readonly multiple: boolean = false;

  componentWillLoad() {
    this.registerCollapsibles();
  }

  /**
   * Toggles the `post-collapsible` children with the given id.
   */
  @Method()
  async toggle(id: string) {
    const collapsibleToToggle = this.collapsibles
      .find(collapsible => collapsible.id === id);

    if (!collapsibleToToggle) throw new Error(`No post-collapsible found with id #${id}.`);

    await collapsibleToToggle.toggle();
  }

  @Listen('collapseChange')
  collapseChangeHandler(event: CustomEvent) {
    const toggledCollapsible = event.target as HTMLPostCollapsibleElement;
    const isClosing = this.expandedCollapsibles.has(toggledCollapsible);

    if (isClosing) {
      this.expandedCollapsibles.delete(toggledCollapsible);
    } else {
      this.expandedCollapsibles.add(toggledCollapsible);
    }

    if (this.multiple || isClosing) return;

    // close other open collapsible elements to have only one opened at a time
    Array.from(this.expandedCollapsibles.values())
      .filter(collapsible => collapsible !== toggledCollapsible)
      .forEach(collapsible => {
        void collapsible.toggle(false);
      });
  }

  /**
   * Expands all `post-collapsible` children.
   *
   * If `close-others` is `true` and all items are closed, it will open the first one.
   * Otherwise, it will keep the opened one.
   */
  @Method()
  async expandAll() {
    if (this.multiple) {
      await Promise.all(
        this.collapsibles.map(collapsible => collapsible.toggle(true))
      );
    } else if (!this.expandedCollapsibles.size) {
      await this.collapsibles[0].toggle(true);
    }
  }

  /**
   * Collapses all `post-collapsible` children.
   */
  @Method()
  async collapseAll() {
    await Promise.all(
      this.collapsibles.map(collapsible => collapsible.toggle(false))
    );
  }

  private registerCollapsibles() {
    this.collapsibles = Array.from(
      this.host.querySelectorAll('post-collapsible')
    );

    this.collapsibles
      .filter(collapsible => {
        return !collapsible.collapsed || this.expandedCollapsibles.has(collapsible);
      }).forEach((collapsible, index) => {
        if (!this.multiple && index !== 0) {
          collapsible.setAttribute('collapsed', '');
          return;
        }

        this.expandedCollapsibles.add(collapsible);
      });
  }

  render() {
    return (
      <Host data-version={version}>
        <div class="accordion">
          <slot onSlotchange={() => this.registerCollapsibles()}/>
        </div>
      </Host>
    );
  }
}
