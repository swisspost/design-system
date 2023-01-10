import { Component, Host, h, Method, Element } from '@stencil/core';
import { state } from '../../data/store';
import { IsFocusable } from '../../models/header.model';
import { SvgSprite } from '../../utils/svg-sprite.component';

@Component({
  tag: 'post-klp-login-widget',
  styleUrl: 'post-klp-login-widget.scss',
  scoped: false,
  shadow: true,
})
export class PostKlpLoginWidget implements IsFocusable {
  @Element() host: HTMLElement;

  async componentDidLoad() {
    const { initializeKLPLoginWidget } = await import('./klp-widget.controller');
    initializeKLPLoginWidget('post-klp-login-widget', {
      ...state.localizedConfig.header.loginWidgetOptions,
      environment: state.environment,
    });
  }

  @Method()
  async setFocus() {
    const loginButton = this.host.shadowRoot.querySelectorAll<HTMLElement>(
      '.klp-widget-anonymous__wrapper a, .klp-widget-authenticated-session a',
    );
    if (loginButton.length) {
      loginButton[0].focus();
    }
  }

  render() {
    if (!state?.localizedConfig?.header?.loginWidgetOptions) {
      console.warn(
        `Internet Header: the login widget is not configured in your portal config. Use <swisspost-internet-header project="${state.projectId}" login="false"></swisspost-internet-header> to turn off the login widget or configure it via the portal config.`,
      );
      return null;
    }
    return (
      <Host>
        <SvgSprite />
        <div class="widget-wrapper" data-hj-suppress>
          <div id="post-klp-login-widget"></div>
        </div>
      </Host>
    );
  }
}
