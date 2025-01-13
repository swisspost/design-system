import { Component, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';

@Component({
  tag: 'post-megadropdown',
  styleUrl: 'post-megadropdown.scss',
  shadow: false,
})
export class PostMegadropdown {
  @Element() host: HTMLPostMegadropdownElement;

  /** Tracks the currently active dropdown instance. */
  private static activeDropdown: PostMegadropdown | null = null;

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
    if (PostMegadropdown.activeDropdown === this) {
      PostMegadropdown.activeDropdown = null;
    }
  }

  /**
   * Toggles the dropdown visibility based on its current state.
   */
  @Method()
  async toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      await this.show();
    }
  }

  /**
   * Displays the dropdown.
   */
  @Method()
  async show() {
    if (PostMegadropdown.activeDropdown && PostMegadropdown.activeDropdown !== this) {
      // Close the previously active dropdown without animation
      PostMegadropdown.activeDropdown.forceClose();
    }

    this.isVisible = true;
    this.animationClass = 'slide-in';
    PostMegadropdown.activeDropdown = this;
    this.postToggleMegadropdown.emit(this.isVisible);
    this.addOutsideClickListener();
  }

  /**
   * Hides the dropdown with an animation.
   */
  @Method()
  async hide() {
    this.animationClass = 'slide-out';
  }

  /**
   * Forces the dropdown to close without animation.
   */
  private forceClose() {
    this.isVisible = false;
    this.animationClass = null; // Clear animation
    this.postToggleMegadropdown.emit(this.isVisible); // Emit visibility change
    this.removeOutsideClickListener();
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
    const target = event.target as Node;
  
    if (this.host.contains(target)) {
      return;
    }
  
    if (target instanceof HTMLElement) {
      const trigger = target.closest('post-megadropdown-trigger');
      if (trigger) {
        const targetDropdownId = trigger.getAttribute('for');
        if (targetDropdownId !== this.host.id) {
          return;
        }
      }
    }
  
    this.hide();
  };  
  

  private addOutsideClickListener() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  private removeOutsideClickListener() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const containerStyle = this.isVisible ? {} : { display: 'none' };
    return (
      <Host>
        <div
          class={`megadropdown-container ${this.animationClass || ''}`}
          style={containerStyle}
          onAnimationEnd={() => this.handleAnimationEnd()}
        >
          <div class="megadropdown">
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
