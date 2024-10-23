import type { StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import meta, { alignOptions } from './vertical-align.stories';
import './vertical-align.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const VerticalAlign: Story = {
  render: () => {
    return html`
      ${alignOptions.map(
        align =>
          html`<div>
            <span class="align-${align}">${align ? 'align-' + align : 'text'}</span>
            <span>unset</span>
            <div class="box"></div>
          </div>`,
      )}
    `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`<div class="snapshot">${story(context.args, context)}</div>`;
      return storyTemplate;
    },
  ],
};
