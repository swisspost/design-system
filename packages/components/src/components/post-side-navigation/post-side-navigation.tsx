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
import { version } from '@root/package.json';
import { breakpoint, Device } from '@/utils/breakpoints';
import { getFocusableChildren, OneOf, Required, Type } from '@/utils';
import { SIDE_NAVIGATION_SIZES, SideNavigationSize } from './side-navigation-styles';

/**
 * @slot default - Slot for the navigation content (must be a `<nav>` landmark with proper heading)
 */
@Component({
  tag: 'post-side-navigation',
  styleUrl: 'post-side-navigation.scss',
  shadow: true,
})
export class PostSideNavigation {
  @Element() host: HTMLPostSideNavigationElement;

  @State() device: Device = breakpoint.get('device');

  /**
   * Accessible label for the close button shown in the mobile navigation dialog.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textClose!: string;

  /**
   * Controls the size of the navigation items.
   * Choose "small" for deep and long navigation, and "large" (default) for a flat and short navigation.
   */
  @OneOf(SIDE_NAVIGATION_SIZES)
  @Prop()
  size?: SideNavigationSize = 'large';

  /**
   * An event emitted when the navigation is shown or hidden on mobile.
   * The payload is a boolean: `true` when the navigation opens, `false` when it closes.
   */
  @Event({ bubbles: true, composed: true }) postToggle: EventEmitter<boolean>;

  private breakpointChange = (e: CustomEvent) => {
    this.device = e.detail;
  };

  connectedCallback() {
    globalThis.addEventListener('postBreakpoint:device', this.breakpointChange);
    this.host.addEventListener('keydown', this.handleKeyDown);

    if (this.size === 'small') {
      this.host.classList.add('post-side-navigation-small');
    }
  }

  disconnectedCallback() {
    globalThis.removeEventListener('postBreakpoint:device', this.breakpointChange);
    this.host.removeEventListener('keydown', this.handleKeyDown);
  }

  get dialog(): HTMLDialogElement {
    return this.host.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
  }

  private get collapsibleTrigger(): HTMLPostCollapsibleTriggerElement | null {
    return document.activeElement?.closest('post-collapsible-trigger') ?? null;
  }

  private get collapsible(): HTMLPostCollapsibleElement | null {
    return this.collapsibleTrigger?.querySelector(':scope > post-collapsible') ?? null;
  }

  /**
   * Collapses the active disclosure on Escape; lets the native dialog handle it otherwise.
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;

    const collapsible = this.collapsible;

    if (!collapsible || collapsible.collapsed) return;

    e.preventDefault();
    e.stopPropagation();
    collapsible.toggle(false);
    this.collapsibleTrigger?.querySelector<HTMLButtonElement>('button')?.focus();
  };

  /**
   * Toggles the navigation programmatically.
   * No-op on desktop.
   */
  @Method()
  async toggle() {
    if (this.device === 'desktop') return;

    return this.dialog?.open ? this.hide() : this.show();
  }

  /**
   * Opens the navigation programmatically.
   * No-op on desktop.
   */
  @Method()
  async show() {
    if (this.device === 'desktop') return;

    this.dialog.showModal();
    this.postToggle.emit(true);
    this.focusNav();
  }

  /**
   * Closes the navigation programmatically.
   * No-op on desktop.
   */
  @Method()
  async hide() {
    if (this.device === 'desktop') return;

    this.dialog.close();
  }

  /**
   * Move focus into the navigation when the dialog opens.
   */
  private focusNav() {
    const slot = this.host.shadowRoot?.querySelector('slot');
    const nav = slot?.assignedElements({ flatten: true })[0] as HTMLElement | undefined;

    if (!nav) return;

    const [firstFocusable] = getFocusableChildren(nav);
    firstFocusable?.focus();
  }

  /**
   * Render inline navigation (desktop).
   */
  private renderNav() {
    return <slot />;
  }

  /**
   * Render modal navigation (mobile/tablet).
   */
  private renderDialog() {
    return (
      <dialog
        onClose={() => {
          this.postToggle.emit(false);
        }}
      >
        <slot />
        <post-closebutton onClick={() => this.hide()}>{this.textClose}</post-closebutton>
      </dialog>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        {this.device === 'desktop' ? this.renderNav() : this.renderDialog()}
      </Host>
    );
  }
}
