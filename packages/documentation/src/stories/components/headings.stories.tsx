import React from 'react';

import '@swisspost/design-system-styles/basics.scss';

interface IHeadingArgs {
  text: string;
  subtext: string;
  level: number;
  multiline: boolean;
}

const Template = (args: IHeadingArgs) => {
  const HeadingLevel = `h${args.level}` as keyof JSX.IntrinsicElements;
  return <HeadingLevel>{args.text}</HeadingLevel>
}

const MultilineTemplate = (args: IHeadingArgs) => {
  const HeadingLevel = `h${args.level}` as keyof JSX.IntrinsicElements;
  return <h1>
    <span>{args.text}</span>
    <br />
    <span className="light">{args.subtext}</span>
  </h1>;
}

export const Default = Template.bind({});
export const Multiline = MultilineTemplate.bind({});

export default {
  title: 'Components/Headings',
  args: {
    text: 'Heading',
    subtext: 'Subheading',
    level: 1,
    multiline: false
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
    },
    multiline: {
      control: { type: 'boolean' }
    }
  }
}
