import { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

import meta, { renderTeaserCard, renderTeaserSectionHeader } from './teaser.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Teaser: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        <div class="d-flex flex-column gap-16">
          ${['sm', 'lg'].map((size: string) => {
            const args = {
              ...context.args,
              size,
            };
            return html`
              <div class="teaser-container container py-56 d-flex flex-column gap-32">
                ${renderTeaserSectionHeader(args.size)}
                <div class="row gy-16 gy-lg-24">
                  ${Array.from(
                    { length: 4 },
                    () => html` <div class="col-md-6 col-lg-3">${renderTeaserCard(args)}</div> `,
                  )}
                </div>
              </div>
              <div class="container py-56 d-flex flex-column gap-32"></div>
            `;
          })}
        </div>
      `,
    );
  },
};
