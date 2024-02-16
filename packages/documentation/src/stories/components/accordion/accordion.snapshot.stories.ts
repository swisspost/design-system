import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta, { Default } from './accordion.stories';
import { html } from 'lit';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostAccordionElement>;

export const Accordion: Story = {
  render: (_args: HTMLPostAccordionElement, context: StoryContext<HTMLPostAccordionElement>) => {
    return html`
      <div>
        ${['bg-white', 'bg-light', 'bg-dark'].map(
          bg => html`
            <div class="${bg} d-flex flex-column gap-regular p-regular mt-regular">
              ${Default.render?.({ ...context.args }, context)}
            </div>
          `,
        )}
      </div>
    `;
  },
};
