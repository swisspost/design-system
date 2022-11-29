import { Meta, Story } from '@storybook/react';
import '@swisspost/design-system-styles/basics.scss';

export default {
  title: 'Components/Headings',
  args: {
    text: 'Heading',
    subtext: 'Subheading',
    level: 1
  },
  argTypes: {
    text: {
      control: { type: 'text' },
    },
    subtext: {
      control: { type: 'text' },
    },
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    }
  }
} as Meta;

export const Default: Story = (args) => {
  const HeadingLevel = `h${args.level}` as keyof JSX.IntrinsicElements;
  return <HeadingLevel>{args.text}</HeadingLevel>
}
Default.parameters = {
  controls: {
    exclude: ['multiline', 'subtext']
  }
}

export const Multiline: Story = (args) => {
  const HeadingLevel = `h${args.level}` as keyof JSX.IntrinsicElements;
  return <HeadingLevel>
    <span>{args.text}</span>
    <br />
    <span className="light">{args.subtext}</span>
  </HeadingLevel>;
}
