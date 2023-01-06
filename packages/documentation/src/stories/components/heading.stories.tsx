import { Meta, Story } from '@storybook/react';

export default {
  title: 'Components/Heading',
  parameters: {
    controls: {
      exclude: ['Subtitle'],
    },
  },
  args: {
    text: 'Heading',
    subtext: 'Subheading',
    level: 1,
  },
  argTypes: {
    text: {
      name: 'Title',
      description: 'Defines the text within the Heading.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
    subtext: {
      name: 'Subtitle',
      description: 'Defines the text within the Subheading.',
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
      options: [1, 2, 3, 4, 5, 6],
      table: {
        category: 'General',
      },
    },
  },
} as Meta;

export const Default: Story = args => {
  const HeadingLevel = `h${args.level}` as keyof JSX.IntrinsicElements;
  return <HeadingLevel>{args.text}</HeadingLevel>;
};

export const Multiline: Story = args => {
  const HeadingLevel = `h${args.level}` as keyof JSX.IntrinsicElements;
  return (
    <HeadingLevel>
      <span>{args.text}</span>
      <br />
      <span className="light">{args.subtext}</span>
    </HeadingLevel>
  );
};
