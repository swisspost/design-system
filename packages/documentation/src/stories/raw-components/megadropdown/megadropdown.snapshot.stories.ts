import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './megadropdown.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  decorators: [],
};

type Story = StoryObj<HTMLPostMegadropdownElement>;

export const Megadropdown: Story = {
  render: (
    _args: HTMLPostMegadropdownElement,
    context: StoryContext<HTMLPostMegadropdownElement>,
  ) => {
    return schemes(() => html` ${meta.render?.({ ...context.args }, context)} `);
  },
};
