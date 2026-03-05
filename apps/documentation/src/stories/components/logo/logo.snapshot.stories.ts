import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './logo.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostLogoElement>;

export const PostLogo: Story = {
  render: (_args: Partial<HTMLPostLogoElement>, context: StoryContext<HTMLPostLogoElement>) => {
    return html`
      <div class="row gx-5">
        ${['', 'https://www.post.ch'].map(
          url => html`
            <div class="col">
              <p>${url ? 'Links' : 'Images'}</p>
              <div class="row">
                ${['white', 'dark'].map(
                  color => html`
                    <div class="col bg-${color}">
                      ${['big', 'huge', 'giant'].map(
                        (height, i) => html`
                          <div class="h-${height} ${i === 0 ? 'my' : 'mb'}-mini">
                            ${meta.render?.({ ...context.args, url }, context)}
                          </div>
                        `,
                      )}
                    </div>
                  `,
                )}
              </div>
            </div>
          `,
        )}
      </div>
    `;
  },
};
