import { Component, h, Host, Prop } from '@stencil/core';
import { Environment } from '../../models/general.model';
import { ILoginWidgetOptions } from '../../models/login-widget-options.model';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { SvgIcon } from '../../utils/svg-icon.component';

/**
 * Static reproduction of the v9 `post-internet-header` chrome (meta bar, logo, main navigation
 * and controls) so the legacy login widget sits where it did in production. Everything here is a
 * decoy except the `post-klp-login-widget`, which the legacy code still finds through
 * `selectFromShadowDom()`: swisspost-internet-header -> shadowRoot -> post-klp-login-widget.
 * Renaming the tag breaks the legacy code, so it is load-bearing.
 */
@Component({
  tag: 'swisspost-internet-header',
  styleUrl: 'swisspost-internet-header.scss',
  shadow: true,
})
export class SwisspostInternetHeader {
  @Prop() config?: ILoginWidgetOptions | string;
  @Prop() environment?: Environment;
  @Prop() showJobsLoginWidget = false;
  @Prop() jobsLoginText = 'Login';
  @Prop() logoutUrl?: string;
  @Prop() selfAdminOrigin?: string;

  private static readonly META_LINKS = ['Über uns', 'Jobs', 'Kontakt'];
  private static readonly MAIN_LINKS = ['Privatkunden', 'Geschäftskunden', 'Verkaufspunkte'];
  private static readonly LANGUAGES = ['de', 'fr', 'it', 'en'];

  render() {
    return (
      <Host>
        <header class="post-internet-header">
          <SvgSprite />

          <div class="meta-navigation">
            <ul class="meta-links">
              {SwisspostInternetHeader.META_LINKS.map(link => (
                <li>
                  <a href="about:blank">{link}</a>
                </li>
              ))}
            </ul>
            <ul class="language-switch">
              {SwisspostInternetHeader.LANGUAGES.map(lang => (
                <li>
                  <a
                    href="about:blank"
                    class={lang === 'de' ? 'active' : ''}
                    aria-current={lang === 'de' ? 'true' : undefined}
                  >
                    {lang.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div class="main-navigation-container">
            <a class="logo" href="about:blank">
              <span class="visually-hidden">Die Schweizerische Post</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" aria-hidden="true">
                <rect fill="#ffcc00" x="0" y="0" width="72" height="72" />
                <polygon
                  fill="#ff0000"
                  points="34,32.3 34,19 19.7,19 19.7,29.1 10,29.1 10,42.9 19.7,42.9 19.7,53 34,53 34,39.7 30.6,39.7 30.6,49.8 23.1,49.8 23.1,39.7 13.4,39.7 13.4,32.3 23.1,32.3 23.1,22.2 30.6,22.2 30.6,32.3"
                />
                <path d="M53.56234,31.10526c0,2.41272-1.99154,4.29475-4.51723,4.29475H45.2v-8.3h3.84511C51.66802,27.1,53.56234,28.78889,53.56234,31.10526z M50.69666,19H36v34h9.2V42.9h5.49666c6.7531,0,11.9971-5.15137,11.9971-11.8057C62.69376,24.39136,57.35099,19,50.69666,19z" />
              </svg>
            </a>

            <nav class="main-navigation" aria-label="Hauptnavigation">
              {SwisspostInternetHeader.MAIN_LINKS.map(link => (
                <a class="nav-link" href="about:blank">
                  {link}
                </a>
              ))}
            </nav>

            <div class="main-navigation-controls">
              <button class="control search-button" type="button">
                <SvgIcon name="pi-search" classNames="control-icon" />
                <span class="visually-hidden">Suche</span>
              </button>
              <post-klp-login-widget
                class="control"
                config={this.config}
                environment={this.environment}
                showJobsLoginWidget={this.showJobsLoginWidget}
                jobsLoginText={this.jobsLoginText}
                logoutUrl={this.logoutUrl}
                selfAdminOrigin={this.selfAdminOrigin}
              ></post-klp-login-widget>
            </div>
          </div>
        </header>
      </Host>
    );
  }
}
