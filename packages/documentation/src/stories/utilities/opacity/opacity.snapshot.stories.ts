import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta, { OpacitySnapshot as Op } from './opacity.stories';
import './opacity.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Opacity: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="margin-padding-example">${Op.render?.({ ...Op.args }, context)}</div>
    `;
  },
};
