import { Component, Host, Method, h } from '@stencil/core';

@Component({
  tag: 'post-megadropdown',
  shadow: false,
  styleUrl: './post-megadropdown.scss',
})
export class PostMegadropdown {
  private popoverRef: HTMLPostPopovercontainerElement;

  /**
   * Show megadropdown
   * @param element HTMLElement
   * @returns boolean
   */
  @Method()
  async show(element: HTMLElement) {
    return this.popoverRef.show(element);
  }

  /**
   * Hide megadropdown
   * @returns boolean
   */
  @Method()
  async hide() {
    return this.popoverRef.hide();
  }

  /**
   * Toggle megadropdown
   * @param element HTMLElement
   * @param force boolean
   * @returns boolean
   */
  @Method()
  async toggle(element: HTMLElement, force?: boolean) {
    return this.popoverRef.toggle(element, force ?? undefined);
  }

  private handleBackButtonClick() {
    this.hide();
  }

  render() {
    return (
      <Host slot="post-mainnavigation">
        <post-popovercontainer placement="bottom" edge-gap="0" ref={el => (this.popoverRef = el)}>
          <div class="megadropdown">
            <div onClick={() => this.handleBackButtonClick()} class="back-button">
              <slot name="back-button"></slot>
            </div>
            <slot></slot>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
