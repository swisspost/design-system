import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta, { FloatSnapshot as F } from './float.stories';
import './float.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Float: Story = {
  render: (_args: Args, context: StoryContext) => {
    const snapshotArgs = {
      floatPosition: '',
      floatBreakPoint: '',
    };

    return html`
      <div class="float-example">${F.render?.({ ...F.args, ...snapshotArgs }, context)}</div>
    `;
  },
};
