import { getFocusableChildren } from '@/utils/get-focusable-children';
import { Component, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';
import { version } from '@root/package.json';
import { breakpoint } from '../../utils/breakpoints';

@Component({
  tag: 'post-megadropdown',
  styleUrl: 'post-megadropdown.scss',
  shadow: false,
})
export class PostMegadropdown {
  private firstFocusableEl: HTMLElement | null;
  private lastFocusableEl: HTMLElement | null;

  @State() device: string = breakpoint.get('name');

  @Element() host: HTMLPostMegadropdownElement;

  /** Tracks the currently active dropdown instance. */
  private static activeDropdown: PostMegadropdown | null = null;

  private breakpointChange(e: CustomEvent) {
    this.device = e.detail;
    if (this.device === 'desktop' && this.isVisible) {
      this.animationClass = null;
    }
  }

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
   * The event payload is an object.
   * `isVisible` is true when the dropdown gets opened and false when it gets closed
   * `focusParent` determines whether after the closing of the mega dropdown, the focus should go back to the trigger parent or naturally go to the next focusable element in the page
   **/
  @Event() postToggleMegadropdown: EventEmitter<{ isVisible: boolean; focusParent?: boolean }>;

  disconnectedCallback() {
    this.removeListeners();
    window.removeEventListener('postBreakpoint:name', this.breakpointChange.bind(this));
    if (PostMegadropdown.activeDropdown === this) {
      PostMegadropdown.activeDropdown = null;
    }
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
    PostMegadropdown.activeDropdown = this;
    this.postToggleMegadropdown.emit({ isVisible: this.isVisible });
    if (
      this.firstFocusableEl &&
      window.getComputedStyle(this.firstFocusableEl).display !== 'none'
    ) {
      this.firstFocusableEl.focus();
    }
    this.addListeners();
  }

  /**
   * Hides the dropdown with an animation.
   */
  @Method()
  async hide(focusParent = true, forceClose = false) {
    this.postToggleMegadropdown.emit({ isVisible: false, focusParent: focusParent });
    if (forceClose) {
      this.forceClose();
    } else {
      this.animationClass = 'slide-out';
    }
  }

  /**
   * Sets focus to the first focusable element within the component.
   */
  @Method()
  async focusFirst() {
    this.firstFocusableEl?.focus();
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
    this.postToggleMegadropdown.emit({ isVisible: this.isVisible, focusParent: false });
    this.removeListeners();
  }

  private handleAnimationEnd() {
    if (this.animationClass === 'slide-out') {
      this.isVisible = false;
      this.animationClass = null;
      PostMegadropdown.activeDropdown = null;
      this.removeListeners();
    }
  }

  private handleClickOutside = (event: MouseEvent) => {
    if (this.device !== 'desktop') return;

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

    this.hide(false);
  };

  private addListeners() {
    this.host.addEventListener('keydown', e => this.keyboardHandler(e));
    document.addEventListener('keyup', e => this.handleTabOutside(e));
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  private removeListeners() {
    this.host.removeEventListener('keydown', e => this.keyboardHandler(e));
    document.removeEventListener('keyup', e => this.handleTabOutside(e));
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

  private handleTabOutside(e: KeyboardEvent) {
    if (e.key === 'Tab' && this.device === 'desktop') {
      if (!this.host.contains(e.target as Node)) {
        this.hide(false);
      }
    }
  }

  render() {
    const containerStyle = this.isVisible ? {} : { display: 'none' };

    return (
      <Host version={version}>
        <div
          class={`megadropdown-container ${this.animationClass || ''}`}
          style={containerStyle}
          onAnimationEnd={() => this.handleAnimationEnd()}
        >
          <div class="megadropdown">
            <slot name="megadropdown-title"></slot>
            <div class="megadropdown-content">
              <slot></slot>
            </div>
            <div onClick={() => this.hide(true)} class="back-button">
              <slot name="back-button"></slot>
            </div>
            <div onClick={() => this.hide(true)} class="close-button">
              <slot name="close-button"></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
