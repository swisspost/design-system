import { LitElement, nothing } from 'lit';
import { html } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';
import { Task } from '@lit/task';
import { getTitleFromPath } from '@/utils';

export interface DesignParameter {
  type: 'figma';
  url: string;
}

interface StoriesMeta {
  id?: string;
  title?: string;
  parameters?: { design?: DesignParameter };
}

interface StoriesModule {
  default?: StoriesMeta;
}

interface IndexEntry {
  id: string;
  title: string;
  name: string;
  type: 'story' | 'docs';
  importPath: string;
}

const INDEX_PATH = '/index.json';
const SNAPSHOTS_TITLE = 'Snapshots';

let indexEntries: Promise<IndexEntry[]> | undefined;

function getIndexEntries(): Promise<IndexEntry[]> {
  indexEntries ??= fetch(INDEX_PATH)
    .then(response => response.json())
    .then((index: { entries: Record<string, IndexEntry> }) => Object.values(index.entries));
  return indexEntries;
}

function getDirectory(path: string): string {
  return path.substring(0, path.lastIndexOf('/'));
}

let instanceCount = 0;

@customElement('story-links')
export class StoryLinksComponent extends LitElement {
  @property({ type: Object }) of: StoriesModule | string = {};

  private readonly snapshotsMenuId = `story-links-snapshots-${instanceCount++}`;

  // Snapshot stories live next to the stories they belong to, but their names don't follow a fixed pattern
  private readonly snapshotsTask = new Task(this, {
    task: async ([metaId, metaTitle]) => {
      if (!metaId && !metaTitle) return [];

      const entries = await getIndexEntries();
      const story = entries.find(
        entry =>
          entry.type === 'story' &&
          (metaId ? entry.id.startsWith(`${metaId}--`) : entry.title === metaTitle),
      );
      if (!story) return [];

      const directory = getDirectory(story.importPath);
      return entries.filter(
        entry =>
          entry.type === 'story' &&
          entry.title === SNAPSHOTS_TITLE &&
          getDirectory(entry.importPath) === directory,
      );
    },
    args: () => [this.meta?.id, this.meta?.title] as const,
  });

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  private get meta(): StoriesMeta | undefined {
    const of: StoriesModule = typeof this.of === 'string' ? JSON.parse(this.of) : this.of;
    return of?.default;
  }

  render() {
    const meta = this.meta;
    const designParameter = meta?.parameters?.design;
    const componentName = getTitleFromPath(meta?.title ?? '') ?? '';
    const snapshots = this.snapshotsTask.value ?? [];

    const figmaLink =
      designParameter?.type === 'figma' && designParameter?.url
        ? html`<a class="figma-link btn btn-primary" href="${designParameter.url}">
            <img
              src="/assets/images/technologies/logo-figma.svg"
              alt=""
              style="width: 0.8rem;height: 0.8rem;"
            />
            <span>
              Figma Design
              <span class="visually-hidden"> for ${componentName} component</span>
            </span>
          </a>`
        : nothing;

    const snapshotLinks = this.renderSnapshotLinks(snapshots, componentName);

    return figmaLink === nothing && snapshotLinks === nothing
      ? nothing
      : html`<div class="d-flex flex-wrap gap-8">${figmaLink}${snapshotLinks}</div>`;
  }

  private renderSnapshotLinks(snapshots: readonly IndexEntry[], componentName: string) {
    const getHref = (snapshot: IndexEntry) => `/iframe.html?id=${snapshot.id}&viewMode=story`;

    if (snapshots.length === 0) return nothing;

    // Show simple link if there is just one snapshot
    if (snapshots.length === 1) {
      return html`<a class="btn btn-secondary" href="${getHref(snapshots[0])}">
        Snapshot
        <span class="visually-hidden"> for ${componentName}</span>
      </a>`;
    }

    // Otherwise show a menu for all the snapshots
    return html`
      <post-menu-trigger for="${this.snapshotsMenuId}">
        <button class="btn btn-secondary" type="button">
          Snapshots
          <span class="visually-hidden"> for ${componentName}</span>
        </button>
      </post-menu-trigger>
      <post-menu id="${this.snapshotsMenuId}" label="${componentName} snapshots">
        ${snapshots.map(
          snapshot =>
            html`<post-menu-item
              ><a href="${getHref(snapshot)}">${snapshot.name}</a></post-menu-item
            >`,
        )}
      </post-menu>
    `;
  }
}
