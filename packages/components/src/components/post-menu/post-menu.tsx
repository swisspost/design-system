import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '@root/package.json';
import { getFocusableChildren } from '@/utils/get-focusable-children';
import { getRoot } from '@/utils';

@Component({
  tag: 'post-menu',
  styleUrl: 'post-menu.scss',
  shadow: true,
})
export class PostMenu {
  private popoverRef: HTMLPostPopovercontainerElement;
  private lastFocusedElement: HTMLElement | null = null;

  private readonly KEYCODES = {
    SPACE: ' ',
    ENTER: 'Enter',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    TAB: 'Tab',
    HOME: 'Home',
    END: 'End',
    ESCAPE: 'Escape',
  };

  @Element() host: HTMLPostMenuElement;

  /**
   * Defines the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'bottom';

  /**
   * Holds the current visibility state of the menu.
   * This state is internally managed to track whether the menu is open (`true`) or closed (`false`),
   * and updates automatically when the menu is toggled.
   */
  @State() isVisible: boolean = false;

  /**
   * Emits when the menu is shown or hidden.
   * The event payload is a boolean: `true` when the menu was opened, `false` when it was closed.
   **/
  @Event() toggleMenu: EventEmitter<boolean>;

  private root?: Document | ShadowRoot;

  connectedCallback() {
    this.root = getRoot(this.host);
    this.host.addEventListener('keydown', this.handleKeyDown);
    this.host.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.host.removeEventListener('keydown', this.handleKeyDown);
    this.host.removeEventListener('click', this.handleClick);
  }

  componentDidLoad() {
    this.popoverRef.addEventListener('postToggle', (event: CustomEvent<boolean>) => {
      this.isVisible = event.detail;
      this.toggleMenu.emit(this.isVisible);
    });
  }

  /**
   * Toggles the menu visibility based on its current state.
   */
  @Method()
  async toggle(target: HTMLElement) {
    this.isVisible ? await this.hide() : await this.show(target);
  }

  /**
   * Displays the popover menu, focusing the first menu item.
   *
   * @param target - The HTML element relative to which the popover menu should be displayed.
   */
  @Method()
  async show(target: HTMLElement) {
    if (this.popoverRef) {
      await this.popoverRef.show(target);
      this.lastFocusedElement = this.root.activeElement as HTMLElement; // Use root's activeElement

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
   */
  @Method()
  async hide() {
    if (this.popoverRef) {
      await this.popoverRef.hide();
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }
    } else {
      console.error('hide: popoverRef is null or undefined');
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();

    if (e.key === this.KEYCODES.ESCAPE) {
      this.toggle(this.host);
      return;
    }

    if (Object.values(this.KEYCODES).includes(e.key)) {
      this.controlKeyDownHandler(e);
    }
  };

  private handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)) {
      this.toggle(this.host);
    }
  };

  private controlKeyDownHandler(e: KeyboardEvent) {
    const menuItems = this.getSlottedItems();

    if (!menuItems.length) {
      return;
    }

    let currentIndex = menuItems.findIndex(el => {
      // Check if the item is currently focused within its rendered scope (document or shadow root)
      return el === getRoot(el).activeElement;
    });

    switch (e.key) {
      case this.KEYCODES.UP:
        e.preventDefault();
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        break;
      case this.KEYCODES.DOWN:
        e.preventDefault();
        currentIndex = (currentIndex + 1) % menuItems.length;
        break;
      case this.KEYCODES.HOME:
        currentIndex = 0;
        break;
      case this.KEYCODES.END:
        currentIndex = menuItems.length - 1;
        break;
      case this.KEYCODES.SPACE:
      case this.KEYCODES.ENTER:
        this.toggle(this.host);
        return;
      case this.KEYCODES.TAB:
        this.toggle(this.host);
        break;
      default:
        break;
    }

    if (menuItems[currentIndex]) {
      (menuItems[currentIndex] as HTMLElement).focus();
    }
  }

  private getSlottedItems(): Element[] {
    const slot = this.host.shadowRoot.querySelector('slot');
    const slottedElements = slot ? slot.assignedElements() : [];

    return (
      slottedElements
        // If the element is a slot, get the assigned elements
        .flatMap(el => (el instanceof HTMLSlotElement ? el.assignedElements() : el))
        // Filter out elements that have a 'menuitem' role
        .filter(el => el.getAttribute('role') === 'menuitem')
        // For each menu item, get any focusable children (e.g., buttons, links)
        .flatMap(el => Array.from(getFocusableChildren(el)))
        .filter(el => window.getComputedStyle(el.parentElement!).display !== 'none')
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer placement={this.placement} ref={e => (this.popoverRef = e)}>
          <div class="popover-container" part="popover-container">
            <slot></slot>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
