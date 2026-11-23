import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { customElement, property } from 'lit/decorators.js';
import { PACKAGE_TAG_PREFIX } from '@shared/tags';
import { getDocsPath, getTitleFromPath } from '@preview/utils/storybook-indexer';

const INDEX_PATH = '/index.json';
const TAG_REDIRECT_PREFIX = 'redirect:';

interface Entry {
  id: string;
  name: string;
  title: string;
  href: string;
  tags: string[];
}

interface IndexInput {
  entries: {
    [key: string]: Entry;
  };
}

@customElement('developer-list-component')
export class DeveloperListComponent extends LitElement {
  @property({ type: String }) packageName: string | null = null;

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  private _indexTask = new Task(this, {
    task: async ([packageName]) => {
      const response = await fetch(INDEX_PATH);
      const rawData: IndexInput = await response.json();
      return (
        Object.values(rawData.entries)
          .filter(
            entry =>
              entry.id.endsWith('--default') &&
              packageName !== null &&
              entry.tags.includes(`${PACKAGE_TAG_PREFIX}${packageName}`),
          )
          .map(entry => {
            const redirectId = entry.tags
              .find(tag => tag.startsWith(TAG_REDIRECT_PREFIX))
              ?.replace(TAG_REDIRECT_PREFIX, '');

            return {
              ...entry,
              title: getTitleFromPath(entry.title),
              href: getDocsPath(redirectId ?? entry.id),
            } as Entry;
          })
          // Sort to re-order with stories inside folder
          .sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          })
      );
    },
    args: () => [this.packageName],
  });

  render() {
    return this._indexTask.render({
      pending: () => html`<p>Loading…</p>`,
      complete: entries => html`
        <ul>
          ${entries.map(
            entry => html`
              <li>
                <a href="${entry.href}">${entry.title}</a>
              </li>
            `,
          )}
        </ul>
      `,
      error: e => html`<p>Error: ${e}</p>`,
    });
  }
}
