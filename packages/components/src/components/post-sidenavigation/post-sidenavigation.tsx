import { Component, h, Host, Method, Element, State } from "@stencil/core";
import { version } from '@root/package.json';
import { breakpoint, Device } from '@/utils/breakpoints';

@Component({
  tag: 'post-sidenavigation',
  styleUrl: 'post-sidenavigation.scss',
  shadow: true,
})

export class PostSidenavigation {
  @Element() host: HTMLPostSidenavigationElement;
  @State() device: Device = breakpoint.get('device');
  private isExpanded: boolean;

  connectedCallback() {
    globalThis.addEventListener('postBreakpoint:device', this.breakpointChange.bind(this));
  }

  private breakpointChange(e: CustomEvent) {
    this.device = e.detail;
  }

  componentDidLoad() {
    const slot = this.host.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    console.log(slot.assignedElements());
  }

  disconnectedCallback() {
    globalThis.removeEventListener('postBreakpoint:device', this.breakpointChange.bind(this));
  }

  /**
   * Triggers the subnavigation programmatically.
   */
  @Method()
  async toggle() {
    const dialog = this.host.shadowRoot?.querySelector('dialog');
    if (this.isExpanded) {
      dialog?.close();
    } else {
      dialog?.showModal();
    }
  }

  private closeDialog() {
    this.host.shadowRoot?.querySelector('dialog')?.close();
  }

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
        <dialog id="dialog">
          <button onClick={() => this.closeDialog()}>Close</button>
          <slot />
        </dialog>
      </Host>
    );
  }

  render() {
    return this.device === 'desktop' ? this.renderNav() : this.renderDialog();
  }
}
