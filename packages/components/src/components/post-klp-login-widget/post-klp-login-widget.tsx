import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import type { KlpEnvironment, KlpLoginWidgetConfig } from './lib/klp-widget.model';

@Component({
  tag: 'post-klp-login-widget',
  styleUrl: 'post-klp-login-widget.scss',
  shadow: true,
})
export class PostKlpLoginWidget {
  @Element() host: HTMLPostKlpLoginWidgetElement;

  /**
   * The KLP platform instance to talk to. Determines every backend URL the widget uses.
   */
  @Prop() environment: KlpEnvironment = 'prod';

  /**
   * The portal login widget configuration. Accepts an object or, so the widget can be driven from
   * plain HTML, a JSON string.
   */
  @Prop() config?: KlpLoginWidgetConfig | string;

  @State() private parsedConfig: KlpLoginWidgetConfig | null = null;

  componentWillLoad() {
    this.parseConfig();
  }

  @Watch('config')
  parseConfig() {
    this.parsedConfig = this.readConfig();
  }

  private readConfig(): KlpLoginWidgetConfig | null {
    if (!this.config) return null;
    if (typeof this.config !== 'string') return this.config;

    try {
      return JSON.parse(this.config) as KlpLoginWidgetConfig;
    } catch (error) {
      console.error('post-klp-login-widget: the `config` property is not valid JSON.', error);
      return null;
    }
  }

  render() {
    // The session is unknown until the client connects, so both server and first client render
    // produce this anonymous shell. Authenticated markup arrives in a later step.
    return (
      <Host data-version={version}>
        {this.parsedConfig && (
          <a class="login-link" href={this.parsedConfig.appLoginUrl}>
            <slot name="login-label">Login</slot>
          </a>
        )}
      </Host>
    );
  }
}
