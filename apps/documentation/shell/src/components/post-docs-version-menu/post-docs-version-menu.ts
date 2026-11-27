import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { major } from 'semver';
import { getLatestRelease, getReleases, type Release } from '@shared/versions';
import './post-docs-version-menu.scss';

const MENU_ID = 'version-menu';

@customElement('post-docs-version-menu')
export class PostDocsVersionMenu extends LitElement {
  @state() private releases: Release[] = [];
  @state() private current: Release | null = null;

  protected override createRenderRoot() {
    return this;
  }

  public override connectedCallback() {
    super.connectedCallback();
    void this.load();
  }

  private async load() {
    const [releases, current] = await Promise.all([getReleases(), getLatestRelease()]);

    this.releases = releases;
    this.current = current;
  }

  private renderRelease(release: Release): TemplateResult {
    const isCurrent =
      this.current !== null && major(release.version) === major(this.current.version);
    const dependencies = getThirdPartyDependencies(release);

    return html`
      <post-menu-item>
        <a href=${release.url} aria-current=${isCurrent ? 'true' : nothing}>
          <span class="flex-fill text-start">
            V.${major(release.version)}
            ${dependencies.length > 0
              ? html`
                  <span class="d-flex flex-wrap row-gap-4 column-gap-12 fs-11">
                    ${dependencies.map(dependency => renderDependency(dependency))}
                  </span>
                `
              : nothing}
          </span>
          ${isCurrent ? html`<post-icon name="checkmark" aria-hidden="true"></post-icon>` : nothing}
        </a>
      </post-menu-item>
    `;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.current) return nothing;

    return html`
      <post-menu-trigger for=${MENU_ID}>
        <button class="d-flex align-items-center gap-8 m-0 p-0 border-0 fs-9 text-nowrap">
          <span>
            <span class="visually-hidden">Version: </span>V.${major(this.current.version)}
          </span>
          <post-icon
            class="flex-shrink-0 w-16 h-16"
            name="chevrondown"
            aria-hidden="true"
          ></post-icon>
        </button>
      </post-menu-trigger>
      <post-menu id=${MENU_ID} label="Version" placement="bottom-end">
        ${this.releases.map(release => this.renderRelease(release))}
      </post-menu>
    `;
  }
}

interface Dependency {
  name: string;
  range: string;
}

function getThirdPartyDependencies(release: Release): Dependency[] {
  const dependencies: Dependency[] = [];

  for (const [name, range] of Object.entries(release.dependencies)) {
    if (!name.startsWith('@swisspost/')) dependencies.push({ name, range });
  }

  return dependencies;
}

// the logos are named after the package scope or name: `@angular/core` → `logo-angular.svg`
function renderDependency(dependency: Dependency) {
  const technology = /^@?([^/]+)/.exec(dependency.name)?.[1] ?? dependency.name;

  return html`
    <span class="dependency d-flex align-items-center gap-2 text-nowrap" title=${dependency.name}>
      <img
        class="d-block"
        src="/assets/images/technologies/logo-${technology}.svg"
        alt=${technology}
      />
      ${dependency.range}
    </span>
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'post-docs-version-menu': PostDocsVersionMenu;
  }
}
