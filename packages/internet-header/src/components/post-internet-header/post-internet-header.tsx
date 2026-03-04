import { Component, Event, EventEmitter, h, Host, Listen, Prop, Watch } from '@stencil/core';
import { getLocalizedConfig, isValidProjectId } from '@/services/config.service';
import { version } from '@root/package.json';
import { Environment } from '@/models/general.model';
import { dispose, state } from '@/data/store';

@Component({
  tag: 'swisspost-internet-header',
  shadow: false,
})
export class PostInternetHeader {
  /**
   * Your project id, previously passed as query string parameter serviceId.
   */
  @Prop() project: string;

  /**
   * Initial language to be used. Overrides automatic language detection.
   */
  @Prop() language?: 'de' | 'fr' | 'it' | 'en';

  /**
   * Target environment. Choose 'int01' for local testing.
   */
  @Prop() environment: Environment = 'prod';

  /**
   * Displays the header at full width for full-screen applications
   */
  @Prop() fullWidth?: boolean = false;

  /**
   * Fires when the header has been rendered to the page.
   */
  @Event() headerLoaded: EventEmitter<void>;

  constructor() {
    if (this.project === undefined || this.project === '' || !isValidProjectId(this.project)) {
      throw new Error(
        `Internet Header project key is "${this.project}". Please provide a valid project key.`,
      );
    }
  }

  disconnectedCallback() {
    // Reset the store to its original state
    dispose();
  }

  async componentWillLoad() {
    // Wait for the config to arrive, then render the header
    try {
      state.projectId = this.project;
      state.environment = this.environment.toLocaleLowerCase() as Environment;
      if (this.language !== undefined) state.currentLanguage = this.language;

      await this.setConfig();
    } catch (error) {
      console.error(error);
    }
  }

  componentDidLoad() {
    window.requestAnimationFrame(() => {
      this.headerLoaded.emit();
    });
  }

  @Watch('language')
  async handleLanguageChange(newValue: string) {
    state.currentLanguage = newValue;
    await this.setConfig();
  }

  @Listen('postChange')
  handleLanguageChangeEvent(event: CustomEvent<string>) {
    if (
      event.target instanceof HTMLElement &&
      event.target.localName === 'post-language-menu-item' &&
      event.detail !== this.language
    ) {
      void this.handleLanguageChange(event.detail);
    }
  }

  private async setConfig() {
    state.localizedConfig = await getLocalizedConfig({
      projectId: this.project,
      environment: this.environment,
      language: this.language,
    });
  }

  render() {
    if (!state.localizedConfig?.header) {
      console.error(new Error('Internet Header: Config cannot be loaded'));
      return;
    }

    const config = state.localizedConfig;
    console.info(config);

    return (
      <Host data-version={version}>
        <post-header text-menu="Menu">
          <post-logo slot="post-logo" url="/">
            Homepage
          </post-logo>

          <ul slot="audience">
            <li>
              <a href="#" aria-current="location">
                Private customers
              </a>
            </li>
            <li>
              <a href="#">Business customers</a>
            </li>
          </ul>

          <ul slot="global-nav-primary">
            <li>
              <a href="">
                <span>Search</span>
                <post-icon aria-hidden="true" name="search"></post-icon>
              </a>
            </li>
          </ul>

          <ul slot="global-nav-secondary">
            <li>
              <a href="">
                Jobs
                <post-icon name="jobs" aria-hidden="true"></post-icon>
              </a>
            </li>
            <li>
              <a href="">
                Create Account
                <post-icon name="adduser" aria-hidden="true"></post-icon>
              </a>
            </li>
          </ul>

          <post-language-menu
            text-change-language="Change the language"
            text-current-language="The currently selected language is #name."
            name="language-menu-example"
            slot="language-menu"
          >
            <post-language-menu-item code="de" name="German">
              de
            </post-language-menu-item>
            <post-language-menu-item code="fr" name="French">
              fr
            </post-language-menu-item>
            <post-language-menu-item code="it" name="Italian">
              it
            </post-language-menu-item>
            <post-language-menu-item active="true" code="en" name="English">
              en
            </post-language-menu-item>
          </post-language-menu>

          <a href="" slot="post-login">
            <span>Login</span>
            <post-icon name="login"></post-icon>
          </a>

          <post-mainnavigation slot="main-nav" text-main="Main">
            <ul>
              <li>
                <a href="/letters">Letters</a>
              </li>
              <li>
                <a href="/packages">Packages</a>
              </li>

              <li>
                <post-megadropdown-trigger htmlFor="letters">Letters</post-megadropdown-trigger>
                <post-megadropdown id="letters" text-close="Close" text-back="Back">
                  <a class="post-megadropdown-overview" href="/letters">
                    Overview Letters
                  </a>

                  <div class="row row-cols-1 row-cols-sm-2">
                    <div class="col">
                      <p class="post-megadropdown-list-title" id="send-letters">
                        Send letters
                      </p>
                      <ul class="post-megadropdown-list" aria-labelledby="send-letters">
                        <li>
                          <a href="/sch">Letters Switzerland</a>
                        </li>
                        <li>
                          <a href="/kl">Small items abroad</a>
                        </li>
                        <li>
                          <a href="">Goods abroad</a>
                        </li>
                        <li>
                          <a href="">Express and courier</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col">
                      <a
                        class="post-megadropdown-list-title"
                        id="step-by-step-letters"
                        href="/step-by-step"
                      >
                        Step by step
                      </a>
                      <ul class="post-megadropdown-list" aria-labelledby="step-by-step-letters">
                        <li>
                          <a href="/sch">Packages Switzerland</a>
                        </li>
                        <li>
                          <a href="/kl">Small items abroad</a>
                        </li>
                        <li>
                          <a href="">Goods abroad</a>
                        </li>
                        <li>
                          <a href="">Express and courier</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </post-megadropdown>
              </li>
              <li>
                <post-megadropdown-trigger htmlFor="packages">Packages</post-megadropdown-trigger>
                <post-megadropdown id="packages" text-close="Close" text-back="Back">
                  <a class="post-megadropdown-overview" href="/packages">
                    Overview Packages
                  </a>

                  <div class="row row-cols-1 row-cols-sm-2">
                    <div class="col">
                      <p class="post-megadropdown-list-title" id="send-packages">
                        Send packages
                      </p>
                      <ul class="post-megadropdown-list" aria-labelledby="send-packages">
                        <li>
                          <a href="/sch">Packages Switzerland</a>
                        </li>
                        <li>
                          <a href="/kl">Small items abroad</a>
                        </li>
                        <li>
                          <a href="">Goods abroad</a>
                        </li>
                        <li>
                          <a href="">Express and courier</a>
                        </li>
                      </ul>
                    </div>
                    <div class="col">
                      <a
                        class="post-megadropdown-list-title"
                        id="step-by-step-packages"
                        href="/step-by-step"
                      >
                        Step by step
                      </a>
                      <ul class="post-megadropdown-list" aria-labelledby="step-by-step-packages">
                        <li>
                          <a href="/sch">Packages Switzerland</a>
                        </li>
                        <li>
                          <a href="/kl">Small items abroad</a>
                        </li>
                        <li>
                          <a href="">Goods abroad</a>
                        </li>
                        <li>
                          <a href="">Express and courier</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </post-megadropdown>
              </li>
            </ul>
          </post-mainnavigation>
        </post-header>
      </Host>
    );
  }
}
