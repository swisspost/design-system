import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { version } from '@root/package.json';
import { addNameListener, removeNameListener } from '../../utils/breakpoints';

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

  @State() isMobile: boolean;

  connectedCallback() {
    addNameListener(this.updateBreakpoint.bind(this));
  }

  private updateBreakpoint(breakpoint: string) {
    this.isMobile = breakpoint === 'mobile';
  }

  render() {
    return (
      <Host data-version={version}>
        <footer>
          <h2 class="visually-hidden">{this.label}</h2>

          <div class="footer-container">
            {this.isMobile ? (
              <div class="footer-grid">
                <post-accorddion heading-level="3" multiple>
                  <post-accordion-item collapsed>
                    <span slot="header">
                      <slot name="cell-1-title"></slot>
                    </span>
                    <slot name="cell-1"></slot>
                  </post-accordion-item>
                  <post-accordion-item collapsed>
                    <span slot="header">
                      <slot name="cell-2-title"></slot>
                    </span>
                    <slot name="cell-2"></slot>
                  </post-accordion-item>
                  <post-accordion-item collapsed>
                    <span slot="header">
                      <slot name="cell-3-title"></slot>
                    </span>
                    <slot name="cell-3"></slot>
                  </post-accordion-item>
                  <post-accordion-item collapsed>
                    <span slot="header">
                      <slot name="cell-4-title"></slot>
                    </span>
                    <slot name="cell-4"></slot>
                  </post-accordion-item>
                </post-accorddion>
              </div>
            ) : (
              <div class="footer-grid">
                <div>
                  <slot name="cell-1"></slot>
                </div>
                <div>
                  <slot name="cell-2"></slot>
                </div>
                <div>
                  <slot name="cell-3"></slot>
                </div>
                <div>
                  <slot name="cell-4"></slot>
                </div>
              </div>
            )}

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
    removeNameListener(this.updateBreakpoint.bind(this));
  }
}
