import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './logo.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostLogoElement>;

export const PostLogo: Story = {
  render: (_args: Partial<HTMLPostLogoElement>, context: StoryContext<HTMLPostLogoElement>) => {
    return schemes(
      () => html`
        <div class="row gx-5">
          ${['', 'https://www.post.ch'].map(
            url => html`
              <div class="col">
                <p>${url ? 'Links' : 'Images'}</p>
                <div class="row">
                  <div class="col">
                    ${['big', 'huge', 'giant'].map(
                      (height, i) => html`
                        <div class="h-${height} ${i === 0 ? 'my' : 'mb'}-16">
                          ${meta.render?.({ ...context.args, url }, context)}
                        </div>
                      `,
                    )}
                  </div>
                </div>
              </div>
            `,
          )}
        </div>
      `,
    );
  },
};
