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
        <div class="row">
          <div class="col-6">
            <code>&lt;ul&gt;</code>
            ${renderList({ el: 'ul' })} ${renderList({ el: 'ul', classList: 'list-revert' })}
            ${renderList({ el: 'ul', classList: 'list-unstyled' })}
          </div>

          <div class="col-6">
            <code>&lt;ul class="list-inline"&gt;</code>
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
          </div>

          <div class="w-100 mt-32"></div>

          <div class="col-6">
            <code>&lt;ul class="list-bullet"&gt;</code>
            ${renderList({ el: 'ul', classList: 'list-bullet' })}
            ${renderList({ el: 'ul', classList: 'list-bullet list-revert' })}
            ${renderList({ el: 'ul', classList: 'list-bullet list-unstyled' })}
          </div>

          <div class="col-6">
            <code>&lt;ul class="list-bullet list-inline"&gt;</code>
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
          </div>
        </div>

        <h2>Number</h2>
        <div class="row">
          <div class="col-6">
            <code>&lt;ol&gt;</code>
            ${renderList({ el: 'ol' })} ${renderList({ el: 'ol', classList: 'list-revert' })}
            ${renderList({ el: 'ol', classList: 'list-unstyled' })}
          </div>

          <div class="col-6">
            <code>&lt;ul class="list-inline"&gt;</code>
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
          </div>
        </div>
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
          ${modifierBlock} list-item 4
          ${subListBlock}
        </li>
        <li>${modifierBlock} list-item 5</li>`;

      return html`<hr />
        ${unsafeHTML(listBlock)}`;
    }
  },
};
