import { Args } from '@storybook/web-components-vite';
import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import { renderKlpLoginWidget } from '../../sub-components/klp-login-widget/klp-login-widget.renderer';

// Keyed on `isLoggedIn`, so toggling it mounts a new widget, which asks for the session again.
export function renderLoginWidget(args: Args) {
  return html`${keyed(Boolean(args.isLoggedIn), renderKlpLoginWidget())}`;
}
