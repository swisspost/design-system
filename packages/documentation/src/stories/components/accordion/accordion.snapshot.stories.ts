import type { StoryContext, StoryObj } from '@storybook/web-components';
import meta from './accordion.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj<HTMLPostAccordionElement & HTMLPostCollapsibleElementEventMap>;

export const Accordion: Story = {
  render: (
    _args: HTMLPostAccordionElement,
    context: StoryContext<HTMLPostAccordionElement & HTMLPostCollapsibleElementEventMap>,
  ) => {
    return html`
      <div>
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div
              class="${bg} d-flex flex-column gap-16 p-16 mt-16"
              data-color-scheme=${bg === 'bg-white' ? 'light' : 'dark'}
            >
              ${meta.render?.({ ...context.args }, context)}
            </div>
          `,
        )}
      </div>
    `;
  },
};
