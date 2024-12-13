import { Component, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';

@Component({
  tag: 'post-megadropdown',
  styleUrl: 'post-megadropdown.scss',
  shadow: false,
})
export class PostMegadropdown {
  private popoverRef: HTMLPostPopovercontainerElement;

  @Element() host: HTMLPostMegadropdownElement;

  /**
   * Holds the current visibility state of the dropdown.
   * This state is internally managed to track whether the dropdown is open (`true`) or closed (`false`),
   * and updates automatically when the dropdown is toggled.
   */
  @State() isVisible: boolean = false;

  @State() animationClass: string | null = null;

  /**
   * Emits when the dropdown is shown or hidden.
   * The event payload is a boolean: `true` when the dropdown was opened, `false` when it was closed.
   **/
  @Event() postToggleMegadropdown: EventEmitter<boolean>;

  componentDidLoad() {
    this.popoverRef.addEventListener('postToggle', (event: CustomEvent<boolean>) => {
      this.isVisible = event.detail;
      this.postToggleMegadropdown.emit(this.isVisible);
    });
  }

  /**
   * Toggles the dropdown visibility based on its current state.
   */
  @Method()
  async toggle(target: HTMLElement) {
    this.isVisible ? await this.hide() : await this.show(target);
  }

  /**
   * Displays the popover dropdown
   *
   * @param target - The HTML element relative to which the popover dropdown should be displayed.
   */
  @Method()
  async show(target: HTMLElement) {
    if (this.popoverRef) {
      await this.popoverRef.show(target);
      this.animationClass = 'slide-in';
    } else {
      console.error('show: popoverRef is null or undefined');
    }
  }

  /**
   * Hides the popover dropdown
   */
  private hide() {
    if (this.popoverRef) {
      this.popoverRef.hide();
    } else {
      console.error('hide: popoverRef is null or undefined');
    }
  }

  private handleBackButtonClick() {
    this.animationClass = 'slide-out';
    setTimeout(() => {
      this.hide();
    }, 350);
  }

  private handleCloseButtonClick() {
    this.popoverRef.hide();
  }

  render() {
    return (
      <Host>
        <post-popovercontainer
          class={this.animationClass}
          placement="bottom"
          edge-gap="0"
          ref={el => (this.popoverRef = el)}
        >
          <div class="megadropdown">
            <div onClick={() => this.handleBackButtonClick()} class="back-button">
              <slot name="back-button"></slot>
            </div>
            <div onClick={() => this.handleCloseButtonClick()} class="close-button">
              <slot name="close-button"></slot>
            </div>
            <slot name="megadropdown-title"></slot>
            <div class="megadropdown-content">
              <slot></slot>
            </div>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
