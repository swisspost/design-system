import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './avatar-picture.stories';
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
            <div class="${bg}">
              ${context.argTypes.size.options.map(
                (size: string) => html`
                  <div class="d-flex flex-column gap-regular p-regular mt-regular">
                    <h2 class="h5">size: ${size}</h2>
                    <div class="row">
                      ${bombArgs({
                        size: [size],
                        lastname: [null, 'S'],
                        firstname: [null, 'O'],
                      }).map(
                        (bombArgs: Args) => html`<div class="col">
                          ${Default.render?.({ ...context.args, ...bombArgs }, context)}
                        </div>`,
                      )}
                      <div class="col">
                        ${Default.render?.({ ...args, size, email: 'oss@post.ch' }, context)}
                      </div>
                    </div>
                  </div>
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
