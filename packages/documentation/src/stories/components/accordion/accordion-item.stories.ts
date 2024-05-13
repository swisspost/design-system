import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  id: '3b86bc9b-3dcd-4788-a436-88fd18a6312d',
  title: 'Components/Accordion Item',
  component: 'post-accordion-item',
  parameters: {
    controls: {
      exclude: [
        'accordion-item', // this CSS part is for internal use only
      ],
    },
  },
  argTypes: {
    collapsed: {
      control: false, // disable the control since it is not usable on the story
    },
    headingLevel: {
      name: 'heading-level',
      description:
        'Defines the hierarchical level of the accordion item header within the headings structure.' +
        '<span className="mb-mini alert alert-warning alert-sm">' +
        '<code>heading-level</code> on <code>post-accordion-item</code> is deprecated. ' +
        'Set it directly on the parent <code>post-accordion</code>.' +
        '</span>',
      control: false, // disable the control since it is not usable on the story
    },
  },
};

export default meta;

// STORIES
type Story = StoryObj;

export const Default: Story = {};
