import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './avatar.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const AvatarPicture: Story = {
  render: (args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="mt-16">
          <div class="d-flex flex-column gap-regular">
              ${bombArgs({
                lastname: [null, 'Source'],
                firstname: ['Open'],
              }).map(
                (bombArgs: Args) =>
                  html`<div class="py-8">
                    ${Default.render?.({ ...context.args, ...bombArgs }, context)}
                  </div>`,
              )}

              <div class="py-8">
                ${Default.render?.({ ...args, email: 'oss@post.ch' }, context)}
              </div>

              <div class="py-8">
                ${Default.render?.(
                  { ...args, imageSrc: '/assets/images/logo-swisspost.svg' },
                  context,
                )}
              </div>
            </div>
          </div>
        </div>
      `,
    );
  },
};
