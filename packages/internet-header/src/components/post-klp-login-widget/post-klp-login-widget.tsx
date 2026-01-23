import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { state } from '../../data/store';
import { IsFocusable } from '../../models/header.model';
import { SvgSprite } from '../../utils/svg-sprite.component';
import { SvgIcon } from '../../utils/svg-icon.component';

@Component({
  tag: 'post-klp-login-widget',
  styleUrl: 'post-klp-login-widget.scss',
  scoped: false,
  shadow: true,
})
export class PostKlpLoginWidget implements IsFocusable {
  @Element() host: HTMLPostKlpLoginWidgetElement;

  /**
   * Overrides the logout-url provided by the portal config.
   */
  @Prop() logoutUrl?: string;

  /**
   * Overrides the self-admin origin for menu links.
   */
  @Prop() selfAdminOrigin?: string;

  async componentDidLoad() {
    if (
      state.localizedConfig?.header?.showJobsLoginWidget ||
      !state.localizedConfig?.header?.loginWidgetOptions
    )
      return;
    const { initializeKLPLoginWidget } = await import('./klp-widget.controller.js');
    let { platform, ...widgetOptions } = state.localizedConfig.header.loginWidgetOptions;
    if (this.logoutUrl !== undefined) {
      platform = { ...platform, logoutURL: this.logoutUrl };
    }
    if (this.selfAdminOrigin !== undefined) {
      platform = { ...platform, selfAdminOrigin: this.selfAdminOrigin };
    }

    initializeKLPLoginWidget('post-klp-login-widget', {
      ...widgetOptions,
      environment: state.environment,
      ...{ platform },
    });

    this.setupTracking();
  }

  private setupTracking() {
    if (typeof window === 'undefined') return;

    const root = this.host.shadowRoot;
    if (!root) return;

    root.addEventListener('click', event => {
      const target = event.target as HTMLElement;

      const settingsLink = target.closest<HTMLAnchorElement>(
        '#authenticated-menu a[href*="/settings"]',
      );

      if (!settingsLink) return;

      const linkText = settingsLink
        .querySelector('.klp-widget-notification-link-text')
        ?.textContent?.trim();

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'select_menu',
        type: 'authenticated_menu',
        label: 'settings',
        text: linkText,
        link_url: settingsLink.href,
        additional_info: '',
      });
    });
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
    if (
      !state?.localizedConfig?.header?.loginWidgetOptions &&
      !state?.localizedConfig?.header?.showJobsLoginWidget
    ) {
      console.warn(
        `Internet Header: the login widget is not configured in your portal config. Use <swisspost-internet-header project="${state.projectId}" login="false"></swisspost-internet-header> to turn off the login widget or configure it via the portal config.`,
      );
      return null;
    }
    return (
      <Host>
        <SvgSprite />
        <div class="widget-wrapper" data-hj-suppress>
          {state?.localizedConfig?.header?.showJobsLoginWidget ? (
            <a
              id="post-klp-login-widget"
              class="login-button"
              href={state.localizedConfig.header.loginWidgetOptions?.appLoginUrl}
            >
              <span class="visually-hidden">
                {state.localizedConfig.header.translations.loginWidgetText}
              </span>
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
