import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType, breakpoint } from '@/utils';

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

  @State() isMobile: boolean = breakpoint.get('name') === 'mobile';
  @State() gridSlotDisplayed: Record<string, boolean> = {};

  @Watch('label')
  validateLabel() {
    checkRequiredAndType(this, 'label', 'string');
  }

  connectedCallback() {
    window.addEventListener('postBreakpoint:name', this.breakpointChange);
  }

  componentWillLoad() {
    this.validateLabel();
  }

  componentDidLoad() {
    GRID_SLOTS.forEach(slotName => {
      this.updateGridSlotDisplay(this.host.shadowRoot.querySelector(`slot[name="${slotName}"]`));
    });
  }

  disconnectedCallback() {
    window.removeEventListener('postBreakpoint:name', this.breakpointChange);
  }

  private readonly breakpointChange = (e: CustomEvent) => {
    this.isMobile = e.detail === 'mobile';
  };

  private updateGridSlotDisplay(slot: Element | EventTarget) {
    if (slot instanceof HTMLSlotElement) {
      const hasContent = slot.assignedElements().length > 0;
      this.gridSlotDisplayed = {...this.gridSlotDisplayed, [slot.name]: hasContent};
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
            <slot onSlotchange={(e) => this.updateGridSlotDisplay(e.target)} name={slotName}></slot>
          </post-accordion-item>
        ))}
      </post-accordion>
    );
  }

  private renderColumns() {
    return GRID_SLOTS.map(slotName => (
      <div class={{ 'd-none': !this.gridSlotDisplayed[slotName] }}>
        <slot onSlotchange={(e) => this.updateGridSlotDisplay(e.target)} name={slotName}></slot>
      </div>
    ));
  }

  render() {
    return (
      <Host data-version={version}>
        <footer>
          <h2 class="visually-hidden">{this.label}</h2>

          <div class="footer-container">
            <div class="footer-grid">
              {this.isMobile ? this.renderAccordion() : this.renderColumns()}
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
