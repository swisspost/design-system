import React from 'react';
import { Meta, Args, Story } from '@storybook/react';
import docsPage from './input-group.docs.mdx';

export default {
  title: 'Components/Input-Group',
  parameters: {
    docs: {
      page: docsPage,
    },
    badges: ['TODO'],
  },
  args: {},
  argTypes: {},
} as Meta;

const Template = (args: Args) => <></>;

export const Default: Story = Template.bind({});
