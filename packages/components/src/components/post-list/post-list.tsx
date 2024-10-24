import { Component, Element, Prop, Host, State } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot for placing the list title
 * @slot post-list-item - Slot for placing post-list-item components
 */

@Component({
  tag: 'post-list',
  styleUrl: 'post-list.scss',
  shadow: false,
})
export class PostList {
  @Element() host: HTMLPostListElement;

  /**
   * The unique title of the list that is also referenced in the labelledby
   */
  @State() uuid: string;

  /**
   * The list title can be hidden be setting `title-hidden="true"` or just `title-hidden`
   */
  @Prop() readonly titleHidden: boolean = false;

  /**
   * The list can become horizontal by setting `horizontal="true"` or just `horizontal`
   */
  @Prop() readonly horizontal: boolean = false;

  /**
   * Define the gap of the list items using the --post-list-item-gap custom property.
   * e.g. --post-list-item-gap: 1rem 0.5rem;
   */

  /**
   * Define the gap between the title/heading and the list items using the --post-list-heading-gap custom property.
   * e.g. --post-list-heading-gap: 2rem;
   */

  /* connectedCallback() {
    Array.from(this.host.querySelectorAll('post-list-item')).forEach(item => {
      item.setAttribute('slot', 'post-list-item');
    });
  } */

  componentWillLoad() {
    /**
     * Get the id set on the host element or use a random id by default
     */
    this.uuid = this.host.id || `list-${crypto.randomUUID()}`;
  }

  componentDidLoad() {
    const titleDiv = this.host.querySelector(`#${this.uuid}`).firstElementChild;
    const titleSlot = titleDiv as HTMLSlotElement;
    this.checkTitle(titleSlot);
  }

  private checkTitle(titleContent: HTMLSlotElement) {
    if (!titleContent.innerText) {
      throw new Error(
        'Please provide a title to the list component. Title is mandatory for accessibility purposes.',
      );
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <div id={this.uuid} class={this.titleHidden ? 'visually-hidden' : ''}>
          <slot onSlotchange={e => this.checkTitle(e.target as HTMLSlotElement)}></slot>
        </div>
        <div role="list" aria-labelledby={this.uuid}>
          <slot name="post-list-item"></slot>
        </div>
      </Host>
    );
  }
}
