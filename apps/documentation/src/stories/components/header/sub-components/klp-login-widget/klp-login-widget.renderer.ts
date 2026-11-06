import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface KlpLoginWidgetRenderOptions {
  environment?: string;
  service?: string;
  language?: string;
  textCurrentUser?: string;
  textUserLinks?: string;
  initialState?: 'anonymous' | 'authenticated';
  urlLogin?: string;
  urlMyProfile?: string;
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
      language=${ifDefined(options.language)}
      url-login=${ifDefined(options.urlLogin)}
      url-my-profile=${ifDefined(options.urlMyProfile)}
      text-current-user=${texts.textCurrentUser}
      text-user-links=${texts.textUserLinks}
      initial-state=${options.initialState ?? nothing}
    >
      ${overrides.map(([slot, text]) => html`<span slot=${slot}>${text}</span>`)}
      ${(options.customItems ?? []).map(
        item => html`
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
