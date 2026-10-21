import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface KlpLoginWidgetRenderOptions {
  environment?: string;
  textCurrentUser?: string;
  textUserLinks?: string;
  textAccessUserLinks?: string;
  initialState?: 'anonymous' | 'authenticated';
}

export const KLP_LOGIN_WIDGET_TEXTS = {
  textCurrentUser: 'Current user is {user}.',
  textUserLinks: 'User links',
  textAccessUserLinks: 'Access user links',
};

export function renderKlpLoginWidget(options: KlpLoginWidgetRenderOptions = {}) {
  const texts = { ...KLP_LOGIN_WIDGET_TEXTS, ...options };

  return html`
    <!-- Global header login widget -->
    <post-klp-login-widget
      slot="post-login"
      environment=${ifDefined(options.environment)}
      text-current-user=${texts.textCurrentUser}
      text-user-links=${texts.textUserLinks}
      text-access-user-links=${texts.textAccessUserLinks}
      initial-state=${options.initialState ?? nothing}
    >
      <a slot="login-link" href="#login">
        <span>Login</span>
        <post-icon name="login" aria-hidden="true"></post-icon>
      </a>
      <post-menu-item slot="account-switch">
        <a href="#switch-account">
          <post-icon name="userswitch" aria-hidden="true"></post-icon>
          Switch account
        </a>
      </post-menu-item>
      <post-menu-item slot="company-switch">
        <a href="#switch-company">
          <post-icon name="company" aria-hidden="true"></post-icon>
          Switch company
        </a>
      </post-menu-item>
      <post-menu-item slot="menu-links">
        <a href="#profile">
          <post-icon name="profile" aria-hidden="true"></post-icon>
          My profile
        </a>
      </post-menu-item>
      <post-klp-login-widget-messages
        slot="menu-links"
        url="#messages"
        text="Messages"
        text-unread="{count} unread messages"
      ></post-klp-login-widget-messages>
      <post-menu-item slot="menu-links">
        <a href="#settings">
          <post-icon name="gear" aria-hidden="true"></post-icon>
          Settings
        </a>
      </post-menu-item>
      <post-menu-item slot="logout-link">
        <a href="#logout">
          <post-icon name="logout" aria-hidden="true"></post-icon>
          Logout
        </a>
      </post-menu-item>
    </post-klp-login-widget>
  `;
}
