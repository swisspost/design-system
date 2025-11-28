import type { Meta, StoryObj } from '@storybook/web-components-vite';

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
    'css-shadow-parts-accordion-button': {
      name: 'post-accordion-button',
      table: {
        type: {
          summary: 'css selector',
          detail: '::part(post-accordion-button) { ... }',
        },
      },
    },
    'css-shadow-parts-accordion-body': {
      name: 'post-accordion-body',
      table: {
        type: {
          summary: 'css selector',
          detail: '::part(post-accordion-body) { ... }',
        },
      },
    },
  },
};

export default meta;

// STORIES
type Story = StoryObj;

export const Default: Story = {};
