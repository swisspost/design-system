import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './language-option.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  decorators: [],
};

type Story = StoryObj<HTMLPostLanguageOptionElement>;

export const LanguageOption: Story = {
  render: (
    _args: HTMLPostLanguageOptionElement,
    context: StoryContext<HTMLPostLanguageOptionElement>,
  ) => {
    return schemes(() => html` ${meta.render?.({ ...context.args }, context)} `);
  },
};
