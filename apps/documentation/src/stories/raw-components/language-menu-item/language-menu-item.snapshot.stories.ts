import type { StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './language-menu-item.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  decorators: [],
};

type Story = StoryObj<HTMLPostLanguageMenuItemElement>;

export const LanguageOption: Story = {
  render: (
    _args: HTMLPostLanguageMenuItemElement,
    context: StoryContext<HTMLPostLanguageMenuItemElement>,
  ) => {
    return schemes(() => html` ${meta.render?.({ ...context.args }, context)} `);
  },
};
