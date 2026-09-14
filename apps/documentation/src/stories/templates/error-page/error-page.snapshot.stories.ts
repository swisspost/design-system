import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './error-page.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const ErrorPage: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        ${['400', '401', '403', '404', '451', '500', '503', '504'].map(
          type =>
            html`<div class="mb-16">${meta.render?.({ ...context.args, type }, context)}</div>`,
        )}
      `,
    );
  },
};
