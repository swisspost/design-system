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
    return schemes(
      scheme => html`
        <div class="d-flex flex-column gap-16">${meta.render?.({ ...context.args }, context)}</div>
      `,
    );
  },
};
