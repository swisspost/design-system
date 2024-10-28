import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './avatar.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostAvatarPictureElement>;

export const AvatarPicture: Story = {
  render: (args: Args, context: StoryContext<HTMLPostAvatarPictureElement>) => {
    return html`
      <div id="Snapshots">
        <h1 class="h4">Avatar</h1>
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg} mt-16 p-16">
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
        )}
      </div>
    `;
  },
};
