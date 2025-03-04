import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { version } from '@root/package.json';
import { breakpoint } from '../../utils/breakpoints';

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

  connectedCallback() {
    window.addEventListener('postBreakpoint:name', this.breakpointChange.bind(this));
  }

  private breakpointChange(e: CustomEvent) {
    this.isMobile = e.detail === 'mobile';
  }

  private renderAccordion() {
    return (
      <div class="footer-grid">
        <post-accorddion heading-level="3" multiple>
          <post-accordion-item collapsed>
            <span slot="header">
              <slot name="grid-1-title"></slot>
            </span>
            <slot name="grid-1"></slot>
          </post-accordion-item>
          <post-accordion-item collapsed>
            <span slot="header">
              <slot name="grid-2-title"></slot>
            </span>
            <slot name="grid-2"></slot>
          </post-accordion-item>
          <post-accordion-item collapsed>
            <span slot="header">
              <slot name="grid-3-title"></slot>
            </span>
            <slot name="grid-3"></slot>
          </post-accordion-item>
          <post-accordion-item collapsed>
            <span slot="header">
              <slot name="grid-4-title"></slot>
            </span>
            <slot name="grid-4"></slot>
          </post-accordion-item>
        </post-accorddion>
      </div>
    );
  }

  private renderGrid() {
    return (
      <div class="footer-grid">
        <div>
          <slot name="grid-1"></slot>
        </div>
        <div>
          <slot name="grid-2"></slot>
        </div>
        <div>
          <slot name="grid-3"></slot>
        </div>
        <div>
          <slot name="grid-4"></slot>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <footer>
          <h2 class="visually-hidden">{this.label}</h2>

          <div class="footer-container">
            {this.isMobile ? this.renderAccordion() : this.renderGrid()}

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

  disconnectedCallback() {
    window.removeEventListener('postBreakpoint:name', this.breakpointChange.bind(this));
  }
}
