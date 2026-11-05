import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getVersion } from '../../../src/utils/version';
import {
  Version,
  getCurrentVersion,
  getVersions,
} from '../../../.storybook/helpers/get-versions-json';

const MENU_ID = 'topbar-menu-version';

/**
 * The version switcher: the major version of this documentation, and a menu with the documentation sites
 * of all versions (`/assets/versions.json`).
 */
@customElement('docs-version-menu')
export class DocsVersionMenu extends LitElement {
  @state() private versions: Version[] = [];
  @state() private current?: string;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }

  render() {
    if (!this.current) return nothing;

    return html`
      <post-menu-trigger for=${MENU_ID}>
        <button class="toolbar-trigger">
          <span class="toolbar-trigger-text"
            ><span class="visually-hidden">Version: </span>V.${this.current}</span
          >
          <post-icon name="chevrondown" aria-hidden="true"></post-icon>
        </button>
      </post-menu-trigger>
      <post-menu id=${MENU_ID} class="toolbar-menu" label="Version" placement="bottom-end">
        ${this.versions.map(version => this.renderItem(version))}
      </post-menu>
    `;
  }

  private renderItem(version: Version) {
    const major = getVersion(version.version, 'major');
    const isCurrent = major === this.current;
    const dependencies = Object.entries(version.dependencies ?? {}).filter(
      ([name]) => !name.startsWith('@swisspost/'),
    );

    return html`<post-menu-item>
      <a href=${version.url} aria-current=${isCurrent ? 'true' : nothing}>
        <span class="toolbar-menu-text">
          V.${major}
          ${dependencies.length
            ? html`<span class="toolbar-menu-detail">
                ${dependencies.map(([name, range]) => this.renderDependency(name, range))}
              </span>`
            : nothing}
        </span>
        ${isCurrent ? html`<post-icon name="checkmark" aria-hidden="true"></post-icon>` : nothing}
      </a>
    </post-menu-item>`;
  }

  /**
   * A technology the version supports, e.g. the Angular logo and `^18.0.0`.
   * The logos are the ones of the old version switcher, named after the package (`@angular/core` → `angular`).
   */
  private renderDependency(name: string, range: string) {
    const technology = /^@?([^/]+)/.exec(name)?.[1] ?? name;

    return html`<span class="toolbar-menu-dependency" title=${name}>
      <img src="/assets/images/technologies/logo-${technology}.svg" alt=${technology} />
      ${range}
    </span>`;
  }

  private async load() {
    const [versions, current] = await Promise.all([getVersions(), getCurrentVersion()]);
    this.versions = versions;
    this.current = current ? (getVersion(current.version, 'major') ?? undefined) : undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-version-menu': DocsVersionMenu;
  }
}
