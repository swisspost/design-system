import { getFocusableChildren } from '@/utils/get-focusable-children';
import { Component, Element, Event, EventEmitter, h, Host, Method, State } from '@stencil/core';
import { DEVICE_SIZE } from '../post-header/post-header';

@Component({
  tag: 'post-megadropdown',
  styleUrl: 'post-megadropdown.scss',
  shadow: false,
})
export class PostMegadropdown {
  private popoverRef: HTMLPostPopovercontainerElement;
  private header: HTMLPostHeaderElement | null;

  private firstFocusableEl: HTMLElement | null;
  private lastFocusableEl: HTMLElement | null;

  @State() device: DEVICE_SIZE;

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

    this.popoverRef.addEventListener('animationend', () => {
      if (this.animationClass === 'slide-out') {
        this.hide();
      }
    });
  }

  componentWillRender() {
    this.getFocusableElements();
  }

  /**
   * Toggles the dropdown visibility based on its current state.
   */
  @Method()
  async toggle(target: HTMLElement) {
    if (this.isVisible) {
      this.hide();
    } else {
      await this.show(target);
    }
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
      this.host.addEventListener('keydown', e => this.keyboardHandler(e));
    } else {
      console.error('show: popoverRef is null or undefined');
    }
  }

  /**
   * Hides the popover dropdown
   */
  private hide() {
    if (this.popoverRef) {
      this.host.removeEventListener('keydown', e => this.keyboardHandler(e));
      this.popoverRef.hide();
    } else {
      console.error('hide: popoverRef is null or undefined');
    }
  }

  connectedCallback() {
    this.header = this.host.closest('post-header');
    if (this.header) {
      this.header.addEventListener(
        'postUpdateDevice',
        (event: CustomEvent<DeviceSize>) => (this.device = event.detail),
      );
    }
  }

  private handleBackButtonClick() {
    this.animationClass = 'slide-out';
  }

  private handleCloseButtonClick() {
    this.popoverRef.hide();
  }

  private handleFocusout(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    const megadropdown = this.popoverRef.querySelector('.megadropdown');
    if (!megadropdown.contains(relatedTarget)) {
      this.hide();
    }
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
    return (
      <Host>
        <post-popovercontainer
          class={this.animationClass}
          manualClose={this.device !== 'desktop'}
          placement="bottom"
          edge-gap="0"
          ref={el => (this.popoverRef = el)}
        >
          <div class="megadropdown" onFocusout={e => this.handleFocusout(e)}>
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
