import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType, breakpoint, Device } from '@/utils';

const GRID_SLOTS = ['grid-1', 'grid-2', 'grid-3', 'grid-4'];

/**
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
   * The label to add to the footer (visually hidden).
   */
  @Prop() readonly label!: string;

  @State() device: Device = breakpoint.get('device');
  @State() gridSlotDisplayed: Record<string, boolean> = {};

  @Watch('label')
  validateLabel() {
    checkRequiredAndType(this, 'label', 'string');
  }

  constructor() {
    this.handleGridSlotChange = this.handleGridSlotChange.bind(this);
  }

  connectedCallback() {
    window.addEventListener('postBreakpoint:device', this.breakpointChange);
  }

  componentWillLoad() {
    this.validateLabel();

    // initialize grid visibility by checking the content of each slot
    GRID_SLOTS.forEach(slotName => {
      const assignedElements = this.host.querySelectorAll(`[slot="${slotName}"]`);
      this.updateGridSlotDisplay(slotName, assignedElements.length > 0);
    });
  }

  disconnectedCallback() {
    window.removeEventListener('postBreakpoint:device', this.breakpointChange);
  }

  private readonly breakpointChange = (e: CustomEvent) => {
    this.device = e.detail;
  };

  private readonly handleGridSlotChange = (...devices: string[]) => (e: Event) => {
    if (devices.includes(this.device) && e.target instanceof HTMLSlotElement) {
      this.updateGridSlotDisplay(e.target.name, e.target.assignedElements().length > 0);
    }
  };

  private updateGridSlotDisplay(slotName: string, hasContent: boolean) {
    if (this.gridSlotDisplayed[slotName] !== hasContent) {
      this.gridSlotDisplayed = {...this.gridSlotDisplayed, [slotName]: hasContent};
    }
  }

  private renderAccordion() {
    return (
      <post-accordion headingLevel={3} multiple={true}>
        {GRID_SLOTS.map(slotName => (
          <post-accordion-item class={{ 'd-none': !this.gridSlotDisplayed[slotName] }} collapsed={true}>
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
      <div class={{ 'd-none': !this.gridSlotDisplayed[slotName] }}>
        <slot onSlotchange={this.handleGridSlotChange('tablet', 'desktop')} name={slotName}></slot>
      </div>
    ));
  }

  render() {
    return (
      <Host data-version={version} data-color-scheme="light">
        <footer>
          <h2 class="visually-hidden">{this.label}</h2>

          <div class="footer-container">
            <div class="footer-grid">
              {this.device === 'mobile' ? this.renderAccordion() : this.renderColumns()}
            </div>

            <div class="footer-column">
              <div class="footer-socialmedia">
                <slot name="socialmedia"></slot>
              </div>

              <div class="footer-app">
                <slot name="app"></slot>
              </div>
            </div>

            <div class="footer-businesssectors">
              <slot name="businesssectors"></slot>
            </div>

            <div class="footer-meta">
              <slot name="meta"></slot>
            </div>

            <div class="footer-copyright">
              <slot name="copyright"></slot>
            </div>
          </div>
        </footer>
      </Host>
    );
  }
}
