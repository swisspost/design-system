import type { StoryObj } from '@storybook/web-components';
import { schemes } from '@/shared/snapshots/schemes';
import meta from './list.stories';
import { html, TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Lists: Story = {
  render: () => {
    return schemes(
      () => html`
        <h1>Lists</h1>

        <h2>Bullet</h2>

        <code class="mt-48">&lt;ul&gt;</code>
        ${renderList({ el: 'ul' })} ${renderList({ el: 'ul', classList: 'list-revert' })}
        ${renderList({ el: 'ul', classList: 'list-unstyled' })}

        <code class="mt-48">&lt;ul class="list-inline"&gt;</code>
        ${renderList({
          el: 'ul',
          classList: 'list-inline',
        })}
        ${renderList({
          el: 'ul',
          classList: 'list-inline list-revert',
        })}
        ${renderList({
          el: 'ul',
          classList: 'list-inline list-unstyled',
        })}

        <code class="mt-48">&lt;ul class="list-bullet"&gt;</code>
        ${renderList({ el: 'ul', classList: 'list-bullet' })}
        ${renderList({ el: 'ul', classList: 'list-bullet list-revert' })}
        ${renderList({ el: 'ul', classList: 'list-bullet list-unstyled' })}

        <code class="mt-48">&lt;ul class="list-bullet list-inline"&gt;</code>
        ${renderList({
          el: 'ul',
          classList: 'list-bullet list-inline',
        })}
        ${renderList({
          el: 'ul',
          classList: 'list-bullet list-inline list-revert',
        })}
        ${renderList({
          el: 'ul',
          classList: 'list-bullet list-inline list-unstyled',
        })}

        <h2>Number</h2>

        <code class="mt-48">&lt;ol&gt;</code>
        ${renderList({ el: 'ol' })} ${renderList({ el: 'ol', classList: 'list-revert' })}
        ${renderList({ el: 'ol', classList: 'list-unstyled' })}

        <code class="mt-48">&lt;ol class="list-inline"&gt;</code>
        ${renderList({
          el: 'ol',
          classList: 'list-inline',
        })}
        ${renderList({
          el: 'ol',
          classList: 'list-inline list-revert',
        })}
        ${renderList({
          el: 'ol',
          classList: 'list-inline list-unstyled',
        })}

        <code class="mt-48">&lt;ol class="list-number"&gt;</code>
        ${renderList({ el: 'ol', classList: 'list-number' })}
        ${renderList({ el: 'ol', classList: 'list-number list-revert' })}
        ${renderList({ el: 'ol', classList: 'list-number list-unstyled' })}

        <code class="mt-48">&lt;ol class="list-number list-inline"&gt;</code>
        ${renderList({
          el: 'ol',
          classList: 'list-number list-inline',
        })}
        ${renderList({
          el: 'ol',
          classList: 'list-number list-inline list-revert',
        })}
        ${renderList({
          el: 'ol',
          classList: 'list-number list-inline list-unstyled',
        })}
      `,
    );

    function renderList({
      el,
      classList = '',
    }: {
      el: string;
      classList?: string;
    }): TemplateResult {
      const classAttr = classList ? ` class="${classList}"` : '';
      const modifiers = classList?.split(' ').map(c => c.replace(/^list-/, ''));
      const modifierStr = modifiers ? modifiers.join(' ') : '';

      const modifierBlock = modifierStr ? `<strong>${modifierStr}</strong> ` : '';
      const subListBlock = !modifiers?.some(n => n === 'inline')
        ? `<${el}${classAttr}>
          <li>${modifierBlock} sub-list-item 1</li>
          <li>${modifierBlock} sub-list-item 2</li>
        </${el}>`
        : '';
      const listBlock = `<${el}${classAttr}>
        <li>${modifierBlock} list-item 1</li>
        <li>${modifierBlock} list-item 2 with more text to show how list-inline items wrap to a new line if necessary</li>
        <li>${modifierBlock} list-item 3</li>
        <li>
          ${modifierBlock} list-item 4${subListBlock && ' - text before nested'}
          ${subListBlock}
          ${subListBlock && modifierBlock + ' list item 4 - text after nested'}
        </li>
        <li>${modifierBlock} list-item 5</li>
        <li>${modifierBlock} list-item 6</li>
        <li>${modifierBlock} list-item 7</li>`;

      return html`<hr />
        ${unsafeHTML(listBlock)}`;
    }
  },
};
