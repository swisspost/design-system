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
      <div class="row">
        <div class="col">
          <p>Images</p>
        </div>
        <div class="col">
          <p>Links</p>
        </div>
      </div>

      ${['big', 'huge', 'giant'].map(
        height => html`
          <div class="row h-${height}">
            ${['', 'https://www.post.ch'].map(url =>
              ['white', 'dark'].map(
                bg => html`
                  <div class="col p-small-regular bg-${bg}">
                    ${meta.render?.({ ...context.args, url }, context)}
                  </div>
                `,
              ),
            )}
          </div>
        `,
      )}
    `;
  },
};
