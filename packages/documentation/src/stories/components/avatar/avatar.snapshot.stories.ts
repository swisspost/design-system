import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './avatar.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostAvatarPictureElement>;

export const Avatar: Story = {
  render: (_args: Partial<HTMLPostAvatarElement>, context: StoryContext<HTMLPostAvatarElement>) => {
    return html`
      <div class="row">
        ${['white', 'dark'].map(
          bg => html`
            <div class="col-md-6 bg-${bg}">
              ${bombArgs({
                email: ['oss@post.ch', ''],
                firstname: ['John', ''],
                lastname: ['Doe', ''],
                company: ['Muster AG', ''],
                size: [undefined, 'small'],
              })
                .filter(args => (args.company && args.firstname && args.lastname) || !args.email)
                .filter(args => (args.firstname && args.lastname) || args.company)
                .map(args => meta.render({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
