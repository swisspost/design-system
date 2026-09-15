import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { Environment } from '../../models/general.model';
import { ILoginWidgetOptions } from '../../models/login-widget-options.model';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { SvgIcon } from '../../utils/svg-icon.component';

@Component({
  tag: 'post-klp-login-widget',
  styleUrl: 'post-klp-login-widget.scss',
  scoped: false,
  shadow: true,
})
export class PostKlpLoginWidget {
  @Element() host!: HTMLPostKlpLoginWidgetElement;

  /**
   * Replaces `state.localizedConfig.header.loginWidgetOptions` from internet-header v9.
   * Accepts a JSON string so the widget can be driven from plain HTML.
   */
  @Prop() config?: ILoginWidgetOptions | string;

  /**
   * Replaces `state.environment` from internet-header v9.
   */
  @Prop() environment?: Environment;

  /**
   * Replaces `state.localizedConfig.header.showJobsLoginWidget` from internet-header v9.
   */
  @Prop() showJobsLoginWidget = false;

  /**
   * Replaces `state.localizedConfig.header.translations.loginWidgetText` from internet-header v9.
   */
  @Prop() jobsLoginText = 'Login';

  /**
   * Overrides the logout-url provided by the portal config.
   */
  @Prop() logoutUrl?: string;

  /**
   * Overrides the self-admin origin for menu links.
   */
  @Prop() selfAdminOrigin?: string;

  private get options(): ILoginWidgetOptions | undefined {
    if (!this.config) return undefined;
    if (typeof this.config !== 'string') return this.config;

    try {
      return JSON.parse(this.config) as ILoginWidgetOptions;
    } catch (error) {
      console.error('KLP login widget: the config prop is not valid JSON', error);
      return undefined;
    }
  }

  async componentDidLoad() {
    const options = this.options;
    if (this.showJobsLoginWidget || !options) return;

    const { initializeKLPLoginWidget } = await import('./klp-widget.controller.js');
    let { platform, ...widgetOptions } = options;
    if (this.logoutUrl !== undefined) {
      platform = { ...platform, logoutURL: this.logoutUrl };
    }
    if (this.selfAdminOrigin !== undefined) {
      platform = { ...platform, selfAdminOrigin: this.selfAdminOrigin };
    }

    initializeKLPLoginWidget('post-klp-login-widget', {
      ...widgetOptions,
      environment: this.environment,
      ...{ platform },
    });

    this.setupTracking();
  }

  private setupTracking() {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];

    this.host.shadowRoot?.addEventListener('click', this.handleClick);
  }

  private handleClick(event: Event) {
    const settingsLink = event
      .composedPath()
      .find(
        el =>
          el instanceof HTMLAnchorElement && el.matches('#authenticated-menu a[href*="/settings"]'),
      ) as HTMLAnchorElement | undefined;

    if (!settingsLink) return;

    const linkText = settingsLink
      .querySelector('.klp-widget-notification-link-text')
      ?.textContent?.trim();

    window.dataLayer.push({
      event: 'select_menu',
      type: 'authenticated_menu',
      label: 'settings',
      text: linkText,
      link_url: settingsLink.href,
      additional_info: '',
    });
  }

  disconnectedCallback() {
    this.host.shadowRoot?.removeEventListener('click', this.handleClick);
  }

  /**
   * Sets the focus on the login button
   */
  @Method()
  async setFocus() {
    const loginButton = this.host.shadowRoot?.querySelectorAll<HTMLElement>(
      '.klp-widget-anonymous__wrapper a, .klp-widget-authenticated-session a',
    );
    if (loginButton && loginButton.length > 0) {
      loginButton[0].focus();
    }
  }

  render() {
    const options = this.options;

    if (!options && !this.showJobsLoginWidget) {
      console.warn(
        'KLP login widget: no config provided. Set the `config` prop to the portal `loginWidgetOptions` object.',
      );
      return null;
    }
    return (
      <Host>
        <SvgSprite />
        <div class="widget-wrapper" data-hj-suppress>
          {this.showJobsLoginWidget ? (
            <a id="post-klp-login-widget" class="login-button" href={options?.appLoginUrl}>
              <span class="visually-hidden">{this.jobsLoginText}</span>
              <SvgIcon name="pi-login" />
            </a>
          ) : (
            <div id="post-klp-login-widget"></div>
          )}
        </div>
      </Host>
    );
  }
}
