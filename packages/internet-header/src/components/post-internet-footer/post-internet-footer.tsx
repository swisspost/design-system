import { Component, h, Host, Prop, State } from '@stencil/core';
import { version } from '@root/package.json';
import { state } from '@/data/store';
import { LinkList } from '@/components/shared';

@Component({
  tag: 'swisspost-internet-footer',
  styleUrl: 'post-internet-footer.scss',
})
export class PostInternetFooter {
  /**
   * Visually hidden label for the footer.
   */
  @Prop({ reflect: true }) readonly textFooter!: string;

  /**
   * Label for the "Cookie Settings" button.
   */
  @Prop({ reflect: true }) readonly textCookieSettings!: string;

  @State() liveSupportEnabled = false;
  @State() cookieSettingsEnabled = false;

  constructor() {
    this.liveSupportEnabled = this.unbluEnabled();
    this.cookieSettingsEnabled = this.ucUIEnabled();

    /**
     * If the unblu script is not available, wait 5 seconds for it to load.
     * If it's still not there after 5 seconds, abandon efforts and don't
     * show the live support button.
     */
    if (!this.liveSupportEnabled) {
      let intervalId: number | undefined = undefined;
      let runs = 0;

      const checker = () => {
        const unbluEnabled = this.unbluEnabled();
        const ucUIEnabled = this.ucUIEnabled();
        const isEnabled = unbluEnabled && ucUIEnabled;
        if (unbluEnabled) {
          this.liveSupportEnabled = true;
        }
        if (ucUIEnabled) {
          this.cookieSettingsEnabled = true;
        }
        if (isEnabled || runs >= 5) {
          window.clearInterval(intervalId);
        }
        runs++;
      };

      intervalId = window.setInterval(checker, 1000);
    }
  }

  /**
   * Check if the unblu live support script is loaded
   * @returns Boolean
   */
  private unbluEnabled(): boolean {
    return typeof window['unbluLSLoad'] === 'function';
  }

  private ucUIEnabled(): boolean {
    return (
      typeof window['UC_UI'] === 'object' &&
      typeof window['UC_UI']['showSecondLayer'] === 'function'
    );
  }

  private handleCookieSettingsClick() {
    window['UC_UI']['showSecondLayer']();
  }

  render() {
    // Config has not loaded yet
    if (!state.localizedConfig) {
      return null;
    }

    // There's no footer config
    if (!state.localizedConfig.footer) {
      console.warn(
        `Internet Footer: Current project "${state.projectId}" does not include a footer config. The footer will not be rendered. Remove `,
        document.querySelector('swisspost-internet-footer'),
        `from your markup or configure the footer in your portal config to stop seeing this warning.`,
      );
      return null;
    }

    const footerConfig = state.localizedConfig.footer;

    return (
      <Host data-version={version}>
        <post-footer textFooter={this.textFooter}>
          {footerConfig.sections &&
            footerConfig.sections.map((section, i) => (
              <LinkList
                config={section}
                titleTag="span"
                titleSlot={`grid-${i + 1}-title`}
                listSlot={`grid-${i + 1}`}
              />
            ))}

          {footerConfig.socialLinks && (
            <div slot="socialmedia">
              <LinkList
                config={footerConfig.socialLinks}
                titleTag="h3"
                linkProps={{ class: 'btn btn-primary btn-icon', hiddenText: true }}
              />
            </div>
          )}

          {footerConfig.appStoreLinks && (
            <div slot="app">
              <LinkList
                config={footerConfig.appStoreLinks}
                titleTag="h3"
                linkProps={{ class: 'app-store-badge', hiddenText: true }}
              />
            </div>
          )}

          {footerConfig.companyLinks && (
            <div slot="businesssectors">
              <LinkList config={footerConfig.companyLinks} titleTag="h3" />
            </div>
          )}

          {footerConfig.complianceLinks && (
            <div slot="meta">
              <LinkList config={footerConfig.complianceLinks} hiddenTitle={true}>
                {this.cookieSettingsEnabled && (
                  <li>
                    <button
                      class="btn btn-link cookie-settings"
                      onClick={this.handleCookieSettingsClick}
                    >
                      {this.textCookieSettings}
                    </button>
                  </li>
                )}
              </LinkList>
            </div>
          )}

          {footerConfig.copyright && <p slot="copyright">{footerConfig.copyright}</p>}
        </post-footer>
      </Host>
    );
  }
}
