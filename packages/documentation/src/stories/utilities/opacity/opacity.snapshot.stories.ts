import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
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

    return schemes(
      () => html`
        ${opacityOptions.map(opacity => meta.render?.({ ...meta.args, opacity }, context))}
      `,
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};
