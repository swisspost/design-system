import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '@root/package.json';
import { isFocusable } from '@/utils/is-focusable';

/**
 * @slot default - Slot for placing content inside the menu.
 */

@Component({
  tag: 'post-menu',
  styleUrl: 'post-menu.scss',
  shadow: true,
})
export class PostMenu {
  private popoverRef: HTMLPostPopovercontainerElement;

  private readonly KEYCODES = {
    SPACE: 'Space',
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    HOME: 'Home',
    END: 'End'
  };

  @Element() host: HTMLPostMenuElement;

  /**
   * Defines the placement of the popover according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   */
  @Prop() readonly placement?: Placement = 'bottom';

  /**
   * Tracks the visibility state of the menu (true if visible, false if hidden).
   */
  @State() isVisible: boolean = false;

  /**
   * Emits when the menu is shown or hidden.
   * The event payload is a boolean: `true` when the menu was opened, `false` when it was closed.
   */
  @Event() toggleMenu: EventEmitter<boolean>;

  connectedCallback() {
      this.host.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
      this.host.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (Object.values(this.KEYCODES).includes(e.key)) {
      this.controlKeyDownHandler(e);
    }
  };

  private controlKeyDownHandler(e: KeyboardEvent) {
    e.stopPropagation();
  
    const focusableItems = this.getSlottedItems();
    if (!focusableItems.length) return;
  
    const currentFocusedElement = document.activeElement as HTMLElement;
    let currentIndex = focusableItems.findIndex(el => el === currentFocusedElement);
  
    if (Object.values(this.KEYCODES).includes(e.code)) e.preventDefault();
  
    switch (e.code) {
      case this.KEYCODES.UP:
      case this.KEYCODES.LEFT:
        if (currentIndex > 0) {
          currentIndex = currentIndex - 1;
        }
        break;
      case this.KEYCODES.DOWN:
      case this.KEYCODES.RIGHT:
        if (currentIndex < focusableItems.length - 1) {
          currentIndex = currentIndex + 1;
        }
        break;
      case this.KEYCODES.HOME:
        currentIndex = 0;
        break;
      case this.KEYCODES.END:
        currentIndex = focusableItems.length - 1;
        break;
      case this.KEYCODES.SPACE:
        if (['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(currentFocusedElement.tagName)) {
          currentFocusedElement.click();
        }
        break;
      default:
        break;
    }
  
    if (focusableItems[currentIndex]) {
      (focusableItems[currentIndex] as HTMLElement).focus();
    }
  }

  private getSlottedItems() {
    const slot = this.host.shadowRoot.querySelector('slot');
    const slottedElements = slot ? slot.assignedElements() : [];

    const focusableItems = slottedElements
      .filter(el => el.tagName === 'POST-MENU-ITEM')
      .map(el => {
        const slot = el.shadowRoot.querySelector('slot');
        const assignedElements = slot ? slot.assignedElements() : [];

        return assignedElements.filter(isFocusable);
      })
      .flat();

    return focusableItems;
  }

  /**
   * Programmatically display the menu
   */
  @Method()
  async show(target: HTMLElement) {
    if (!this.isVisible && this.popoverRef) {
      await this.popoverRef.show(target);
      this.isVisible = true;
      this.toggleMenu.emit(this.isVisible);
    } else if (!this.popoverRef) {
      console.error('show: popoverRef is null or undefined');
    }
  }

  /**
   * Programmatically hide this menu
   */
  @Method()
  async hide() {
    if (this.isVisible && this.popoverRef) {
      await this.popoverRef.hide();
      this.isVisible = false;
      this.toggleMenu.emit(this.isVisible);
    } else if (!this.popoverRef) {
      console.error('hide: popoverRef is null or undefined');
    }
  }

  /**
   * Programmatically toggle the menu visibility.
   * If the menu is currently visible, it will be hidden; otherwise, it will be shown.
   */
  @Method()
  async toggle(target: HTMLElement) {
    this.isVisible ? await this.hide() : await this.show(target);
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer placement={this.placement} ref={e => (this.popoverRef = e)}>
          <div class="popover-container">
            <slot></slot>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
