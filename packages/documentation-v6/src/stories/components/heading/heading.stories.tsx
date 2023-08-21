import React from 'react';
import { Meta, Story, Args } from '@storybook/react';
import docsPage from './heading.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

export default {
  title: 'Components/Heading',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    title: 'Heading',
    level: 'h1',
    showSubtitle: false,
    subtitle: 'Subheading',
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'Defines the text within the Heading.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    level: {
      name: 'Heading Level',
      description: 'Defines the level of the Heading (e.g. `<h1>`, `<h2>`, ...).',
      control: {
        type: 'select',
      },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      table: {
        category: 'General',
      },
    },
    showSubtitle: {
      name: 'Show Subheading',
      description: 'When set to `true`, component renders a subheading.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    subtitle: {
      name: 'Subtitle',
      description: 'Defines the text within the Subheading.',
      if: {
        arg: 'showSubtitle',
      },
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
  },
} as Meta;

const Template = (args: Args) => {
  const content: JSX.Element[] | string = args.showSubtitle
    ? [
        <span key="heading">{args.title}</span>,
        <br key="heading-br" />,
        <span key="subheading" className="fw-light">
          {args.subtitle}
        </span>,
      ]
    : args.title;

  return <args.level>{content}</args.level>;
};

export const Default: Story = Template.bind({});
