import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { Placement } from '@floating-ui/dom';
import { version } from '@root/package.json';
import { getAttributeObserver } from '@/utils/attribute-observer';

/**
 * @slot default - Slot for placing content inside the menu.
 */

let menuInstances = 0;
const menuTargetAttribute = 'data-menu-target';

const globalToggleHandler = (e: PointerEvent | KeyboardEvent) => {
  const triggerElement = e.target as HTMLElement;
  if (!triggerElement || !('getAttribute' in triggerElement)) return;

  const menuId = triggerElement.getAttribute(menuTargetAttribute);
  if (!menuId || (e instanceof KeyboardEvent && e.key !== 'Enter')) return;

  const menuElement = document.getElementById(menuId) as HTMLPostMenuElement;

  menuElement?.toggle(triggerElement);
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

  private readonly KEYCODES = {
    SPACE: 'Space',
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
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

      triggerObserver.observe(document.body, {
        subtree: true,
        childList: true,
        attributeFilter: [menuTargetAttribute],
      });
    }

    menuInstances++;

    this.triggers.forEach(trigger => {
      trigger.setAttribute('aria-expanded', 'false');
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

    // Remove listeners and observer after the last popover has been destructed
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

  private handleKeyDown = (e: KeyboardEvent) => {
    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.key)) {
      this.controlKeyDownHandler(e); // Call the new focus handling method
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
        currentIndex = currentIndex <= 0 ? focusableItems.length - 1 : currentIndex - 1;
        break;
      case this.KEYCODES.DOWN:
      case this.KEYCODES.RIGHT:
        currentIndex = currentIndex === focusableItems.length - 1 ? 0 : currentIndex + 1;
        break;
      case this.KEYCODES.SPACE:
        if (currentFocusedElement.tagName === 'BUTTON' || currentFocusedElement.tagName === 'A') {
          currentFocusedElement.click();
        }
        break;
      default:
        break;
    }

    // Focus the newly selected item
    if (focusableItems[currentIndex]) {
      (focusableItems[currentIndex] as HTMLElement).focus();
    }
  }

  private getSlottedItems() {
    const slot = this.host.shadowRoot.querySelector('slot');
    const slottedElements = slot ? slot.assignedElements() : [];

    const focusableItems = slottedElements.filter(el => el.tagName === 'POST-MENU-ITEM');

    focusableItems.forEach(el => {
      el.setAttribute('tabindex', '0');
    });

    return focusableItems;
  }

  /**
   * Programmatically display the popover
   * @param target An element with [data-menu-target="id"] where the popover should be shown
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
   * Programmatically hide this popover
   */
  @Method()
  async hide() {
    if (this.popoverRef) {
      await this.popoverRef.hide();
    } else {
      console.error('hide: popoverRef is null or undefined');
    }

    this.triggers.forEach(trigger => {
      trigger.setAttribute('aria-expanded', 'false');
    });
  }

  /**
   * Toggle popover display
   * @param target An element with [data-menu-target="id"] where the popover should be anchored to
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    if (this.popoverRef) {
      const newState = await this.popoverRef.toggle(target, force);
      this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
      target.setAttribute('aria-expanded', `${newState}`);
    } else {
      console.error('toggle: popoverRef is null or undefined');
    }
  }

  private get triggers() {
    const triggers = document.querySelectorAll(`[${menuTargetAttribute}="${this.host.id}"]`);
    return triggers;
  }

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
