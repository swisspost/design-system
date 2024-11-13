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
      control: false, // disable the control since it is not usable on the story
      table: {
        disable:true,
      }
    },
  },
};

export default meta;

// STORIES
type Story = StoryObj;

export const Default: Story = {};
