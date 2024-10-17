import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '@root/package.json';
import { getAttributeObserver } from '@/utils/attribute-observer';

/**
 * @slot default - Slot for placing content inside the menu.
 */

let menuInstances = 0;
const menuTargetAttribute = 'data-menu-target';

// Handles global pointer and keyboard events for toggling menus
const globalToggleHandler = (e: PointerEvent | KeyboardEvent) => {
  const triggerElement = e.target as HTMLElement;
  if (!triggerElement || !('getAttribute' in triggerElement)) return;

  const menuId = triggerElement.getAttribute(menuTargetAttribute);
  if (!menuId) return;

  const menuElement = document.getElementById(menuId) as HTMLPostMenuElement;

  // Handle Enter, Space, and Arrow keys for keyboard events
  if (e instanceof KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menuElement?.toggle(triggerElement);
    }
  } else {
    // Handle pointer events (e.g., clicks)
    menuElement?.toggle(triggerElement);
  }
};

// Initialize a mutation observer for patching accessibility features
const triggerObserver = getAttributeObserver(menuTargetAttribute, trigger => {
  const force = trigger.hasAttribute(menuTargetAttribute);
  trigger.setAttribute('aria-expanded', force ? 'false' : null);
});

@Component({
  tag: 'post-menu',
  styleUrl: 'post-menu.scss',
  shadow: true,
})
export class PostMenu {
  private popoverRef: HTMLPostPopovercontainerElement;
  private localBeforeToggleHandler;
  private triggerElement: HTMLElement;

  private readonly KEYCODES = {
    SPACE: 'Space',
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    ESCAPE: 'Escape',
    HOME: 'Home',
    END: 'End'
  };

  @Element() host: HTMLPostMenuElement;

  /**
   * Defines the placement of the popover according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   */
  @Prop() readonly placement?: Placement = 'bottom';

  constructor() {
    this.localBeforeToggleHandler = this.beforeToggleHandler.bind(this);
  }

  connectedCallback() {
    if (menuInstances === 0) {
      window.addEventListener('pointerup', globalToggleHandler);
      window.addEventListener('keydown', globalToggleHandler);
      this.host.addEventListener('keydown', this.handleKeyDown);

      this.triggers.forEach(trigger => {
        const triggerElement = trigger as HTMLElement;
        triggerElement.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            this.toggle(triggerElement, true);
          }
        });
      });

      triggerObserver.observe(document.body, {
        subtree: true,
        childList: true,
        attributeFilter: [menuTargetAttribute],
      });
    }

    menuInstances++;

    this.triggers.forEach(trigger => {
      const triggerElement = trigger as HTMLElement;
      triggerElement.setAttribute('aria-expanded', 'false');
    });
  }

  componentDidLoad() {
    if (this.popoverRef) {
      this.popoverRef.addEventListener('beforetoggle', this.localBeforeToggleHandler);
    } else {
      console.error('componentDidLoad: popoverRef is null or undefined');
    }
  }

  disconnectedCallback() {
    menuInstances--;

    if (menuInstances === 0) {
      window.removeEventListener('pointerup', globalToggleHandler);
      window.removeEventListener('keydown', globalToggleHandler);
      this.host.removeEventListener('keydown', this.handleKeyDown);
      triggerObserver.disconnect();
    }

    if (this.popoverRef) {
      this.popoverRef.removeEventListener('beforetoggle', this.localBeforeToggleHandler);
    }

    this.triggers.forEach(trigger => {
      trigger.removeAttribute('aria-expanded');
    });
  }

  // Handles keydown events on the menu to support keyboard navigation
  private handleKeyDown = (e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Space', 'Escape', 'Home', 'End'].includes(e.key)) {
      this.controlKeyDownHandler(e);
    }
  };

  // Controls keyboard navigation within the menu
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
        if (currentFocusedElement.tagName === 'BUTTON' || currentFocusedElement.tagName === 'A' || currentFocusedElement.tagName === 'INPUT' || currentFocusedElement.tagName === 'SELECT' || currentFocusedElement.tagName === 'TEXTAREA') {
          currentFocusedElement.click();
        }
        break;
      case this.KEYCODES.ESCAPE:
        this.hide();
        break;
      default:
        break;
    }

    // Focus the newly selected item
    if (focusableItems[currentIndex]) {
      (focusableItems[currentIndex] as HTMLElement).focus();
    }
  }

  // Checks if the given element is focusable
  private isFocusable(element: HTMLElement): boolean {
    const focusableTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
    const tabIndex = element.getAttribute('tabindex');

    if (focusableTags.includes(element.tagName)) {
      return true;
    }

    const role = element.getAttribute('role');
    if (role === 'button' || role === 'link') {
      return true;
    }

    if (tabIndex !== null && tabIndex !== '-1') {
      return true;
    }

    return false;
  }

  // Returns all slotted, focusable items within the menu
  private getSlottedItems() {
    const slot = this.host.shadowRoot.querySelector('slot');
    const slottedElements = slot ? slot.assignedElements() : [];

    const focusableItems = slottedElements
      .filter(el => el.tagName === 'POST-MENU-ITEM')
      .map(el => {
        const slot = el.shadowRoot.querySelector('slot');
        const assignedElements = slot ? slot.assignedElements() : [];

        return assignedElements.filter(this.isFocusable);
      })
      .flat();

    return focusableItems;
  }

  /**
   * Programmatically display the menu
   * @param target An element with [data-menu-target="id"] where the menu should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    if (this.popoverRef) {
      await this.popoverRef.show(target);
      target.setAttribute('aria-expanded', 'true');
    } else {
      console.error('show: popoverRef is null or undefined');
    }
  }

  /**
   * Programmatically hide this menu
   */
  @Method()
  async hide() {
    if (this.popoverRef) {
      await this.popoverRef.hide();

      if (this.triggerElement) {
        this.triggerElement.focus();
      }
    } else {
      console.error('hide: popoverRef is null or undefined');
    }

    this.triggers.forEach(trigger => {
      trigger.setAttribute('aria-expanded', 'false');
    });
  }

  /**
   * Toggle menu display
   * @param target An element with [data-menu-target="id"] where the menu should be anchored to
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    if (this.popoverRef) {
      const newState = await this.popoverRef.toggle(target, force);
      this.triggerElement = target;
      this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
      target.setAttribute('aria-expanded', String(newState));
      if (newState) {
        const focusableItems = this.getSlottedItems();
        if (focusableItems.length) {
          const firstFocusableItem = focusableItems[0] as HTMLElement;

          // Focus the first item if focusable
          if (typeof firstFocusableItem.focus === 'function') {
            firstFocusableItem.focus();
          }
        }
      }
    } else {
      console.error('toggle: popoverRef is null or undefined');
    }
  }

  private get triggers() {
    const triggers = document.querySelectorAll(`[${menuTargetAttribute}="${this.host.id}"]`);
    return triggers;
  }

  // Handles before the toggle of the menu (reset aria-expanded attributes)
  private beforeToggleHandler() {
    this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  }

  render() {
    return (
      <Host data-version={version} id="menu-one">
        <post-popovercontainer placement={this.placement} ref={e => (this.popoverRef = e)}>
          <slot></slot>
        </post-popovercontainer>
      </Host>
    );
  }
}
