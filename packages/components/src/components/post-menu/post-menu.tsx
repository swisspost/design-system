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
  Watch,
} from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { PLACEMENT_TYPES } from '@/types';
import { version } from '@root/package.json';
import { getFocusableChildren } from '@/utils/get-focusable-children';
import { getRoot, checkEmptyOrOneOf, checkRequiredAndType, EventFrom } from '@/utils';

/**
 * @part post-menu - The container element that holds the list of menu items.
 * @slot header - Holds the header part of the menu.
 */

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
   * Defines the position of the menu relative to its trigger.
   * Menus are automatically flipped to the opposite side if there is not enough available space and are shifted towards the viewport if they would overlap edge boundaries.
   * For supported values and behavior details, see the [Floating UI placement documentation](https://floating-ui.com/docs/computePosition#placement).
   */
  @Prop() readonly placement?: Placement = 'bottom';

  @Watch('placement')
  validatePlacement() {
    checkEmptyOrOneOf(this, 'placement', PLACEMENT_TYPES);
  }

  /**
   * A descriptive label that clearly identifies the menu’s content so assistive technologies can convey its purpose.
   */
  @Prop({ reflect: true }) readonly label!: string;

  @Watch('label')
  validateLabel() {
    checkRequiredAndType(this, 'label', 'string');
  }

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
  @Event() postToggle: EventEmitter<boolean>;

  private root?: Document | ShadowRoot | null;

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
    this.validatePlacement();
    this.validateLabel();
  }

  /**
   * Toggles the menu visibility based on its current state.
   */
  @Method()
  async toggle(target: HTMLElement) {
    if (this.popoverRef) {
      await this.popoverRef.toggle(target);
    } else {
      console.error('toggle: popoverRef is null or undefined');
    }
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
    } else {
      console.error('hide: popoverRef is null or undefined');
    }
  }

  private readonly handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();

    if (e.key === this.KEYCODES.ESCAPE) {
      this.toggle(this.host);
      return;
    }

    if (Object.values(this.KEYCODES).includes(e.key)) {
      this.controlKeyDownHandler(e);
    }
  };

  @EventFrom('post-popovercontainer')
  private handlePostShown(event: CustomEvent<{ first?: boolean }>) {
    // Only for the first open
    if (event.detail.first) {
      // Add "menu" and "menuitem" aria roles and aria-label
      this.host.setAttribute('role', 'menu');

      const menuItems = this.getSlottedItems();
      for (const item of menuItems) {
        item.setAttribute('role', 'menuitem');
      }

      if (this.label) this.host.setAttribute('aria-label', this.label);
    }
  }

  @EventFrom('post-popovercontainer')
  private readonly handlePostBeforeToggle = (event: CustomEvent<{ isOpen: boolean }>) => {
    this.isVisible = event.detail.isOpen;
    this.postToggle.emit(this.isVisible);

    if (this.isVisible) {
      this.lastFocusedElement = this.root?.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        const menuItems = this.getSlottedItems();
        if (menuItems.length > 0) {
          (menuItems[0] as HTMLElement).focus();
        }
      });
    } else if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  };

  private readonly handleClick = (e: MouseEvent) => {
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
        e.preventDefault();
        currentIndex = menuItems.length - 1;
        break;
      case this.KEYCODES.SPACE:
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
    const slot = this.host.shadowRoot.querySelectorAll('slot');
    const slottedElements: Element[] = [];
    slot.forEach(slotItem => slottedElements.push(...slotItem.assignedElements()));

    return (
      slottedElements
        // If the element is a slot, get the assigned elements
        .flatMap(el => (el instanceof HTMLSlotElement ? el.assignedElements() : el))
        // For each menu item, get any focusable children (e.g., buttons, links)
        .flatMap(el => Array.from(getFocusableChildren(el)))
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer
          onPostShow={this.handlePostShown.bind(this)}
          onPostBeforeToggle={this.handlePostBeforeToggle.bind(this)}
          placement={this.placement}
          ref={e => (this.popoverRef = e)}
        >
          <div part="post-menu">
            <slot name="header"></slot>
            <slot></slot>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
