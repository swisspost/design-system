import { Component, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';

@Component({
  tag: 'post-megadropdown',
  styleUrl: 'post-megadropdown.scss',
  shadow: false,
})
export class PostMegadropdown {
  @Element() host: HTMLPostMegadropdownElement;

  /**
   * Holds the current visibility state of the dropdown.
   * This state is internally managed to track whether the dropdown is open (`true`) or closed (`false`),
   * and updates automatically when the dropdown is toggled.
   */
  @State() isVisible: boolean = false;

  /** Holds the current animation class. */
  @State() animationClass: string | null = null;

  /**
   * Emits when the dropdown is shown or hidden.
   * The event payload is a boolean: `true` when the dropdown was opened, `false` when it was closed.
   **/
  @Event() postToggleMegadropdown: EventEmitter<boolean>;

  disconnectedCallback() {
    this.removeOutsideClickListener();
  }

  /**
   * Toggles the dropdown visibility based on its current state.
   */
  @Method()
  async toggle() {
    this.isVisible ? this.hide() : await this.show();
  }

  /**
  * Displays the dropdown.
  */
  @Method()
  async show() {
    this.isVisible = true;
    this.animationClass = 'slide-in';
    this.postToggleMegadropdown.emit(this.isVisible);
    this.addOutsideClickListener();
  }

  /**
   * Hides the dropdown.
   */
  @Method()
  async hide() {
    this.animationClass = 'slide-out';
  }

  private handleAnimationEnd() {
    if (this.animationClass === 'slide-out') {
      this.isVisible = false;
      this.animationClass = null;
      this.postToggleMegadropdown.emit(this.isVisible);
      this.removeOutsideClickListener();
    }
  }

  private handleClickOutside = (event: MouseEvent) => {
    if (!this.host.contains(event.target as Node)) {
      this.hide();
    }
  };

  private addOutsideClickListener() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  private removeOutsideClickListener() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private handleFocusout(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!this.host.contains(relatedTarget)) {
      this.hide();
    }
  }

  render() {
    return (
      <Host>
        <div class={`megadropdown-container ${this.isVisible ? 'visible' : 'hidden'} ${this.animationClass || ''}`}
          onAnimationEnd={() => this.handleAnimationEnd()}
            onFocusout={e => this.handleFocusout(e)}>
          <div class="megadropdown" onFocusout={e => this.handleFocusout(e)}>
            <div onClick={() => this.hide()} class="back-button">
              <slot name="back-button"></slot>
            </div>
            <div onClick={() => this.hide()} class="close-button">
              <slot name="close-button"></slot>
            </div>
            <slot name="megadropdown-title"></slot>
            <div class="megadropdown-content">
              <slot></slot>
            </div>
          </div>
          </div>
      </Host>
    );
  }
}