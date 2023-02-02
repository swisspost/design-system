import React from 'react';
import { Meta, Args, Story } from '@storybook/react';
import docsPage from './table.docs.mdx';

export default {
  title: 'Components/Table',
  parameters: {
    docs: {
      page: docsPage,
    },
  },
  args: {},
  argTypes: {},
} as Meta;

const Template = (args: Args) => <></>;

export const Default: Story = Template.bind({});
