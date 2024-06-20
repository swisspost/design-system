import { html, LitElement } from 'lit';
import { Task } from '@lit/task';
import { customElement, property } from 'lit/decorators.js';
import { PackageType } from '@root/types';
import { getDocsPath, getTitleFromPath } from '@/utils';

const INDEX_PATH = '/index.json';
const TAG_REDIRECT_PREFIX = 'redirect:';
const TAG_PACKAGE_PREFIX = 'package:';

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

@customElement('list-component')
export class ListComponent extends LitElement {
  @property({ type: String }) packageType: PackageType | null = null;

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  private _indexTask = new Task(this, {
    task: async ([packageType]) => {
      const response = await fetch(INDEX_PATH);
      const rawData: IndexInput = await response.json();
      return (
        Object.values(rawData.entries)
          .filter(
            entry =>
              entry.id.endsWith('--default') &&
              entry.tags.includes(`${TAG_PACKAGE_PREFIX}${packageType}`),
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
    args: () => [this.packageType],
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
