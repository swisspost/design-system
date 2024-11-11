import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '@root/package.json';
import { isFocusable } from '@/utils/is-focusable';

@Component({
  tag: 'post-menu',
  styleUrl: 'post-menu.scss',
  shadow: true,
})
export class PostMenu {
  private popoverRef: HTMLPostPopovercontainerElement;
  private lastFocusedElement: HTMLElement | null = null;

  private readonly KEYCODES = {
    SPACE: 'Space',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    TAB: 'Tab',
    HOME: 'Home',
    END: 'End',
    ESCAPE: 'Escape'
  };

  @Element() host: HTMLPostMenuElement;

  @Prop() readonly placement?: Placement = 'bottom';

  @State() isVisible: boolean = false;

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
      this.toggle(this.host);
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
      case this.KEYCODES.TAB:
        this.closeMenuWithoutFocusRestore();
        break;
      case this.KEYCODES.DOWN:
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
          this.closeMenuWithoutFocusRestore();
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
   * Programmatically toggle the menu visibility.
   * If the menu is currently visible, it will be hidden; otherwise, it will be shown.
   */
  @Method()
  async toggle(target: HTMLElement) {
    if (!this.isVisible) {
      this.lastFocusedElement = document.activeElement as HTMLElement;
    }

    this.isVisible = !this.isVisible;
    this.isVisible ? await this.show(target) : await this.hide();
  }

  /**
   * Displays the popover menu, positioning it relative to the specified target element.
   * 
   * @param target - The HTML element relative to which the popover menu should be displayed.
   */
  @Method()
  async show(target: HTMLElement) {
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

  /**
   * Hides the popover menu and restores focus to the previously focused element.
   * If the popover is successfully hidden, it triggers the `toggleMenu` event.
   */
  @Method()
  async hide() {
    if (this.popoverRef) {
      await this.popoverRef.hide();
      this.toggleMenu.emit(this.isVisible);
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    } else {
      console.error('hide: popoverRef is null or undefined');
    }
  }

  /**
   * Closes the menu without restoring focus to the last focused element.
   */
  private async closeMenuWithoutFocusRestore() {
    if (this.popoverRef) {
      await this.popoverRef.hide();
      this.isVisible = false;
      this.toggleMenu.emit(this.isVisible);
    } else {
      console.error('closeMenuWithoutFocusRestore: popoverRef is null or undefined');
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
