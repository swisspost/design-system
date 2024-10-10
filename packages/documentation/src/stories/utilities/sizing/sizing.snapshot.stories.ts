import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './sizing.styles.scss';
import meta, { Sizing as S, SizingVp as V, SizingAuto as A } from './sizing.stories';


const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Sizing: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="sizing-example snapshot">
        ${S.render?.({ ...S.args }, context)}
    </div>
    `;
  },
};

export const SizingVp: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="sizing-vp-example snapshot">
        ${V.render?.({ ...V.args }, context)}
    </div>
    `;
  },
};

export const SizingAuto: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="sizing-auto-example snapshot">
        ${A.render?.({ ...A.args }, context)}
    </div>
    `;
  },
};




