import { breakpoint, Device, Required, Type } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop, State } from '@stencil/core';

const GRID_SLOTS = ['grid-1', 'grid-2', 'grid-3', 'grid-4'];
// slots outside the grid that must also collapse their wrapper when empty
const CONTENT_SLOTS = ['socialmedia', 'app', 'businesssectors', 'meta', 'copyright'];

/**
 * @slot prefooter - Slot for the pre-footer.
 * @slot grid-{1|2|3|4}-title - Slot for the accordion headers (mobile).
 * @slot grid-{1|2|3|4} - Slot for the accordion bodies (mobile) and the grid cells (tablet, desktop).
 * @slot socialmedia - Slot for the social media links.
 * @slot app - Slot for the app links.
 * @slot businesssectors - Slot for the business sectors links.
 * @slot meta - Slot for the meta links.
 * @slot copyright - Slot for the copyright text.
 */
@Component({
  tag: 'post-footer',
  shadow: true,
  styleUrl: './post-footer.scss',
})
export class PostFooter {
  @Element() host: HTMLPostFooterElement;

  /**
   * The textFooter to add to the footer (visually hidden).
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  readonly textFooter!: string;

  @State() device: Device = breakpoint.get('device');
  @State() slotDisplayed: Record<string, boolean> = {};

  constructor() {
    this.handleGridSlotChange = this.handleGridSlotChange.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }

  connectedCallback() {
    globalThis.addEventListener('postBreakpoint:device', this.breakpointChange);
  }

  componentWillLoad() {
    // initialize slot visibility by checking the content of each slot
    [...GRID_SLOTS, ...CONTENT_SLOTS].forEach(slotName => {
      const assignedElements = this.host.querySelectorAll(`[slot="${slotName}"]`);
      this.updateSlotDisplay(slotName, assignedElements.length > 0);
    });
  }

  disconnectedCallback() {
    globalThis.removeEventListener('postBreakpoint:device', this.breakpointChange);
  }

  private readonly breakpointChange = (e: CustomEvent) => {
    this.device = e.detail;
  };

  private handleGridSlotChange(...devices: string[]) {
    return (e: Event) => {
      if (devices.includes(this.device) && e.target instanceof HTMLSlotElement) {
        this.updateSlotDisplay(e.target.name, e.target.assignedElements().length > 0);
      }
    };
  }

  private handleSlotChange(e: Event) {
    if (e.target instanceof HTMLSlotElement) {
      this.updateSlotDisplay(e.target.name, e.target.assignedElements().length > 0);
    }
  }

  private updateSlotDisplay(slotName: string, hasContent: boolean) {
    if (this.slotDisplayed[slotName] !== hasContent) {
      this.slotDisplayed = { ...this.slotDisplayed, [slotName]: hasContent };
    }
  }

  private renderAccordion() {
    return (
      <post-accordion headingLevel={3} multiple={true}>
        {GRID_SLOTS.map(slotName => (
          <post-accordion-item
            key={slotName}
            class={{ 'd-none': !this.slotDisplayed[slotName] }}
            collapsed={true}
          >
            <span slot="header">
              <slot name={slotName + '-title'}></slot>
            </span>
            <slot onSlotchange={this.handleGridSlotChange('mobile')} name={slotName}></slot>
          </post-accordion-item>
        ))}
      </post-accordion>
    );
  }

  private renderColumns() {
    return GRID_SLOTS.map(slotName => (
      <div key={slotName} class={{ 'd-none': !this.slotDisplayed[slotName] }}>
        <h3>
          <slot name={slotName + '-title'}></slot>
        </h3>
        <slot onSlotchange={this.handleGridSlotChange('tablet', 'desktop')} name={slotName}></slot>
      </div>
    ));
  }

  render() {
    const socialmediaDisplayed = this.slotDisplayed['socialmedia'];
    const appDisplayed = this.slotDisplayed['app'];

    return (
      <Host data-version={version} data-color-scheme="light">
        <footer>
          <h2 class="visually-hidden">{this.textFooter}</h2>

          <div class="prefooter">
            <div class="footer-container">
              <slot name="prefooter"></slot>
            </div>
          </div>

          <div class="footer-main">
            <div class="footer-container">
              <div class="footer-grid">
                {this.device === 'mobile' ? this.renderAccordion() : this.renderColumns()}
              </div>

              <div
                class={{
                  'footer-column': true,
                  'd-none': !socialmediaDisplayed && !appDisplayed,
                }}
              >
                <div
                  class={{ 'footer-socialmedia': true, 'd-none': !socialmediaDisplayed }}
                >
                  <slot onSlotchange={this.handleSlotChange} name="socialmedia"></slot>
                </div>

                <div class={{ 'footer-app': true, 'd-none': !appDisplayed }}>
                  <slot onSlotchange={this.handleSlotChange} name="app"></slot>
                </div>
              </div>

              <div
                class={{
                  'footer-businesssectors': true,
                  'd-none': !this.slotDisplayed['businesssectors'],
                }}
              >
                <slot onSlotchange={this.handleSlotChange} name="businesssectors"></slot>
              </div>

              <div class={{ 'footer-meta': true, 'd-none': !this.slotDisplayed['meta'] }}>
                <slot onSlotchange={this.handleSlotChange} name="meta"></slot>
              </div>

              <div
                class={{ 'footer-copyright': true, 'd-none': !this.slotDisplayed['copyright'] }}
              >
                <slot onSlotchange={this.handleSlotChange} name="copyright"></slot>
              </div>
            </div>
          </div>
        </footer>
      </Host>
    );
  }
}
