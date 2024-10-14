import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta, { BorderSnapshot as Bs, RoundedSnapshot as Rb } from './borders.stories';
import './borders.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Borders: Story = {
  render: (_args: Args, context: StoryContext) => {
    const snapshotArgs = {
      borderSides: 'border',
      borderWidth: '10',
      borderColor: 'primary',
      borderOpacity: '25',
    };

    return html`
      <div class="borders-example">${Bs.render?.({ ...Bs.args, ...snapshotArgs }, context)}</div>
    `;
  },
};

export const Rounded: Story = {
  render: (_args: Args, context: StoryContext) => {
    const snapshotArgs = {
      borderSides: 'border',
      borderWidth: '10',
      borderColor: 'primary',
      borderOpacity: '25',
    };

    return html`
      <div class="borders-example">${Rb.render?.({ ...Rb.args, ...snapshotArgs }, context)}</div>
    `;
  },
};
