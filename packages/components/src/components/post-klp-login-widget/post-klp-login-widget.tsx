import { version } from '@root/package.json';
import { Build, Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import type { KlpSessionData } from './lib/klp-session.model';
import { klpBaseUrl } from './lib/klp-urls';
import type { KlpEnvironment, KlpLoginWidgetConfig } from './lib/klp-widget.model';
import { createSessionController } from './lib/session-controller';

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

  /** Stays null on the server: the session is only ever known to the client. */
  @State() private session: KlpSessionData | null = null;

  private controller?: ReturnType<typeof createSessionController>;

  componentWillLoad() {
    this.parseConfig();
  }

  componentDidLoad() {
    if (!Build.isBrowser) return;

    this.connect();
  }

  disconnectedCallback() {
    this.controller?.stop();
  }

  private connect() {
    if (!this.parsedConfig) return;

    const endPoint = klpBaseUrl(this.environment);
    if (endPoint === null) {
      console.error(
        `post-klp-login-widget: "${this.environment}" is not a known environment, the widget stays anonymous.`,
      );
      return;
    }

    this.controller = createSessionController({
      endPoint,
      keepAliveUrl: this.parsedConfig.keepAliveUrl,
      conf: this.parsedConfig.options,
      onSessionChange: session => {
        this.session = session;
      },
    });

    void this.controller.start();
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
    // produce the anonymous shell. The authenticated chrome is composed in a later step.
    return (
      <Host data-version={version}>
        {this.session ? (
          <span class="user-name">
            {this.session.name} {this.session.surname}
          </span>
        ) : (
          this.parsedConfig && (
            <a class="login-link" href={this.parsedConfig.appLoginUrl}>
              <slot name="login-label">Login</slot>
            </a>
          )
        )}
      </Host>
    );
  }
}
