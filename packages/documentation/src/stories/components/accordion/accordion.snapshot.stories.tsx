import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './accordion.stories';
import { html } from 'lit';

export default {
  ...meta,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostAccordionElement>;

export const Accordion: Story = {
  render: (_args: HTMLPostAccordionElement, context: StoryContext<HTMLPostAccordionElement>) => {
    return html`
      <div>
        ${['bg-white', 'bg-dark'].map(bg => html`
          <div
            class="${bg} d-flex flex-column gap-regular p-regular mt-regular"
          >
            ${meta.render?.(
              { ...context.args, closeOthers: true },
              context,
            )}
          </div>
        `)}
      </div>
    `;
  },
};
