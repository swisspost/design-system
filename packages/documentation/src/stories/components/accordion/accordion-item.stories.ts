import type { Meta, StoryObj } from '@storybook/web-components-vite';

const meta: Meta = {
  id: '3b86bc9b-3dcd-4788-a436-88fd18a6312d',
  title: 'Components/Accordion Item',
  component: 'post-accordion-item',
  parameters: {
    controls: {
      exclude: [
        'accordion-item', // this CSS part is for internal use only
        'post-accordion-button',
        'post-accordion-body',
      ],
    },
  },
  argTypes: {
    'collapsed': {
      control: false, // disable the control since it is not usable on the story
    },
    'headingLevel': {
      name: 'heading-level',
      control: false, // disable the control since it is not usable on the story
      table: {
        disable: true,
      },
    },
    'post-accordion-button': {
      name: 'post-accordion-button ', // trailing space is intentional to avoid conflict with auto-generated part
      description: 'The element that toggles the accordion item (header button).',
      control: false,
      table: {
        category: 'CSS Shadow Parts',
        type: {
          summary: 'CSS Selector',
        },
      },
    },
    'post-accordion-body': {
      name: 'post-accordion-body ', // trailing space is intentional to avoid conflict with auto-generated part
      description: "The element that holds the accordion item's content.",
      control: false,
      table: {
        category: 'CSS Shadow Parts',
        type: {
          summary: 'CSS Selector',
        },
      },
    },
  },
};

export default meta;

// STORIES
type Story = StoryObj;

export const Default: Story = {};
