import {
  Component,
  h,
  Host,
  Method,
  Element,
  State,
  EventEmitter,
  Event,
  Prop,
} from '@stencil/core';
import { version } from '@root/package.json';
import { breakpoint, Device } from '@/utils/breakpoints';
import { getFocusableChildren, Required, Type } from '@/utils';

/**
 * @slot default - Slot for the navigation content: a `<nav>` with a heading linked via
 * `aria-labelledby` and `<ul>`/`<li>` lists.
 */
@Component({
  tag: 'post-sidenavigation',
  styleUrl: 'post-sidenavigation.scss',
  shadow: true,
})
export class PostSidenavigation {
  @Element() host: HTMLPostSidenavigationElement;

  @State() device: Device = breakpoint.get('device');

  /**
   * Accessible label for the close button shown in the mobile navigation dialog.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textClose!: string;

  /**
   * An event emitted when the navigation is shown or hidden on mobile.
   *
   * The payload is a boolean:
   * - `true` when the navigation opens
   * - `false` when the navigation closes
   */
  @Event() postToggle: EventEmitter<boolean>;

  private breakpointChange = (e: CustomEvent) => {
    this.device = e.detail;
  };

  connectedCallback() {
    globalThis.addEventListener('postBreakpoint:device', this.breakpointChange);
    this.host.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    globalThis.removeEventListener('postBreakpoint:device', this.breakpointChange);
    this.host.removeEventListener('keydown', this.handleKeyDown);
  }

  // ---------------------------------------------------------------------------
  // Escape handling — works on both desktop (inline nav) and mobile (dialog)
  // ---------------------------------------------------------------------------

  /**
   * When Escape is pressed and focus is on a `post-collapsible-trigger` button,
   * collapse that disclosure and keep focus on the trigger button.
   * When focus is not inside a trigger, the event is not intercepted — on mobile
   * this lets the native dialog `cancel` close the dialog.
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;

    const trigger = document.activeElement?.closest<HTMLPostCollapsibleTriggerElement>(
      'post-collapsible-trigger',
    );

    if (!trigger) return;

    const collapsibleId = trigger.getAttribute('for');
    const collapsible = this.host.querySelector<HTMLPostCollapsibleElement>(
      `post-collapsible#${collapsibleId}`,
    );

    if (!collapsible || collapsible.collapsed) return;

    e.preventDefault();
    collapsible.toggle(false);
    trigger.querySelector<HTMLButtonElement>('button')?.focus();
  };

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------

  /**
   * Toggles the navigation programmatically.
   * No-op on desktop.
   */
  @Method()
  async toggle() {
    if (this.device === 'desktop') {
      return;
    }

    const dialog = this.getDialog();

    if (dialog?.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Opens the navigation programmatically.
   * No-op on desktop.
   */
  @Method()
  async show() {
    if (this.device === 'desktop') {
      return;
    }

    this.getDialog()?.showModal();

    this.postToggle.emit(true);

    this.focusNav();
  }

  /**
   * Closes the navigation programmatically.
   * No-op on desktop.
   */
  @Method()
  async hide() {
    if (this.device === 'desktop') {
      return;
    }

    this.getDialog()?.close();
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  private getDialog(): HTMLDialogElement | null {
    const dialog = this.host.shadowRoot?.querySelector('dialog');

    if (!dialog) {
      console.warn('No dialog was found.');
      return null;
    }

    return dialog;
  }

  /**
   * Move focus into the navigation when the dialog opens.
   */
  private focusNav() {
    const slot = this.host.shadowRoot?.querySelector('slot');

    const nav = slot?.assignedElements({ flatten: true })[0] as
      | HTMLElement
      | undefined;

    if (!nav) {
      return;
    }

    const [firstFocusable] = getFocusableChildren(nav);

    firstFocusable?.focus();
  }

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------

  private renderNav() {
    return (
      <Host data-version={version}>
        <slot />
      </Host>
    );
  }

  private renderDialog() {
    return (
      <Host data-version={version}>
        <dialog onClose={() => this.postToggle.emit(false)}>
          <slot />

          <post-closebutton onClick={() => this.hide()}>
            {this.textClose}
          </post-closebutton>
        </dialog>
      </Host>
    );
  }

  render() {
    return this.device === 'desktop' ? this.renderNav() : this.renderDialog();
  }
}