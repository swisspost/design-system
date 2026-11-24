import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface KlpLoginWidgetRenderOptions {
  environment?: string;
  service?: string;
  language?: string;
  textCurrentUser?: string;
  textUserLinks?: string;
  initialState?: 'anonymous' | 'authenticated';
  app?: string;
  inIframe?: boolean;
  keepAliveDisabled?: boolean;
  keepAliveUrl?: string;
  keepAliveInterval?: number;
  keepAliveEvents?: string;
  urlLogin?: string;
  urlAccountSwitch?: string;
  urlCompanySwitch?: string;
  urlMyProfile?: string;
  urlMessages?: string;
  urlSettings?: string;
  urlLogout?: string;
  /** Text overrides, keyed by slot name. */
  texts?: Record<string, string>;
  customItems?: { href: string; icon: string; text: string }[];
}

export const KLP_LOGIN_WIDGET_TEXTS = {
  textCurrentUser: 'Current user is {user}.',
  textUserLinks: 'User links',
};

export function renderKlpLoginWidget(options: KlpLoginWidgetRenderOptions = {}) {
  const texts = { ...KLP_LOGIN_WIDGET_TEXTS, ...options };
  const overrides = Object.entries(options.texts ?? {});

  return html`
    <!-- Global header login widget -->
    <post-klp-login-widget
      slot="post-login"
      environment=${ifDefined(options.environment)}
      service=${options.service ?? 'design-system'}
      app=${ifDefined(options.app)}
      language=${ifDefined(options.language)}
      initial-state=${options.initialState ?? nothing}
      ?in-iframe=${options.inIframe}
      text-current-user=${texts.textCurrentUser}
      text-user-links=${texts.textUserLinks}
      ?keep-alive-disabled=${options.keepAliveDisabled}
      keep-alive-url=${ifDefined(options.keepAliveUrl)}
      keep-alive-interval=${ifDefined(options.keepAliveInterval)}
      keep-alive-events=${ifDefined(options.keepAliveEvents)}
      url-login=${ifDefined(options.urlLogin)}
      url-account-switch=${ifDefined(options.urlAccountSwitch)}
      url-company-switch=${ifDefined(options.urlCompanySwitch)}
      url-my-profile=${ifDefined(options.urlMyProfile)}
      url-messages=${ifDefined(options.urlMessages)}
      url-settings=${ifDefined(options.urlSettings)}
      url-logout=${ifDefined(options.urlLogout)}
    >
      ${overrides.map(
        ([slot, text]) => html`
          <!-- Replaces the default text of the entry with the matching slot name -->
          <span slot=${slot}>${text}</span>
        `,
      )}
      ${(options.customItems ?? []).map(
        item => html`
          <!-- Custom entry, listed between settings and logout -->
          <post-menu-item>
            <a href=${item.href}>
              <post-icon name=${item.icon} aria-hidden="true"></post-icon>
              <span>${item.text}</span>
            </a>
          </post-menu-item>
        `,
      )}
    </post-klp-login-widget>
  `;
}
