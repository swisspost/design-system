import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import meta from './opacity.stories';
import './opacity.styles.scss';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Opacity: Story = {
  render: (_args: Args, context: StoryContext) => {
    // Access opacity options from context
    const opacityOptions: string[] = context.argTypes.opacity.options as string[];
    return html`
      ${opacityOptions.map(opacity => meta.render?.({ ...meta.args, opacity }, context))}
    `;
  },
};
