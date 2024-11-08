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
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    HOME: 'Home',
    END: 'End',
    ESCAPE: 'Escape'
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
    e.stopPropagation();

    if (e.key === this.KEYCODES.ESCAPE) {
      e.preventDefault();
      this.toggle(this.host); // Use toggle to handle Escape key
      return;
    }

    if (Object.values(this.KEYCODES).includes(e.key)) {
      e.preventDefault();
      this.controlKeyDownHandler(e);
    }
  };

  private controlKeyDownHandler(e: KeyboardEvent) {
    const menuItems = this.getSlottedItems();
    if (!menuItems.length) return;

    const currentFocusedElement = document.activeElement as HTMLElement;
    let currentIndex = menuItems.findIndex(el => el === currentFocusedElement);

    switch (e.code) {
      case this.KEYCODES.UP:
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        break;
      case this.KEYCODES.DOWN:
      case this.KEYCODES.RIGHT:
        currentIndex = (currentIndex + 1) % menuItems.length;
        break;
      case this.KEYCODES.HOME:
        currentIndex = 0;
        break;
      case this.KEYCODES.END:
        currentIndex = menuItems.length - 1;
        break;
      case this.KEYCODES.SPACE:
        if (['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(currentFocusedElement.tagName)) {
          currentFocusedElement.click();
        }
        break;
      default:
        break;
    }

    if (menuItems[currentIndex]) {
      (menuItems[currentIndex] as HTMLElement).focus();
    }
  }

  private getSlottedItems() {
    const slot = this.host.shadowRoot.querySelector('slot');
    const slottedElements = slot ? slot.assignedElements() : [];

    const menuItems = slottedElements
      .filter(el => el.tagName === 'POST-MENU-ITEM')
      .map(el => {
        const slot = el.shadowRoot.querySelector('slot');
        const assignedElements = slot ? slot.assignedElements() : [];
        return assignedElements.filter(isFocusable);
      })
      .flat();

    return menuItems;
  }

  /**
   * Programmatically display or hide the menu based on current visibility.
   */
  @Method()
  async toggle(target: HTMLElement) {
    this.isVisible = !this.isVisible;
    this.isVisible ? await this.show(target) : await this.hide();
  }

  private async show(target: HTMLElement) {
    if (this.popoverRef) {
      await this.popoverRef.show(target);
      this.toggleMenu.emit(this.isVisible);
      const menuItems = this.getSlottedItems();
      if (menuItems.length > 0) {
        (menuItems[0] as HTMLElement).focus();
      }
    } else {
      console.error('show: popoverRef is null or undefined');
    }
  }

  private async hide() {
    if (this.popoverRef) {
      await this.popoverRef.hide();
      this.toggleMenu.emit(this.isVisible);
    } else {
      console.error('hide: popoverRef is null or undefined');
    }
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
