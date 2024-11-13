import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta, { MarginAndPadding as MandP, Gap as G } from './spacing.stories';
import './spacing.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const MarginAndPadding: Story = {
  render: (_args: Args, context: StoryContext) => {
    const snapshotArgs = {
      marginSize: '24',
      paddingSize: '16',
      breakpointClasses: 'm-md-48 p-md-32',
    };

    return html`
      <div class="margin-padding-example">
        ${MandP.render?.({ ...MandP.args, ...snapshotArgs }, context)}
      </div>
    `;
  },
};

export const Gap: Story = {
  render: (_args: Args, context: StoryContext) => {
    const snapshotArgs = {
      gapSize: '24',
      breakpointClass: 'gap-md-48',
    };

    return html`
      <div class="gap-example">${G.render?.({ ...G.args, ...snapshotArgs }, context)}</div>
    `;
  },
};
