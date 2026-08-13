import { breakpoint, Device, Required, Type } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop, State } from '@stencil/core';

const GRID_SLOTS = ['grid-1', 'grid-2', 'grid-3', 'grid-4'];
const SECTION_SLOTS = ['prefooter', 'socialmedia', 'app', 'businesssectors', 'meta', 'copyright'];

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
    [...GRID_SLOTS, ...SECTION_SLOTS].forEach(slotName => {
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

  private handleGridSlotChange(...devices: Device[]) {
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
      // @State only re-renders when this.slotDisplayed itself is replaced,
      // not when one of its properties is changed directly
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
    const renderPrefooter = this.slotDisplayed['prefooter'];
    const renderSocialmedia = this.slotDisplayed['socialmedia'];
    const renderApp = this.slotDisplayed['app'];
    const renderBusinesssectors = this.slotDisplayed['businesssectors'];
    const renderMeta = this.slotDisplayed['meta'];
    const renderCopyright = this.slotDisplayed['copyright'];

    const allGridSlotsEmpty = GRID_SLOTS.every(slotName => !this.slotDisplayed[slotName]);
    const renderMain =
      !allGridSlotsEmpty || renderSocialmedia || renderApp || renderBusinesssectors;
    const renderBase = renderCopyright || renderMeta;

    return (
      <Host data-version={version} data-color-scheme="light">
        <footer>
          <h2 class="visually-hidden">{this.textFooter}</h2>

          <div class={{ 'prefooter': true, 'd-none': !renderPrefooter }}>
            <div class="footer-container">
              <slot onSlotchange={this.handleSlotChange} name="prefooter"></slot>
            </div>
          </div>

          <div class={{ 'footer-main': true, 'd-none': !renderMain }}>
            <div class="footer-container">
              <div class={{ 'footer-grid': true, 'd-none': allGridSlotsEmpty }}>
                {this.device === 'mobile' ? this.renderAccordion() : this.renderColumns()}
              </div>

              <div
                class={{
                  'footer-column': true,
                  'd-none': !renderSocialmedia && !renderApp,
                }}
              >
                <div class={{ 'footer-socialmedia': true, 'd-none': !renderSocialmedia }}>
                  <slot onSlotchange={this.handleSlotChange} name="socialmedia"></slot>
                </div>

                <div class={{ 'footer-app': true, 'd-none': !renderApp }}>
                  <slot onSlotchange={this.handleSlotChange} name="app"></slot>
                </div>
              </div>

              <div class={{ 'footer-businesssectors': true, 'd-none': !renderBusinesssectors }}>
                <slot onSlotchange={this.handleSlotChange} name="businesssectors"></slot>
              </div>
            </div>
          </div>

          <div class={{ 'footer-base': true, 'd-none': !renderBase }}>
            <div class="footer-container">
              <div class={{ 'footer-copyright': true, 'd-none': !renderCopyright }}>
                <slot onSlotchange={this.handleSlotChange} name="copyright"></slot>
              </div>

              <div class={{ 'footer-meta': true, 'd-none': !renderMeta }}>
                <slot onSlotchange={this.handleSlotChange} name="meta"></slot>
              </div>
            </div>
          </div>
        </footer>
      </Host>
    );
  }
}
