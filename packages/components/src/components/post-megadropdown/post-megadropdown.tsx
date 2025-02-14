import { getFocusableChildren } from '@/utils/get-focusable-children';
import { Component, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';
import { breakpoint } from '../../utils/breakpoints';

@Component({
  tag: 'post-megadropdown',
  styleUrl: 'post-megadropdown.scss',
  shadow: false,
})
export class PostMegadropdown {
  private firstFocusableEl: HTMLElement | null;
  private lastFocusableEl: HTMLElement | null;

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

  @State() device: string = breakpoint.get('name');

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
    window.removeEventListener('postBreakpoint:name', this.breakpointChange.bind(this));
  }

  private breakpointChange(e: CustomEvent) {
    this.device = e.detail;
  }

  componentWillRender() {
    this.getFocusableElements();
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
    } else {
      this.animationClass = 'slide-in';
    }

    this.isVisible = true;
    this.host.addEventListener('keydown', e => this.keyboardHandler(e));
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
    PostMegadropdown.activeDropdown = null;
    this.host.removeEventListener('keydown', e => this.keyboardHandler(e));
  }

  connectedCallback() {
    window.addEventListener('postBreakpoint:name', this.breakpointChange.bind(this));
  }

  /**
   * Forces the dropdown to close without animation.
   */
  private forceClose() {
    this.isVisible = false;
    this.animationClass = null;
    this.postToggleMegadropdown.emit(this.isVisible);
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

  private getFocusableElements() {
    const focusableEls = Array.from(this.host.querySelectorAll('post-list-item, h3, .back-button'));
    const focusableChildren = focusableEls.flatMap(el => Array.from(getFocusableChildren(el)));

    this.firstFocusableEl = focusableChildren[0];
    this.lastFocusableEl = focusableChildren[focusableChildren.length - 1];
  }

  // Loop through the focusable children
  private keyboardHandler(e: KeyboardEvent) {
    if (e.key === 'Tab' && this.device !== 'desktop') {
      if (e.shiftKey && document.activeElement === this.firstFocusableEl) {
        // If back tab (TAB + Shift) and first element is focused, focus goes to the last element of the megadropdown
        e.preventDefault();
        this.lastFocusableEl.focus();
      } else if (!e.shiftKey && document.activeElement === this.lastFocusableEl) {
        // If TAB and last element is focused, focus goes back to the first element of the megadropdown
        e.preventDefault();
        this.firstFocusableEl.focus();
      }
    }
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
